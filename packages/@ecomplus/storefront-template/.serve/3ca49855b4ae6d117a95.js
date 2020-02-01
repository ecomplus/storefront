(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "../../../node_modules/core-js/internals/string-repeat.js":
/*!******************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/core-js/internals/string-repeat.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../../../node_modules/core-js/internals/to-integer.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../../node_modules/core-js/internals/require-object-coercible.js");

// `String.prototype.repeat` method implementation
// https://tc39.github.io/ecma262/#sec-string.prototype.repeat
module.exports = ''.repeat || function repeat(count) {
  var str = String(requireObjectCoercible(this));
  var result = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};


/***/ }),

/***/ "../../../node_modules/core-js/internals/this-number-value.js":
/*!**********************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/core-js/internals/this-number-value.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../../node_modules/core-js/internals/classof-raw.js");

// `thisNumberValue` abstract operation
// https://tc39.github.io/ecma262/#sec-thisnumbervalue
module.exports = function (value) {
  if (typeof value != 'number' && classof(value) != 'Number') {
    throw TypeError('Incorrect invocation');
  }
  return +value;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/es.number.to-fixed.js":
/*!*********************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/core-js/modules/es.number.to-fixed.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "../../../node_modules/core-js/internals/export.js");
var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../../../node_modules/core-js/internals/to-integer.js");
var thisNumberValue = __webpack_require__(/*! ../internals/this-number-value */ "../../../node_modules/core-js/internals/this-number-value.js");
var repeat = __webpack_require__(/*! ../internals/string-repeat */ "../../../node_modules/core-js/internals/string-repeat.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../../node_modules/core-js/internals/fails.js");

var nativeToFixed = 1.0.toFixed;
var floor = Math.floor;

var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

var FORCED = nativeToFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !fails(function () {
  // V8 ~ Android 4.3-
  nativeToFixed.call({});
});

// `Number.prototype.toFixed` method
// https://tc39.github.io/ecma262/#sec-number.prototype.tofixed
$({ target: 'Number', proto: true, forced: FORCED }, {
  // eslint-disable-next-line max-statements
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue(this);
    var fractDigits = toInteger(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k;

    var multiply = function (n, c) {
      var index = -1;
      var c2 = c;
      while (++index < 6) {
        c2 += n * data[index];
        data[index] = c2 % 1e7;
        c2 = floor(c2 / 1e7);
      }
    };

    var divide = function (n) {
      var index = 6;
      var c = 0;
      while (--index >= 0) {
        c += data[index];
        data[index] = floor(c / n);
        c = (c % n) * 1e7;
      }
    };

    var dataToString = function () {
      var index = 6;
      var s = '';
      while (--index >= 0) {
        if (s !== '' || index === 0 || data[index] !== 0) {
          var t = String(data[index]);
          s = s === '' ? t : s + repeat.call('0', 7 - t.length) + t;
        }
      } return s;
    };

    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits');
    // eslint-disable-next-line no-self-compare
    if (number != number) return 'NaN';
    if (number <= -1e21 || number >= 1e21) return String(number);
    if (number < 0) {
      sign = '-';
      number = -number;
    }
    if (number > 1e-21) {
      e = log(number * pow(2, 69, 1)) - 69;
      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = fractDigits;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        result = dataToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        result = dataToString() + repeat.call('0', fractDigits);
      }
    }
    if (fractDigits > 0) {
      k = result.length;
      result = sign + (k <= fractDigits
        ? '0.' + repeat.call('0', fractDigits - k) + result
        : result.slice(0, k - fractDigits) + '.' + result.slice(k - fractDigits));
    } else {
      result = sign + result;
    } return result;
  }
});


/***/ }),

/***/ "../widget-tag-manager/src/index.js":
/*!******************************************!*\
  !*** ../widget-tag-manager/src/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_parse_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/parse-context */ "../widget-tag-manager/src/lib/parse-context.js");
