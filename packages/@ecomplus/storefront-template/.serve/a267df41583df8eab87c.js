(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "../storefront-framework/node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../storefront-framework/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!../widget-product-card/src/components/scss/EcProductCard.scss?vue&type=style&index=0&lang=scss&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../storefront-framework/node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../storefront-framework/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??postcss!./node_modules/sass-loader/dist/cjs.js??ref--0-3!../widget-product-card/src/components/scss/EcProductCard.scss?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../storefront-framework/node_modules/vue-loader/lib/loaders/templateLoader.js?!../widget-product-card/src/components/html/EcProductCard.html?vue&type=template&id=4172eace&lang=html&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ../storefront-framework/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../widget-product-card/src/components/html/EcProductCard.html?vue&type=template&id=4172eace&lang=html& ***!
  \****************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "ec-product-card",
      class: _vm.body._id && !_vm.isActive ? "ec-product-card--inactive" : null
    },
    [
      _c("transition", { attrs: { "enter-active-class": "animated fadeIn" } }, [
        !_vm.isLoading
          ? _c(
              "section",
              [
                _vm._t("discount-tag", [
                  _vm.isActive && _vm.discount > 0
                    ? _c(
                        "span",
                        { staticClass: "ec-product-card__offer-stamp" },
                        [
                          _vm._v("\n          -"),
                          _c("b", [_vm._v(_vm._s(_vm.discount))]),
                          _vm._v("%\n        ")
                        ]
                      )
                    : _vm._e()
                ]),
                _vm._v(" "),
                _vm._t("body", [
                  _c(
                    "a",
                    {
                      staticClass: "ec-product-card__link",
                      attrs: {
                        href: "/" + _vm.body.slug,
                        title: _vm.name(_vm.body)
                      }
                    },
                    [
                      _c(
                        "div",
                        { staticClass: "ec-product-card__pictures" },
                        [
                          _vm.body.pictures && _vm.body.pictures.length
                            ? _vm._l(_vm.body.pictures.slice(0, 2), function(
                                picture,
                                index
                              ) {
                                return _c("ec-image", {
                                  key: index,
                                  staticClass: "ec-product-card__picture",
                                  attrs: {
                                    src: picture,
                                    pictureBreakpoint: 300
                                  }
                                })
                              })
                            : _c("ec-image", {
                                staticClass: "ec-product-card__picture"
                              })
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c("h3", { staticClass: "ec-product-card__name" }, [
                        _vm._v(
                          "\n            " +
                            _vm._s(_vm.name(_vm.body)) +
                            "\n          "
                        )
                      ])
                    ]
                  )
                ]),
                _vm._v(" "),
                !_vm.body.available || !_vm.body.visible
                  ? _vm._t("unavailable", [
                      _c("p", { staticClass: "badge badge-warning" }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.dictionary("unavailable")) +
                            "\n        "
                        )
                      ])
                    ])
                  : !_vm.inStock(_vm.body)
                  ? _vm._t("out-of-stock", [
                      _c("p", { staticClass: "badge badge-dark" }, [
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.dictionary("out_of_stock")) +
                            "\n        "
                        )
                      ])
                    ])
                  : [
                      _vm._t("prices", [
                        _c("ec-prices", {
                          staticClass: "ec-product-card__prices",
                          attrs: { lang: _vm.lang, product: _vm.body }
                        })
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass: "ec-product-card__buy fade",
                          on: { click: _vm.buy }
                        },
                        [
                          _vm._t("buy", [
                            _c(
                              "button",
                              {
                                staticClass: "btn btn-block btn-primary",
                                attrs: { type: "button" }
                              },
                              [
                                _c("i", {
                                  staticClass: "fas fa-shopping-bag mr-1"
                                }),
                                _vm._v(
                                  "\n              " +
                                    _vm._s(_vm.strBuy) +
                                    "\n            "
                                )
                              ]
                            )
                          ])
                        ],
                        2
                      )
                    ],
                _vm._v(" "),
                _vm._t("footer")
              ],
              2
            )
          : _vm._e()
      ]),
      _vm._v(" "),
      _vm.isLoading
        ? [
            _vm._t("default"),
            _vm._v(" "),
            _vm.error
              ? _c(
                  "div",
                  {
                    staticClass: "alert alert-warning small",
                    attrs: { role: "alert" }
                  },
                  [_vm._v("\n      " + _vm._s(_vm.error) + "\n    ")]
                )
              : _vm._e()
          ]
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../widget-product-card/src/components/EcProductCard.vue":
/*!***************************************************************!*\
  !*** ../widget-product-card/src/components/EcProductCard.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _html_EcProductCard_html_vue_type_template_id_4172eace_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./html/EcProductCard.html?vue&type=template&id=4172eace&lang=html& */ "../widget-product-card/src/components/html/EcProductCard.html?vue&type=template&id=4172eace&lang=html&");
