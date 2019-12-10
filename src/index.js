import 'es6-promise/auto';

import axios from 'axios';
import { scape } from 'datetime-utility';

export class InvalidOperatorForTypeArrayError extends Error {
	constructor (operator, message) {
		super(message || `invalid "${operator}" operator for type Array`);
		this.operator = operator;
	}
}

export class InvalidOperatorForTypeStringError extends Error {
	constructor (operator, message) {
		super(message || `invalid "${operator}" operator for type String`);
		this.operator = operator;
	}
}

export class InvalidOperatorForTypeNumberError extends Error {
	constructor (operator, message) {
		super(message || `invalid "${operator}" operator for type Number`);

		this.operator = operator;
	}
}

export class InvalidOperatorForTypeDateError extends Error {
	constructor (operator, message) {
		super(message || `invalid "${operator}" operator for type Date`);

		this.operator = operator;
	}
}

export class InvalidValueForTypeBooleanError extends Error {
	constructor (value, message) {
		super(message || `invalid "${value}" value for type Boolean`);

		this.value = value;
	}
}

export class InvalidOperatorFor_idError extends Error {
	constructor (operator, message) {
		super(message || `invalid "${operator}" operator for attribute "_id"`);

		this.operator = operator;
	}
}

export default class Http {
	constructor (urlBase, origin, resource = '/', {
		request=axios,
		caseInsensitive=true,
		defaultAuth=false,
		authUrl='auth',
		authUrlMethod='post',
		headerRefreshTokenName='x-refresh-token',
		responseRefreshTokenName='refresh_token',
		allowHeaders='Origin, X-Requested-With, Content-Type, Accept',
		allowMethods='GET,PUT,PATCH,POST,DELETE,OPTIONS',
		allowCredentials='true'
	} = {}) {
		this.urlBase = urlBase;
		this.origin = origin;
		this.request = request;
		this.caseInsensitive = caseInsensitive;
		this.defaultAuth = defaultAuth;
		this.authUrl = authUrl;
		this.authUrlMethod = authUrlMethod;
		this.headerRefreshTokenName = headerRefreshTokenName;
		this.responseRefreshTokenName = responseRefreshTokenName;
		this.allowHeaders = allowHeaders;
		this.allowMethods = allowMethods;
		this.allowCredentials = allowCredentials;

		if (resource && resource[0] !== '/')
			resource = `/${resource}`;
		
		this.resource = resource;
	}

	get __headersBase () {
		return {
			'Access-Control-Allow-Origin': this.origin,
			'Access-Control-Allow-Headers': this.allowHeaders,
			'Access-Control-Allow-Methods': this.allowMethods,
			'Access-Control-Allow-Credentials': this.allowCredentials
		};
	}

	url (route = '/') {
		if (!route) route = '';
		if (route && route[0] !== '/') route = `/${route}`;
		return `${this.urlBase}${route}`;
	}

	uri (route = '/') {
		if (!route) route = '';
		if (route && route[0] !== '/') route = `/${route}`;
		return `${this.urlBase}${this.resource !== '/' ? this.resource : ''}${route}`;
	}

	async getHeaders () {
		if (!this.defaultAuth)
			return this.__headersBase;

		let { data } = await this.request[this.authUrlMethod](this.url(this.authUrl), {}, { headers: this.__headersBase });

		return {
			...this.__headersBase,
			[this.headerRefreshTokenName]: data[this.responseRefreshTokenName]
		};
	}

	async requestGet (url, options = {}) {
		if (typeof (url) === 'object') {
			options = url;
			url = null;
		}

		let headers = await this.getHeaders();
		let { data } = await this.request.get(this.uri(url), { headers, ...options });

		return data;
	}

	async requestPost (url, body, options = {}) {
		if (typeof (url) === 'object') {
			options = url;
			url = null;
		}

		let headers = await this.getHeaders();
		let { data } = await this.request.post(this.uri(url), body, { headers, ...options });

		return data;
	}

	async requestPut (url, body, options = {}) {
		if (typeof (url) === 'object') {
			options = url;
			url = null;
		}

		let headers = await this.getHeaders();
		let { data } = await this.request.put(this.uri(url), body, { headers, ...options });

		return data;
	}

	async requestPatch (url, body, options = {}) {
		if (typeof (url) === 'object') {
			options = url;
			url = null;
		}

		let headers = await this.getHeaders();
		let { data } = await this.request.patch(this.uri(url), body, { headers, ...options });

		return data;
	}

