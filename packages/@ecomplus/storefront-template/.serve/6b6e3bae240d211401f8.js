(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "../../../node_modules/@ecomplus/passport-client/node_modules/eventemitter3/index.js":
/*!*********************************************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/@ecomplus/passport-client/node_modules/eventemitter3/index.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ "../../../node_modules/@ecomplus/passport-client/src/constructor.js":
/*!****************************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/@ecomplus/passport-client/src/constructor.js ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "../../../node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ "../../../node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ "../../../node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "../../../node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "../../../node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "../../../node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "../../../node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ecomplus_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ecomplus/utils */ "../../../node_modules/@ecomplus/utils/src/index.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! eventemitter3 */ "../../../node_modules/@ecomplus/passport-client/node_modules/eventemitter3/index.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _methods_load_stored_session__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./methods/load-stored-session */ "../../../node_modules/@ecomplus/passport-client/src/methods/load-stored-session.js");
/* harmony import */ var _methods_set_session__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./methods/set-session */ "../../../node_modules/@ecomplus/passport-client/src/methods/set-session.js");
/* harmony import */ var _methods_set_customer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./methods/set-customer */ "../../../node_modules/@ecomplus/passport-client/src/methods/set-customer.js");
/* harmony import */ var _methods_get_customer_name__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./methods/get-customer-name */ "../../../node_modules/@ecomplus/passport-client/src/methods/get-customer-name.js");
/* harmony import */ var _methods_get_customer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./methods/get-customer */ "../../../node_modules/@ecomplus/passport-client/src/methods/get-customer.js");
/* harmony import */ var _methods_fetch_oauth_profile__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./methods/fetch-oauth-profile */ "../../../node_modules/@ecomplus/passport-client/src/methods/fetch-oauth-profile.js");
/* harmony import */ var _methods_fetch_oauth_providers__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./methods/fetch-oauth-providers */ "../../../node_modules/@ecomplus/passport-client/src/methods/fetch-oauth-providers.js");
/* harmony import */ var _methods_fetch_login__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./methods/fetch-login */ "../../../node_modules/@ecomplus/passport-client/src/methods/fetch-login.js");
/* harmony import */ var _methods_fetch_orders_list__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./methods/fetch-orders-list */ "../../../node_modules/@ecomplus/passport-client/src/methods/fetch-orders-list.js");
/* harmony import */ var _methods_fetch_order__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./methods/fetch-order */ "../../../node_modules/@ecomplus/passport-client/src/methods/fetch-order.js");
/* harmony import */ var _methods_check_login__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./methods/check-login */ "../../../node_modules/@ecomplus/passport-client/src/methods/check-login.js");
/* harmony import */ var _methods_check_authorization__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./methods/check-authorization */ "../../../node_modules/@ecomplus/passport-client/src/methods/check-authorization.js");
/* harmony import */ var _methods_check_verification__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./methods/check-verification */ "../../../node_modules/@ecomplus/passport-client/src/methods/check-verification.js");
/* harmony import */ var _methods_logout__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./methods/logout */ "../../../node_modules/@ecomplus/passport-client/src/methods/logout.js");
/* harmony import */ var _methods_popup_oauth_link__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./methods/popup-oauth-link */ "../../../node_modules/@ecomplus/passport-client/src/methods/popup-oauth-link.js");
/* harmony import */ var _methods_popup_login__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./methods/popup-login */ "../../../node_modules/@ecomplus/passport-client/src/methods/popup-login.js");
/* harmony import */ var _methods_request_api__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./methods/request-api */ "../../../node_modules/@ecomplus/passport-client/src/methods/request-api.js");









function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }




















/**
 * Construct a new customer account instance object.
 * @constructor
 * @param {number} [storeId=$ecomConfig.get('store_id')] - Preset Store ID number
 * @param {string} [lang=$ecomConfig.get('lang')] - Snake case language code
 * @param {string|null} [storageKey] - Item key to persist account data
 * @param {object} [localStorage=window.localStorage] -
 * [Local Storage interface]{@link https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage}
 * @param {object} [document=window.document] - Object reference to
 * [document]{@link https://developer.mozilla.org/en-US/docs/Web/API/Window/document}
 *
 * @example

// Default instance
const ecomPassport = new EcomPassport()

 * @example

// Optionally defining Store ID, lang and custom storage key
const storeId = 2000
const lang = 'en_us'
const storageKey = 'myPassportKey'
const customEcomPassport = new EcomPassport(storeId, lang, storageKey)

 */