/* harmony import */ var _lib_parse_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/parse-dom */ "../widget-tag-manager/src/lib/parse-dom.js");
/* harmony import */ var _lib_watch_app_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/watch-app-routes */ "../widget-tag-manager/src/lib/watch-app-routes.js");
/* harmony import */ var _lib_watch_shopping_cart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/watch-shopping-cart */ "../widget-tag-manager/src/lib/watch-shopping-cart.js");




/* harmony default export */ __webpack_exports__["default"] = (function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var dataLayerVar = options.dataLayerVar,
      parseDomMsDelay = options.parseDomMsDelay;
  var dataLayer = window[dataLayerVar] || window.dataLayer;

  if (dataLayer) {
    Object(_lib_parse_context__WEBPACK_IMPORTED_MODULE_0__["default"])(dataLayer);
    Object(_lib_watch_app_routes__WEBPACK_IMPORTED_MODULE_2__["default"])(dataLayer);
    Object(_lib_watch_shopping_cart__WEBPACK_IMPORTED_MODULE_3__["default"])(dataLayer);
    setTimeout(function () {
      Object(_lib_parse_dom__WEBPACK_IMPORTED_MODULE_1__["default"])(dataLayer);
    }, parseDomMsDelay >= 0 ? parseDomMsDelay : 300);
  }
});

/***/ }),

/***/ "../widget-tag-manager/src/lib/common.js":
/*!***********************************************!*\
  !*** ../widget-tag-manager/src/lib/common.js ***!
  \***********************************************/
/*! exports provided: currencyCode, getProductData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currencyCode", function() { return currencyCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProductData", function() { return getProductData; });
/* harmony import */ var core_js_modules_es_number_to_fixed__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.number.to-fixed */ "../../../node_modules/core-js/modules/es.number.to-fixed.js");
/* harmony import */ var core_js_modules_es_number_to_fixed__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_to_fixed__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ecomplus_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ecomplus/utils */ "../../../node_modules/@ecomplus/utils/src/index.js");


var currencyCode = _ecomplus_utils__WEBPACK_IMPORTED_MODULE_1__["$ecomConfig"].get('currency') || 'BRL';
var getProductData = function getProductData(item) {
  var productData = {
    name: Object(_ecomplus_utils__WEBPACK_IMPORTED_MODULE_1__["name"])(item),
    id: item.sku,
    price: Object(_ecomplus_utils__WEBPACK_IMPORTED_MODULE_1__["price"])(item).toFixed(2)
  };

  if (item.quantity) {
    productData.quantity = item.quantity;
  }

  return productData;
};

/***/ }),

/***/ "../widget-tag-manager/src/lib/parse-context.js":
/*!******************************************************!*\
  !*** ../widget-tag-manager/src/lib/parse-context.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ "../../../node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.replace */ "../../../node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ecomplus_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ecomplus/utils */ "../../../node_modules/@ecomplus/utils/src/index.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common */ "../widget-tag-manager/src/lib/common.js");




/* harmony default export */ __webpack_exports__["default"] = (function (dataLayer) {
  var context = window.storefront && window.storefront.context;

  if (context && context.resource === 'products') {
    var body = context.body;
    var productData = Object(_common__WEBPACK_IMPORTED_MODULE_3__["getProductData"])(body);
    var data = {
      event: 'eec.detail',
      ecommerce: {
        currencyCode: _common__WEBPACK_IMPORTED_MODULE_3__["currencyCode"],
        detail: {
          products: [productData]
        }
      }
    };
    var categories = Object(_ecomplus_utils__WEBPACK_IMPORTED_MODULE_2__["categoriesList"])(body);

    if (categories.length) {
      productData.category = body.category_tree ? body.category_tree.replace(/\s>\s/g, '/') : categories[0];
      data.ecommerce.detail.actionField = {
        list: categories[0]
      };
    }

    if (body.brands && body.brands.length) {
      productData.brand = body.brands[0].name;
    }

    dataLayer.push(data);
  }
});

