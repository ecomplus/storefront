(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ "../widget-fb-pixel/src/index.js":
/*!***************************************!*\
  !*** ../widget-fb-pixel/src/index.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_parse_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/parse-context */ "../widget-fb-pixel/src/lib/parse-context.js");
/* harmony import */ var _lib_watch_app_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/watch-app-routes */ "../widget-fb-pixel/src/lib/watch-app-routes.js");
/* harmony import */ var _lib_watch_shopping_cart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/watch-shopping-cart */ "../widget-fb-pixel/src/lib/watch-shopping-cart.js");



/* harmony default export */ __webpack_exports__["default"] = (function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (typeof window.fbq === 'function') {
    var track = function track(evName) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var isCustomEv = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (options.debug) {
        console.log('fbq', evName, data);
      }

      window.fbq(isCustomEv ? 'trackCustom' : 'track', evName, data);
    };

    Object(_lib_parse_context__WEBPACK_IMPORTED_MODULE_0__["default"])(track);
    Object(_lib_watch_app_routes__WEBPACK_IMPORTED_MODULE_1__["default"])(track);
    Object(_lib_watch_shopping_cart__WEBPACK_IMPORTED_MODULE_2__["default"])(track);
  }
});

/***/ }),

/***/ "../widget-fb-pixel/src/lib/common.js":
/*!********************************************!*\
  !*** ../widget-fb-pixel/src/lib/common.js ***!
  \********************************************/
/*! exports provided: currency, getProductData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currency", function() { return currency; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProductData", function() { return getProductData; });
/* harmony import */ var _ecomplus_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ecomplus/utils */ "../../../node_modules/@ecomplus/utils/src/index.js");

var currency = _ecomplus_utils__WEBPACK_IMPORTED_MODULE_0__["$ecomConfig"].get('currency') || 'BRL';
var getProductData = function getProductData(body) {
  var data = {
    currency: currency,
    content_ids: [body.sku],
    content_name: body.name,
    value: Object(_ecomplus_utils__WEBPACK_IMPORTED_MODULE_0__["price"])(body),
    content_type: 'product'
  };

  if (body.categories && body.categories.length) {
    data.content_category = body.category_tree || body.categories[0].name;
  }

  return data;
};

/***/ }),

/***/ "../widget-fb-pixel/src/lib/parse-context.js":
/*!***************************************************!*\
  !*** ../widget-fb-pixel/src/lib/parse-context.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ "../widget-fb-pixel/src/lib/common.js");

/* harmony default export */ __webpack_exports__["default"] = (function (fbq) {
  var context = window.storefront && window.storefront.context;

  if (context && context.resource === 'products') {
    fbq('ViewContent', Object(_common__WEBPACK_IMPORTED_MODULE_0__["getProductData"])(context.body));
  }
});

/***/ }),

/***/ "../widget-fb-pixel/src/lib/watch-app-routes.js":
/*!******************************************************!*\
  !*** ../widget-fb-pixel/src/lib/watch-app-routes.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "../../../node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.filter */ "../../../node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "../../../node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor */ "../../../node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors */ "../../../node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.keys */ "../../../node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "../../../node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ecomplus_shopping_cart__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ecomplus/shopping-cart */ "../../../node_modules/@ecomplus/shopping-cart/src/index.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./common */ "../widget-fb-pixel/src/lib/common.js");








function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/* harmony default export */ __webpack_exports__["default"] = (function (fbq) {
  var router = window.storefrontApp && window.storefrontApp.router;

  if (router) {
    var isCartSent = false;

    var getPurchaseData = function getPurchaseData() {
      var amount = window.storefrontApp.amount;
      var data = {
        value: amount && amount.total || _ecomplus_shopping_cart__WEBPACK_IMPORTED_MODULE_7__["default"].data && _ecomplus_shopping_cart__WEBPACK_IMPORTED_MODULE_7__["default"].data.subtotal || 0,
        currency: _common__WEBPACK_IMPORTED_MODULE_8__["currency"],
        contents: [],
        content_type: 'product'
      };

      if (_ecomplus_shopping_cart__WEBPACK_IMPORTED_MODULE_7__["default"].data && Array.isArray(_ecomplus_shopping_cart__WEBPACK_IMPORTED_MODULE_7__["default"].data.items)) {
        _ecomplus_shopping_cart__WEBPACK_IMPORTED_MODULE_7__["default"].data.items.forEach(function (_ref) {
          var sku = _ref.sku,
              quantity = _ref.quantity;
          data.contents.push({
            id: sku,
            quantity: quantity
          });
        });
      }

      return data;
    };

    var emitCheckout = function emitCheckout(step, option) {
      var customData = _objectSpread({}, getPurchaseData(), {
        checkout_step: step,
        checkout_option: option
      });

      if (step <= 1 || !isCartSent) {
        fbq('Checkout', customData, true);
        isCartSent = true;
      } else {
        fbq('CheckoutOption', customData, true);
      }
    };

    var emitPurchase = function emitPurchase(orderId) {
      fbq('Purchase', _objectSpread({}, getPurchaseData(), {
        order_id: orderId
      }));
    };

    var addRouteToData = function addRouteToData(_ref2) {
      var name = _ref2.name,
          params = _ref2.params;

      switch (name) {
        case 'cart':
          emitCheckout(1, 'Review Cart');
          break;

        case 'checkout':
          emitCheckout(2, 'Confirm Purchase');
          break;

        case 'confirmation':
          emitPurchase(params.id);
          break;
      }
    };

    if (router.currentRoute) {
      addRouteToData(router.currentRoute);
    }

    router.afterEach(addRouteToData);
  }
});

/***/ }),

/***/ "../widget-fb-pixel/src/lib/watch-shopping-cart.js":
/*!*********************************************************!*\
  !*** ../widget-fb-pixel/src/lib/watch-shopping-cart.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ecomplus_shopping_cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ecomplus/shopping-cart */ "../../../node_modules/@ecomplus/shopping-cart/src/index.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "../widget-fb-pixel/src/lib/common.js");


/* harmony default export */ __webpack_exports__["default"] = (function (fbq) {
  _ecomplus_shopping_cart__WEBPACK_IMPORTED_MODULE_0__["default"].on('addItem', function (_ref) {
    var item = _ref.item;
    fbq('AddToCart', Object(_common__WEBPACK_IMPORTED_MODULE_1__["getProductData"])(item));
  });
});

/***/ })

}]);
//# sourceMappingURL=3b0f57e62edf5408ba7e.js.map