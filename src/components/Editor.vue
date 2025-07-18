<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div
		id="editor-container"
		ref="el"
		data-text-el="editor-container"
		class="text-editor"
		:class="{ 'is-mobile': isMobile }"
		tabindex="-1">
		<SkeletonLoading v-if="showLoadingSkeleton" />
		<CollisionResolveDialog v-if="isResolvingConflict" :sync-error="syncError" />
		<Wrapper
			v-if="displayed"
			:is-resolving-conflict="isResolvingConflict"
			:has-connection-issue="requireReconnect"
			:content-loaded="contentLoaded"
			:show-outline-outside="showOutlineOutside"
			@read-only-toggled="readOnlyToggled"
			@outline-toggled="outlineToggled">
			<MainContainer v-if="contentLoaded">
				<!-- Readonly -->
				<div
					v-if="readOnly || (openReadOnlyEnabled && !editMode)"
					class="text-editor--readonly-bar">
					<slot name="readonlyBar">
						<ReadonlyBar :open-read-only="openReadOnlyEnabled">
							<Status
								:document="document"
								:dirty="dirty"
								:sessions="filteredSessions"
								:sync-error="syncError"
								:has-connection-issue="requireReconnect" />
						</ReadonlyBar>
					</slot>
				</div>
				<!-- Rich Menu -->
				<template v-else>
					<MenuBar
						v-if="renderMenus"
						ref="menubar"
						:is-hidden="hideMenu"
						:open-read-only="openReadOnlyEnabled"
						:loaded.sync="menubarLoaded">
						<Status
							:document="document"
							:dirty="dirty"
							:sessions="filteredSessions"
							:sync-error="syncError"
							:has-connection-issue="requireReconnect"
							@editor-width-change="handleEditorWidthChange" />
						<slot name="header" />
					</MenuBar>
					<div v-else class="menubar-placeholder" />
				</template>
				<ContentContainer v-show="contentLoaded" ref="contentWrapper" />
				<SuggestionsBar v-if="isRichEditor && contentLoaded" />
			</MainContainer>
			<Reader
				v-if="isResolvingConflict"
				:content="syncError.data.outsideChange"
				:is-rich-editor="isRichEditor" />
		</Wrapper>
		<DocumentStatus
			:idle="idle"
			:lock="lock"
			:sync-error="syncError"
			:has-connection-issue="requireReconnect"
			@reconnect="reconnect" />
		<Assistant v-if="editor" />
		<Translate
			:show="translateModal"
			:content="translateContent"
			@insert-content="translateInsert"
			@replace-content="translateReplace"
			@close="hideTranslate" />
	</div>
</template>

<script>
import { getCurrentUser } from '@nextcloud/auth'
import { emit, subscribe, unsubscribe } from '@nextcloud/event-bus'
import { File } from '@nextcloud/files'
import { loadState } from '@nextcloud/initial-state'
import { Collaboration } from '@tiptap/extension-collaboration'
import { useElementSize } from '@vueuse/core'
import Vue, { defineComponent, ref, set, shallowRef, watch } from 'vue'
import { Doc } from 'yjs'
import Autofocus from '../extensions/Autofocus.js'

import { provideEditor } from '../composables/useEditor.ts'
import { provideEditorFlags } from '../composables/useEditorFlags.ts'
import { ATTACHMENT_RESOLVER, FILE, IS_MOBILE } from './Editor.provider.ts'
import ReadonlyBar from './Menu/ReadonlyBar.vue'