	async requestDelete (url, options = {}) {
		if (typeof (url) === 'object') {
			options = url;
			url = null;
		}

		let headers = await this.getHeaders();
		let { data } = await this.request.delete(this.uri(url), { headers, ...options });

		return data;
	}

	async findAll () {
		return await this.requestGet();
	}

	async find (page, pageSize, sort) {
		if (sort && sort[0] === '+')
			sort = sort.substring(1);

		let skip = (page - 1) * pageSize;

		return await this.requestGet({
			params: {
				skip,
				limit: pageSize,
				sort
			}
		});
	}

	async findCount () {
		const { count } = await this.requestGet({
			params: {
				selectCount: 'true'
			}
		});
		return count;
	}

	async save (body, options = {}) {
		return await this.requestPost({ ...options }, body);
	}

	async edit (body, options = {}) {
		return await this.requestPatch(body.id, body, { ...options });
	}

	async delete (id, options = {}) {
		return await this.requestDelete(id, { ...options });
	}

	async findOne (id, options = {}) {
		return await this.requestGet(id, { ...options });
	}
	
	async searchAll (page, pageSize, sort, inputSearch) {
		if (sort && sort[0] === '+')
			sort = sort.substring(1);

		let entities = await this.find(page, pageSize, sort);
		let count = await this.findCount();
		return { count, entities };
	}
	
	async searchAttr (page, pageSize, sort, inputSearch, paramsRequest, params) {
		params = [...paramsRequest, ...params];

		if (sort && sort[0] === '+')
			sort = sort.substring(1);

		let skip = (page - 1) * pageSize;
		let args = {};

		for (let p of params) {
			if (p.operator === '$' && p.descriptor.type === String)
				p.operator = '$in';
			else if (p.operator === '$')
				p.operator = '$eq';

			if (p.descriptor.array)
				this.__searchArrayAttr(p, args);
			else if (p.descriptor.type === String)
				this.__searchStringAttr(p, args);
			else if (p.descriptor.type === Number)
				this.__searchNumberAttr(p, args);
			else if (p.descriptor.type === Date)
				this.__searchDateAttr(p, args);
			else if (p.descriptor.type === Boolean)
				this.__searchBooleanAttr(p, args);
		}

		let entities = await this.requestGet({
			params: {
				...args,
				skip,
				limit: pageSize,
				sort
			}
		});

		let { count } = await this.requestGet({
			params: {
				...args,
				selectCount: 'true'
			}
		});

		return { count, entities };
	}

	__searchArrayAttr (p, args) {
		let search;

		if (p.descriptor.searchSepOr) {
			search = p.value.split(p.descriptor.searchSepOr);

			if (p.operator === '$neq' && p.attr === '_id') {
				args._id__$nin = search.join(',');
				return;
			} else if (p.operator === '$eq' && p.attr === '_id') {
				args._id__$in = search.join(',');
				return;
			} else if (p.attr === '_id') {
				throw new InvalidOperatorFor_idError(p.operator);
			}

			search = search.map(scape).join('|');

			let op;

			if (p.operator === '$in') {
				search = `/${search}/`;
				op = 'regex';
			} else if (p.operator === '$nin') {
				search = `/${search}/`;
				op = '$not_regex';
			} else if (p.operator === '$eq') {
				search = `/^${search}$/`;
				op = 'regex';
			} else if (p.operator === '$neq') {
				search = `/^${search}$/`;
				op = '$not_regex';
			} else if (p.operator === '$sw') {
				search = `/^${search}/`;
				op = 'regex';
			} else if (p.operator === '$nsw') {
				search = `/^${search}/`;
				op = '$not_regex';
			} else if (p.operator === '$ew') {
				search = `/${search}$/`;
				op = 'regex';
			} else if (p.operator === '$new') {
				search = `/${search}$/`;
				op = '$not_regex';
			} else {
				throw new InvalidOperatorForTypeArrayError(p.operator);
			}

			if (this.caseInsensitive)
				search += 'i';

			args[`${p.attr}__${op}`] = search;

			return;
		}

		if (p.operator === '$eq' && p.attr === '_id') {
			args._id__$eq = p.value;
			return;
		} else if (p.operator === '$neq' && p.attr === '_id') {
			args._id__$ne = p.value;
			return;
		} else if (p.attr === '_id') {
			throw new InvalidOperatorFor_idError(p.operator);
		}
		
		let regex = scape(p.value);
		let op;

		if (p.operator === '$eq') {
			search = p.value;
			op = '$eq';
		} else if (p.operator === '$neq') {
			search = p.value;
			op = '$ne';
		} else if (p.operator === '$gt') {
			search = p.value;
			op = '$gt';
		} else if (p.operator === '$lt') {
			search = p.value;
			op = '$lt';
		} else if (p.operator === '$gte') {
			search = p.value;
			op = '$gte';
		} else if (p.operator === '$lte') {
			search = p.value;
			op = '$lte';
		} else if (p.operator === '$in') {
			search = `/${regex}/${this.caseInsensitive ? 'i' : ''}`;
			op = 'regex';
		} else if (p.operator === '$nin') {
			search = `/${regex}/${this.caseInsensitive ? 'i' : ''}`;
			op = '$not_regex';
		} else if (p.operator === '$sw') {
			search = `/^${regex}/${this.caseInsensitive ? 'i' : ''}`;
			op = 'regex';
		} else if (p.operator === '$nsw') {
			search = `/^${regex}/${this.caseInsensitive ? 'i' : ''}`;
			op = '$not_regex';
		} else if (p.operator === '$ew') {
			search = `/${regex}$/${this.caseInsensitive ? 'i' : ''}`;
			op = 'regex';
		} else if (p.operator === '$new') {
			search = `/${regex}$/${this.caseInsensitive ? 'i' : ''}`;
			op = '$not_regex';
		} else {
			throw new InvalidOperatorForTypeArrayError(p.operator);
		}

		args[`${p.attr}__${op}`] = search;
	}

