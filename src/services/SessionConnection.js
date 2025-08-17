/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'

export class ConnectionClosedError extends Error {
	constructor(
		message = 'Close has already been called on the connection',
		...rest
	) {
		super(message, ...rest)
	}
}

export class SessionConnection {
	#content
	closed
	#documentState
	#document
	#session
	#readOnly
	connection

	constructor(data, connection) {
		const { document, session, readOnly, content, documentState } = data
		this.#document = document
		this.#session = session
		this.#readOnly = readOnly
		this.#content = content
		this.#documentState = documentState
		this.connection = connection
		this.isPublic = !!connection.shareToken
		this.closed = false
	}

	get session() {
		return this.#session
	}

	get document() {
		return this.#document
	}

	get docStateVersion() {
		return this.#documentState ? this.#document.lastSavedVersion : 0
	}

	get state() {
		return {
			document: { ...this.#document, readOnly: this.#readOnly },
			session: this.#session,
			documentSource: this.#content || '',
			documentState: this.#documentState,
		}
	}

	get isClosed() {
		return this.closed
	}

	get #defaultParams() {
		return {
			documentId: this.#document.id,
			sessionId: this.#session.id,
			sessionToken: this.#session.token,
			token: this.connection.shareToken,
		}
	}

	// TODO: maybe return a new connection here so connections have immutable state
	update(guestName) {
		return this.#post(this.#url(`session/${this.#document.id}/session`), {
			...this.#defaultParams,
			guestName,
		}).then(({ data }) => {
			this.#session = data
		})
	}

	close() {
		this.closed = true
	}

	// To be used in Cypress tests only
	setBaseVersionEtag(baseVersionEtag) {
		this.#document.baseVersionEtag = baseVersionEtag
	}

	#post(...args) {
		if (this.closed) {
			return Promise.reject(new ConnectionClosedError())
		}
		return axios.post(...args)
	}

	#url(endpoint) {
		const isPublic = !!this.#defaultParams.token
		return _endpointUrl(endpoint, isPublic)
	}
}

/**
 *
 * @param {string} endpoint - endpoint of the url inside apps/text
 * @param {boolean} isPublic - public url or not
 */
function _endpointUrl(endpoint, isPublic = false) {
	const _baseUrl = generateUrl('/apps/text')
	if (isPublic) {
		return `${_baseUrl}/public/${endpoint}`
	}
	return `${_baseUrl}/${endpoint}`
}