import { t } from '@nextcloud/l10n'
import { generateRemoteUrl } from '@nextcloud/router'
import { Awareness } from 'y-protocols/awareness.js'
import { provideConnection } from '../composables/useConnection.ts'
import { useEditorMethods } from '../composables/useEditorMethods.ts'
import { provideSaveService } from '../composables/useSaveService.ts'
import { provideSyncService } from '../composables/useSyncService.ts'
import { useSyntaxHighlighting } from '../composables/useSyntaxHighlighting.ts'
import { CollaborationCursor } from '../extensions/index.js'
import { exposeForDebugging, removeFromDebugging } from '../helpers/debug.js'
import { logger } from '../helpers/logger.js'
import { setInitialYjsState } from '../helpers/setInitialYjsState.js'
import { ERROR_TYPE, IDLE_TIMEOUT } from '../services/SyncService.ts'
import { fetchNode } from '../services/WebdavClient.ts'
import {
	createPlainEditor,
	createRichEditor,
	serializePlainText,
} from './../EditorFactory.js'
import { createMarkdownSerializer } from './../extensions/Markdown.js'
import markdownit from './../markdownit/index.js'
import isMobile from './../mixins/isMobile.js'
import AttachmentResolver from './../services/AttachmentResolver.js'
import createSyncServiceProvider from './../services/SyncServiceProvider.js'
import Assistant from './Assistant.vue'
import CollisionResolveDialog from './CollisionResolveDialog.vue'
import ContentContainer from './Editor/ContentContainer.vue'
import DocumentStatus from './Editor/DocumentStatus.vue'
import MainContainer from './Editor/MainContainer.vue'
import Status from './Editor/Status.vue'
import { useDelayedFlag } from './Editor/useDelayedFlag.ts'
import Wrapper from './Editor/Wrapper.vue'
import MenuBar from './Menu/MenuBar.vue'
import Translate from './Modal/Translate.vue'
import SkeletonLoading from './SkeletonLoading.vue'
import SuggestionsBar from './SuggestionsBar.vue'

