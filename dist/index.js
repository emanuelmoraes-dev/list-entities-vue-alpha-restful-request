"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.InvalidOperatorForTypeDateError = exports.InvalidOperatorForTypeNumberError = exports.InvalidOperatorForTypeStringError = exports.InvalidOperatorForTypeArrayError = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.find");

require("regenerator-runtime/runtime");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("es6-promise/auto");

var _axios = _interopRequireDefault(require("axios"));

var _datetimeUtility = require("datetime-utility");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var InvalidOperatorForTypeArrayError =
/*#__PURE__*/
function (_Error) {
  _inherits(InvalidOperatorForTypeArrayError, _Error);

  function InvalidOperatorForTypeArrayError(operator, message) {
    var _this;

    _classCallCheck(this, InvalidOperatorForTypeArrayError);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InvalidOperatorForTypeArrayError).call(this, message || "invalid \"".concat(operator, "\" operator for type Array")));
    _this.operator = operator;
    return _this;
  }

  return InvalidOperatorForTypeArrayError;
}(_wrapNativeSuper(Error));

exports.InvalidOperatorForTypeArrayError = InvalidOperatorForTypeArrayError;

var InvalidOperatorForTypeStringError =
/*#__PURE__*/
function (_Error2) {
  _inherits(InvalidOperatorForTypeStringError, _Error2);

  function InvalidOperatorForTypeStringError(operator, message) {
    var _this2;

    _classCallCheck(this, InvalidOperatorForTypeStringError);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(InvalidOperatorForTypeStringError).call(this, message || "invalid \"".concat(operator, "\" operator for type String")));
    _this2.operator = operator;
    return _this2;
  }

  return InvalidOperatorForTypeStringError;
}(_wrapNativeSuper(Error));

exports.InvalidOperatorForTypeStringError = InvalidOperatorForTypeStringError;

var InvalidOperatorForTypeNumberError =
/*#__PURE__*/
function (_Error3) {
  _inherits(InvalidOperatorForTypeNumberError, _Error3);

  function InvalidOperatorForTypeNumberError(operator, message) {
    var _this3;

    _classCallCheck(this, InvalidOperatorForTypeNumberError);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(InvalidOperatorForTypeNumberError).call(this, message || "invalid \"".concat(operator, "\" operator for type Number")));
    _this3.operator = operator;
    return _this3;
  }

  return InvalidOperatorForTypeNumberError;
}(_wrapNativeSuper(Error));

exports.InvalidOperatorForTypeNumberError = InvalidOperatorForTypeNumberError;

var InvalidOperatorForTypeDateError =
/*#__PURE__*/
function (_Error4) {
  _inherits(InvalidOperatorForTypeDateError, _Error4);

  function InvalidOperatorForTypeDateError(operator, message) {
    var _this4;

    _classCallCheck(this, InvalidOperatorForTypeDateError);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(InvalidOperatorForTypeDateError).call(this, message || "invalid \"".concat(operator, "\" operator for type Date")));
    _this4.operator = operator;
    return _this4;
  }

  return InvalidOperatorForTypeDateError;
}(_wrapNativeSuper(Error));

exports.InvalidOperatorForTypeDateError = InvalidOperatorForTypeDateError;
var searchArrayAttr = Symbol('searchArrayAttr');
var searchStringAttr = Symbol('searchStringAttr');
var searchNumberAttr = Symbol('searchNumberAttr');
var searchDateAttr = Symbol('searchDateAttr');
var searchBooleanAttr = Symbol('searchBooleanAttr');

