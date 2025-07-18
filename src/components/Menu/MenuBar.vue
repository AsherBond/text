<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div
		:id="randomID"
		class="text-menubar"
		data-text-el="menubar"
		role="region"
		:aria-label="t('text', 'Editor actions')"
		:class="{
			'text-menubar--ready': isReady,
			'text-menubar--hide': isHidden,
			'text-menubar--is-workspace': isRichWorkspace,
			'is-mobile': $isMobile,
		}">
		<HelpModal v-if="displayHelp" @close="hideHelp" />

		<div
			v-if="isRichEditor"
			ref="menubar"
			role="toolbar"
			class="text-menubar__entries"
			:aria-label="t('text', 'Formatting menu bar')"
			@keyup.left.stop="handleToolbarNavigation"
			@keyup.right.stop="handleToolbarNavigation">
			<!-- The visible inline actions -->
			<component
				:is="
					actionEntry.component
						? actionEntry.component
						: actionEntry.children
							? 'ActionList'
							: 'ActionSingle'
				"
				v-for="(actionEntry, index) in visibleEntries"
				ref="menuEntries"
				:key="actionEntry.key"
				:action-entry="actionEntry"
				:can-be-focussed="activeMenuEntry === index"
				@disabled="disableMenuEntry(actionEntry.key, $event)"
				@click="activeMenuEntry = index" />

			<!-- The remaining actions -->
			<ActionList
				ref="remainingEntries"
				:action-entry="hiddenEntries"
				:can-be-focussed="activeMenuEntry === visibleEntries.length"
				:force-enabled="true"
				@click="activeMenuEntry = 'remain'">
				<template #lastAction="{ visible }">
					<NcActionButton
						v-if="canTranslate"
						close-after-click
						@click="showTranslate">
						<template #icon>
							<TranslateVariant />
						</template>
						{{ t('text', 'Translate') }}
					</NcActionButton>
					<ActionFormattingHelp @click="showHelp" />
					<NcActionSeparator />
					<CharacterCount v-bind="{ visible }" />
				</template>
			</ActionList>
		</div>
		<div class="text-menubar__slot">
			<slot />
		</div>
	</div>
</template>

<script>
import { emit } from '@nextcloud/event-bus'
import { loadState } from '@nextcloud/initial-state'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcActionSeparator from '@nextcloud/vue/components/NcActionSeparator'
import { useElementSize } from '@vueuse/core'
import { ref } from 'vue'

import { t } from '@nextcloud/l10n'
import { useEditor } from '../../composables/useEditor.ts'
import { useEditorFlags } from '../../composables/useEditorFlags.ts'
import { useIsMobileMixin } from '../Editor.provider.ts'
import HelpModal from '../HelpModal.vue'
import { DotsHorizontal, TranslateVariant } from '../icons.js'
import ActionFormattingHelp from './ActionFormattingHelp.vue'
import ActionList from './ActionList.vue'
import ActionSingle from './ActionSingle.vue'
import CharacterCount from './CharacterCount.vue'
import { MenuEntries, ReadOnlyDoneEntries } from './entries.js'
import { MENU_ID } from './MenuBar.provider.js'
import ToolBarLogic from './ToolBarLogic.js'