export default defineComponent({
	name: 'Editor',
	components: {
		CollisionResolveDialog,
		SkeletonLoading,
		DocumentStatus,
		Wrapper,
		MainContainer,
		ReadonlyBar,
		ContentContainer,
		MenuBar,
		Reader: () => import(/* webpackChunkName: "editor" */ './Reader.vue'),
		Status,
		Assistant,
		Translate,
		SuggestionsBar,
	},
	mixins: [isMobile],

	provide() {
		const val = {}

		// providers aren't naturally reactive
		// using getters we can always provide the
		// actual values without being reactive
		Object.defineProperties(val, {
			[FILE]: {
				get: () => this.fileData,
			},
			[ATTACHMENT_RESOLVER]: {
				get: () => this.$attachmentResolver,
			},
			[IS_MOBILE]: {
				get: () => this.isMobile,
			},
		})

		return val
	},
	inject: {
		isEmbedded: { default: false },
	},
	props: {
		richWorkspace: {
			type: Boolean,
			require: false,
			default: false,
		},
		initialSession: {
			type: Object,
			default: null,
		},
		relativePath: {
			type: String,
			default: '',
		},
		fileId: {
			type: Number,
			default: null,
		},
		active: {
			type: Boolean,
			default: false,
		},
		autofocus: {
			type: Boolean,
			default: true,
		},
		shareToken: {
			type: String,
			default: null,
		},
		mime: {
			type: String,
			default: null,
		},
		hideMenu: {
			type: Boolean,
			default: false,
		},
		isDirectEditing: {
			type: Boolean,
			default: false,
		},
		showOutlineOutside: {
			type: Boolean,
			default: false,
		},
	},

	setup(props) {
		const el = ref(null)
		const { width } = useElementSize(el)
		watch(width, (value) => {
			const maxWidth = Math.floor(value) - 36
			el.value.style.setProperty('--widget-full-width', `${maxWidth}px`)
		})
		const ydoc = new Doc()
		const awareness = new Awareness(ydoc)
		const hasConnectionIssue = ref(false)
		const { delayed: requireReconnect } = useDelayedFlag(hasConnectionIssue)
		const { isPublic, isRichEditor, isRichWorkspace } = provideEditorFlags(props)
		const { language, lowlightLoaded } = useSyntaxHighlighting(
			isRichEditor,
			props,
		)
		const { connection, openConnection, baseVersionEtag } =
			provideConnection(props)
		const { syncService } = provideSyncService(connection, openConnection)
		const extensions = [
			Autofocus.configure({ fileId: props.fileId }),
			Collaboration.configure({ document: ydoc }),
			CollaborationCursor.configure({ provider: { awareness } }),
		]
		const editor = isRichEditor
			? createRichEditor({
					connection,
					relativePath: props.relativePath,
					extensions,
					isEmbedded: props.isEmbedded,
				})
			: createPlainEditor({ language, extensions })
		provideEditor(editor)

		const { setEditable } = useEditorMethods(editor)

		const serialize = isRichEditor
			? () =>
					createMarkdownSerializer(editor.schema).serialize(
						editor.state.doc,
					)
			: () => serializePlainText(editor.state.doc)

		const { saveService } = provideSaveService(
			connection,
			syncService,
			serialize,
			ydoc,
		)

		const syncProvider = shallowRef(null)

		return {
			awareness,
			baseVersionEtag,
			editor,
			el,
			hasConnectionIssue,
			isPublic,
			isRichEditor,
			isRichWorkspace,
			language,
			lowlightLoaded,
			requireReconnect,
			saveService,
			serialize,
			setEditable,
			syncProvider,
			syncService,
			width,
			connection,
			ydoc,
		}
	},

	data() {
		return {
			IDLE_TIMEOUT,

			document: null,
			sessions: [],
			currentSession: null,
			fileNode: null,

			filteredSessions: {},

			idle: false,
			lock: null,
			dirty: false,
			contentLoaded: false,
			syncError: null,
			readOnly: true,
			openReadOnlyEnabled: OCA.Text.OpenReadOnlyEnabled,
			editMode: true,
			menubarLoaded: false,
			draggedOver: false,

			contentWrapper: null,
			translateModal: false,
			translateContent: '',
		}
	},
	computed: {
		isResolvingConflict() {
			return this.hasSyncCollission && !this.readOnly
		},
		hasSyncCollission() {
			return (
				this.syncError && this.syncError.type === ERROR_TYPE.SAVE_COLLISSION
			)
		},
		hasDocumentParameters() {
			return this.fileId || this.shareToken || this.initialSession
		},
		currentDirectory() {
			return this.relativePath
				? this.relativePath.split('/').slice(0, -1).join('/')
				: '/'
		},
		displayed() {
			return (this.currentSession && this.active) || this.syncError
		},
		showLoadingSkeleton() {
			return (!this.contentLoaded || !this.displayed) && !this.syncError
		},
		renderRichEditorMenus() {
			return (
				this.contentLoaded
				&& this.isRichEditor
				&& !this.syncError
				&& !this.readOnly
			)
		},
		renderMenus() {
			return this.contentLoaded && !this.syncError
		},
		imagePath() {
			return this.relativePath.split('/').slice(0, -1).join('/')
		},
		fileData() {
			return {
				fileId: this.fileId,
				relativePath: this.relativePath,
				document: {
					...this.document,
				},
			}
		},
		editorMaxWidth() {
			return loadState('text', 'is_full_width_editor', false) ? '100%' : '80ch'
		},
	},
	watch: {
		displayed() {
			this.$nextTick(() => {
				this.contentWrapper = this.$refs.contentWrapper
			})
		},
		editorMaxWidth: {
			immediate: true,
			handler(newWidth) {
				this.updateEditorWidth(newWidth)
			},
		},
		dirty(val) {
			if (val) {
				window.addEventListener('beforeunload', this.saveBeforeUnload)
			} else {
				window.removeEventListener('beforeunload', this.saveBeforeUnload)
			}
		},
		requireReconnect(val) {
			if (val) {
				this.emit('sync-service:error')
			}
			this.setEditable(!val)
		},
	},
	mounted() {
		if (!this.richWorkspace) {
			/* If the editor is shown in the viewer we need to hide the content,
			   if richt workspace is used we **must** not hide the content */
			window.addEventListener('beforeprint', this.preparePrinting)
			window.addEventListener('afterprint', this.preparePrinting)
		}
		subscribe('text:keyboard:save', this.onKeyboardSave)
		subscribe('text:image-node:add', this.onAddImageNode)
		subscribe('text:image-node:delete', this.onDeleteImageNode)
		this.emit('update:loaded', true)
		subscribe('text:translate-modal:show', this.showTranslateModal)
		exposeForDebugging(this)
	},
	created() {
		// The following can be useful for debugging ydoc updates
		// this.ydoc.on('update', function(update, origin, doc, tr) {
		//   console.debug('ydoc update', update, origin, doc, tr)
		//   Y.logUpdate(update)
		// });
		this.$attachmentResolver = null
		if (this.active && this.hasDocumentParameters) {
			this.initSession()
			this.listenEditorEvents()
		}
	},
	async beforeDestroy() {
		if (!this.richWorkspace) {
			window.removeEventListener('beforeprint', this.preparePrinting)
			window.removeEventListener('afterprint', this.preparePrinting)
		}
		unsubscribe('text:keyboard:save', this.onKeyboardSave)
		unsubscribe('text:image-node:add', this.onAddImageNode)
		unsubscribe('text:image-node:delete', this.onDeleteImageNode)
		unsubscribe('text:translate-modal:show', this.showTranslateModal)
		if (this.dirty) {
			const timeout = new Promise((resolve) => setTimeout(resolve, 2000))
			await Promise.any([timeout, this.saveService.save()])
		}
		await this.close()
		removeFromDebugging(this)
	},
	methods: {
		initSession() {
			this.listenSyncServiceEvents()
			this.syncProvider = createSyncServiceProvider({
				ydoc: this.ydoc,
				syncService: this.syncService,
				fileId: this.fileId,
				initialSession: this.initialSession,
				disableBC: true,
				awareness: this.awareness,
			})
		},

		listenEditorEvents() {
			this.editor.on('focus', this.onFocus)
			this.editor.on('blur', this.onBlur)
			this.editor.on('create', this.onCreate)
			this.editor.on('update', this.onUpdate)
		},

		unlistenEditorEvents() {
			this.editor.off('focus', this.onFocus)
			this.editor.off('blur', this.onBlur)
			this.editor.off('create', this.onCreate)
			this.editor.off('update', this.onUpdate)
		},

		listenSyncServiceEvents() {
			this.syncService
				.on('opened', this.onOpened)
				.on('change', this.onChange)
				.on('loaded', this.onLoaded)
				.on('sync', this.onSync)
				.on('error', this.onError)
				.on('stateChange', this.onStateChange)
				.on('idle', this.onIdle)
				.on('save', this.onSave)
		},

		unlistenSyncServiceEvents() {
			this.syncService
				.off('opened', this.onOpened)
				.off('change', this.onChange)
				.off('loaded', this.onLoaded)
				.off('sync', this.onSync)
				.off('error', this.onError)
				.off('stateChange', this.onStateChange)
				.off('idle', this.onIdle)
				.off('save', this.onSave)
		},

		reconnect() {
			this.contentLoaded = false
			this.hasConnectionIssue = false
			this.disconnect().then(() => {
				this.initSession()
			})
			this.idle = false
		},

		updateSessions(sessions) {
			this.sessions = sessions.sort((a, b) => b.lastContact - a.lastContact)

			// Make sure we get our own session updated
			// This should ideally be part of a global store where we can have that updated on the actual name change for guests
			const currentUpdatedSession = this.sessions.find(
				(session) => session.id === this.currentSession.id,
			)
			set(this, 'currentSession', currentUpdatedSession)

			const currentSessionIds = this.sessions.map((session) => session.userId)
			const currentGuestIds = this.sessions.map((session) => session.guestId)

			const removedSessions = Object.keys(this.filteredSessions).filter(
				(sessionId) =>
					!currentSessionIds.includes(sessionId)
					&& !currentGuestIds.includes(sessionId),
			)

			for (const index in removedSessions) {
				Vue.delete(this.filteredSessions, removedSessions[index])
			}
			for (const index in this.sessions) {
				const session = this.sessions[index]
				const sessionKey = session.displayName ? session.userId : session.id
				if (this.filteredSessions[sessionKey]) {
					// update timestamp if relevant
					if (
						this.filteredSessions[sessionKey].lastContact
						< session.lastContact
					) {
						set(
							this.filteredSessions[sessionKey],
							'lastContact',
							session.lastContact,
						)
					}
				} else {
					set(this.filteredSessions, sessionKey, session)
				}
				if (session.id === this.currentSession.id) {
					set(this.filteredSessions[sessionKey], 'isCurrent', true)
				}
			}
		},

		onOpened({ document, session, documentSource, documentState }) {
			this.currentSession = session
			this.document = document
			this.readOnly = document.readOnly
			this.baseVersionEtag = document.baseVersionEtag
			this.editMode = !document.readOnly && !this.openReadOnlyEnabled
			this.hasConnectionIssue = false

			this.setEditable(this.editMode)
			this.lock = this.syncService.lock
			localStorage.setItem('nick', this.currentSession.guestName)
			this.$attachmentResolver = new AttachmentResolver({
				session: this.currentSession,
				user: getCurrentUser(),
				shareToken: this.shareToken,
				currentDirectory: this.currentDirectory,
			})
			if (this.currentSession?.userId && this.relativePath?.length) {
				const node = new File({
					id: this.fileId,
					source: generateRemoteUrl(
						`dav/files/${this.currentSession.userId}${this.relativePath}`,
					),
					mime: this.mime,
				})
				fetchNode(node)
					.then((n) => {
						this.fileNode = n
					})
					.catch((err) => logger.warn('Failed to fetch node', { err }))
			}
			// Fetch the document state after syntax highlights are loaded
			this.lowlightLoaded.then(() => {
				this.syncService.startSync()
				if (!documentState) {
					setInitialYjsState(this.ydoc, documentSource, {
						isRichEditor: this.isRichEditor,
					})
				}
			})
			const user = {
				name: session?.userId
					? session.displayName
					: session?.guestName || t('text', 'Guest'),
				color: session?.color,
				clientId: this.ydoc.clientID,
			}
			this.editor.commands.updateUser(user)
		},

		onChange({ document, sessions }) {
			this.updateSessions.bind(this)(sessions)
			this.document = document

			this.syncError = null
			this.setEditable(this.editMode && !this.requireReconnect)
		},

		onCreate({ editor }) {
			const proseMirrorMarkdown = this.serialize()
			this.emit('create:content', {
				markdown: proseMirrorMarkdown,
			})
		},

		onUpdate({ editor }) {
			// this.debugContent(editor)
			const proseMirrorMarkdown = this.serialize()
			this.emit('update:content', {
				markdown: proseMirrorMarkdown,
			})
		},

		onSync({ steps, document }) {
			this.hasConnectionIssue =
				this.syncService.backend.fetcher === 0
				|| !this.syncProvider?.wsconnected
				|| this.syncService.pushError > 0
			if (this.syncService.pushError > 0) {
				// successfully received steps - so let's try and also push
				this.syncService.sendStepsNow()
			}
			this.$nextTick(() => {
				this.emit('sync-service:sync')
			})
			if (document) {
				this.document = document
			}
		},

		onError({ type, data }) {
			if (type === ERROR_TYPE.LOAD_ERROR) {
				this.syncError = {
					type,
					data,
				}
			}

			if (
				type === ERROR_TYPE.SAVE_COLLISSION
				&& (!this.syncError
					|| this.syncError.type !== ERROR_TYPE.SAVE_COLLISSION)
			) {
				this.contentLoaded = true
				this.syncError = {
					type,
					data,
				}
			}
			if (
				type === ERROR_TYPE.CONNECTION_FAILED
				|| type === ERROR_TYPE.SOURCE_NOT_FOUND
			) {
				this.hasConnectionIssue = true
			}

			if (type === ERROR_TYPE.PUSH_FORBIDDEN) {
				this.hasConnectionIssue = true
				this.emit('push:forbidden')
				return
			}

			this.emit('ready')
		},

		onStateChange(state) {
			if (state.initialLoading && !this.contentLoaded) {
				this.contentLoaded = true
				if (this.autofocus && !this.readOnly) {
					this.$nextTick(() => {
						this.editor.commands.autofocus()
					})
				}
				this.emit('ready')
			}
			if (Object.prototype.hasOwnProperty.call(state, 'dirty')) {
				// ignore initial loading and other automated changes before first user change
				if (this.editor.can().undo() || this.editor.can().redo()) {
					this.dirty = state.dirty
					if (this.dirty) {
						this.saveService.autosave()
					}
				}
			}
		},

		onIdle() {
			this.syncService.close()
			this.idle = true
			this.readOnly = true
			this.editMode = false
			this.setEditable(this.editMode)

			this.$nextTick(() => {
				this.emit('sync-service:idle')
			})
		},

		onSave() {
			if (this.fileNode) {
				this.fileNode.mtime = new Date()
				emit('files:node:updated', this.fileNode)
			}
			this.$nextTick(() => {
				this.emit('sync-service:save')
			})
		},

		onFocus() {
			this.emit('focus')
		},

		onBlur() {
			this.emit('blur')
		},

		onKeyboardSave() {
			this.saveService.save()
		},

		onAddImageNode() {
			this.emit('add-image-node')
		},

		onDeleteImageNode(imageUrl) {
			this.emit('delete-image-node', imageUrl)
		},

		async save() {
			await this.saveService.save()
		},

		async disconnect() {
			await this.syncService.close()
			this.unlistenSyncServiceEvents()
			this.syncProvider?.destroy()
			// disallow editing while still showing the content
			this.readOnly = true
		},

		async close() {
			await this.syncService
				.sendRemainingSteps()
				.catch((err) =>
					logger.warn('Failed to send remaining steps', { err }),
				)
			await this.disconnect().catch((err) =>
				logger.warn('Failed to disconnect', { err }),
			)
			if (this.editor) {
				try {
					this.unlistenEditorEvents()
					this.editor.destroy()
				} catch (error) {
					logger.warn('Failed to destroy editor', { error })
				}
			}
		},

		/**
		 * Wrapper to emit events on our own and the parent component
		 *
		 * The parent might be either the root component of src/editor.js or Viewer.vue which collectives currently uses
		 *
		 * Ideally this would be done in a generic way in the src/editor.js API abstraction, but it seems
		 * that there is no proper way to pass any received event along in vue, the only option I've found
		 * in https://github.com/vuejs/vue/issues/230 feels too hacky to me, so we just emit twice for now
		 *
		 * @param {string} event The event name
		 * @param {any} data The data to pass along
		 */
		emit(event, data) {
			this.$emit(event, data)
			this.$parent?.$emit(event, data)
		},

		/** @param {Event} event The passed event */
		preparePrinting(event) {
			const content = document.getElementById('content')
			// Hide Content behind modal, this also hides the sidebar if open
			if (content && event.type === 'beforeprint') {
				content.style.display = 'none'
			} else if (content) {
				content.style.display = ''
			}
		},

		/**
		 * Helper method to debug serialization of content between markdown and HTML
		 *
		 * @param {object} editor The Tiptap editor
		 */
		debugContent(editor) {
			const proseMirrorMarkdown = this.serialize()
			const markdownItHtml = markdownit.render(proseMirrorMarkdown)

			logger.debug(
				'markdown, serialized from editor state by prosemirror-markdown',
			)
			console.debug(proseMirrorMarkdown)
			logger.debug('HTML, serialized from markdown by markdown-it')
			console.debug(markdownItHtml)
			logger.debug('HTML, as rendered in the browser by Tiptap')
			console.debug(editor.getHTML())
		},

		/**
		 * Helper method to debug yjs issues
		 */
		debugData() {
			const yjsData = {
				fileId: this.fileId,
				filePath: this.relativePath,
				clientId: this.ydoc.clientID,
				pendingStructs: this.ydoc.store.pendingStructs,
				pendingStructsRemote: this.syncProvider?.remote.store.pendingStructs,
				clientVectors: [],
				documentState: this.saveService.getDocumentState(),
			}
			for (const client of this.ydoc.store.clients.values()) {
				yjsData.clientVectors.push(client.at(-1).id)
			}

			return yjsData
		},

		outlineToggled(visible) {
			this.emit('outline-toggled', visible)
		},

		readOnlyToggled() {
			if (this.editMode) {
				this.saveService.save()
			}
			this.editMode = !this.editMode
			this.setEditable(this.editMode)
		},

		showTranslateModal(e) {
			this.translateContent = e.content
			this.translateModal = true
		},
		hideTranslate() {
			this.translateModal = false
		},
		applyCommand(fn) {
			this.editor.commands.command(fn)
		},
		translateInsert(content) {
			this.applyCommand(({ tr, commands }) => {
				return commands.insertContentAt(tr.selection.to, content)
			})
			this.translateModal = false
		},
		translateReplace(content) {
			this.applyCommand(({ tr, commands }) => {
				const selection = tr.selection
				const range = {
					from: selection.from,
					to: selection.to,
				}
				return commands.insertContentAt(range, content)
			})
			this.translateModal = false
		},

		handleEditorWidthChange(newWidth) {
			this.updateEditorWidth(newWidth)
			this.$nextTick(() => {
				this.editor.view.updateState(this.editor.view.state)
				this.editor.commands.focus()
			})
		},
		updateEditorWidth(newWidth) {
			document.documentElement.style.setProperty(
				'--text-editor-max-width',
				newWidth,
			)
		},

		saveBeforeUnload() {
			this.saveService.saveViaSendBeacon()
		},
	},
})
</script>