/* harmony import */ var _js_EcProductCard_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/EcProductCard.js?vue&type=script&lang=js& */ "../widget-product-card/src/components/js/EcProductCard.js?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _scss_EcProductCard_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scss/EcProductCard.scss?vue&type=style&index=0&lang=scss& */ "../widget-product-card/src/components/scss/EcProductCard.scss?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _storefront_template_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../storefront-template/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_storefront_template_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _js_EcProductCard_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _html_EcProductCard_html_vue_type_template_id_4172eace_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _html_EcProductCard_html_vue_type_template_id_4172eace_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "widget-product-card/src/components/EcProductCard.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "../widget-product-card/src/components/html/EcProductCard.html?vue&type=template&id=4172eace&lang=html&":
/*!**************************************************************************************************************!*\
  !*** ../widget-product-card/src/components/html/EcProductCard.html?vue&type=template&id=4172eace&lang=html& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storefront_framework_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_EcProductCard_html_vue_type_template_id_4172eace_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../storefront-framework/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./EcProductCard.html?vue&type=template&id=4172eace&lang=html& */ "../storefront-framework/node_modules/vue-loader/lib/loaders/templateLoader.js?!../widget-product-card/src/components/html/EcProductCard.html?vue&type=template&id=4172eace&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _storefront_framework_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_EcProductCard_html_vue_type_template_id_4172eace_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _storefront_framework_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_EcProductCard_html_vue_type_template_id_4172eace_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "../widget-product-card/src/components/js/EcProductCard.js?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ../widget-product-card/src/components/js/EcProductCard.js?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storefront_template_node_modules_babel_loader_lib_index_js_ref_1_EcProductCard_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../storefront-template/node_modules/babel-loader/lib??ref--1!./EcProductCard.js?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!../widget-product-card/src/components/js/EcProductCard.js?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_storefront_template_node_modules_babel_loader_lib_index_js_ref_1_EcProductCard_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "../widget-product-card/src/components/scss/EcProductCard.scss?vue&type=style&index=0&lang=scss&":
/*!*******************************************************************************************************!*\
  !*** ../widget-product-card/src/components/scss/EcProductCard.scss?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcProductCard_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../storefront-framework/node_modules/mini-css-extract-plugin/dist/loader.js!../../../../storefront-template/node_modules/css-loader/dist/cjs.js!../../../../storefront-framework/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../storefront-template/node_modules/postcss-loader/src??postcss!../../../../storefront-template/node_modules/sass-loader/dist/cjs.js??ref--0-3!./EcProductCard.scss?vue&type=style&index=0&lang=scss& */ "../storefront-framework/node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../storefront-framework/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!../widget-product-card/src/components/scss/EcProductCard.scss?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcProductCard_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcProductCard_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcProductCard_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcProductCard_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcProductCard_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "../widget-product-card/src/index.js":
/*!*******************************************!*\
  !*** ../widget-product-card/src/index.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "../../../node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.filter */ "../../../node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.find */ "../../../node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "../../../node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.index-of */ "../../../node_modules/core-js/modules/es.array.index-of.js");
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_sort__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.sort */ "../../../node_modules/core-js/modules/es.array.sort.js");
/* harmony import */ var core_js_modules_es_array_sort__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_sort__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor */ "../../../node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors */ "../../../node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.object.keys */ "../../../node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "../../../node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.promise */ "../../../node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.promise.finally */ "../../../node_modules/core-js/modules/es.promise.finally.js");
/* harmony import */ var core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "../../../node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! vue */ "../../../node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var lozad__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! lozad */ "../../../node_modules/lozad/dist/lozad.es.js");
/* harmony import */ var _ecomplus_storefront_twbs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ecomplus/storefront-twbs */ "../../../node_modules/@ecomplus/storefront-twbs/dist/storefront-twbs.min.js");
/* harmony import */ var _ecomplus_storefront_twbs__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_ecomplus_storefront_twbs__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _ecomplus_search_engine__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ecomplus/search-engine */ "../../../node_modules/@ecomplus/search-engine/src/index.js");
/* harmony import */ var _components_EcProductCard_vue__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/EcProductCard.vue */ "../widget-product-card/src/components/EcProductCard.vue");














function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * @ecomplus/widget-product-card
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */





