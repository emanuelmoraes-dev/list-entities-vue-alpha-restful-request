import axios from 'axios'
import { scape } from 'datetime-utility'

export class InvalidOperatorForTypeArrayError extends Error {
	constructor (operator, message) {
		super(message || `invalid "${operator}" operator for type Array`)
		this.operator = operator
	}
}

export class InvalidOperatorForTypeStringError extends Error {
	constructor (operator, message) {
		super(message || `invalid "${operator}" operator for type String`)
		this.operator = operator
	}
}

export class InvalidOperatorForTypeNumberError extends Error {
	constructor (operator, message) {
		super(message || `invalid "${operator}" operator for type Number`)

		this.operator = operator
	}
}

export class InvalidOperatorForTypeDateError extends Error {
	constructor (operator, message) {
		super(message || `invalid "${operator}" operator for type Date`)

		this.operator = operator
	}
}

const searchArrayAttr = Symbol('searchArrayAttr')
const searchStringAttr = Symbol('searchStringAttr')
const searchNumberAttr = Symbol('searchNumberAttr')
const searchDateAttr = Symbol('searchDateAttr')
const searchBooleanAttr = Symbol('searchBooleanAttr')

export default class Http {
	constructor (urlBase, origin, resource = '/', {
		request=axios,
		authUrl='auth',
		authUrlMethod='post',
		headerRefreshTokenName='x-refresh-token',
		responseRefreshTokenName='refresh_token',
		allowHeaders='Origin, X-Requested-With, Content-Type, Accept',
		allowMethods='GET,PUT,PATCH,POST,DELETE,OPTIONS',
		allowCredentials='true'
	} = {}) {
		this.urlBase = urlBase
		this.origin = origin
		this.request = request
		this.authUrl = authUrl
		this.authUrlMethod = authUrlMethod
		this.headerRefreshTokenName = headerRefreshTokenName
		this.responseRefreshTokenName = responseRefreshTokenName
		this.allowHeaders = allowHeaders
		this.allowMethods = allowMethods
		this.allowCredentials = allowCredentials

		if (resource && resource[0] !== '/')
			resource = `/${resource}`
		
		this.resource = resource

		this.parseRequestListEntities = this.parseRequestListEntities.bind(this)
	}

	get __headersBase () {
		return {
			'Access-Control-Allow-Origin': this.origin,
			'Access-Control-Allow-Headers': this.allowHeaders,
			'Access-Control-Allow-Methods': this.allowMethods,
			'Access-Control-Allow-Credentials': this.allowCredentials
		}
	}

	url (route = '/') {
		if (!route) route = ''
		if (route && route[0] !== '/') route = `/${route}`
		return `${this.urlBase}${route}`
	}

	uri (route = '/') {
		if (!route) route = ''
		if (route && route[0] !== '/') route = `/${route}`
		return `${this.urlBase}${this.resource !== '/' ? this.resource : ''}${route}`
	}

	async getHeaders () {
		let { data } = await this.request[this.authUrlMethod](this.url(this.authUrl), {}, { headers: this.__headersBase })

		return {
			...this.__headersBase,
			[this.headerRefreshTokenName]: data[this.responseRefreshTokenName]
		}
	}

	async requestGet (url, options = {}) {
		if (typeof (url) === 'object') {
			options = url
			url = null
		}

		let headers = await this.getHeaders()
		let { data } = await this.request.get(this.uri(url), { headers, ...options })

		return data
	}

	async requestPost (url, body, options = {}) {
		if (typeof (url) === 'object') {
			options = url
			url = null
		}

		let headers = await this.getHeaders()
		let { data } = await this.request.post(this.uri(url), body, { headers, ...options })

		return data
	}

	async requestPut (url, body, options = {}) {
		if (typeof (url) === 'object') {
			options = url
			url = null
		}

		let headers = await this.getHeaders()
		let { data } = await this.request.put(this.uri(url), body, { headers, ...options })

		return data
	}

	async requestPatch (url, body, options = {}) {
		if (typeof (url) === 'object') {
			options = url
			url = null
		}

		let headers = await this.getHeaders()
		let { data } = await this.request.patch(this.uri(url), body, { headers, ...options })

		return data
	}

	async requestDelete (url, options = {}) {
		if (typeof (url) === 'object') {
			options = url
			url = null
		}

		let headers = await this.getHeaders()
		let { data } = await this.request.delete(this.uri(url), { headers, ...options })

		return data
	}

	async findAll () {
		return await this.requestGet()
	}

	async find (page, pageSize, sort) {
		let skip = (page - 1) * pageSize

		return await this.requestGet({
			params: {
				skip,
				limit: pageSize,
				sort
			}
		})
	}

	async findCount () {
		const { count } = await this.requestGet({
			params: {
				selectCount: 'true'
			}
		})
		return count
	}

	async save (body, options = {}) {
		return await this.requestPost({ ...options }, body)
	}

	async edit (body, options = {}) {
		return await this.requestPatch(body.id, body, { ...options })
	}

	async delete (id, options = {}) {
		return await this.requestDelete(id, { ...options })
	}

	async findOne (id, options = {}) {
		return await this.requestGet(id, { ...options })
	}

