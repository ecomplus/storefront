(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "../storefront-framework/node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../storefront-framework/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!../widget-search/src/components/scss/EcSearch.scss?vue&type=style&index=0&lang=scss&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../storefront-framework/node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../storefront-framework/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??postcss!./node_modules/sass-loader/dist/cjs.js??ref--0-3!../widget-search/src/components/scss/EcSearch.scss?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../storefront-framework/node_modules/vue-loader/lib/loaders/templateLoader.js?!../widget-search/src/components/html/EcSearch.html?vue&type=template&id=9a6ba850&lang=html&":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ../storefront-framework/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../widget-search/src/components/html/EcSearch.html?vue&type=template&id=9a6ba850&lang=html& ***!
  \*****************************************************************************************************************************************************************************************************/
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
    { staticClass: "ec-search" },
    [
      _vm._t("input", [
        _c("input", { staticClass: "form-control", attrs: { type: "search" } })
      ]),
      _vm._v(" "),
      _vm.elInput
        ? [
            _c(
              "b-popover",
              {
                attrs: {
                  triggers: "focus",
                  "custom-class": "ec-search__popover",
                  target: _vm.elInput.id,
                  show: _vm.showPopover,
                  placement: _vm.popoverPlacement,
                  "fallback-placement": [_vm.popoverPlacement]
                },
                on: {
                  "update:show": function($event) {
                    _vm.showPopover = $event
                  }
                }
              },
              [
                _c("div", { staticClass: "ec-search__head" }, [
                  _c(
                    "div",
                    [
                      _vm.searching
                        ? _c(
                            "div",
                            {
                              staticClass: "spinner-border m-4",
                              attrs: { role: "status" }
                            },
                            [
                              _c("span", { staticClass: "sr-only" }, [
                                _vm._v("Loading...")
                              ])
                            ]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _c(
                        "transition",
                        { attrs: { "enter-active-class": "animated fadeIn" } },
                        [
                          !_vm.searching && _vm.searchedTerm
                            ? _c(
                                "div",
                                { staticClass: "ec-search__info" },
                                [
                                  _vm.suggestedTerm
                                    ? [
                                        _vm._v(
                                          "\n                " +
                                            _vm._s(
                                              _vm.dictionary("did_you_mean")
                                            ) +
                                            "\n                "
                                        ),
                                        _c("a", {
                                          staticClass: "ec-search__suggestion",
                                          attrs: { href: "#" },
                                          domProps: {
                                            textContent: _vm._s(
                                              _vm.suggestedTerm
                                            )
                                          },
                                          on: {
                                            click: function($event) {
                                              $event.preventDefault()
                                              return _vm.setSearchTerm(
                                                _vm.suggestedTerm
                                              )
                                            }
                                          }
                                        }),
                                        _vm._v(
                                          "\n                ?\n              "
                                        )
                                      ]
                                    : _vm._e(),
                                  _vm._v(" "),
                                  !_vm.totalSearchResults
                                    ? _c(
                                        "span",
                                        {
                                          staticClass: "ec-search__no-results"
                                        },
                                        [
                                          _vm._v(
                                            "\n                " +
                                              _vm._s(
                                                _vm.dictionary("no_results_for")
                                              ) +
                                              "\n                "
                                          ),
                                          _c("em", [
                                            _vm._v(_vm._s(_vm.searchedTerm))
                                          ])
                                        ]
                                      )
                                    : _c(
                                        "span",
                                        {
                                          staticClass:
                                            "ec-search__count-results"
                                        },
                                        [
                                          _c("strong", [
                                            _vm._v(
                                              _vm._s(_vm.totalSearchResults)
                                            )
                                          ]),
                                          _vm._v(
                                            "\n                " +
                                              _vm._s(
                                                _vm.dictionary(
                                                  "total_results_for"
                                                )
                                              ) +
                                              "\n                "
                                          ),
                                          _c("em", [
                                            _vm._v(_vm._s(_vm.searchedTerm))
                                          ]),
                                          _vm._v(" "),
                                          _vm.totalSearchResults > _vm.maxItems
                                            ? _c("a", {
                                                attrs: { href: "#" },
                                                domProps: {
                                                  textContent: _vm._s(
                                                    "+" +
                                                      _vm.dictionary("see_all")
                                                  )
                                                },
                                                on: {
                                                  click: function($event) {
                                                    $event.preventDefault()
                                                    return _vm.setSearchTerm(
                                                      _vm.searchedTerm
                                                    )
                                                  }
                                                }
                                              })
                                            : _vm._e()
                                        ]
                                      )
                                ],
                                2
                              )
                            : _vm._e()
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "transition",
                        {
                          attrs: { "enter-active-class": "animated fadeInLeft" }
                        },
                        [
                          _vm.history.length
                            ? _c(
                                "div",
                                { staticClass: "ec-search__history" },
                                [
                                  _c("i", { staticClass: "fas fa-history" }),
                                  _vm._v(" "),
                                  _vm._l(_vm.history, function(term) {
                                    return _c("a", {
                                      staticClass: "ec-search__history__link",
                                      attrs: { href: "#" },
                                      domProps: { textContent: _vm._s(term) },
                                      on: {
                                        click: function($event) {
                                          $event.preventDefault()
                                          return _vm.setSearchTerm(term)
                                        }
                                      }
                                    })
                                  })
                                ],
                                2
                              )
                            : _vm._e()
                        ]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn ec-search__close",
                      attrs: { type: "button" },
                      on: {
                        click: function($event) {
                          _vm.showPopover = false
                        }
                      }
                    },
                    [_c("i", { staticClass: "fas fa-times" })]
                  )
                ]),
                _vm._v(" "),
                _c(
                  "transition",
                  { attrs: { "enter-active-class": "animated fadeIn slow" } },
                  [
                    !_vm.searching && _vm.suggestedItems.length
                      ? _c(
                          "div",
                          { staticClass: "ec-search__items" },
                          _vm._l(_vm.suggestedItems, function(product) {
                            return _c("ec-product-card", {
                              key: product._id,
                              staticClass: "ec-search__item",
                              attrs: {
                                lang: _vm.lang,
                                storeId: _vm.storeId,
                                product: product
                              }
                            })
                          }),
                          1
                        )
                      : _vm._e()
                  ]
                )
              ],
              1
            )
          ]
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../widget-search/src/components/EcSearch.vue":
/*!****************************************************!*\
  !*** ../widget-search/src/components/EcSearch.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _html_EcSearch_html_vue_type_template_id_9a6ba850_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./html/EcSearch.html?vue&type=template&id=9a6ba850&lang=html& */ "../widget-search/src/components/html/EcSearch.html?vue&type=template&id=9a6ba850&lang=html&");
/* harmony import */ var _js_EcSearch_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/EcSearch.js?vue&type=script&lang=js& */ "../widget-search/src/components/js/EcSearch.js?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _scss_EcSearch_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scss/EcSearch.scss?vue&type=style&index=0&lang=scss& */ "../widget-search/src/components/scss/EcSearch.scss?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _storefront_template_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../storefront-template/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_storefront_template_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _js_EcSearch_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _html_EcSearch_html_vue_type_template_id_9a6ba850_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _html_EcSearch_html_vue_type_template_id_9a6ba850_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "widget-search/src/components/EcSearch.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "../widget-search/src/components/html/EcSearch.html?vue&type=template&id=9a6ba850&lang=html&":
/*!***************************************************************************************************!*\
  !*** ../widget-search/src/components/html/EcSearch.html?vue&type=template&id=9a6ba850&lang=html& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storefront_framework_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_EcSearch_html_vue_type_template_id_9a6ba850_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../storefront-framework/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./EcSearch.html?vue&type=template&id=9a6ba850&lang=html& */ "../storefront-framework/node_modules/vue-loader/lib/loaders/templateLoader.js?!../widget-search/src/components/html/EcSearch.html?vue&type=template&id=9a6ba850&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _storefront_framework_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_EcSearch_html_vue_type_template_id_9a6ba850_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _storefront_framework_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_EcSearch_html_vue_type_template_id_9a6ba850_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "../widget-search/src/components/js/EcSearch.js?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ../widget-search/src/components/js/EcSearch.js?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storefront_template_node_modules_babel_loader_lib_index_js_ref_1_EcSearch_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../storefront-template/node_modules/babel-loader/lib??ref--1!./EcSearch.js?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!../widget-search/src/components/js/EcSearch.js?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_storefront_template_node_modules_babel_loader_lib_index_js_ref_1_EcSearch_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "../widget-search/src/components/scss/EcSearch.scss?vue&type=style&index=0&lang=scss&":
/*!********************************************************************************************!*\
  !*** ../widget-search/src/components/scss/EcSearch.scss?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcSearch_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../storefront-framework/node_modules/mini-css-extract-plugin/dist/loader.js!../../../../storefront-template/node_modules/css-loader/dist/cjs.js!../../../../storefront-framework/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../storefront-template/node_modules/postcss-loader/src??postcss!../../../../storefront-template/node_modules/sass-loader/dist/cjs.js??ref--0-3!./EcSearch.scss?vue&type=style&index=0&lang=scss& */ "../storefront-framework/node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../storefront-framework/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!../widget-search/src/components/scss/EcSearch.scss?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcSearch_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcSearch_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcSearch_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcSearch_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcSearch_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "../widget-search/src/index.js":
/*!*************************************!*\
  !*** ../widget-search/src/index.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "../../../node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _ecomplus_storefront_twbs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ecomplus/storefront-twbs */ "../../../node_modules/@ecomplus/storefront-twbs/dist/storefront-twbs.min.js");
/* harmony import */ var _ecomplus_storefront_twbs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ecomplus_storefront_twbs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_EcSearch_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/EcSearch.vue */ "../widget-search/src/components/EcSearch.vue");
/*!
 * @ecomplus/widget-search
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */



/* harmony default export */ __webpack_exports__["default"] = (function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var elId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'search-input';
  var $searchInput = document.getElementById(elId);

  if ($searchInput) {
    var attrs = {};

    for (var i = $searchInput.attributes.length - 1; i >= 0; i--) {
      var _$searchInput$attribu = $searchInput.attributes[i],
          name = _$searchInput$attribu.name,
          value = _$searchInput$attribu.value;
      attrs[name] = value;
    }

    new vue__WEBPACK_IMPORTED_MODULE_0__["default"]({
      render: function render(h) {
        return h(_components_EcSearch_vue__WEBPACK_IMPORTED_MODULE_2__["default"], {
          props: options.props,
          scopedSlots: {
            input: function input() {
              return h('input', {
                attrs: attrs
              });
            }
          }
        });
      }
    }).$mount($searchInput);
  }
});

/***/ }),

