/**
 * SPDX-FileCopyrightText: 2023-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import Preview from './../../nodes/Preview.js'
import Markdown from './../../extensions/Markdown.js'
import Link from './../../marks/Link.js'
import { getExtensionField } from '@tiptap/core'
import {
	markdownThroughEditor,
	markdownThroughEditorHtml,
} from '../testHelpers/markdown.js'
import createCustomEditor from '../testHelpers/createCustomEditor.ts'

describe('Preview extension', () => {
	it('exposes toMarkdown function', () => {
		const toMarkdown = getExtensionField(Preview, 'toMarkdown', Preview)
		expect(typeof toMarkdown).toEqual('function')
	})

	it('exposes the toMarkdown function in the prosemirror schema', () => {
		const editor = createEditorWithPreview()
		const preview = editor.schema.nodes.preview
		expect(preview.spec.toMarkdown).toBeDefined()
	})

	it('markdown syntax is preserved through editor', () => {
		const markdown = '[link](https://nextcloud.com (preview))'
		expect(markdownThroughEditor(markdown)).toBe(markdown)
	})

	it('serializes HTML to markdown', () => {
		const markdown = '[link](https://nextcloud.com (preview))'
		const link = '<a href="https://nextcloud.com" title="preview">link</a>'
		expect(markdownThroughEditorHtml(link))
			.toBe(markdown)
	})

	it('detects links', () => {
		const link = '<a href="https://nextcloud.com" title="preview">link</a>'
		const editor = createEditorWithPreview()
		editor.commands.setContent(`${link}<p>hello></p>`)
		const node = editor.state.doc.content.firstChild
		expect(node.type.name).toBe('preview')
		expect(node.attrs.title).toBe('preview')
		expect(node.attrs.href).toBe('https://nextcloud.com')
	})

})

const createEditorWithPreview = () => createCustomEditor('', [Markdown, Preview, Link])
