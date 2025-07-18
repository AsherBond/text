<!--
  - SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div
		data-text-el="editor-table-of-contents"
		:class="{ '--initial-render': initialRender }"
		class="editor--toc">
		<ul class="editor--toc__list">
			<li
				v-for="heading in headings"
				:key="heading.id"
				:data-toc-level="heading.level"
				class="editor--toc__item"
				:class="{
					[`editor--toc__item--${heading.level}`]: true,
					[`editor--toc__item--previous-${heading.previous}`]:
						heading.previous > 0,
				}">
				<a
					:href="`#${heading.id}`"
					class="editor--toc__item-link"
					@click.prevent="goto(heading)">
					{{ heading.text }}
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
import { useEditor } from '../../composables/useEditor.ts'
import { headingAnchorPluginKey } from '../../plugins/headingAnchor.js'

export default {
	name: 'TableOfContents',
	setup() {
		const { editor } = useEditor()
		return { editor }
	},
	data: () => ({
		initialRender: true,
		headings: [],
	}),
	mounted() {
		this.editor.on('update', this.updateHeadings)
		this.updateHeadings()
		setTimeout(() => {
			this.initialRender = false
		}, 1000)
	},
	beforeDestroy() {
		this.editor.off('update', this.updateHeadings)
	},
	methods: {
		goto(heading) {
			const element = this.$root.$el.querySelector(`#${heading.id}`)
			element.scrollIntoView({ block: 'start', behavior: 'smooth' })
			this.$nextTick(() => {
				window.history.replaceState(
					window.history.state,
					'',
					`#${heading.id}`,
				)
			})
		},
		updateHeadings() {
			this.headings =
				headingAnchorPluginKey.getState(this.editor.state)?.headings ?? []
		},
	},
}
</script>

<style lang="scss">
.--initial-render {
	.editor--toc {
		&__item {
			--initial-padding-left: 0;
			animation: initialPadding 1.5s;
		}
	}
}

.editor--toc {
	padding: 0 10px;
	color: var(--color-main-text-maxcontrast);
	--animation-duration: 0.8s;

	h3 {
		padding-left: 0.75rem;
	}

	&__list {
		width: 100%;
		list-style: none;
		font-size: 0.9rem;
		padding: 0;

		animation-name: fadeInLeft;
		animation-duration: var(--animation-duration);
	}

	&__item {
		transform: translateX(var(--padding-left, 0rem));
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		animation: initialPadding calc(var(--animation-duration) * 2);
		width: calc(100% - var(--padding-left));

		a:hover {
			color: var(--color-primary-element-hover);
		}

		&-link {
			scroll-margin-top: calc(
				var(--default-clickable-area) + 4 * var(--default-grid-baseline)
			);
		}

		&--1 {
			--padding-left: 0rem;
			font-weight: 600;
			&:not(:nth-child(1)) {
				margin-top: 0.5rem;
			}
		}

		&--2 {
			--padding-left: 1rem;
		}

		&--3 {
			--padding-left: 2rem;
		}

		&--4 {
			--padding-left: 3rem;
		}

		&--5 {
			--padding-left: 4rem;
		}

		&--6 {
			--padding-left: 5rem;
		}

		&--previous-1 {
			--initial-padding-left: 0rem;
		}

		&--previous-2 {
			--initial-padding-left: 1rem;
		}

		&--previous-3 {
			--initial-padding-left: 2rem;
		}

		&--previous-4 {
			--initial-padding-left: 3rem;
		}

		&--previous-5 {
			--initial-padding-left: 4rem;
		}

		&--previous-6 {
			--initial-padding-left: 5rem;
		}
	}
}

@keyframes initialPadding {
	from {
		transform: translateX(var(--initial-padding-left, initial));
	}

	to {
		transform: translateX(var(--padding-left, 0rem));
	}
}
</style>