var EcomPassport = function EcomPassport(storeId, lang) {
  var storageKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'ecomPassportClient';
  var localStorage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window.localStorage;
  var document = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window.document;
  var ecomPassport = this;
  /**
   * Construct a new account instance object.
   * @memberof EcomPassport
   * @type {function}
   * @see EcomPassport
   */

  ecomPassport.Constructor = EcomPassport;
  /**
   * Respective Store ID number.
   * @memberof EcomPassport
   * @type {number}
   */

  ecomPassport.storeId = storeId || _ecomplus_utils__WEBPACK_IMPORTED_MODULE_8__["$ecomConfig"].get('store_id');
  /**
   * Instance language code.
   * @memberof EcomPassport
   * @type {string}
   */

  ecomPassport.lang = lang || _ecomplus_utils__WEBPACK_IMPORTED_MODULE_8__["$ecomConfig"].get('lang');
  /**
   * Item key to persist JSON {@link EcomPassport#customer}
   * with [localStorage]{@link EcomPassport#localStorage}
   * and cookie name to persist {@link EcomPassport#session}.
   * @memberof EcomPassport
   * @type {string|null}
   */

  ecomPassport.storageKey = storageKey;
  /**
   * [Storage interface]{@link https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage}.
   * @memberof EcomPassport
   * @type {object}
   */

  ecomPassport.localStorage = localStorage;
  /**
   * [Window document]{@link https://developer.mozilla.org/en-US/docs/Web/API/Window/document}.
   * @memberof EcomPassport
   * @type {object}
   */

  ecomPassport.document = document;
  /**
   * Customer account data following
   * {@link https://developers.e-com.plus/docs/api/#/store/customers E-Com Plus customer object model}.
   * @memberof EcomPassport
   * @type {object}
   */

  ecomPassport.customer = {};
  /**
   * Passport authentication session object.
   * @memberof EcomPassport
   * @type {object}
   */

  ecomPassport.session = {};
  /**
   * Passport random 32 chars session ID.
   * @memberof EcomPassport
   * @type {object}
   */

  ecomPassport.sessionId = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < 32; i++) {
    ecomPassport.sessionId += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  var emitter = new eventemitter3__WEBPACK_IMPORTED_MODULE_9__();
  ['on', 'off', 'once'].forEach(function (method) {
    ecomPassport[method] = function (ev, fn) {
      emitter[method](ev, fn);
    };
  });

  var methodsMiddleware = function methodsMiddleware(method) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var emitChange = arguments.length > 2 ? arguments[2] : undefined;
    var result = method(ecomPassport, emitter, args);

    if (result && emitChange) {
      var customer = ecomPassport.customer;
      /**
       * @event EcomPassport#change
       * @type {object}
       * @property {object} customer - Customer account data
       * @example ecomCart.on('change', ({ customer }) => { console.log(customer._id) })
       */

      emitter.emit('change', {
        customer: customer
      });
    }

    return result;
  };

  this.loadStoredSession = function () {
    return methodsMiddleware(_methods_load_stored_session__WEBPACK_IMPORTED_MODULE_10__["default"], [], true);
  };

  this.logout = function (canSave) {
    return methodsMiddleware(_methods_logout__WEBPACK_IMPORTED_MODULE_23__["default"], [canSave], true);
  };

  this.setSession = function (session, canSave) {
    return methodsMiddleware(_methods_set_session__WEBPACK_IMPORTED_MODULE_11__["default"], [session, canSave], true);
  };

  this.setCustomer = function (customer, canSave) {
    return methodsMiddleware(_methods_set_customer__WEBPACK_IMPORTED_MODULE_12__["default"], [customer, canSave], true);
  };

  this.getCustomerName = function () {
    return methodsMiddleware(_methods_get_customer_name__WEBPACK_IMPORTED_MODULE_13__["default"]);
  };

  this.getCustomer = function () {
    return methodsMiddleware(_methods_get_customer__WEBPACK_IMPORTED_MODULE_14__["default"]);
  };

  this.checkLogin = function () {
    return methodsMiddleware(_methods_check_login__WEBPACK_IMPORTED_MODULE_20__["default"]);
  };

  this.checkAuthorization = function () {
    return methodsMiddleware(_methods_check_authorization__WEBPACK_IMPORTED_MODULE_21__["default"]);
  };

  this.checkVerification = function () {
    return methodsMiddleware(_methods_check_verification__WEBPACK_IMPORTED_MODULE_22__["default"]);
  };

  this.fetchLogin = function (email, docNumber) {
    return methodsMiddleware(_methods_fetch_login__WEBPACK_IMPORTED_MODULE_17__["default"], [email, docNumber]);
  };

  this.fetchOauthProfile = function () {
    return methodsMiddleware(_methods_fetch_oauth_profile__WEBPACK_IMPORTED_MODULE_15__["default"]);
  };

  this.fetchOauthProviders = function () {
    return methodsMiddleware(_methods_fetch_oauth_providers__WEBPACK_IMPORTED_MODULE_16__["default"]);
  };

  this.fetchOrdersList = function (from, size) {
    return methodsMiddleware(_methods_fetch_orders_list__WEBPACK_IMPORTED_MODULE_18__["default"], [from, size]);
  };

  this.fetchOrder = function (orderId) {
    return methodsMiddleware(_methods_fetch_order__WEBPACK_IMPORTED_MODULE_19__["default"], [orderId]);
  };

  this.requestApi = function (url, method, data) {
    return methodsMiddleware(_methods_request_api__WEBPACK_IMPORTED_MODULE_26__["default"], [url, method, data]);
  };

  this.popupOauthLink = function (url) {
    return methodsMiddleware(_methods_popup_oauth_link__WEBPACK_IMPORTED_MODULE_24__["default"], [url]);
  };

  this.popupLogin = function (enableSkip, baseUri) {
    return methodsMiddleware(_methods_popup_login__WEBPACK_IMPORTED_MODULE_25__["default"], [enableSkip, baseUri]);
  };

  Object(_methods_load_stored_session__WEBPACK_IMPORTED_MODULE_10__["default"])(ecomPassport);
};