var Http =
/*#__PURE__*/
function () {
  function Http(urlBase, origin) {
    var resource = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '/';

    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref$request = _ref.request,
        request = _ref$request === void 0 ? _axios.default : _ref$request,
        _ref$authUrl = _ref.authUrl,
        authUrl = _ref$authUrl === void 0 ? 'auth' : _ref$authUrl,
        _ref$authUrlMethod = _ref.authUrlMethod,
        authUrlMethod = _ref$authUrlMethod === void 0 ? 'post' : _ref$authUrlMethod,
        _ref$headerRefreshTok = _ref.headerRefreshTokenName,
        headerRefreshTokenName = _ref$headerRefreshTok === void 0 ? 'x-refresh-token' : _ref$headerRefreshTok,
        _ref$responseRefreshT = _ref.responseRefreshTokenName,
        responseRefreshTokenName = _ref$responseRefreshT === void 0 ? 'refresh_token' : _ref$responseRefreshT,
        _ref$allowHeaders = _ref.allowHeaders,
        allowHeaders = _ref$allowHeaders === void 0 ? 'Origin, X-Requested-With, Content-Type, Accept' : _ref$allowHeaders,
        _ref$allowMethods = _ref.allowMethods,
        allowMethods = _ref$allowMethods === void 0 ? 'GET,PUT,PATCH,POST,DELETE,OPTIONS' : _ref$allowMethods,
        _ref$allowCredentials = _ref.allowCredentials,
        allowCredentials = _ref$allowCredentials === void 0 ? 'true' : _ref$allowCredentials;

    _classCallCheck(this, Http);

    this.urlBase = urlBase;
    this.origin = origin;
    this.request = request;
    this.authUrl = authUrl;
    this.authUrlMethod = authUrlMethod;
    this.headerRefreshTokenName = headerRefreshTokenName;
    this.responseRefreshTokenName = responseRefreshTokenName;
    this.allowHeaders = allowHeaders;
    this.allowMethods = allowMethods;
    this.allowCredentials = allowCredentials;
    if (resource && resource[0] !== '/') resource = "/".concat(resource);
    this.resource = resource;
    this.parseRequestListEntities = this.parseRequestListEntities.bind(this);
  }

  _createClass(Http, [{
    key: "url",
    value: function url() {
      var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
      if (!route) route = '';
      if (route && route[0] !== '/') route = "/".concat(route);
      return "".concat(this.urlBase).concat(route);
    }
  }, {
    key: "uri",
    value: function uri() {
      var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
      if (!route) route = '';
      if (route && route[0] !== '/') route = "/".concat(route);
      return "".concat(this.urlBase).concat(this.resource !== '/' ? this.resource : '').concat(route);
    }
  }, {
    key: "getHeaders",
    value: function () {
      var _getHeaders = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _ref2, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.request[this.authUrlMethod](this.url(this.authUrl), {}, {
                  headers: this.__headersBase
                });

              case 2:
                _ref2 = _context.sent;
                data = _ref2.data;
                return _context.abrupt("return", _objectSpread({}, this.__headersBase, _defineProperty({}, this.headerRefreshTokenName, data[this.responseRefreshTokenName])));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getHeaders() {
        return _getHeaders.apply(this, arguments);
      }

      return getHeaders;
    }()
  }, {
    key: "requestGet",
    value: function () {
      var _requestGet = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(url) {
        var options,
            headers,
            _ref3,
            data,
            _args2 = arguments;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};

                if (_typeof(url) === 'object') {
                  options = url;
                  url = null;
                }

                _context2.next = 4;
                return this.getHeaders();

              case 4:
                headers = _context2.sent;
                _context2.next = 7;
                return this.request.get(this.uri(url), _objectSpread({
                  headers: headers
                }, options));

              case 7:
                _ref3 = _context2.sent;
                data = _ref3.data;
                return _context2.abrupt("return", data);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function requestGet(_x) {
        return _requestGet.apply(this, arguments);
      }

      return requestGet;
    }()
  }, {
    key: "requestPost",
    value: function () {
      var _requestPost = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(url, body) {
        var options,
            headers,
            _ref4,
            data,
            _args3 = arguments;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                options = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};

                if (_typeof(url) === 'object') {
                  options = url;
                  url = null;
                }

                _context3.next = 4;
                return this.getHeaders();

              case 4:
                headers = _context3.sent;
                _context3.next = 7;
                return this.request.post(this.uri(url), body, _objectSpread({
                  headers: headers
                }, options));

              case 7:
                _ref4 = _context3.sent;
                data = _ref4.data;
                return _context3.abrupt("return", data);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function requestPost(_x2, _x3) {
        return _requestPost.apply(this, arguments);
      }

      return requestPost;
    }()
  }, {
    key: "requestPut",
    value: function () {
      var _requestPut = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(url, body) {
        var options,
            headers,
            _ref5,
            data,
            _args4 = arguments;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                options = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};

                if (_typeof(url) === 'object') {
                  options = url;
                  url = null;
                }

                _context4.next = 4;
                return this.getHeaders();

              case 4:
                headers = _context4.sent;
                _context4.next = 7;
                return this.request.put(this.uri(url), body, _objectSpread({
                  headers: headers
                }, options));

              case 7:
                _ref5 = _context4.sent;
                data = _ref5.data;
                return _context4.abrupt("return", data);

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function requestPut(_x4, _x5) {
        return _requestPut.apply(this, arguments);
      }

      return requestPut;
    }()
  }, {
    key: "requestPatch",
    value: function () {
      var _requestPatch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(url, body) {
        var options,
            headers,
            _ref6,
            data,
            _args5 = arguments;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                options = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};

                if (_typeof(url) === 'object') {
                  options = url;
                  url = null;
                }

                _context5.next = 4;
                return this.getHeaders();

              case 4:
                headers = _context5.sent;
                _context5.next = 7;
                return this.request.patch(this.uri(url), body, _objectSpread({
                  headers: headers
                }, options));

              case 7:
                _ref6 = _context5.sent;
                data = _ref6.data;
                return _context5.abrupt("return", data);

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function requestPatch(_x6, _x7) {
        return _requestPatch.apply(this, arguments);
      }

      return requestPatch;
    }()
  }, {
    key: "requestDelete",
    value: function () {
      var _requestDelete = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(url) {
        var options,
            headers,
            _ref7,
            data,
            _args6 = arguments;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};

                if (_typeof(url) === 'object') {
                  options = url;
                  url = null;
                }

                _context6.next = 4;
                return this.getHeaders();

              case 4:
                headers = _context6.sent;
                _context6.next = 7;
                return this.request.delete(this.uri(url), _objectSpread({
                  headers: headers
                }, options));

              case 7:
                _ref7 = _context6.sent;
                data = _ref7.data;
                return _context6.abrupt("return", data);

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function requestDelete(_x8) {
        return _requestDelete.apply(this, arguments);
      }

      return requestDelete;
    }()
  }, {
    key: "findAll",
    value: function () {
      var _findAll = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.requestGet();

              case 2:
                return _context7.abrupt("return", _context7.sent);

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function findAll() {
        return _findAll.apply(this, arguments);
      }

      return findAll;
    }()
  }, {
    key: "find",
    value: function () {
      var _find = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(page, pageSize, sort) {
        var skip;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (sort && sort[0] === '+') sort = sort.substring(1);
                skip = (page - 1) * pageSize;
                _context8.next = 4;
                return this.requestGet({
                  params: {
                    skip: skip,
                    limit: pageSize,
                    sort: sort
                  }
                });

              case 4:
                return _context8.abrupt("return", _context8.sent);

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function find(_x9, _x10, _x11) {
        return _find.apply(this, arguments);
      }

      return find;
    }()
  }, {
    key: "findCount",
    value: function () {
      var _findCount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9() {
        var _ref8, count;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.requestGet({
                  params: {
                    selectCount: 'true'
                  }
                });

              case 2:
                _ref8 = _context9.sent;
                count = _ref8.count;
                return _context9.abrupt("return", count);

              case 5:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function findCount() {
        return _findCount.apply(this, arguments);
      }

      return findCount;
    }()
  }, {
    key: "save",
    value: function () {
      var _save = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(body) {
        var options,
            _args10 = arguments;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                options = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : {};
                _context10.next = 3;
                return this.requestPost(_objectSpread({}, options), body);

              case 3:
                return _context10.abrupt("return", _context10.sent);

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function save(_x12) {
        return _save.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: "edit",
    value: function () {
      var _edit = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11(body) {
        var options,
            _args11 = arguments;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                options = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : {};
                _context11.next = 3;
                return this.requestPatch(body.id, body, _objectSpread({}, options));

              case 3:
                return _context11.abrupt("return", _context11.sent);

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function edit(_x13) {
        return _edit.apply(this, arguments);
      }

      return edit;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee12(id) {
        var options,
            _args12 = arguments;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                options = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : {};
                _context12.next = 3;
                return this.requestDelete(id, _objectSpread({}, options));

              case 3:
                return _context12.abrupt("return", _context12.sent);

              case 4:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function _delete(_x14) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "findOne",
    value: function () {
      var _findOne = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee13(id) {
        var options,
            _args13 = arguments;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                options = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : {};
                _context13.next = 3;
                return this.requestGet(id, _objectSpread({}, options));

              case 3:
                return _context13.abrupt("return", _context13.sent);

              case 4:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function findOne(_x15) {
        return _findOne.apply(this, arguments);
      }

      return findOne;
    }()
  }, {
    key: "parseRequestListEntities",
    value: function parseRequestListEntities(caseInsensitive) {
      var searchAll = this.searchAll.bind(this);
      var searchAttr = this.searchAttr.bind(this, caseInsensitive);
      var rt = {
        searchAll: searchAll,
        searchAttr: searchAttr
      };
      if (this.searchDefault) rt.searchDefault = this.searchDefault.bind(this, caseInsensitive);
      return rt;
    }
  }, {
    key: "searchAll",
    value: function () {
      var _searchAll = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee14(page, pageSize, sort) {
        var entities, count;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                if (sort && sort[0] === '+') sort = sort.substring(1);
                _context14.next = 3;
                return this.find(page, pageSize, sort);

              case 3:
                entities = _context14.sent;
                _context14.next = 6;
                return this.findCount();

              case 6:
                count = _context14.sent;
                return _context14.abrupt("return", {
                  count: count,
                  entities: entities
                });

              case 8:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function searchAll(_x16, _x17, _x18) {
        return _searchAll.apply(this, arguments);
      }

      return searchAll;
    }()
  }, {
    key: "searchAttr",
    value: function () {
      var _searchAttr = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee15(caseInsensitive, page, pageSize, sort, inputSearch, params) {
        var skip, args, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, p, entities, _ref9, count;

        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                if (sort && sort[0] === '+') sort = sort.substring(1);
                skip = (page - 1) * pageSize;
                args = {};
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context15.prev = 6;

                for (_iterator = params[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  p = _step.value;
                  if (p.descriptor.array) this[searchArrayAttr](p, args, caseInsensitive);else if (p.descriptor.type === String) this[searchStringAttr](p, args, caseInsensitive);else if (p.descriptor.type === Number) this[searchNumberAttr](p, args);else if (p.descriptor.type === Date) this[searchDateAttr](p, args);else if (p.descriptor.type === Boolean) this[searchBooleanAttr](p, args);
                }

                _context15.next = 14;
                break;

              case 10:
                _context15.prev = 10;
                _context15.t0 = _context15["catch"](6);
                _didIteratorError = true;
                _iteratorError = _context15.t0;

              case 14:
                _context15.prev = 14;
                _context15.prev = 15;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 17:
                _context15.prev = 17;

                if (!_didIteratorError) {
                  _context15.next = 20;
                  break;
                }

                throw _iteratorError;

              case 20:
                return _context15.finish(17);

              case 21:
                return _context15.finish(14);

              case 22:
                _context15.next = 24;
                return this.requestGet({
                  params: _objectSpread({}, args, {
                    skip: skip,
                    limit: pageSize,
                    sort: sort
                  })
                });

              case 24:
                entities = _context15.sent;
                _context15.next = 27;
                return this.requestGet({
                  params: _objectSpread({}, args, {
                    selectCount: 'true'
                  })
                });

              case 27:
                _ref9 = _context15.sent;
                count = _ref9.count;
                return _context15.abrupt("return", {
                  count: count,
                  entities: entities
                });

              case 30:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this, [[6, 10, 14, 22], [15,, 17, 21]]);
      }));

      function searchAttr(_x19, _x20, _x21, _x22, _x23, _x24) {
        return _searchAttr.apply(this, arguments);
      }

      return searchAttr;
    }()
  }, {
    key: searchArrayAttr,
    value: function value(p, args, caseInsensitive) {
      var search;

      if (p.descriptor.searchSep) {
        search = p.value.split(descriptor.searchSep);
        search = search.map(_datetimeUtility.scape).join('|');
        if (p.operator === 'contains') search = "/".concat(search, "/");else if (p.operator === 'equals') search = "/^".concat(search, "$/");else if (p.operator === 'startsWith') search = "/^".concat(search, "/");else if (p.operator === 'endsWith') search = "/".concat(search, "$/");else throw new InvalidOperatorForTypeArrayError(p.operator);
        if (caseInsensitive) search += 'i';
        args["".concat(p.attr || attr, "__regex")] = search;
        return;
      }

      regex = (0, _datetimeUtility.scape)(p.value);
      if (p.operator === 'equals') args["".concat(p.attr || attr, "__eq")] = p.value;else if (p.operator === 'greaterThan') args["".concat(p.attr || attr, "__$gt")] = p.value;else if (p.operator === 'lessThan') args["".concat(p.attr || attr, "__$lt")] = p.value;else if (p.operator === 'greaterOrEqualThan') args["".concat(p.attr || attr, "__$gte")] = p.value;else if (p.operator === 'lessOrEqualThan') args["".concat(p.attr || attr, "__$lte")] = p.value;else if (p.operator === 'contains') args["".concat(p.attr || attr, "__regex")] = "/".concat(regex, "/");else if (p.operator === 'equals') args["".concat(p.attr || attr, "__regex")] = "/^".concat(regex, "$/");else if (p.operator === 'startsWith') args["".concat(p.attr || attr, "__regex")] = "/^".concat(regex, "/");else if (p.operator === 'endsWith') args["".concat(p.attr || attr, "__regex")] = "/".concat(regex, "$/");else throw new InvalidOperatorForTypeArrayError(p.operator);
    }
  }, {
    key: searchStringAttr,
    value: function value(p, args, caseInsensitive) {
      if (p.operator === 'contains') p.value = "/".concat((0, _datetimeUtility.scape)(p.value), "/");else if (p.operator === 'equals') p.value = "/^".concat((0, _datetimeUtility.scape)(p.value), "$/");else if (p.operator === 'startsWith') p.value = "/^".concat((0, _datetimeUtility.scape)(p.value), "/");else if (p.operator === 'endsWith') p.value = "/".concat((0, _datetimeUtility.scape)(p.value), "$/");else throw new InvalidOperatorForTypeStringError(p.operator);
      if (caseInsensitive) p.value += 'i';
      args["".concat(p.attr || attr, "__regex")] = p.value;
    }
  }, {
    key: searchNumberAttr,
    value: function value(p, args) {
      var op;
      if (p.operator === 'equals') op = '$eq';else if (p.operator === 'greaterThan') op = '$gt';else if (p.operator === 'lessThan') op = '$lt';else if (p.operator === 'greaterOrEqualThan') op = '$gte';else if (p.operator === 'lessOrEqualThan') op = '$lte';else throw new InvalidOperatorForTypeNumberError(p.operator);
      args["".concat(p.attr || attr, "__").concat(op)] = p.value;
    }
  }, {
    key: searchDateAttr,
    value: function value(p, args) {
      var op;
      if (p.operator === 'equals') op = '$eq';else if (p.operator === 'greaterThan') op = '$gt';else if (p.operator === 'lessThan') op = '$lt';else if (p.operator === 'greaterOrEqualThan') op = '$gte';else if (p.operator === 'lessOrEqualThan') op = '$lte';
      args["".concat(p.attr || attr, "__").concat(op)] = p.value.toISOString();
    }
  }, {
    key: searchBooleanAttr,
    value: function value(p, args) {
      if (p.value === true) p.value = 1;else if (p.value === false) p.value = 0;
      args["".concat(p.attr || attr, "__$eq")] = p.value;
    }
  }, {
    key: "__headersBase",
    get: function get() {
      return {
        'Access-Control-Allow-Origin': this.origin,
        'Access-Control-Allow-Headers': this.allowHeaders,
        'Access-Control-Allow-Methods': this.allowMethods,
        'Access-Control-Allow-Credentials': this.allowCredentials
      };
    }
  }]);

  return Http;
}();

exports.default = Http;