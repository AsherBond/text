<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<NcActions
		class="entry-action entry-action__image-upload"
		:data-text-action-entry="actionEntry.key"
		:name="actionEntry.label"
		:disabled="isUploadDisabled"
		:title="menuTitle"
		:aria-label="actionEntry.label"
		:container="menuIDSelector">
		<template #icon>
			<component
				:is="icon"
				:name="actionEntry.label"
				:aria-label="actionEntry.label" />
		</template>
		<NcActionButton
			v-if="$editorUpload"
			close-after-click
			:disabled="isUploadingAttachments"
			:data-text-action-entry="`${actionEntry.key}-upload`"
			@click="$callChooseLocalAttachment">
			<template #icon>
				<Upload />
			</template>
			{{ t('text', 'Upload from computer') }}
		</NcActionButton>
		<NcActionButton
			v-if="!isPublic"
			close-after-click
			:disabled="isUploadingAttachments"
			:data-text-action-entry="`${actionEntry.key}-insert`"
			@click="$callAttachmentPrompt">
			<template #icon>
				<Folder />
			</template>
			{{ t('text', 'Insert from Files') }}
		</NcActionButton>
		<template v-if="templates.length">
			<NcActionSeparator />
			<NcActionButton
				v-for="(template, index) in templates"
				:key="`${template.app}-${index}`"
				close-after-click
				:disabled="isUploadingAttachments"
				:data-text-action-entry="`${actionEntry.key}-add-${template.app}-${index}`"
				@click="createAttachment(template)">
				<template #icon>
					<NcIconSvgWrapper
						v-if="template.iconSvgInline"
						:svg="template.iconSvgInline" />
					<Plus v-else />
				</template>
				{{ template.actionLabel }}
			</NcActionButton>
		</template>
	</NcActions>
</template>

<script>
import { loadState } from '@nextcloud/initial-state'
import { t } from '@nextcloud/l10n'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionSeparator from '@nextcloud/vue/components/NcActionSeparator'
import NcIconSvgWrapper from '@nextcloud/vue/components/NcIconSvgWrapper'
import { useEditorFlags } from '../../composables/useEditorFlags.ts'
import { useSyncService } from '../../composables/useSyncService.ts'
import { useEditorUpload } from '../Editor.provider.ts'
import {
	useActionAttachmentPromptMixin,
	useActionChooseLocalAttachmentMixin,
	useActionCreateAttachmentMixin,
	useUploadingStateMixin,
} from '../Editor/MediaHandler.provider.js'
import { Folder, Loading, Plus, Upload } from '../icons.js'
import { BaseActionEntry } from './BaseActionEntry.js'
import { useMenuIDMixin } from './MenuBar.provider.js'

export default {
	name: 'ActionAttachmentUpload',
	components: {
		NcActions,
		NcActionSeparator,
		NcActionButton,
		NcIconSvgWrapper,
		Loading,
		Folder,
		Upload,
		Plus,
	},
	extends: BaseActionEntry,
	mixins: [
		useEditorUpload,
		useActionAttachmentPromptMixin,
		useUploadingStateMixin,
		useActionChooseLocalAttachmentMixin,
		useActionCreateAttachmentMixin,
		useMenuIDMixin,
	],
	setup() {
		const { isPublic } = useEditorFlags()
		const { syncService } = useSyncService()
		return { ...BaseActionEntry.setup(), isPublic, syncService }
	},
	computed: {
		icon() {
			return this.isUploadingAttachments ? Loading : this.actionEntry.icon
		},
		isUploadingAttachments() {
			return this.$uploadingState.isUploadingAttachments
		},
		templates() {
			return loadState('files', 'templates', [])
		},
		isUploadDisabled() {
			return !this.syncService.hasOwner
		},
		menuTitle() {
			return this.isUploadDisabled
				? t(
						'text',
						'Attachments cannot be created or uploaded because this file is shared from another cloud.',
					)
				: this.actionEntry.label
		},
	},
	methods: {
		createAttachment(template) {
			this.$callCreateAttachment(template)
		},
		t,
	},
}
</script>