/* harmony default export */ __webpack_exports__["default"] = (EcomPassport);

/***/ }),

/***/ "../../../node_modules/@ecomplus/passport-client/src/index.js":
/*!**********************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/@ecomplus/passport-client/src/index.js ***!
  \**********************************************************************************************/
/*! exports provided: default, ecomPassport, EcomPassport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ecomPassport", function() { return ecomPassport; });
/* harmony import */ var _constructor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constructor */ "../../../node_modules/@ecomplus/passport-client/src/constructor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EcomPassport", function() { return _constructor__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/*!
 * @ecomplus/passport-client
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */

/**
 * Handle customer authentication with E-Com Plus Passport.
 * {@link https://github.com/ecomclub/ecomplus-passport-client GitHub}
 *
 * @module @ecomplus/passport-client
 * @author E-Com Club <ti@e-com.club>
 * @return {@link ecomPassport}
 * @see ecomPassport
 *
 * @example
 * // ES import default
 * import ecomPassport from '@ecomplus/passport-client'
 *
 * @example
 * // Optional named ES import for default instance and constructor
 * import { ecomPassport, EcomPassport } from '@ecomplus/passport-client'
 *
 * @example
 * // With CommonJS
 * const ecomPassport = require('@ecomplus/passport-client')
 *
 * @example
 * <!-- Global `ecomPassport` from CDN on browser -->
 * <script src="https://cdn.jsdelivr.net/npm/@ecomplus/passport-client/dist/ecom-passport.var.min.js"></script>
 *
 * @example
 * <!-- Bundle from CDN with `ecomUtils`, `ecomClient` and `EventEmitter3` -->
 * <script src="https://cdn.jsdelivr.net/npm/@ecomplus/passport-client/dist/ecom-passport.bundle.min.js"></script>
 */

/**
 * Default `EcomPassport` instance.
 * @global
 * @type EcomPassport
 */

var ecomPassport = new _constructor__WEBPACK_IMPORTED_MODULE_0__["default"]();
/* harmony default export */ __webpack_exports__["default"] = (ecomPassport);


/***/ }),

/***/ "../../../node_modules/@ecomplus/passport-client/src/lib/create-iframe.js":
/*!**********************************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/@ecomplus/passport-client/src/lib/create-iframe.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "../../../node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ "../../../node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ "../../../node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "../../../node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "../../../node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "../../../node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_6__);








function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* harmony default export */ __webpack_exports__["default"] = (function (url) {
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== 'object') {
    throw new Error('Method available for browser only');
  } // create hidden iframe and append to body


  var iframe = document.createElement('iframe');
  iframe.setAttribute('src', url);
  iframe.setAttribute('style', 'width:0;height:0;border:0;border:none;');
  document.body.appendChild(iframe);
});

/***/ }),

/***/ "../../../node_modules/@ecomplus/passport-client/src/lib/create-popup.js":
/*!*********************************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/@ecomplus/passport-client/src/lib/create-popup.js ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "../../../node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ "../../../node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ "../../../node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "../../../node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "../../../node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "../../../node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_6__);








function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* harmony default export */ __webpack_exports__["default"] = (function (url) {
  var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Login';

  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== 'object') {
    throw new Error('Method available for browser only');
  }

  var _window = window,
      screen = _window.screen;
  var width;

  if (screen) {
    // set window width based on screen width
    if (screen.width >= 640) {
      width = 640;
    } else {
      width = screen.width;
    }
  } else {
    width = 380;
  } // open new browser window


  return window.open(url, title, "height=500,width=".concat(width));
});

/***/ }),

/***/ "../../../node_modules/@ecomplus/passport-client/src/lib/get-cookie.js":
/*!*******************************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/@ecomplus/passport-client/src/lib/get-cookie.js ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.index-of */ "../../../node_modules/core-js/modules/es.array.index-of.js");
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ "../../../node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.split */ "../../../node_modules/core-js/modules/es.string.split.js");
/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = (function (document, cname) {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '';
});

/***/ }),

/***/ "../../../node_modules/@ecomplus/passport-client/src/lib/set-cookie.js":
/*!*******************************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/@ecomplus/passport-client/src/lib/set-cookie.js ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (document, cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
});

/***/ }),