/* harmony default export */ __webpack_exports__["default"] = (function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var elClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'product-card';

  var setupComponent = function setupComponent($productCard, productId, sku, product, isLoaded) {
    new vue__WEBPACK_IMPORTED_MODULE_13__["default"]({
      render: function render(h) {
        return h(_components_EcProductCard_vue__WEBPACK_IMPORTED_MODULE_17__["default"], {
          class: elClass,
          attrs: {
            'data-product-id': productId,
            'data-sku': sku
          },
          props: _objectSpread({}, options.props, {
            productId: productId,
            product: product,
            isLoaded: isLoaded
          }),
          scopedSlots: {
            default: function _default() {
              return h('div', {
                domProps: {
                  innerHTML: $productCard.outerHTML
                }
              });
            }
          }
        });
      }
    }).$mount($productCard);
  };

  var $productCards = document.querySelectorAll(".".concat(elClass));
  var productIds = [];

  for (var i = 0; i < $productCards.length; i++) {
    if ($productCards[i]) {
      var productId = $productCards[i].dataset.productId;

      if (productIds.indexOf(productId) === -1) {
        productIds.push(productId);
      }
    }
  }

  var preFetchPromise;

  if (productIds.length >= 6 && productIds.length <= 70 && !options.skipSearchApi) {
    var search = new _ecomplus_search_engine__WEBPACK_IMPORTED_MODULE_16__["default"]();
    delete search.dsl.aggs;
    delete search.dsl.sort;
    search.setPageSize(productIds.length).setProductIds(productIds);
    preFetchPromise = search.fetch({
      timeout: 5000
    }).then(function () {
      var items = search.getItems();

      for (var _i = 0; _i < 2; _i++) {
        load($productCards[_i]);
      }

      return items;
    }).catch(function (err) {
      console.error(err);
    });
  } else {
    preFetchPromise = Promise.resolve();
  }

  var load = function load($productCard) {
    if ($productCard) {
      var _$productCard$dataset = $productCard.dataset,
          _productId = _$productCard$dataset.productId,
          sku = _$productCard$dataset.sku,
          toRender = _$productCard$dataset.toRender;

      if (toRender) {
        var product;
        preFetchPromise.then(function (items) {
          if (Array.isArray(items)) {
            product = items.find(function (_ref) {
              var _id = _ref._id;
              return _id === _productId;
            });
          }
        }).finally(function () {
          var isLoaded;

          if (product) {
            isLoaded = true;
          } else {
            var $parent = $productCard.parentNode;

            if ($parent) {
              product = $parent.dataset.product;

              if (typeof product === 'string') {
                try {
                  product = JSON.parse(product);
                } catch (e) {
                  product = undefined;
                }
              }
            }
          }

          setupComponent($productCard, _productId, sku, product, isLoaded);
        });
      }
    }
  };

  var observer = Object(lozad__WEBPACK_IMPORTED_MODULE_14__["default"])($productCards, {
    load: load
  });
  observer.observe();
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!../widget-product-card/src/components/js/EcProductCard.js?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--1!../widget-product-card/src/components/js/EcProductCard.js?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.number.constructor */ "../../../node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.assign */ "../../../node_modules/core-js/modules/es.object.assign.js");
/* harmony import */ var core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "../../../node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.promise */ "../../../node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.promise.finally */ "../../../node_modules/core-js/modules/es.promise.finally.js");
/* harmony import */ var core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ecomplus_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ecomplus/utils */ "../../../node_modules/@ecomplus/utils/src/index.js");
/* harmony import */ var _ecomplus_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ecomplus/client */ "../../../node_modules/@ecomplus/client/src/index.js");
/* harmony import */ var _ecomplus_shopping_cart__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ecomplus/shopping-cart */ "../../../node_modules/@ecomplus/shopping-cart/src/index.js");
/* harmony import */ var _ecomplus_widget_product_src_lib_dictionary__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ecomplus/widget-product/src/lib/dictionary */ "../../../node_modules/@ecomplus/widget-product/src/lib/dictionary.js");
/* harmony import */ var _ecomplus_widget_product_src_components_EcImage_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ecomplus/widget-product/src/components/EcImage.vue */ "../../../node_modules/@ecomplus/widget-product/src/components/EcImage.vue");
/* harmony import */ var _ecomplus_widget_product_src_components_EcPrices_vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ecomplus/widget-product/src/components/EcPrices.vue */ "../../../node_modules/@ecomplus/widget-product/src/components/EcPrices.vue");