	parseRequestListEntities (caseInsensitive) {
		const searchAll = this.searchAll.bind(this)
		const searchAttr = this.searchAttr.bind(this, caseInsensitive)

		let rt = {
			searchAll,
			searchAttr
		}

		if (this.searchDefault)
			rt.searchDefault = this.searchDefault.bind(this, caseInsensitive)

		return rt
	}
	
	async searchAll (params, attr, inputSearch, page, pageSize, sort, type) {
		let entities = await this.find(page, pageSize, sort)
		let count = await this.findCount()
		return { count, entities }
	}
	
	async searchAttr (caseInsensitive, params, attr, inputSearch, page, pageSize, sort, type) {
		let skip = (page - 1) * pageSize
		let args = {}

		for (let p of params) {
			if (p.descriptor.array)
				this[searchArrayAttr](p, caseInsensitive, args, attr, page, pageSize, sort, type)
			else if (type === String)
				this[searchStringAttr](p, caseInsensitive, args, attr, page, pageSize, sort, type)
			else if (type === Number)
				this[searchNumberAttr](p, caseInsensitive, args, attr, page, pageSize, sort, type)
			else if (type === Date)
				this[searchDateAttr](p, caseInsensitive, args, attr, page, pageSize, sort, type)
			else if (type === Boolean)
				this[searchBooleanAttr](p, caseInsensitive, args, attr, page, pageSize, sort, type)
		}

		let entities = await this.requestGet({
			params: {
				...args,
				skip,
				limit: pageSize,
				sort
			}
		})

		let { count } = await this.requestGet({
			params: {
				...args,
				selectCount: 'true'
			}
		})

		return { count, entities }
	}

	[searchArrayAttr] (p, caseInsensitive, args, attr, page, pageSize, sort, type) {
		let search

		if (p.descriptor.searchSep) {
			search = p.value.split(descriptor.searchSep)
			search = search.map(scape).join('|')

			if (p.operator === 'contains')
				search = `/${search}/`
			else if (p.operator === 'equals')
				search = `/^${search}$/`
			else if (p.operator === 'startsWith')
				search = `/^${search}/`
			else if (p.operator === 'endsWith')
				search = `/${search}$/`
			else
				throw new InvalidOperatorForTypeArrayError(p.operator)

			if (caseInsensitive)
				search += 'i'

			args[`${attr}__regex`] = search

			return
		}
		
		regex = scape(p.value)

		if (p.operator === 'equals')
			args[`${attr}__eq`] = p.value
		else if (p.operator === 'greaterThan')
			args[`${attr}__$gt`] = p.value
		else if (p.operator === 'lessThan')
			args[`${attr}__$lt`] = p.value
		else if (p.operator === 'greaterOrEqualThan')
			args[`${attr}__$gte`] = p.value
		else if (p.operator === 'lessOrEqualThan')
			args[`${attr}__$lte`] = p.value
		else if (p.operator === 'contains')
			args[`${attr}__regex`] = `/${regex}/`
		else if (p.operator === 'equals')
			args[`${attr}__regex`] = `/^${regex}$/`
		else if (p.operator === 'startsWith')
			args[`${attr}__regex`] = `/^${regex}/`
		else if (p.operator === 'endsWith')
			args[`${attr}__regex`] = `/${regex}$/`
		else
			throw new InvalidOperatorForTypeArrayError(p.operator)
	}

	[searchStringAttr] (p, caseInsensitive, args, attr, page, pageSize, sort, type) {
		if (p.operator === 'contains')
			p.value = `/${scape(p.value)}/`
		else if (p.operator === 'equals')
			p.value = `/^${scape(p.value)}$/`
		else if (p.operator === 'startsWith')
			p.value = `/^${scape(p.value)}/`
		else if (p.operator === 'endsWith')
			p.value = `/${scape(p.value)}$/`
		else
			throw new InvalidOperatorForTypeStringError(p.operator)

		if (caseInsensitive)
			p.value += 'i'

		args[`${attr}__regex`] = p.value
	}

	[searchNumberAttr] (p, caseInsensitive, args, attr, page, pageSize, sort, type) {
		let op

		if (p.operator === 'equals')
			op = '$eq'
		else if (p.operator === 'greaterThan')
			op = '$gt'
		else if (p.operator === 'lessThan')
			op = '$lt'
		else if (p.operator === 'greaterOrEqualThan')
			op = '$gte'
		else if (p.operator === 'lessOrEqualThan')
			op = '$lte'
		else
			throw new InvalidOperatorForTypeNumberError(p.operator)

		args[`${attr}__${op}`] = p.value
	}

	[searchDateAttr] (p, caseInsensitive, args, attr, page, pageSize, sort, type) {
		let op

		if (p.operator === 'equals')
			op = '$eq'
		else if (p.operator === 'greaterThan')
			op = '$gt'
		else if (p.operator === 'lessThan')
			op = '$lt'
		else if (p.operator === 'greaterOrEqualThan')
			op = '$gte'
		else if (p.operator === 'lessOrEqualThan')
			op = '$lte'

		args[`${attr}__${op}`] = p.value.toISOString()
	}

	[searchBooleanAttr] (p, caseInsensitive, args, attr, page, pageSize, sort, type) {
		if (p.value === true)
			p.value = 1
		else if (p.value === false)
			p.value = 0

		args[`${attr}__$eq`] = p.value
	}
}