/***/ "../../../node_modules/@ecomplus/passport-client/src/methods/check-authorization.js":
/*!********************************************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/@ecomplus/passport-client/src/methods/check-authorization.js ***!
  \********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @method
 * @name EcomPassport#checkAuthorization
 * @description Check session auth level (does not validate token).
 *
 * @returns {boolean}
 *
 * @example

ecomPassport.checkAuthorization()

 */
/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var session = _ref.session,
      checkLogin = _ref.checkLogin;
  return Boolean(checkLogin() && session.auth && session.auth.level >= 2);
});

/***/ }),

/***/ "../../../node_modules/@ecomplus/passport-client/src/methods/check-login.js":
/*!************************************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/@ecomplus/passport-client/src/methods/check-login.js ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @method
 * @name EcomPassport#checkLogin
 * @description Check if customer is identified (does not validate authentication).
 *
 * @returns {boolean}
 *
 * @example

ecomPassport.checkLogin()

 */
/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var getCustomerName = _ref.getCustomerName;
  return Boolean(getCustomerName());
});

/***/ }),

/***/ "../../../node_modules/@ecomplus/passport-client/src/methods/check-verification.js":
/*!*******************************************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/@ecomplus/passport-client/src/methods/check-verification.js ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @method
 * @name EcomPassport#checkVerification
 * @description Check session biggest auth level (does not validate token).
 *
 * @returns {boolean}
 *
 * @example

ecomPassport.checkVerification()

 */
/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var session = _ref.session,
      checkAuthorization = _ref.checkAuthorization;
  return Boolean(checkAuthorization() && session.auth.level >= 3);
});

/***/ }),

/***/ "../../../node_modules/@ecomplus/passport-client/src/methods/fetch-login.js":
/*!************************************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/@ecomplus/passport-client/src/methods/fetch-login.js ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "../../../node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ "../../../node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ "../../../node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "../../../node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "../../../node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ "../../../node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "../../../node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ecomplus_client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ecomplus/client */ "../../../node_modules/@ecomplus/client/src/index.js");









function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


/**
 * @method
 * @name EcomPassport#fetchLogin
 * @description Try to identify/login user with email and doc number.
 *
 * @param {string} email - Customer main email address
 * @param {string} [docNumber] - Customer document number
 *
 * @returns {Promise<session|error>}
 *
 * @example

ecomPassport.fetchLogin('example@mail.com', '1234567890')

 */

/* harmony default export */ __webpack_exports__["default"] = (function (_ref, emitter, _ref2) {
  var storeId = _ref.storeId,
      setSession = _ref.setSession;

  var _ref3 = _slicedToArray(_ref2, 2),
      email = _ref3[0],
      _ref3$ = _ref3[1],
      docNumber = _ref3$ === void 0 ? null : _ref3$;

  return Object(_ecomplus_client__WEBPACK_IMPORTED_MODULE_8__["passport"])({
    url: '/identify.json',
    storeId: storeId,
    method: 'POST',
    data: {
      email: email,
      doc_number: docNumber
    }
  }).then(function (_ref4) {
    var data = _ref4.data;
    setSession(data);
    return data;
  });
});

/***/ }),

/***/ "../../../node_modules/@ecomplus/passport-client/src/methods/fetch-oauth-profile.js":
/*!********************************************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/@ecomplus/passport-client/src/methods/fetch-oauth-profile.js ***!
  \********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ecomplus_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ecomplus/client */ "../../../node_modules/@ecomplus/client/src/index.js");

/**
 * @method
 * @name EcomPassport#fetchOauthProfile
 * @description Try get session and account data after social login.
 *
 * @returns {Promise<session|error>}
 *
 * @example

ecomPassport.fetchOauthProfile().then(() => {
  console.log(ecomPassport.checkVerification() === true)
})

 */

/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var storeId = _ref.storeId,
      sessionId = _ref.sessionId,
      setSession = _ref.setSession;
  return Object(_ecomplus_client__WEBPACK_IMPORTED_MODULE_0__["passport"])({
    url: "".concat(sessionId, "/token.json"),
    storeId: storeId
  }).then(function (_ref2) {
    var data = _ref2.data;
    setSession(data);
    return data;
  });
});

/***/ }),

/***/ "../../../node_modules/@ecomplus/passport-client/src/methods/fetch-oauth-providers.js":
/*!**********************************************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/@ecomplus/passport-client/src/methods/fetch-oauth-providers.js ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "../../../node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ "../../../node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ "../../../node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "../../../node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "../../../node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ "../../../node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "../../../node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ecomplus_client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ecomplus/client */ "../../../node_modules/@ecomplus/client/src/index.js");
/* harmony import */ var _lib_create_iframe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../lib/create-iframe */ "../../../node_modules/@ecomplus/passport-client/src/lib/create-iframe.js");









function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