	__searchStringAttr (p, args) {
		let search;
		let op;

		if (p.operator === '$in') {
			search = `/${scape(p.value)}/`;
			op = 'regex';
		} else if (p.operator === '$nin') {
			search = `/${scape(p.value)}/`;
			op = '$not_regex';
		} else if (p.operator === '$eq') {
			search = `/^${scape(p.value)}$/`;
			op = 'regex';
		} else if (p.operator === '$neq') {
			search = `/^${scape(p.value)}$/`;
			op = '$not_regex';
		} else if (p.operator === '$sw') {
			search = `/^${scape(p.value)}/`;
			op = 'regex';
		} else if (p.operator === '$nsw') {
			search = `/^${scape(p.value)}/`;
			op = '$not_regex';
		} else if (p.operator === '$ew') {
			search = `/${scape(p.value)}$/`;
			op = 'regex';
		} else if (p.operator === '$new') {
			search = `/${scape(p.value)}$/`;
			op = '$not_regex';
		} else {
			throw new InvalidOperatorForTypeStringError(p.operator);
		}

		if (this.caseInsensitive)
			search += 'i';

		args[`${p.attr}__${op}`] = search;
	}

	__searchNumberAttr (p, args) {
		let search;
		let op;

		if (p.operator === '$eq') {
			search = p.value;
			op = '$eq';
		} else if (p.operator === '$neq') {
			search = p.value;
			op = '$ne';
		} else if (p.operator === '$gt') {
			search = p.value;
			op = '$gt';
		} else if (p.operator === '$lt') {
			search = p.value;
			op = '$lt';
		} else if (p.operator === '$gte') {
			search = p.value;
			op = '$gte';
		} else if (p.operator === '$lte') {
			search = p.value;
			op = '$lte';
		} else {
			throw new InvalidOperatorForTypeNumberError(p.operator);
		}

		args[`${p.attr}__${op}`] = search;
	}

	__searchDateAttr (p, args) {
		let search;
		let op;

		if (p.operator === '$eq') {
			search = p.value.toISOString();
			op = '$eq';
		} else if (p.operator === '$neq') {
			search = p.value.toISOString();
			op = '$ne';
		} else if (p.operator === '$gt') {
			search = p.value.toISOString();
			op = '$gt';
		} else if (p.operator === '$lt') {
			search = p.value.toISOString();
			op = '$lt';
		} else if (p.operator === '$gte') {
			search = p.value.toISOString();
			op = '$gte';
		} else if (p.operator === '$lte') {
			search = p.value.toISOString();
			op = '$lte';
		} else {
			throw new InvalidOperatorForTypeDateError(p.operator);
		}

		args[`${p.attr}__${op}`] = search;
	}

	__searchBooleanAttr (p, args) {
		let search;
		let op;

		if (p.value === true) {
			search = 1;
			op = '$eq';
		} else if (p.value === false) {
			search = 0;
			op = '$eq';
		} else {
			throw new InvalidValueForTypeBooleanError(p.value);
		}

		args[`${p.attr}__${op}`] = search;
	}
}