/***/ }),

/***/ "../widget-tag-manager/src/lib/parse-dom.js":
/*!**************************************************!*\
  !*** ../widget-tag-manager/src/lib/parse-dom.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.index-of */ "../../../node_modules/core-js/modules/es.array.index-of.js");
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.map */ "../../../node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common */ "../widget-tag-manager/src/lib/common.js");



/* harmony default export */ __webpack_exports__["default"] = (function (dataLayer) {
  var $products = document.querySelectorAll('[data-sku]');

  if ($products.length) {
    var skus = [];
    var listNameBySku = {};
    var isSearchPage = window.location.pathname === '/search';

    for (var i = 0; i < $products.length; i++) {
      var $product = $products[i];
      var sku = $product.dataset.sku;

      if (skus.indexOf(sku) === -1) {
        skus.push(sku);

        if ($product.closest) {
          var $carousel = $product.closest('.products-carousel');

          if (!isSearchPage && $carousel) {
            listNameBySku[sku] = $carousel.dataset.title;
          }
        }
      }
    }

    dataLayer.push({
      event: 'eec.impressions',
      ecommerce: {
        currencyCode: _common__WEBPACK_IMPORTED_MODULE_2__["currencyCode"],
        impressions: skus.map(function (sku) {
          var listName = isSearchPage ? 'Search results' : listNameBySku[sku];
          var item = {
            id: sku
          };

          if (listName) {
            item.list = listName;
          }

          return item;
        })
      }
    });
  }
});

/***/ }),

/***/ "../widget-tag-manager/src/lib/watch-app-routes.js":
/*!*********************************************************!*\
  !*** ../widget-tag-manager/src/lib/watch-app-routes.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "../../../node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_number_to_fixed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.number.to-fixed */ "../../../node_modules/core-js/modules/es.number.to-fixed.js");
/* harmony import */ var core_js_modules_es_number_to_fixed__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_to_fixed__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "../../../node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ecomplus_shopping_cart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ecomplus/shopping-cart */ "../../../node_modules/@ecomplus/shopping-cart/src/index.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common */ "../widget-tag-manager/src/lib/common.js");





