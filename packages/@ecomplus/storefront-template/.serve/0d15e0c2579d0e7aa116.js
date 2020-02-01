(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "../storefront-framework/node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../storefront-framework/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!../widget-search-engine/src/components/scss/EcSearchEngine.scss?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../storefront-framework/node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../storefront-framework/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??postcss!./node_modules/sass-loader/dist/cjs.js??ref--0-3!../widget-search-engine/src/components/scss/EcSearchEngine.scss?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../storefront-framework/node_modules/vue-loader/lib/loaders/templateLoader.js?!../widget-search-engine/src/components/html/EcSearchEngine.html?vue&type=template&id=230e7113&lang=html&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ../storefront-framework/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../widget-search-engine/src/components/html/EcSearchEngine.html?vue&type=template&id=230e7113&lang=html& ***!
  \******************************************************************************************************************************************************************************************************************/
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
    "section",
    { staticClass: "ec-search-engine" },
    [
      _c(
        "nav",
        { ref: "nav" },
        [_c("portal-target", { attrs: { name: "search-nav" } })],
        1
      ),
      _vm._v(" "),
      _c(
        "portal",
        { attrs: { to: "search-nav" } },
        [
          _c(
            "transition",
            { attrs: { "enter-active-class": "animated fadeInDown fast" } },
            [
              _vm.searched &&
              (_vm.searching ||
                _vm.totalSearchResults > 8 ||
                _vm.hasSelectedOptions)
                ? _c(
                    "div",
                    { staticClass: "ec-search-engine__nav" },
                    [
                      _vm._t(
                        "nav",
                        [
                          _c("div", { staticClass: "container" }, [
                            _c("div", { staticClass: "row" }, [
                              _c("div", { staticClass: "col-auto" }, [
                                _c(
                                  "div",
                                  { staticClass: "ec-search-engine__count" },
                                  [
                                    _c("strong", [
                                      _vm._v(_vm._s(_vm.totalSearchResults))
                                    ]),
                                    _vm._v(
                                      "\n                  " +
                                        _vm._s(_vm.dictionary("items")) +
                                        "\n                  "
                                    ),
                                    _vm.searching
                                      ? _c(
                                          "div",
                                          {
                                            staticClass:
                                              "spinner-grow ec-search-engine__spinner",
                                            attrs: { role: "status" }
                                          },
                                          [
                                            _c(
                                              "span",
                                              { staticClass: "sr-only" },
                                              [_vm._v("Loading...")]
                                            )
                                          ]
                                        )
                                      : _vm._e()
                                  ]
                                )
                              ]),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "text-right col" },
                                [
                                  _vm.hasSelectedOptions ||
                                  _vm.filters.find(function(ref) {
                                    var filterObj = ref.filterObj

                                    return filterObj.options.length
                                  })
                                    ? _c(
                                        "button",
                                        {
                                          staticClass:
                                            "btn ec-search-engine__toggle",
                                          attrs: { type: "button" },
                                          on: {
                                            click: function($event) {
                                              return _vm.toggleFilters(true)
                                            }
                                          }
                                        },
                                        [
                                          _c("i", {
                                            staticClass: "fas fa-filter"
                                          }),
                                          _vm._v(
                                            "\n                  " +
                                              _vm._s(_vm.dictionary("filter")) +
                                              "\n                  "
                                          ),
                                          _c(
                                            "span",
                                            {
                                              staticClass: "d-none d-md-inline"
                                            },
                                            [
                                              _vm._v(
                                                "\n                    " +
                                                  _vm._s(
                                                    _vm.dictionary("results")
                                                  ) +
                                                  "\n                  "
                                              )
                                            ]
                                          )
                                        ]
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _c(
                                    "b-dropdown",
                                    {
                                      attrs: {
                                        variant: "link",
                                        "toggle-class":
                                          "ec-search-engine__toggle",
                                        right: "",
                                        "no-caret": ""
                                      },
                                      scopedSlots: _vm._u(
                                        [
                                          {
                                            key: "button-content",
                                            fn: function() {
                                              return [
                                                _c("i", {
                                                  staticClass: "fas fa-sort"
                                                }),
                                                _vm._v(" "),
                                                _c(
                                                  "span",
                                                  {
                                                    staticClass:
                                                      "d-none d-md-inline"
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n                      " +
                                                        _vm._s(
                                                          _vm.dictionary("sort")
                                                        ) +
                                                        "\n                    "
                                                    )
                                                  ]
                                                )
                                              ]
                                            },
                                            proxy: true
                                          }
                                        ],
                                        null,
                                        false,
                                        3593000133
                                      )
                                    },
                                    [
                                      _vm._v(" "),
                                      _vm._l(_vm.sortOptions, function(
                                        sortOption,
                                        index
                                      ) {
                                        return _c(
                                          "b-dropdown-item",
                                          {
                                            key: "sort-" + index,
                                            attrs: {
                                              href: "#",
                                              active:
                                                _vm.selectedSortOption ===
                                                sortOption
                                            },
                                            on: {
                                              click: function($event) {
                                                $event.preventDefault()
                                                return _vm.setSortOrder(
                                                  sortOption
                                                )
                                              }
                                            }
                                          },
                                          [
                                            _vm._v(
                                              "\n                    " +
                                                _vm._s(
                                                  _vm.dictionary(
                                                    sortOption || "relevance"
                                                  )
                                                ) +
                                                "\n                  "
                                            )
                                          ]
                                        )
                                      })
                                    ],
                                    2
                                  )
                                ],
                                1
                              )
                            ])
                          ])
                        ],
                        null,
                        {
                          totalSearchResults: _vm.totalSearchResults,
                          toggleFilters: _vm.toggleFilters
                        }
                      )
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
        "transition",
        {
          attrs: {
            "enter-active-class": "animated slideInRight",
            "leave-active-class": "animated slideOutRight"
          }
        },
        [
          _c(
            "aside",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.showFilters,
                  expression: "showFilters"
                }
              ],
              staticClass: "ec-search-engine__sidebar card shadow"
            },
            [
              _vm._t("filters", [
                _c("header", { staticClass: "card-header" }, [
                  _vm._v(
                    "\n          " +
                      _vm._s(_vm.dictionary("refine_search")) +
                      "\n          "
                  ),
                  _c(
                    "button",
                    {
                      staticClass: "close",
                      attrs: {
                        type: "button",
                        "aria-label": _vm.dictionary("close_filters")
                      },
                      on: {
                        click: function($event) {
                          return _vm.toggleFilters(false)
                        }
                      }
                    },
                    [
                      _c("span", { attrs: { "aria-hidden": "true" } }, [
                        _vm._v("×")
                      ])
                    ]
                  )
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "card-body" },
                  _vm._l(_vm.filters, function(ref) {
                    var filter = ref.filter
                    var filterObj = ref.filterObj
                    var isSpec = ref.isSpec
                    return filterObj.options.length
                      ? _c(
                          "div",
                          {
                            key: "filters-" + filter,
                            staticClass: "ec-search-engine__filter",
                            class: "ec-search-engine__filter--" + filter
                          },
                          [
                            _c(
                              "button",
                              {
                                staticClass:
                                  "btn ec-search-engine__filter__btn",
                                attrs: {
                                  type: "button",
                                  "aria-expanded": filterObj.show
                                    ? "true"
                                    : "false",
                                  "aria-controls": "collapse-" + filter
                                },
                                on: {
                                  click: function($event) {
                                    filterObj.show = !filterObj.show
                                  }
                                }
                              },
                              [
                                _c("i", { staticClass: "fas fa-chevron-down" }),
                                _vm._v(
                                  "\n              " +
                                    _vm._s(_vm.filterLabel(filter)) +
                                    "\n            "
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "b-collapse",
                              {
                                attrs: { id: "collapse-" + filter },
                                model: {
                                  value: filterObj.show,
                                  callback: function($$v) {
                                    _vm.$set(filterObj, "show", $$v)
                                  },
                                  expression: "filterObj.show"
                                }
                              },
                              _vm._l(filterObj.options, function(opt, index) {
                                return _c(
                                  "div",
                                  {
                                    key: filter + "-" + index,
                                    staticClass:
                                      "custom-control custom-checkbox ec-search-engine__option"
                                  },
                                  [
                                    _c("input", {
                                      staticClass: "custom-control-input",
                                      attrs: {
                                        type: "checkbox",
                                        id: filter + "-" + index
                                      },
                                      domProps: {
                                        checked:
                                          _vm.selectedOptions[filter].indexOf(
                                            opt.key
                                          ) > -1
                                      },
                                      on: {
                                        change: function(ev) {
                                          return _vm.setFilterOption(
                                            filter,
                                            opt.key,
                                            ev.target.checked
                                          )
                                        }
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "label",
                                      {
                                        staticClass: "custom-control-label",
                                        attrs: { for: filter + "-" + index }
                                      },
                                      [
                                        _vm._v(
                                          "\n                  " +
                                            _vm._s(opt.key) +
                                            "\n                  "
                                        ),
                                        !isSpec
                                          ? _c("small", [
                                              _vm._v(
                                                "\n                    (" +
                                                  _vm._s(opt.doc_count) +
                                                  ")\n                  "
                                              )
                                            ])
                                          : _vm._e()
                                      ]
                                    )
                                  ]
                                )
                              }),
                              0
                            )
                          ],
                          1
                        )
                      : _vm._e()
                  }),
                  0
                ),
                _vm._v(" "),
                _c("footer", { staticClass: "card-footer" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-sm btn-block btn-outline-secondary",
                      attrs: { type: "button" },
                      on: { click: _vm.clearFilters }
                    },
                    [
                      _c("span", { staticClass: "mr-1" }, [
                        _c("i", { staticClass: "fas fa-trash-alt" })
                      ]),
                      _vm._v(
                        "\n            " +
                          _vm._s(_vm.dictionary("clear_filters")) +
                          "\n          "
                      )
                    ]
                  )
                ])
              ])
            ],
            2
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "transition",
        { attrs: { "enter-active-class": "animated fadeIn slower" } },
        [
          _vm.searched
            ? _c(
                "div",
                {
                  staticClass: "ec-search-engine__results",
                  style: {
                    opacity: _vm.searching && !_vm.loadingMore ? 0.4 : 1
                  }
                },
                [
                  _c(
                    "div",
                    { staticClass: "ec-search-engine__info" },
                    [
                      _vm.term
                        ? [
                            _vm.emptyResult
                              ? _c(
                                  "div",
                                  {
                                    staticClass: "ec-search-engine__no-results"
                                  },
                                  [
                                    _c("div", { staticClass: "lead" }, [
                                      _vm._v(
                                        "\n              " +
                                          _vm._s(
                                            _vm.dictionary("no_results_for")
                                          ) +
                                          "\n              "
                                      ),
                                      _c("em", [_vm._v(_vm._s(_vm.term))])
                                    ]),
                                    _vm._v(" "),
                                    _c("h1", [
                                      _vm._v(
                                        _vm._s(
                                          _vm.dictionary("popular_products")
                                        )
                                      )
                                    ])
                                  ]
                                )
                              : _c(
                                  "div",
                                  { staticClass: "ec-search-engine__terms" },
                                  [
                                    _c("h1", [
                                      _c(
                                        "small",
                                        { staticClass: "d-none d-md-block" },
                                        [
                                          _vm._v(
                                            "\n                " +
                                              _vm._s(
                                                _vm.dictionary("searching_for")
                                              ) +
                                              ":\n              "
                                          )
                                        ]
                                      ),
                                      _vm._v(
                                        "\n              " +
                                          _vm._s(_vm.fixedTerm || _vm.term) +
                                          "\n            "
                                      )
                                    ]),
                                    _vm._v(" "),
                                    _vm.fixedTerm
                                      ? _c(
                                          "em",
                                          { staticClass: "d-none d-lg-block" },
                                          [
                                            _vm._v(
                                              "\n              " +
                                                _vm._s(
                                                  _vm.dictionary(
                                                    "no_results_for"
                                                  )
                                                ) +
                                                "\n              "
                                            ),
                                            _c("s", [_vm._v(_vm._s(_vm.term))])
                                          ]
                                        )
                                      : _vm._e()
                                  ]
                                )
                          ]
                        : _vm._e(),
                      _vm._v(" "),
                      _c(
                        "transition",
                        {
                          attrs: {
                            "enter-active-class": "animated fadeInDown",
                            "leave-active-class":
                              "animated position-absolute fadeOutUp"
                          }
                        },
                        [
                          _vm.hasSelectedOptions
                            ? _c(
                                "div",
                                [
                                  _c(
                                    "button",
                                    {
                                      staticClass:
                                        "btn btn-sm btn-outline-secondary",
                                      attrs: { type: "button" },
                                      on: { click: _vm.clearFilters }
                                    },
                                    [
                                      _c("span", { staticClass: "mr-1" }, [
                                        _c("i", {
                                          staticClass: "fas fa-trash-alt"
                                        })
                                      ]),
                                      _vm._v(
                                        "\n              " +
                                          _vm._s(
                                            _vm.dictionary("clear_filters")
                                          ) +
                                          "\n            "
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _vm._l(_vm.selectedOptions, function(
                                    options,
                                    filter
                                  ) {
                                    return _vm._l(options, function(option) {
                                      return _c(
                                        "button",
                                        {
                                          staticClass:
                                            "btn m-1 btn-sm btn-light",
                                          attrs: { type: "button" },
                                          on: {
                                            click: function($event) {
                                              return _vm.setFilterOption(
                                                filter,
                                                option,
                                                false
                                              )
                                            }
                                          }
                                        },
                                        [
                                          _c("span", { staticClass: "mr-1" }, [
                                            _c("i", {
                                              staticClass: "fas fa-times"
                                            })
                                          ]),
                                          _vm._v(
                                            "\n                " +
                                              _vm._s(option) +
                                              "\n                "
                                          ),
                                          _c("small", [
                                            _vm._v(
                                              "\\ " +
                                                _vm._s(_vm.filterLabel(filter))
                                            )
                                          ])
                                        ]
                                      )
                                    })
                                  })
                                ],
                                2
                              )
                            : _vm._e()
                        ]
                      )
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _c("article", { staticClass: "ec-search-engine__retail" }, [
                    _c(
                      "div",
                      { staticClass: "row" },
                      _vm._l(_vm.resultItems, function(product) {
                        return _c(
                          "div",
                          {
                            key: product._id,
                            staticClass: "col-6 col-md-4 col-lg-3"
                          },
                          [
                            _vm._t(
                              "product",
                              [
                                _c("ec-product-card", {
                                  staticClass: "ec-search-engine__item",
                                  attrs: {
                                    lang: _vm.lang,
                                    storeId: _vm.storeId,
                                    product: product
                                  }
                                })
                              ],
                              null,
                              { product: product }
                            )
                          ],
                          2
                        )
                      }),
                      0
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "transition",
                    {
                      attrs: {
                        "enter-active-class": "animated fadeInDown",
                        "leave-active-class":
                          "animated position-absolute fadeOutUp"
                      }
                    },
                    [
                      _vm.networkError
                        ? _c(
                            "div",
                            {
                              staticClass: "alert alert-warning",
                              attrs: { role: "alert" }
                            },
                            [
                              _c("h4", { staticClass: "alert-heading" }, [
                                _vm._v("Offline")
                              ]),
                              _vm._v(" "),
                              _vm.lang === "pt_br"
                                ? [
                                    _vm._v(
                                      "\n            Não foi possível buscar os produtos, por favor verifique sua\n            conexão com a internet.\n          "
                                    )
                                  ]
                                : [
                                    _vm._v(
                                      "\n            Unable to fetch the products, please check your internet connection.\n          "
                                    )
                                  ],
                              _vm._v(" "),
                              _c("hr"),
                              _vm._v(" "),
                              _c(
                                "button",
                                {
                                  staticClass: "btn btn-primary",
                                  attrs: { type: "button" },
                                  on: {
                                    click: function($event) {
                                      return _vm.fetchItems(_vm.currentPage)
                                    }
                                  }
                                },
                                [
                                  _c("i", {
                                    staticClass: "fas fa-search mr-1"
                                  }),
                                  _vm._v(
                                    "\n            " +
                                      _vm._s(_vm.dictionary("search_again")) +
                                      "\n          "
                                  )
                                ]
                              )
                            ],
                            2
                          )
                        : _vm._e()
                    ]
                  )
                ],
                1
              )
            : _vm._e()
        ]
      ),
      _vm._v(" "),
      _c(
        "transition",
        {
          attrs: {
            "enter-active-class": "animated fadeInDown",
            "leave-active-class": "animated fadeOutUp"
          }
        },
        [
          !_vm.searched || _vm.loadingMore
            ? _vm._t("default", [
                _c("div", {
                  domProps: { innerHTML: _vm._s(_vm.prerenderedHTML) }
                })
              ])
            : _vm._e()
        ],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../widget-search-engine/src/components/EcSearchEngine.vue":
/*!*****************************************************************!*\
  !*** ../widget-search-engine/src/components/EcSearchEngine.vue ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _html_EcSearchEngine_html_vue_type_template_id_230e7113_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./html/EcSearchEngine.html?vue&type=template&id=230e7113&lang=html& */ "../widget-search-engine/src/components/html/EcSearchEngine.html?vue&type=template&id=230e7113&lang=html&");
/* harmony import */ var _js_EcSearchEngine_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/EcSearchEngine.js?vue&type=script&lang=js& */ "../widget-search-engine/src/components/js/EcSearchEngine.js?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _scss_EcSearchEngine_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scss/EcSearchEngine.scss?vue&type=style&index=0&lang=scss& */ "../widget-search-engine/src/components/scss/EcSearchEngine.scss?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _storefront_template_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../storefront-template/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_storefront_template_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _js_EcSearchEngine_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _html_EcSearchEngine_html_vue_type_template_id_230e7113_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _html_EcSearchEngine_html_vue_type_template_id_230e7113_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "widget-search-engine/src/components/EcSearchEngine.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "../widget-search-engine/src/components/html/EcSearchEngine.html?vue&type=template&id=230e7113&lang=html&":
/*!****************************************************************************************************************!*\
  !*** ../widget-search-engine/src/components/html/EcSearchEngine.html?vue&type=template&id=230e7113&lang=html& ***!
  \****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storefront_framework_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_EcSearchEngine_html_vue_type_template_id_230e7113_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../storefront-framework/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./EcSearchEngine.html?vue&type=template&id=230e7113&lang=html& */ "../storefront-framework/node_modules/vue-loader/lib/loaders/templateLoader.js?!../widget-search-engine/src/components/html/EcSearchEngine.html?vue&type=template&id=230e7113&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _storefront_framework_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_EcSearchEngine_html_vue_type_template_id_230e7113_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _storefront_framework_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_EcSearchEngine_html_vue_type_template_id_230e7113_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "../widget-search-engine/src/components/js/EcSearchEngine.js?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ../widget-search-engine/src/components/js/EcSearchEngine.js?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storefront_template_node_modules_babel_loader_lib_index_js_ref_1_EcSearchEngine_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../storefront-template/node_modules/babel-loader/lib??ref--1!./EcSearchEngine.js?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!../widget-search-engine/src/components/js/EcSearchEngine.js?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_storefront_template_node_modules_babel_loader_lib_index_js_ref_1_EcSearchEngine_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "../widget-search-engine/src/components/scss/EcSearchEngine.scss?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************************************************!*\
  !*** ../widget-search-engine/src/components/scss/EcSearchEngine.scss?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcSearchEngine_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../storefront-framework/node_modules/mini-css-extract-plugin/dist/loader.js!../../../../storefront-template/node_modules/css-loader/dist/cjs.js!../../../../storefront-framework/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../storefront-template/node_modules/postcss-loader/src??postcss!../../../../storefront-template/node_modules/sass-loader/dist/cjs.js??ref--0-3!./EcSearchEngine.scss?vue&type=style&index=0&lang=scss& */ "../storefront-framework/node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../storefront-framework/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!../widget-search-engine/src/components/scss/EcSearchEngine.scss?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcSearchEngine_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcSearchEngine_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcSearchEngine_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcSearchEngine_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcSearchEngine_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "../widget-search-engine/src/index.js":
/*!********************************************!*\
  !*** ../widget-search-engine/src/index.js ***!
  \********************************************/
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
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ "../../../node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor */ "../../../node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors */ "../../../node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.keys */ "../../../node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "../../../node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.parse-int */ "../../../node_modules/core-js/modules/es.parse-int.js");
/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ "../../../node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "../../../node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_string_search__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.string.search */ "../../../node_modules/core-js/modules/es.string.search.js");
/* harmony import */ var core_js_modules_es_string_search__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_search__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "../../../node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "../../../node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/web.url */ "../../../node_modules/core-js/modules/web.url.js");
/* harmony import */ var core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! vue */ "../../../node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _ecomplus_storefront_twbs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ecomplus/storefront-twbs */ "../../../node_modules/@ecomplus/storefront-twbs/dist/storefront-twbs.min.js");
/* harmony import */ var _ecomplus_storefront_twbs__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_ecomplus_storefront_twbs__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _components_EcSearchEngine_vue__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/EcSearchEngine.vue */ "../widget-search-engine/src/components/EcSearchEngine.vue");
















function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * @ecomplus/widget-search-engine
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */



/* harmony default export */ __webpack_exports__["default"] = (function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var elId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'search-engine';
  var $searchEngine = document.getElementById(elId);

  if ($searchEngine) {
    var $overlay = window.storefront.$overlay;
    var urlParams = new URLSearchParams(window.location.search);
    new vue__WEBPACK_IMPORTED_MODULE_15__["default"]({
      data: {
        showFilters: false
      },
      render: function render(createElement) {
        var vm = this;
        return createElement(_components_EcSearchEngine_vue__WEBPACK_IMPORTED_MODULE_17__["default"], {
          attrs: {
            id: elId
          },
          props: _objectSpread({}, options.props, {
            term: urlParams.get('term'),
            page: parseInt(urlParams.get('page'), 10),
            brands: urlParams.getAll('brands'),
            categories: urlParams.getAll('categories'),
            navbarId: 'header',
            showFilters: vm.showFilters,
            prerenderedHTML: $searchEngine.outerHTML
          }),
          on: {
            'update:showFilters': function updateShowFilters(canShow) {
              vm.showFilters = canShow;

              if ($overlay) {
                if (canShow) {
                  $overlay.show();
                  $overlay.once('hide', function () {
                    vm.showFilters = false;
                  });
                } else {
                  $overlay.hide();
                }
              }
            }
          }
        });
      }
    }).$mount($searchEngine);
  }
});

/***/ }),

/***/ "../widget-search-engine/src/lib/dictionary.js":
/*!*****************************************************!*\
  !*** ../widget-search-engine/src/lib/dictionary.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var dictionary = {
  items: {
    en_us: 'items',
    pt_br: 'itens'
  },
  filter: {
    en_us: 'filter',
    pt_br: 'filtrar'
  },
  results: {
    en_us: 'results',
    pt_br: 'resultados'
  },
  sort: {
    en_us: 'sort',
    pt_br: 'ordenar'
  },
  searching_for: {
    en_us: 'Searching for',
    pt_br: 'Buscando por'
  },
  no_results_for: {
    en_us: 'No results for',
    pt_br: 'Nenhum resultado para'
  },
  brands: {
    en_us: 'Brands',
    pt_br: 'Marcas'
  },
  categories: {
    en_us: 'Categories',
    pt_br: 'Categorias'
  },
  refine_search: {
    en_us: 'Refine search',
    pt_br: 'Refinar busca'
  },
  close_filters: {
    en_us: 'Close filters',
    pt_br: 'Fechar filtros'
  },
  clear_filters: {
    en_us: 'Clear filters',
    pt_br: 'Limpar filtros'
  },
  relevance: {
    en_us: 'Most relevant',
    pt_br: 'Mais relevantes'
  },
  sales: {
    en_us: 'Best sellers',
    pt_br: 'Mais vendidos'
  },
  lowest_price: {
    en_us: 'Lowest price',
    pt_br: 'Menor preço'
  },
  highest_price: {
    en_us: 'Highest price',
    pt_br: 'Maior preço'
  },
  popular_products: {
    en_us: 'Popular products',
    pt_br: 'Produtos populares'
  },
  search_again: {
    en_us: 'Search again',
    pt_br: 'Buscar novamente'
  }
};
/* harmony default export */ __webpack_exports__["default"] = (function (word, lang) {
  if (!lang) {
    lang = this && this.lang || 'en_us';
  }

  return dictionary[word] && dictionary[word][lang] || '';
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!../widget-search-engine/src/components/js/EcSearchEngine.js?vue&type=script&lang=js&":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--1!../widget-search-engine/src/components/js/EcSearchEngine.js?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.concat */ "../../../node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.filter */ "../../../node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.find */ "../../../node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "../../../node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.index-of */ "../../../node_modules/core-js/modules/es.array.index-of.js");
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.splice */ "../../../node_modules/core-js/modules/es.array.splice.js");
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.number.constructor */ "../../../node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "../../../node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.promise */ "../../../node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.promise.finally */ "../../../node_modules/core-js/modules/es.promise.finally.js");
/* harmony import */ var core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ "../../../node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.string.replace */ "../../../node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "../../../node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _ecomplus_utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ecomplus/utils */ "../../../node_modules/@ecomplus/utils/src/index.js");
/* harmony import */ var _ecomplus_search_engine__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ecomplus/search-engine */ "../../../node_modules/@ecomplus/search-engine/src/index.js");
/* harmony import */ var _lib_dictionary__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./../../lib/dictionary */ "../widget-search-engine/src/lib/dictionary.js");
/* harmony import */ var _ecomplus_widget_product_card_src_components_EcProductCard_vue__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ecomplus/widget-product-card/src/components/EcProductCard.vue */ "../../../node_modules/@ecomplus/widget-product-card/src/components/EcProductCard.vue");

















/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'EcSearchEngine',
  components: {
    EcProductCard: _ecomplus_widget_product_card_src_components_EcProductCard_vue__WEBPACK_IMPORTED_MODULE_16__["default"]
  },
  props: {
    lang: {
      type: String,
      default: _ecomplus_utils__WEBPACK_IMPORTED_MODULE_13__["$ecomConfig"].get('lang')
    },
    storeId: {
      type: Number,
      default: _ecomplus_utils__WEBPACK_IMPORTED_MODULE_13__["$ecomConfig"].get('store_id')
    },
    term: {
      type: String
    },
    page: {
      type: Number
    },
    pageSize: {
      type: Number
    },
    brands: {
      type: Array
    },
    categories: {
      type: Array
    },
    autoFixScore: {
      type: [Number, Boolean],
      default: 0.6
    },
    showFilters: {
      type: Boolean,
      default: false
    },
    navbarId: String,
    prerenderedHTML: String
  },
  data: function data() {
    return {
      ecomSearch: new _ecomplus_search_engine__WEBPACK_IMPORTED_MODULE_14__["default"](this.storeId),
      currentPage: 0,
      resultItems: [],
      fixedTerm: '',
      totalSearchResults: 0,
      searching: false,
      loadingMore: false,
      searched: false,
      emptyResult: false,
      networkError: false,
      filters: [],
      lastSelectedFilter: null,
      selectedOptions: {},
      sortOptions: [null, 'sales', 'lowest_price', 'highest_price'],
      selectedSortOption: null
    };
  },
  computed: {
    hasSelectedOptions: function hasSelectedOptions() {
      for (var filter in this.selectedOptions) {
        if (this.selectedOptions[filter] && this.selectedOptions[filter].length) {
          return true;
        }
      }

      return false;
    },
    countedItems: function countedItems() {
      return (this.pageSize || 24) * (this.currentPage - 1) + this.resultItems.length;
    }
  },
  methods: {
    dictionary: _lib_dictionary__WEBPACK_IMPORTED_MODULE_15__["default"],
    fixTerm: function fixTerm() {
      var _this = this;

      if (this.term) {
        var fixedTerm = this.term;
        var autoFix = true;
        this.ecomSearch.getTermSuggestions().forEach(function (_ref) {
          var options = _ref.options,
              text = _ref.text;

          if (options.length) {
            var opt = options[0];

            if (opt.score < _this.autoFixScore) {
              autoFix = false;
            }

            fixedTerm = fixedTerm.replace(text, opt.text);
          }
        });

        if (autoFix && fixedTerm !== this.term) {
          this.fixedTerm = fixedTerm;
          this.ecomSearch.setSearchTerm(fixedTerm).history.shift();
          this.fetchItems();
          return true;
        }
      }

      return false;
    },
    updateFilters: function updateFilters() {
      var _this2 = this;

      var keepFilter = this.filters.find(function (_ref2) {
        var filter = _ref2.filter;
        return filter === _this2.lastSelectedFilter;
      });
      this.filters = keepFilter ? [keepFilter] : [];

      var addFilter = function addFilter(filter, options, isSpec) {
        if (_this2.lastSelectedFilter !== filter) {
          _this2.filters.push({
            filter: filter,
            filterObj: {
              show: _this2.filters.length < 5,
              options: options
            },
            isSpec: isSpec
          });

          var selectedOptions = _this2.selectedOptions;
          var optionsList = selectedOptions[filter] ? selectedOptions[filter].filter(function (option) {
            return options.find(function (_ref3) {
              var key = _ref3.key;
              return key === option;
            });
          }) : [];

          _this2.$set(_this2.selectedOptions, filter, optionsList);
        }
      };

      ['Brands', 'Categories'].forEach(function (filter) {
        addFilter(filter, _this2.ecomSearch["get".concat(filter)]());
      });
      this.ecomSearch.getSpecs().forEach(function (_ref4, index) {
        var key = _ref4.key,
            options = _ref4.options;
        addFilter(key, options, true);
      });
    },
    fetchItems: function fetchItems(page, isRetry) {
      var _this3 = this;

      var ecomSearch = this.ecomSearch;
      this.searching = true;
      this.loadingMore = page > 1 || this.page > 1;
      ecomSearch.setPageNumber(page).fetch().then(function () {
        _this3.totalSearchResults = ecomSearch.getTotalCount();

        if (_this3.totalSearchResults || _this3.fixedTerm || !_this3.fixTerm()) {
          if (page) {
            _this3.currentPage = page;
            _this3.resultItems = _this3.resultItems.concat(ecomSearch.getItems());
          } else {
            _this3.currentPage = 1;
            _this3.resultItems = ecomSearch.getItems();
          }

          if (!_this3.searched) {
            if (!_this3.resultItems.length) {
              ecomSearch.reset();
              _this3.emptyResult = true;
              return _this3.fetchItems();
            }

            setTimeout(function () {
              _this3.searched = true;
            }, 10);
          }

          _this3.updateFilters();

          _this3.networkError = false;
        }
      }).catch(function (err) {
        console.error(err);

        if (!isRetry && (!err.response || err.response.status !== 400)) {
          _this3.fetchItems(page, true);
        } else {
          _this3.networkError = true;
        }
      }).finally(function () {
        _this3.searching = _this3.loadingMore = false;
      });
    },
    toggleFilters: function toggleFilters() {
      var toShow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.$emit('update:showFilters', toShow);
    },
    filterLabel: function filterLabel(filter) {
      var label = this.dictionary(filter.toLowerCase());

      if (!label && window._data && Array.isArray(window._data.grids)) {
        var grid = window._data.grids.find(function (grid) {
          return grid.grid_id === filter;
        });

        if (grid) {
          return grid.title || grid.grid_id;
        }
      }

      return label || filter;
    },
    updateSearchFilter: function updateSearchFilter(filter) {
      var ecomSearch = this.ecomSearch;
      var setOptions = this.selectedOptions[filter];

      if (!setOptions.length) {
        setOptions = null;
      }

      switch (filter) {
        case 'Brands':
          ecomSearch.setBrandNames(setOptions);
          break;

        case 'Categories':
          ecomSearch.setCategoryNames(setOptions);
          break;

        default:
          ecomSearch.setSpec(filter, setOptions);
      }
    },
    setFilterOption: function setFilterOption(filter, option, isSet) {
      var selectedOptions = this.selectedOptions;
      var optionsList = selectedOptions[filter];

      if (isSet) {
        this.lastSelectedFilter = filter;
        optionsList.push(option);
      } else {
        var optionIndex = optionsList.indexOf(option);

        if (optionIndex > -1) {
          optionsList.splice(optionIndex, 1);
        }

        if (!optionsList.length && this.lastSelectedFilter === filter) {
          this.lastSelectedFilter = null;
        }
      }

      this.updateSearchFilter(filter);
      this.fetchItems();
    },
    clearFilters: function clearFilters() {
      var selectedOptions = this.selectedOptions;

      for (var filter in selectedOptions) {
        if (selectedOptions[filter]) {
          selectedOptions[filter] = [];
          this.updateSearchFilter(filter);
        }
      }

      this.fetchItems();
    },
    setSortOrder: function setSortOrder(sort) {
      this.selectedSortOption = sort;
      this.ecomSearch.setSortOrder(sort);
      this.fetchItems();
    }
  },
  created: function created() {
    var ecomSearch = this.ecomSearch,
        term = this.term,
        page = this.page,
        pageSize = this.pageSize,
        brands = this.brands,
        categories = this.categories;

    if (term) {
      ecomSearch.setSearchTerm(term);
    }

    if (Array.isArray(brands) && brands.length) {
      ecomSearch.setBrandNames(brands);
    }

    if (Array.isArray(categories) && categories.length) {
      ecomSearch.setCategoryNames(categories);
    }

    ecomSearch.setPageSize(pageSize || 24);
    this.fetchItems(page || 1);
  },
  mounted: function mounted() {
    var _this4 = this;

    if (this.navbarId) {
      var $nav = this.$refs.nav;
      document.getElementById(this.navbarId).appendChild($nav);
    }

    var onScrollTimer;
    window.addEventListener('scroll', function () {
      clearTimeout(onScrollTimer);

      if (!_this4.searching && _this4.totalSearchResults > _this4.countedItems) {
        onScrollTimer = setTimeout(function () {
          var _this4$$el = _this4.$el,
              offsetTop = _this4$$el.offsetTop,
              offsetHeight = _this4$$el.offsetHeight;

          if (window.pageYOffset + window.screen.height >= offsetTop + offsetHeight) {
            _this4.fetchItems(_this4.currentPage + 1);
          }
        }, 100);
      }
    });
  }
});

/***/ })

}]);
//# sourceMappingURL=0d15e0c2579d0e7aa116.js.map