/**
 * @method
 * @name EcomPassport#fetchOauthProviders
 * @description Fetch Passport API to list OAuth providers and start social login flux.
 *
 * @param {boolean} [canAppendIframe=true] - Whether iframe should be appended to body
 * to start oauth flux
 *
 * @returns {Promise<data|error>}
 *
 * @example

ecomPassport.fetchOauthProviders()

 */

/* harmony default export */ __webpack_exports__["default"] = (function (_ref, emitter, _ref2) {
  var storeId = _ref.storeId,
      sessionId = _ref.sessionId;

  var _ref3 = _slicedToArray(_ref2, 1),
      _ref3$ = _ref3[0],
      canAppendIframe = _ref3$ === void 0 ? true : _ref3$;

  return Object(_ecomplus_client__WEBPACK_IMPORTED_MODULE_8__["passport"])({
    url: "".concat(sessionId, "/oauth-providers.json"),
    storeId: storeId
  }).then(function (_ref4) {
    var data = _ref4.data;

    if (canAppendIframe) {
      var iframeUri = data.iframeUri;
      Object(_lib_create_iframe__WEBPACK_IMPORTED_MODULE_9__["default"])(iframeUri);
    }

    return data;
  });
});

/***/ }),

/***/ "../../../node_modules/@ecomplus/passport-client/src/methods/fetch-order.js":
/*!************************************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/@ecomplus/passport-client/src/methods/fetch-order.js ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "../../../node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ "../../../node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ "../../../node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "../../../node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "../../../node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ "../../../node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "../../../node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ecomplus_client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ecomplus/client */ "../../../node_modules/@ecomplus/client/src/index.js");









function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


/**
 * @method
 * @name EcomPassport#fetchOrder
 * @description Fetch order by ID from Passport API (if authorized) or Store API (public).
 *
 * @param {string} orderId - Object ID (`_id`) of the order to be fetched
 *
 * @returns {Promise<data|error>}
 *
 * @example

ecomPassport.fetchOrder(orderId).then(order => {
  console.log(order._id)
})

 */

/* harmony default export */ __webpack_exports__["default"] = (function (_ref, emitter, _ref2) {
  var storeId = _ref.storeId,
      checkAuthorization = _ref.checkAuthorization,
      requestApi = _ref.requestApi;

  var _ref3 = _slicedToArray(_ref2, 1),
      orderId = _ref3[0];

  var url = "/api/orders/".concat(orderId, ".json");
  var req;

  if (checkAuthorization()) {
    req = requestApi(url);
  } else {
    req = Object(_ecomplus_client__WEBPACK_IMPORTED_MODULE_8__["store"])({
      url: url,
      storeId: storeId
    });
  }

  return req.then(function (_ref4) {
    var data = _ref4.data;
    return data;
  });
});

/***/ }),

/***/ "../../../node_modules/@ecomplus/passport-client/src/methods/fetch-orders-list.js":
/*!******************************************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/@ecomplus/passport-client/src/methods/fetch-orders-list.js ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "../../../node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ "../../../node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ "../../../node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "../../../node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "../../../node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.slice */ "../../../node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_sort__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.sort */ "../../../node_modules/core-js/modules/es.array.sort.js");
/* harmony import */ var core_js_modules_es_array_sort__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_sort__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "../../../node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.promise */ "../../../node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ "../../../node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "../../../node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "../../../node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _ecomplus_client__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ecomplus/client */ "../../../node_modules/@ecomplus/client/src/index.js");














function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


/**
 * @method
 * @name EcomPassport#fetchOrdersList
 * @description Fetch each order from customer's orders list.
 *
 * @param {number} [from=0] - Offset (start from) for pagination
 * @param {number} [size=10] - Limit of orders to fetch and list
 *
 * @returns {Promise<orders|error>}
 *
 * @example

ecomPassport.fetchOrdersList().then(orders => {
  orders.forEach(order => {
    console.log(order.number)
  })
})

 */

/* harmony default export */ __webpack_exports__["default"] = (function (_ref, emitter, _ref2) {
  var storeId = _ref.storeId,
      getCustomer = _ref.getCustomer;

  var _ref3 = _slicedToArray(_ref2, 2),
      _ref3$ = _ref3[0],
      from = _ref3$ === void 0 ? 0 : _ref3$,
      _ref3$2 = _ref3[1],
      size = _ref3$2 === void 0 ? 10 : _ref3$2;

  var requestPromises = [];
  var resultOrders = [];

  var sortOrdersFn = function sortOrdersFn(a, b) {
    return a.number > b.number ? -1 : 1;
  };

  (getCustomer().orders || []).sort(sortOrdersFn).slice(from, from + size).forEach(function (_ref4) {
    var _id = _ref4._id;
    requestPromises.push(Object(_ecomplus_client__WEBPACK_IMPORTED_MODULE_13__["store"])({
      url: "/orders/".concat(_id, ".json"),
      storeId: storeId
    }).then(function (_ref5) {
      var data = _ref5.data;
      return resultOrders.push(data);
    }));
  });
  return Promise.all(requestPromises).then(function () {
    return resultOrders.sort(sortOrdersFn);
  });
});

