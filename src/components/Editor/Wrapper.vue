<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div
		class="text-editor__wrapper"
		:class="{
			'has-conflicts': isResolvingConflict,
			'is-rich-workspace': isRichWorkspace,
			'is-rich-editor': isRichEditor,
		}">
		<slot />
	</div>
</template>

<script>
import { subscribe, unsubscribe } from '@nextcloud/event-bus'
import { useEditorFlags } from '../../composables/useEditorFlags.ts'
import {
	OUTLINE_ACTIONS,
	OUTLINE_STATE,
	READ_ONLY_ACTIONS,
} from './Wrapper.provider.js'

export default {
	name: 'Wrapper',
	provide() {
		const val = {}

		Object.defineProperties(val, {
			[OUTLINE_STATE]: {
				get: () => this.outline,
			},
			[OUTLINE_ACTIONS]: {
				get: () => ({
					toggle: this.outlineToggle,
				}),
			},
			[READ_ONLY_ACTIONS]: {
				get: () => ({
					toggle: this.readOnlyToggle,
				}),
			},
		})

		return val
	},

	props: {
		isResolvingConflict: {
			type: Boolean,
			default: false,
		},
		hasConnectionIssue: {
			type: Boolean,
			default: false,
		},
		contentLoaded: {
			type: Boolean,
			default: true,
		},
		showOutlineOutside: {
			type: Boolean,
			default: false,
		},
	},

	setup() {
		const { isRichEditor, isRichWorkspace } = useEditorFlags()
		return { isRichEditor, isRichWorkspace }
	},

	data: () => ({
		outline: {
			visible: false,
			enable: false,
		},
	}),

	computed: {
		showOutline() {
			return this.isAbleToShowOutline ? this.outline.visible : false
		},
		isAbleToShowOutline() {
			if (this.isRichWorkspace) {
				return false
			}

			return true
		},
	},

	watch: {
		showOutlineOutside() {
			this.outline.visible = this.showOutlineOutside
		},
	},

	mounted() {
		subscribe('text:keyboard:outline', this.outlineToggle)
		this.outline.enable = this.isAbleToShowOutline

		this.$watch(
			() => this.isAbleToShowOutline,
			(enable) => {
				// make outline state reactive through the provider
				Object.assign(this.outline, { enable })
			},
		)
	},

	beforeDestroy() {
		unsubscribe('text:keyboard:outline', this.outlineToggle)
	},

	methods: {
		outlineToggle() {
			this.outline.visible = !this.outline.visible
			this.$emit('outline-toggled', this.outline.visible)
		},
		readOnlyToggle() {
			this.$emit('read-only-toggled')
		},
	},
}
</script>

<style scoped lang="scss">
.text-editor__wrapper {
	display: flex;
	flex-grow: 1;

	width: 100%;

	.ProseMirror {
		margin-top: 0 !important;
	}
}
</style>