<style scoped lang="scss">
.modal-container .text-editor {
	top: 0;
	height: calc(100vh - var(--header-height));

	&.is-mobile {
		// TODO: Why is this required to prevent small scrolling container on mobile with short content?
		height: calc(
			100vh - var(--header-height) - 2 * var(--default-grid-baseline)
		);
	}
}

.text-editor {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 100%;
	height: 100%;
	left: 0;
	margin: 0 auto;
	position: relative;
	background-color: var(--color-main-background);
}

.text-editor .text-editor__wrapper.has-conflicts {
	// Make space for document status and conflict resolving dialog
	height: calc(100% - 48px - 54px);
	overflow-y: auto;
}

#body-public {
	height: auto;
}

#files-public-content {
	.text-editor {
		top: 0;
		width: 100%;

		.text-editor__main {
			overflow: auto;
			z-index: 20;
		}

		.has-conflicts .text-editor__main {
			padding-top: 0;
		}
	}
}

.menubar-placeholder,
.text-editor--readonly-bar {
	position: fixed;
	position: -webkit-sticky;
	position: sticky;
	top: 0;
	opacity: 0;
	visibility: hidden;
	height: var(
		--default-clickable-area
	); // important for mobile so that the buttons are always inside the container
	border-bottom: 1px solid var(--color-border);
	padding-block: var(--default-grid-baseline);
}