/* harmony default export */ __webpack_exports__["default"] = (function (dataLayer) {
  var router = window.storefrontApp && window.storefrontApp.router;

  if (router) {
    var isCartSent = false;

    var getCartProductsList = function getCartProductsList() {
      var products = [];

      if (_ecomplus_shopping_cart__WEBPACK_IMPORTED_MODULE_3__["default"].data && Array.isArray(_ecomplus_shopping_cart__WEBPACK_IMPORTED_MODULE_3__["default"].data.items)) {
        _ecomplus_shopping_cart__WEBPACK_IMPORTED_MODULE_3__["default"].data.items.forEach(function (item) {
          products.push(Object(_common__WEBPACK_IMPORTED_MODULE_4__["getProductData"])(item));
        });
      }

      return products;
    };

    var emitCheckout = function emitCheckout(step, option) {
      var actionField = {
        step: step,
        option: option
      };

      if (step <= 1 || !isCartSent) {
        dataLayer.push({
          event: 'eec.checkout',
          ecommerce: {
            currencyCode: _common__WEBPACK_IMPORTED_MODULE_4__["currencyCode"],
            checkout: {
              actionField: actionField,
              products: getCartProductsList()
            }
          }
        });
        dataLayer.push({
          event: 'checkout'
        });
        isCartSent = true;
      } else {
        dataLayer.push({
          event: 'eec.checkout_option',
          ecommerce: {
            currencyCode: _common__WEBPACK_IMPORTED_MODULE_4__["currencyCode"],
            checkout_option: {
              actionField: actionField
            }
          }
        });
        dataLayer.push({
          event: 'checkoutOption'
        });
      }
    };

    var emitPurchase = function emitPurchase(orderId) {
      var amount = window.storefrontApp.amount;
      var revenue = (amount && amount.total || _ecomplus_shopping_cart__WEBPACK_IMPORTED_MODULE_3__["default"].data && _ecomplus_shopping_cart__WEBPACK_IMPORTED_MODULE_3__["default"].data.subtotal || 0).toFixed(2);
      dataLayer.push({
        event: 'eec.purchase',
        ecommerce: {
          currencyCode: _common__WEBPACK_IMPORTED_MODULE_4__["currencyCode"],
          purchase: {
            actionField: {
              id: orderId,
              revenue: revenue
            },
            products: getCartProductsList()
          }
        }
      });
    };

    var addRouteToData = function addRouteToData(_ref) {
      var name = _ref.name,
          params = _ref.params;

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

/***/ "../widget-tag-manager/src/lib/watch-shopping-cart.js":
/*!************************************************************!*\
  !*** ../widget-tag-manager/src/lib/watch-shopping-cart.js ***!
  \************************************************************/
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
/* harmony import */ var core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.assign */ "../../../node_modules/core-js/modules/es.object.assign.js");
/* harmony import */ var core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor */ "../../../node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors */ "../../../node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.keys */ "../../../node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "../../../node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ecomplus_shopping_cart__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ecomplus/shopping-cart */ "../../../node_modules/@ecomplus/shopping-cart/src/index.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./common */ "../widget-tag-manager/src/lib/common.js");









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/* harmony default export */ __webpack_exports__["default"] = (function (dataLayer) {
  var productsBySku = {};

  var emitAddToCart = function emitAddToCart(item) {
    var productData = Object(_common__WEBPACK_IMPORTED_MODULE_9__["getProductData"])(item);
    dataLayer.push({
      event: 'eec.add',
      ecommerce: {
        currencyCode: _common__WEBPACK_IMPORTED_MODULE_9__["currencyCode"],
        add: {
          products: [productData]
        }
      }
    });
    dataLayer.push({
      event: 'addToCart'
    });
    productsBySku[item.sku] = productData;
  };

  var emitRemoveFromCart = function emitRemoveFromCart(item) {
    var productData = productsBySku[item.sku];
    dataLayer.push({
      event: 'eec.remove',
      ecommerce: {
        currencyCode: _common__WEBPACK_IMPORTED_MODULE_9__["currencyCode"],
        remove: {
          products: [productData ? Object.assign({}, productData) : Object(_common__WEBPACK_IMPORTED_MODULE_9__["getProductData"])(item)]
        }
      }
    });
    dataLayer.push({
      event: 'removeFromCart'
    });
    delete productsBySku[item.sku];
  };

  _ecomplus_shopping_cart__WEBPACK_IMPORTED_MODULE_8__["default"].on('addItem', function (_ref) {
    var item = _ref.item;
    return emitAddToCart(item);
  });
  _ecomplus_shopping_cart__WEBPACK_IMPORTED_MODULE_8__["default"].on('increaseItemQnt', function (_ref2) {
    var item = _ref2.item;
    var productData = productsBySku[item.sku];

    if (!productData) {
      emitAddToCart(item);
    } else {
      var quantity = item.quantity - productData.quantity;

      if (quantity > 0) {
        emitAddToCart(_objectSpread({}, item, {
          quantity: quantity
        }));
      } else {
        emitRemoveFromCart(_objectSpread({}, item, {
          quantity: -quantity
        }));
      }
    }
  });
  _ecomplus_shopping_cart__WEBPACK_IMPORTED_MODULE_8__["default"].on('removeItem', function (_ref3) {
    var item = _ref3.item;
    return emitRemoveFromCart(item);
  });
  _ecomplus_shopping_cart__WEBPACK_IMPORTED_MODULE_8__["default"].on('clear', function () {
    for (var sku in productsBySku) {
      if (productsBySku[sku]) {
        emitRemoveFromCart(productsBySku[sku]);
      }
    }
  });
});

/***/ })

}]);
//# sourceMappingURL=3ca49855b4ae6d117a95.js.map