/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'EcProductCard',
  components: {
    EcImage: _ecomplus_widget_product_src_components_EcImage_vue__WEBPACK_IMPORTED_MODULE_9__["default"],
    EcPrices: _ecomplus_widget_product_src_components_EcPrices_vue__WEBPACK_IMPORTED_MODULE_10__["default"]
  },
  props: {
    lang: {
      type: String,
      default: _ecomplus_utils__WEBPACK_IMPORTED_MODULE_5__["$ecomConfig"].get('lang')
    },
    storeId: {
      type: Number,
      default: _ecomplus_utils__WEBPACK_IMPORTED_MODULE_5__["$ecomConfig"].get('store_id')
    },
    productId: String,
    product: Object,
    buyText: String,
    canAddToCart: {
      type: Boolean,
      default: true
    },
    isLoaded: Boolean
  },
  data: function data() {
    return {
      body: {},
      isLoading: false,
      error: ''
    };
  },
  computed: {
    strBuy: function strBuy() {
      return this.buyText || this.dictionary('buy');
    },
    isActive: function isActive() {
      var body = this.body;
      return body.available && body.visible && Object(_ecomplus_utils__WEBPACK_IMPORTED_MODULE_5__["inStock"])(body);
    },
    discount: function discount() {
      var body = this.body;
      return Object(_ecomplus_utils__WEBPACK_IMPORTED_MODULE_5__["onPromotion"])(body) ? Math.round((body.base_price - Object(_ecomplus_utils__WEBPACK_IMPORTED_MODULE_5__["price"])(body)) * 100 / body.base_price) : 0;
    }
  },
  methods: {
    dictionary: _ecomplus_widget_product_src_lib_dictionary__WEBPACK_IMPORTED_MODULE_8__["default"],
    name: _ecomplus_utils__WEBPACK_IMPORTED_MODULE_5__["name"],
    inStock: _ecomplus_utils__WEBPACK_IMPORTED_MODULE_5__["inStock"],
    setBody: function setBody(data) {
      this.body = Object.assign({}, data);
      delete this.body.body_html;
      delete this.body.body_text;
    },
    fetchItem: function fetchItem() {
      var _this = this;

      if (this.productId) {
        this.isLoading = true;
        var storeId = this.storeId,
            productId = this.productId;
        Object(_ecomplus_client__WEBPACK_IMPORTED_MODULE_6__["store"])({
          url: "/products/".concat(productId, ".json"),
          storeId: storeId
        }).then(function (_ref) {
          var data = _ref.data;

          _this.$emit('update:product', data);

          _this.setBody(data);

          _this.$emit('update:is-loaded', true);
        }).catch(function (err) {
          console.error(err);

          if (!_this.body.name || !_this.body.slug || !_this.body.pictures) {
            _this.error = _this.lang === 'pt_br' ? 'Erro de conexão, clique no produto para tentar novamente' : 'Connection error, click product to try again';
          }
        }).finally(function () {
          _this.isLoading = false;
        });
      }
    },
    buy: function buy() {
      var product = this.body;
      this.$emit('buy', {
        product: product
      });

      if (this.canAddToCart) {
        var variations = product.variations,
            slug = product.slug;

        if (variations && variations.length) {
          window.location = "/".concat(slug);
        } else {
          _ecomplus_shopping_cart__WEBPACK_IMPORTED_MODULE_7__["default"].addProduct(product);
        }
      }
    }
  },
  created: function created() {
    if (this.product) {
      this.setBody(this.product);

      if (this.product.available === undefined) {
        this.body.available = true;
      }

      if (this.product.visible === undefined) {
        this.body.visible = true;
      }
    }

    if (!this.isLoaded) {
      this.fetchItem();
    }
  }
});

/***/ }),

/***/ "./template/js/lib/load-widgets.js":
/*!*****************************************!*\
  !*** ./template/js/lib/load-widgets.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.promise.finally */ "./node_modules/core-js/modules/es.promise.finally.js");
/* harmony import */ var core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_string_starts_with__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.string.starts-with */ "./node_modules/core-js/modules/es.string.starts-with.js");
/* harmony import */ var core_js_modules_es_string_starts_with__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_starts_with__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./emitter */ "./template/js/lib/emitter.js");
/* harmony import */ var _ecomplus_client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ecomplus/client */ "./node_modules/@ecomplus/client/src/index.js");
/* harmony import */ var _ecomplus_search_engine__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ecomplus/search-engine */ "./node_modules/@ecomplus/search-engine/src/index.js");
/* harmony import */ var _ecomplus_passport_client__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ecomplus/passport-client */ "./node_modules/@ecomplus/passport-client/src/index.js");
/* harmony import */ var _ecomplus_shopping_cart__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ecomplus/shopping-cart */ "./node_modules/@ecomplus/shopping-cart/src/index.js");
/* harmony import */ var _ecomplus_widget_product_card__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ecomplus/widget-product-card */ "../widget-product-card/src/index.js");