/***/ "../widget-search/src/lib/dictionary.js":
/*!**********************************************!*\
  !*** ../widget-search/src/lib/dictionary.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var dictionary = {
  did_you_mean: {
    en_us: 'Did you mean',
    pt_br: 'Você quis dizer'
  },
  no_results_for: {
    en_us: 'No results for',
    pt_br: 'Nenhum produto encontrado para'
  },
  total_results_for: {
    en_us: 'products found for',
    pt_br: 'produtos encontrados para'
  },
  see_all: {
    en_us: 'See all',
    pt_br: 'Ver todos'
  }
};
/* harmony default export */ __webpack_exports__["default"] = (function (word, lang) {
  if (!lang) {
    lang = this && this.lang || 'en_us';
  }

  return dictionary[word] && dictionary[word][lang] || '';
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!../widget-search/src/components/js/EcSearch.js?vue&type=script&lang=js&":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--1!../widget-search/src/components/js/EcSearch.js?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.filter */ "../../../node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "../../../node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.index-of */ "../../../node_modules/core-js/modules/es.array.index-of.js");
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.slice */ "../../../node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.number.constructor */ "../../../node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "../../../node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.promise */ "../../../node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.promise.finally */ "../../../node_modules/core-js/modules/es.promise.finally.js");
/* harmony import */ var core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ "../../../node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.string.replace */ "../../../node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "../../../node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _ecomplus_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ecomplus/utils */ "../../../node_modules/@ecomplus/utils/src/index.js");
/* harmony import */ var _ecomplus_search_engine__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ecomplus/search-engine */ "../../../node_modules/@ecomplus/search-engine/src/index.js");
/* harmony import */ var _lib_dictionary__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./../../lib/dictionary */ "../widget-search/src/lib/dictionary.js");
/* harmony import */ var _ecomplus_widget_product_card_src_components_EcProductCard_vue__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ecomplus/widget-product-card/src/components/EcProductCard.vue */ "../../../node_modules/@ecomplus/widget-product-card/src/components/EcProductCard.vue");















