(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "./template/js/lib/fetch-info.js":
/*!***************************************!*\
  !*** ./template/js/lib/fetch-info.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.filter */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.keys */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.promise.finally */ "./node_modules/core-js/modules/es.promise.finally.js");
/* harmony import */ var core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _ecomplus_client__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ecomplus/client */ "./node_modules/@ecomplus/client/src/index.js");
/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./emitter */ "./template/js/lib/emitter.js");
/* harmony import */ var _persist_utm__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./persist-utm */ "./template/js/lib/persist-utm.js");














function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




window._info = window._info || {};
var fetchInfoPromises = [];
var modulesToFetch = [{
  endpoint: 'list_payments'
}, {
  endpoint: 'calculate_shipping'
}];

if (Object.keys(_persist_utm__WEBPACK_IMPORTED_MODULE_15__["default"]).length) {
  modulesToFetch.push({
    endpoint: 'apply_discount',
    reqOptions: {
      method: 'post',
      data: {
        utm: _persist_utm__WEBPACK_IMPORTED_MODULE_15__["default"]
      }
    }
  });
}

modulesToFetch.forEach(function (_ref) {
  var endpoint = _ref.endpoint,
      reqOptions = _ref.reqOptions;
  var modInfo = {};
  window._info[endpoint] = modInfo;
  var promise = new Promise(function (resolve) {
    Object(_ecomplus_client__WEBPACK_IMPORTED_MODULE_13__["modules"])(_objectSpread({
      url: "/".concat(endpoint, ".json")
    }, reqOptions)).then(function (_ref2) {
      var data = _ref2.data;
      var result = data.result;

      if (Array.isArray(result)) {
        result.forEach(function (_ref3) {
          var error = _ref3.error,
              response = _ref3.response;

          if (!error) {
            var field, val;

            switch (endpoint) {
              case 'calculate_shipping':
                field = 'free_shipping_from_value';
                val = response[field];

                if (typeof val === 'number' && (modInfo[field] === undefined || val < modInfo[field])) {
                  modInfo[field] = val;
                }

                break;

              case 'list_payments':
                field = 'installments_option';
                val = response[field];

                if (val && (!modInfo[field] || val.monthly_interest < modInfo[field].monthly_interest || val.max_number > modInfo[field].max_number)) {
                  modInfo[field] = val;
                }

                field = 'discount_option';
                val = response[field];

                if (val && (!modInfo[field] || val.value > modInfo[field].value)) {
                  modInfo[field] = val;
                }

                break;

              default:
                field = 'available_extra_discount';
                val = response[field];

                if (val && (!modInfo[field] || val.value > modInfo[field].value)) {
                  modInfo[field] = val;
                }

            }
          }
        });
      }

      _emitter__WEBPACK_IMPORTED_MODULE_14__["default"].emit("info:".concat(endpoint), modInfo);
    }).catch(function (err) {
      console.error(err);
      _emitter__WEBPACK_IMPORTED_MODULE_14__["default"].emit("info:".concat(endpoint), err);
    }).finally(resolve);
  });
  fetchInfoPromises.push(promise);
});
Promise.all(fetchInfoPromises).then(function () {
  return _emitter__WEBPACK_IMPORTED_MODULE_14__["default"].emit('info', window._info);
});

/***/ })

}]);
//# sourceMappingURL=69618affd1c8b16a869c.js.map