/***/ }),

/***/ "../../../node_modules/@ecomplus/passport-client/src/methods/get-customer-name.js":
/*!******************************************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/@ecomplus/passport-client/src/methods/get-customer-name.js ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ecomplus_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ecomplus/utils */ "../../../node_modules/@ecomplus/utils/src/index.js");

/**
 * @method
 * @name EcomPassport#getCustomerName
 * @description Get nickname or given name from current customer account data.
 *
 * @returns {string}
 *
 * @example

ecomPassport.getCustomerName()

 */

/* harmony default export */ __webpack_exports__["default"] = (function (self) {
  return Object(_ecomplus_utils__WEBPACK_IMPORTED_MODULE_0__["nickname"])(self.getCustomer());
});

/***/ }),

/***/ "../../../node_modules/@ecomplus/passport-client/src/methods/get-customer.js":
/*!*************************************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/@ecomplus/passport-client/src/methods/get-customer.js ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @method
 * @name EcomPassport#getCustomer
 * @description Get current customer account object.
 *
 * @returns {object}
 *
 * @example

const customer = ecomPassport.getCustomer()
console.log(customer.main_email)

 */
/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var customer = _ref.customer;
  return customer || {};
});

/***/ }),

/***/ "../../../node_modules/@ecomplus/passport-client/src/methods/load-stored-session.js":
/*!********************************************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/@ecomplus/passport-client/src/methods/load-stored-session.js ***!
  \********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_get_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../lib/get-cookie */ "../../../node_modules/@ecomplus/passport-client/src/lib/get-cookie.js");
/* harmony import */ var _lib_set_cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../lib/set-cookie */ "../../../node_modules/@ecomplus/passport-client/src/lib/set-cookie.js");


/**
 * @method
 * @name EcomPassport#loadStoredSession
 * @description Try to load session object from cookie
 * and customer data from localStorage.
 *
 * @returns {self}
 *
 * @example

ecomPassport.loadStoredSession()

 */

/* harmony default export */ __webpack_exports__["default"] = (function (self) {
  var document = self.document,
      storageKey = self.storageKey,
      localStorage = self.localStorage,
      setSession = self.setSession;

  if (storageKey) {
    if (document) {
      var sessionJson = Object(_lib_get_cookie__WEBPACK_IMPORTED_MODULE_0__["default"])(document, storageKey);

      if (sessionJson) {
        var session;

        try {
          session = JSON.parse(sessionJson);
        } catch (e) {
          Object(_lib_set_cookie__WEBPACK_IMPORTED_MODULE_1__["default"])(document, storageKey, '', -1);
          return self;
        }

        if (localStorage) {
          var customerJson = localStorage.getItem(storageKey);

          if (customerJson) {
            try {
              session.customer = JSON.parse(customerJson);
            } catch (e) {
              localStorage.removeItem(storageKey);
            }
          }
        }

        if (!session.customer) {
          session.customer = {};
        }

        setSession(session, false);
      }
    }
  }

  return self;
});

/***/ }),

/***/ "../../../node_modules/@ecomplus/passport-client/src/methods/logout.js":
/*!*******************************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/@ecomplus/passport-client/src/methods/logout.js ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "../../../node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ "../../../node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ "../../../node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "../../../node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "../../../node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ "../../../node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "../../../node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _lib_set_cookie__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../lib/set-cookie */ "../../../node_modules/@ecomplus/passport-client/src/lib/set-cookie.js");









function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


/**
 * @method
 * @name EcomPassport#logout
 * @description Reset session and customer account object.
 *
 * @param {boolean} [canSave=true] - Save (reset) cookie and localStorage after logout
 *
 * @returns {self}
 *
 * @example

ecomPassport.logout()

 */

/* harmony default export */ __webpack_exports__["default"] = (function (self, emitter, _ref) {
  var _ref2 = _slicedToArray(_ref, 1),
      _ref2$ = _ref2[0],
      canSave = _ref2$ === void 0 ? true : _ref2$;

  var document = self.document,
      storageKey = self.storageKey,
      localStorage = self.localStorage;
  self.session = {};
  self.customer = {};

  if (canSave && storageKey) {
    if (document) {
      Object(_lib_set_cookie__WEBPACK_IMPORTED_MODULE_8__["default"])(document, storageKey, '', -1);
    }

    if (localStorage) {
      localStorage.removeItem(storageKey);
    }
  }
  /**
   * @event EcomPassport#logout
   * @example ecomPassport.on('logout', () => {
   *   console.log(ecomPassport.checkLogin()) // false
   * })
   */


  emitter.emit('logout');
  return self;
});

/***/ }),

/***/ "../../../node_modules/@ecomplus/passport-client/src/methods/popup-login.js":
/*!************************************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/@ecomplus/passport-client/src/methods/popup-login.js ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "../../../node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ "../../../node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ "../../../node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.concat */ "../../../node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "../../../node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "../../../node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ "../../../node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "../../../node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_8__);