export default {
	name: 'MenuBar',
	components: {
		ActionFormattingHelp,
		ActionList,
		ActionSingle,
		HelpModal,
		NcActionSeparator,
		NcActionButton,
		CharacterCount,
		TranslateVariant,
	},
	extends: ToolBarLogic,
	mixins: [useIsMobileMixin],
	provide() {
		const val = {}

		Object.defineProperties(val, {
			[MENU_ID]: {
				get: () => this.randomID,
			},
		})

		return val
	},
	props: {
		isHidden: {
			type: Boolean,
			default: false,
		},
		openReadOnly: {
			type: Boolean,
			default: false,
		},
	},

	setup() {
		const editor = useEditor()
		const { isRichEditor, isRichWorkspace } = useEditorFlags()
		const menubar = ref()
		const { width } = useElementSize(menubar)
		return { editor, isRichEditor, isRichWorkspace, menubar, width }
	},

	data() {
		return {
			entries: this.openReadOnly
				? [...ReadOnlyDoneEntries, ...MenuEntries]
				: [...MenuEntries],
			randomID: `menu-bar-${Math.ceil(Math.random() * 10000 + 500).toString(16)}`,
			displayHelp: false,
			isReady: false,
			canTranslate:
				loadState('text', 'translation_languages', []).from?.length > 0,
			resize: null,
		}
	},
	computed: {
		visibleEntries() {
			const list = this.entries.filter(({ priority }) => {
				// if entry has no priority, we assume it always will be visible
				return priority === undefined || priority <= this.iconsLimit
			})

			return list
		},
		hiddenEntries() {
			const remainingEntries = this.entries.filter(({ priority }) => {
				// reverse logic from visibleEntries
				return priority !== undefined && priority > this.iconsLimit
			})
			const entries = remainingEntries.reduce((acc, entry, index) => {
				// If entry has children, merge them into list. Otherwise keep entry itself.
				const children = entry.children ?? [entry]
				// If this block has menu entries, it should be separated for better visibility and a11y (menu item radio grouping)
				if (children.length > 1) {
					const hasPreviousItem = acc.length && !acc.at(-1).isSeparator
					const separatorBefore = hasPreviousItem
						? [
								{
									key: `separator-before-${entry.id}`,
									isSeparator: true,
								},
							]
						: []

					const hasNextItem = index !== remainingEntries.length - 1
					const separatorAfter = hasNextItem
						? [{ key: `separator-after-${entry.id}`, isSeparator: true }]
						: []

					return [
						...acc,
						...separatorBefore,
						...children,
						...separatorAfter,
					]
				}
				return [...acc, ...children]
			}, [])

			return {
				key: 'remain',
				label: this.t('text', 'Remaining actions'),
				icon: DotsHorizontal,
				children: entries,
			}
		},
		iconWidth() {
			const style = this.menubar && getComputedStyle(this.menubar)
			const clickableArea = style?.getPropertyValue('--default-clickable-area')
			return parseInt(clickableArea) || 34
		},
		iconsLimit() {
			// leave some buffer - this is necessary so the bar does not wrap during resizing
			const spaceToFill = this.width - 4
			const spacePerSlot = this.$isMobile ? this.iconWidth : this.iconWidth + 2
			const slots = Math.floor(spaceToFill / spacePerSlot)
			// Leave one slot empty for the three dot menu
			return slots - 1
		},
	},
	mounted() {
		this.$nextTick(() => {
			this.isReady = true
			this.$emit('update:loaded', true)
		})
	},
	methods: {
		showHelp() {
			this.displayHelp = true
		},

		hideHelp() {
			this.displayHelp = false
		},
		showTranslate() {
			const {
				commands,
				view: { state },
			} = this.editor
			const { from, to } = state.selection
			let selectedText = state.doc.textBetween(from, to, ' ')

			if (!selectedText.trim().length) {
				commands.selectAll()
				selectedText = state.doc.textContent
			}

			console.debug('translation click', state.selection, selectedText)
			emit('text:translate-modal:show', { content: selectedText })
		},
		t,
	},
}
</script>

<style scoped lang="scss">
.text-menubar {
	--background-blur: blur(10px);
	position: sticky;
	top: 0;
	bottom: var(--default-grid-baseline);
	width: 100%;
	z-index: 10021; // above modal-header so menubar is always on top
	background-color: var(--color-main-background-translucent);
	backdrop-filter: var(--background-blur);
	max-height: var(
		--default-clickable-area
	); // important for mobile so that the buttons are always inside the container
	border-bottom: 1px solid var(--color-border);
	padding-block: var(--default-grid-baseline);

	visibility: hidden;

	display: flex;
	justify-content: flex-end;
	align-items: center;

	&.is-mobile {
		border-top: 1px solid var(--color-border);
		border-bottom: unset;
	}

	&.text-menubar--ready:not(.text-menubar--hide) {
		visibility: visible;
		animation-name: fadeInDown;
		animation-duration: 0.3s;
	}

	&.text-menubar--hide {
		opacity: 0;
		transition:
			visibility 0.2s 0.4s,
			opacity 0.2s 0.4s;
	}
	.text-menubar__entries {
		display: flex;
		flex-grow: 1;
		margin-left: max(0px, calc((100% - var(--text-editor-max-width)) / 2));
	}

	.text-menubar__slot {
		justify-content: flex-end;
		display: flex;
		min-width: max(0px, min(100px, (100% - var(--text-editor-max-width)) / 2));
	}

	&.text-menubar--is-workspace {
		.text-menubar__entries {
			margin-left: 0;
		}
	}

	@media (max-width: 660px) {
		.text-menubar__entries {
			margin-left: 0;
		}
	}
}
</style>