/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'EcSearch',
  components: {
    EcProductCard: _ecomplus_widget_product_card_src_components_EcProductCard_vue__WEBPACK_IMPORTED_MODULE_14__["default"]
  },
  props: {
    lang: {
      type: String,
      default: _ecomplus_utils__WEBPACK_IMPORTED_MODULE_11__["_config"].get('lang')
    },
    storeId: {
      type: Number,
      default: _ecomplus_utils__WEBPACK_IMPORTED_MODULE_11__["_config"].get('store_id')
    },
    term: {
      type: String,
      default: ''
    },
    maxItems: {
      type: Number,
      default: 4
    },
    autoFixScore: {
      type: [Number, Boolean],
      default: 0.83
    },
    popoverPlacement: {
      type: String,
      default: 'bottom'
    }
  },
  data: function data() {
    return {
      ecomSearch: new _ecomplus_search_engine__WEBPACK_IMPORTED_MODULE_12__["default"](this.storeId),
      searchTerm: this.term,
      searchedTerm: null,
      searching: false,
      suggestedItems: [],
      suggestedTerm: '',
      totalSearchResults: 0,
      elInput: null,
      showPopover: false
    };
  },
  computed: {
    history: function history() {
      var _this = this;

      return this.ecomSearch.history.filter(function (term) {
        return term.length > 2 && _this.searchTerm.indexOf(term) === -1;
      }).slice(0, 5);
    }
  },
  methods: {
    dictionary: _lib_dictionary__WEBPACK_IMPORTED_MODULE_13__["default"],
    setSearchTerm: function setSearchTerm(term) {
      this.elInput.value = term;
      var $form = this.$el.parentElement;

      if ($form && $form.tagName === 'FORM') {
        $form.submit();
      } else {
        this.searchTerm = term;
      }
    },
    checkCurrentTerm: function checkCurrentTerm(term) {
      return !term && !this.elInput.value || this.elInput.value === term;
    },
    handleSuggestions: function handleSuggestions(term) {
      var _this2 = this;

      var suggestTerm = term;
      var autoFix = false;
      this.suggestedTerm = '';
      this.ecomSearch.getTermSuggestions().forEach(function (_ref) {
        var options = _ref.options,
            text = _ref.text;

        if (options.length) {
          var opt = options[0];

          if (!_this2.totalSearchResults && _this2.autoFixScore > 0 && opt.score >= _this2.autoFixScore && opt.text.indexOf(term) === -1) {
            autoFix = true;
          }

          suggestTerm = suggestTerm.replace(text, opt.text);
        }
      });

      if (suggestTerm !== term) {
        if (autoFix) {
          this.elInput.value = this.searchTerm = suggestTerm;
        } else {
          this.suggestedTerm = suggestTerm;
        }

        this.ecomSearch.history.shift();
      }
    },
    fetchItems: function fetchItems(term) {
      var _this3 = this;

      var ecomSearch = this.ecomSearch;

      if (term !== false) {
        if (!term) {
          term = this.searchTerm;
        }

        ecomSearch.setSearchTerm(term);
      } else {
        ecomSearch.reset().setPageSize(this.maxItems);
      }

      this.searching = true;
      ecomSearch.fetch().then(function () {
        if (_this3.checkCurrentTerm(term)) {
          var getItems = ecomSearch.getItems,
              getTotalCount = ecomSearch.getTotalCount;
          _this3.searchedTerm = term;
          _this3.suggestedItems = getItems();
          _this3.totalSearchResults = getTotalCount();

          _this3.handleSuggestions(term);
        }
      }).catch(function (err) {
        console.error(err);
      }).finally(function () {
        _this3.searching = false;
      });
    },
    instantSearch: function instantSearch(term) {
      var _this4 = this;

      if (this.searchedTerm === null) {
        this.fetchItems(term);
      } else if (this.searchedTerm !== term) {
        this.showPopover = false;
        setTimeout(function () {
          if (_this4.checkCurrentTerm(term)) {
            _this4.fetchItems(term);
          }

          setTimeout(function () {
            if (_this4.checkCurrentTerm(term)) {
              _this4.showPopover = true;
            }
          }, 100);
        }, 400);
      }
    }
  },
  created: function created() {
    var _this5 = this;

    var onScrollTimer;
    var lastScrollOffset = window.pageYOffset;
    window.addEventListener('scroll', function () {
      clearTimeout(onScrollTimer);
      onScrollTimer = setTimeout(function () {
        if (Math.abs(window.pageYOffset - lastScrollOffset) > 50) {
          if (_this5.elInput === document.activeElement) {
            _this5.elInput.blur();
          }
        }

        lastScrollOffset = window.pageYOffset;
      }, 50);
    });
    this.ecomSearch.setPageSize(this.maxItems);
  },
  mounted: function mounted() {
    var _this6 = this;

    var $input;

    for (var i = 0; i < this.$el.childNodes.length; i++) {
      if (this.$el.childNodes[0].tagName === 'INPUT') {
        $input = this.$el.childNodes[0];
        break;
      }
    }

    if ($input) {
      $input.addEventListener('keyup', function (ev) {
        _this6.searchTerm = $input.value;

        if (!_this6.showPopover) {
          _this6.showPopover = true;
        }
      });
      $input.addEventListener('focus', function (ev) {
        if (!_this6.totalSearchResults) {
          _this6.instantSearch(false);
        }
      });

      if (!this.term) {
        this.searchTerm = $input.value;
      } else {
        this.fetchItems();
      }

      $input.setAttribute('autocomplete', 'off');
      this.elInput = $input;
    } else {
      this.fetchItems();
    }
  },
  watch: {
    searchTerm: function searchTerm(term) {
      if (term) {
        if (term.length > 2) {
          this.instantSearch(term);
        }
      } else {
        this.instantSearch(false);
      }
    }
  }
});

/***/ })

}]);
//# sourceMappingURL=2f267fbfc8f2545ed964.js.map