.text-editor--readonly-bar,
.menubar-placeholder--with-slot {
	opacity: unset;
	visibility: unset;

	z-index: 50;
	max-width: var(--text-editor-max-width);
	margin: auto;
	width: 100%;
	background-color: var(--color-main-background);
}
</style>

<style lang="scss">
@import './../css/variables';
@import './../css/style';
@import './../css/print';

.text-editor__wrapper {
	@import './../css/prosemirror';

	// relative position for the alignment of the menububble
	.text-editor__main {
		&.draggedOver {
			background-color: var(--color-primary-element-light);
		}

		.text-editor__content-wrapper {
			position: relative;
		}
	}
}

.text-editor__wrapper.has-conflicts > .editor {
	width: 50%;
}

.text-editor__wrapper.has-conflicts > .content-wrapper {
	width: 50%;

	#read-only-editor {
		margin: 0px auto;
		// Add height of the menubar as padding-top
		padding-top: calc(
			var(--default-clickable-area) + 2 * var(--default-grid-baseline)
		);
		overflow: initial;
	}
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

/* Give a remote user a caret */
.collaboration-cursor__caret {
	position: relative;
	margin-left: -1px;
	margin-right: -1px;
	border-left: 1px solid #0d0d0d;
	border-right: 1px solid #0d0d0d;
	word-break: normal;
	pointer-events: none;
}

/* Render the username above the caret */
.collaboration-cursor__label {
	position: absolute;
	top: -1.4em;
	left: -1px;
	font-size: 12px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	user-select: none;
	color: #0d0d0d;
	padding: 0.1rem 0.3rem;
	border-radius: 3px 3px 3px 0;
	white-space: nowrap;
	opacity: 0;

	&.collaboration-cursor__label__active {
		opacity: 1;
	}

	&:not(.collaboration-cursor__label__active) {
		transition: opacity 0.2s 5s;
	}
}
</style>