window.ecomClient = _ecomplus_client__WEBPACK_IMPORTED_MODULE_8__["default"];
window.EcomSearch = _ecomplus_search_engine__WEBPACK_IMPORTED_MODULE_9__["default"];
window.ecomPassport = _ecomplus_passport_client__WEBPACK_IMPORTED_MODULE_10__["default"];
window.ecomCart = _ecomplus_shopping_cart__WEBPACK_IMPORTED_MODULE_11__["default"];
_emitter__WEBPACK_IMPORTED_MODULE_7__["default"].emit('ecom:ready');
var isCheckout = window.location.pathname.startsWith('/app/');
var isMobile = window.screen.width < 768;
var widgetsLoadPromises = [];
var widgetsMsDelay = window.location.hostname === 'localhost' ? 50 : 1;

var loadWidget = function loadWidget(pkg, runImport) {
  var waitWidgetResolve = new Promise(function (resolve) {
    setTimeout(function () {
      var widget = window._widgets && window._widgets[pkg];

      if (widget) {
        var active = widget.active,
            options = widget.options,
            desktopOnly = widget.desktopOnly,
            enableCheckout = widget.enableCheckout,
            disablePages = widget.disablePages;

        if (active && (!desktopOnly || !isMobile) && (isCheckout ? enableCheckout : !disablePages)) {
          return runImport().then(function (exp) {
            if (typeof exp.default === 'function') {
              exp.default(options);
            }

            _emitter__WEBPACK_IMPORTED_MODULE_7__["default"].emit("widget:".concat(pkg));
            console.log("Widget loaded: ".concat(pkg));
          }).catch(console.error).finally(resolve);
        }
      }

      resolve();
    }, widgetsMsDelay);
  });
  widgetsLoadPromises.push(waitWidgetResolve);
};

if (!isCheckout) {
  var resource = document.body.dataset.resource;

  if (resource && resource.startsWith('product')) {
    loadWidget('@ecomplus/widget-product', function () {
      return Promise.all(/*! import() */[__webpack_require__.e(11), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, /*! @ecomplus/widget-product */ "../widget-product/src/index.js"));
    });
  } else if (document.getElementById('search')) {
    loadWidget('@ecomplus/widget-search-engine', function () {
      return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(10), __webpack_require__.e(6)]).then(__webpack_require__.bind(null, /*! @ecomplus/widget-search-engine */ "../widget-search-engine/src/index.js"));
    });
  }
}

Promise.all(widgetsLoadPromises).then(function () {
  loadWidget('@ecomplus/widget-product-card', function () {
    return Promise.resolve({
      default: _ecomplus_widget_product_card__WEBPACK_IMPORTED_MODULE_12__["default"]
    });
  });

  if (!isCheckout) {
    loadWidget('@ecomplus/widget-user', function () {
      return Promise.all(/*! import() */[__webpack_require__.e(3), __webpack_require__.e(8)]).then(__webpack_require__.bind(null, /*! @ecomplus/widget-user */ "../widget-user/src/index.js"));
    });
    loadWidget('@ecomplus/widget-search', function () {
      return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(7)]).then(__webpack_require__.bind(null, /*! @ecomplus/widget-search */ "../widget-search/src/index.js"));
    });
    loadWidget('@ecomplus/widget-minicart', function () {
      return __webpack_require__.e(/*! import() */ 4).then(__webpack_require__.bind(null, /*! @ecomplus/widget-minicart */ "../widget-minicart/src/index.js"));
    });
  }

  Promise.all(widgetsLoadPromises).then(function () {
    loadWidget('@ecomplus/widget-tag-manager', function () {
      return __webpack_require__.e(/*! import() */ 9).then(__webpack_require__.bind(null, /*! @ecomplus/widget-tag-manager */ "../widget-tag-manager/src/index.js"));
    });
    loadWidget('@ecomplus/widget-fb-pixel', function () {
      return __webpack_require__.e(/*! import() */ 13).then(__webpack_require__.bind(null, /*! @ecomplus/widget-fb-pixel */ "../widget-fb-pixel/src/index.js"));
    });
    loadWidget('@ecomplus/widget-trustvox', function () {
      return __webpack_require__.e(/*! import() */ 12).then(__webpack_require__.bind(null, /*! @ecomplus/widget-trustvox */ "../widget-truxtvox/src/index.js"));
    });
  });
});

/***/ })

},0,[0,10,6,11,2]]);
//# sourceMappingURL=a267df41583df8eab87c.js.map