function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * @method
 * @name EcomPassport#popupLogin
 * @description Open a new popup to default E-Com Plus Passport login window.
 *
 * @param {boolean} [canSkipLogin] - Whether customer can skip login and continue as guest
 * @param {string} [baseUri='https://passport.e-com.plus/v1/'] - Passport API base URI
 *
 * @returns {window|null}
 *
 * @example

ecomPassport.popupLogin()

 */
/* harmony default export */ __webpack_exports__["default"] = (function (_ref, emitter, _ref2) {
  var storeId = _ref.storeId,
      lang = _ref.lang,
      sessionId = _ref.sessionId,
      popupOauthLink = _ref.popupOauthLink;

  var _ref3 = _slicedToArray(_ref2, 2),
      canSkipLogin = _ref3[0],
      _ref3$ = _ref3[1],
      baseUri = _ref3$ === void 0 ? 'https://passport.e-com.plus/v1/' : _ref3$;

  var url = "".concat(baseUri).concat(lang, "/").concat(storeId, "/").concat(sessionId, "/login.html");

  if (canSkipLogin) {
    url += '?enable_skip=true';
  }

  return popupOauthLink(url);
});

/***/ }),

/***/ "../../../node_modules/@ecomplus/passport-client/src/methods/popup-oauth-link.js":
/*!*****************************************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/@ecomplus/passport-client/src/methods/popup-oauth-link.js ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "../../../node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ "../../../node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ "../../../node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "../../../node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "../../../node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ "../../../node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "../../../node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _lib_create_popup__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../lib/create-popup */ "../../../node_modules/@ecomplus/passport-client/src/lib/create-popup.js");









function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


/**
 * @method
 * @name EcomPassport#popupOauthLink
 * @description Open a new popup to received URL for OAuth and
 * try to fetch profile on callback or popup closed.
 *
 * @param {string} url - Popup URL (OAuth provider link)
 *
 * @returns {window|null}
 *
 * @example

ecomPassport.popupOauthLink(facebookOauthLink)

 */

/* harmony default export */ __webpack_exports__["default"] = (function (_ref, emitter, _ref2) {
  var fetchOauthProfile = _ref.fetchOauthProfile;

  var _ref3 = _slicedToArray(_ref2, 1),
      url = _ref3[0];

  var popupWatch = null;

  var getCustomerInfo = function getCustomerInfo(fromCallback) {
    clearInterval(popupWatch);
    fetchOauthProfile();
  };

  window.passportCallback = function () {
    getCustomerInfo(true);
  };

  var popup = Object(_lib_create_popup__WEBPACK_IMPORTED_MODULE_8__["default"])(url);

  if (popup) {
    if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window.focus) {
      popup.focus();
    }

    popupWatch = setInterval(function () {
      if (popup.closed) {
        getCustomerInfo(false);
      }
    }, 400);
  }

  return popup;
});

/***/ }),

/***/ "../../../node_modules/@ecomplus/passport-client/src/methods/request-api.js":
/*!************************************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/@ecomplus/passport-client/src/methods/request-api.js ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "../../../node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ "../../../node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ "../../../node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.index-of */ "../../../node_modules/core-js/modules/es.array.index-of.js");
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "../../../node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "../../../node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.promise */ "../../../node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ "../../../node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_string_ends_with__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.string.ends-with */ "../../../node_modules/core-js/modules/es.string.ends-with.js");
/* harmony import */ var core_js_modules_es_string_ends_with__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_ends_with__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "../../../node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _ecomplus_client__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ecomplus/client */ "../../../node_modules/@ecomplus/client/src/index.js");












function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


/**
 * @method
 * @name EcomPassport#requestApi
 * @description Send request to E-Com Plus Passport API.
 *
 * @param {string} url - Passport API endpoint
 * @param {string} method - Request HTTP method
 * @param {object} [data] - Request body
 *
 * @returns {Promise<response|error>}
 *
 * @example

ecomPassport.requestApi('/me.json', 'patch', { orders })
  .then(({ data }) => {
    console.log(data)
  })

 */

/* harmony default export */ __webpack_exports__["default"] = (function (_ref, emitter, _ref2) {
  var storeId = _ref.storeId,
      session = _ref.session,
      checkLogin = _ref.checkLogin,
      checkAuthorization = _ref.checkAuthorization,
      checkVerification = _ref.checkVerification,
      setCustomer = _ref.setCustomer;

  var _ref3 = _slicedToArray(_ref2, 3),
      url = _ref3[0],
      method = _ref3[1],
      data = _ref3[2];

  if (method) {
    method = method.toLowerCase();
  } else {
    method = 'get';
  }

  if (!checkLogin()) {
    return Promise.reject(new Error('Unauthenticated, requires login'));
  }

  if (!checkAuthorization()) {
    return Promise.reject(new Error('Unauthorized, requires login with OAuth or doc number'));
  }

  if (url.indexOf('api/') < 0) {
    url = '/api' + (url.charAt(0) === '/' ? url : "/".concat(url));
  }

  return Object(_ecomplus_client__WEBPACK_IMPORTED_MODULE_11__["passport"])({
    url: url,
    storeId: storeId,
    customerId: session.auth.id,
    accessToken: session.auth.token && session.auth.token.access_token,
    method: method,
    data: data
  }).then(function (response) {
    if (url.endsWith('/me.json') && method === 'patch') {
      setCustomer(data);
    }

    return response;
  });
});

