<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div data-text-el="readonly-bar" class="text-readonly-bar">
		<div
			ref="menubar"
			role="toolbar"
			class="text-readonly-bar__entries"
			:aria-label="t('text', 'Editor actions')">
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
				@disabled="disableMenuEntry(actionEntry.key, $event)" />
		</div>
		<div class="text-menubar__slot">
			<slot />
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue'
import { OutlineEntries, ReadOnlyEditEntries } from './entries.js'

import { t } from '@nextcloud/l10n'
import ActionList from './ActionList.vue'
import ActionSingle from './ActionSingle.vue'
import ToolBarLogic from './ToolBarLogic.js'

export default defineComponent({
	name: 'ReadonlyBar',
	components: {
		ActionList,
		ActionSingle,
	},
	extends: ToolBarLogic,
	props: {
		openReadOnly: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			entries: this.openReadOnly
				? [...ReadOnlyEditEntries, ...OutlineEntries]
				: [...OutlineEntries],
		}
	},
	methods: {
		t,
	},
})
</script>

<style scoped>
.text-readonly-bar {
	display: flex;
	height: var(--default-clickable-area);
	border-bottom: 1px solid var(--color-border);
	padding-block: var(--default-grid-baseline);
}
.text-readonly-bar__entries {
	display: flex;
	flex-grow: 1;
}
</style>