/***/ }),

/***/ "../../../node_modules/@ecomplus/passport-client/src/methods/set-customer.js":
/*!*************************************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/@ecomplus/passport-client/src/methods/set-customer.js ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "../../../node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ "../../../node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ "../../../node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "../../../node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.assign */ "../../../node_modules/core-js/modules/es.object.assign.js");
/* harmony import */ var core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "../../../node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ "../../../node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "../../../node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_8__);










function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * @method
 * @name EcomPassport#setCustomer
 * @description Set (assign) customer account object and save to local storage.
 *
 * @param {object} customer - Customer data (can be partial)
 * @param {boolean} [canSave=true] - Save to localStorage
 *
 * @returns {self}
 *
 * @example

ecomPassport.setCustomer(customer)

 */
/* harmony default export */ __webpack_exports__["default"] = (function (self, emitter, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      customer = _ref2[0],
      _ref2$ = _ref2[1],
      canSave = _ref2$ === void 0 ? true : _ref2$;

  if (_typeof(customer) === 'object' && customer !== null && !Array.isArray(customer)) {
    var storageKey = self.storageKey,
        localStorage = self.localStorage;
    Object.assign(self.customer, customer);

    if (canSave && storageKey && localStorage) {
      localStorage.setItem(storageKey, JSON.stringify(self.customer));
    }
  } else {
    throw new Error('Customer must be an object');
  }

  return self;
});

/***/ }),

/***/ "../../../node_modules/@ecomplus/passport-client/src/methods/set-session.js":
/*!************************************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/@ecomplus/passport-client/src/methods/set-session.js ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "../../../node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ "../../../node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ "../../../node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "../../../node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "../../../node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ "../../../node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "../../../node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _lib_set_cookie__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../lib/set-cookie */ "../../../node_modules/@ecomplus/passport-client/src/lib/set-cookie.js");









function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


/**
 * @method
 * @name EcomPassport#setSession
 * @description Set session object and save to cookie.
 *
 * @param {object} session - Passport session object
 * @param {boolean} [canSave=true] - Save to cookie
 *
 * @returns {self}
 *
 * @example

ecomPassport.setSession(session)

 */

/* harmony default export */ __webpack_exports__["default"] = (function (self, emitter, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      session = _ref2[0],
      _ref2$ = _ref2[1],
      canSave = _ref2$ === void 0 ? true : _ref2$;

  var document = self.document,
      storageKey = self.storageKey,
      setCustomer = self.setCustomer,
      checkLogin = self.checkLogin;

  if (_typeof(session) !== 'object' || session === null || Array.isArray(session)) {
    session = {};
  } else if (session.customer) {
    self.customer = {};
    setCustomer(session.customer, canSave);
    delete session.customer;
  }

  self.session = session;

  if (canSave) {
    Object(_lib_set_cookie__WEBPACK_IMPORTED_MODULE_8__["default"])(document, storageKey, JSON.stringify(session), 6);
  }

  if (checkLogin()) {
    /**
     * @event EcomPassport#login
     * @example ecomPassport.on('login', () => {
     *   console.log(ecomPassport.checkLogin()) // true
     * })
     */
    emitter.emit('login');
  }

  return self;
});

/***/ }),

/***/ "../../../node_modules/core-js/modules/es.string.ends-with.js":
/*!**********************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/core-js/modules/es.string.ends-with.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "../../../node_modules/core-js/internals/export.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../../../node_modules/core-js/internals/object-get-own-property-descriptor.js").f;
var toLength = __webpack_require__(/*! ../internals/to-length */ "../../../node_modules/core-js/internals/to-length.js");
var notARegExp = __webpack_require__(/*! ../internals/not-a-regexp */ "../../../node_modules/core-js/internals/not-a-regexp.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../../node_modules/core-js/internals/require-object-coercible.js");
var correctIsRegExpLogic = __webpack_require__(/*! ../internals/correct-is-regexp-logic */ "../../../node_modules/core-js/internals/correct-is-regexp-logic.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../../node_modules/core-js/internals/is-pure.js");

var nativeEndsWith = ''.endsWith;
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('endsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'endsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.endsWith` method
// https://tc39.github.io/ecma262/#sec-string.prototype.endswith
$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = String(requireObjectCoercible(this));
    notARegExp(searchString);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : min(toLength(endPosition), len);
    var search = String(searchString);
    return nativeEndsWith
      ? nativeEndsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ })

}]);
//# sourceMappingURL=6b6e3bae240d211401f8.js.map