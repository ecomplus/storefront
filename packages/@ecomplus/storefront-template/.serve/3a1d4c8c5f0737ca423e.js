(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "../storefront-framework/node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../storefront-framework/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!../widget-user/src/components/scss/EcUser.scss?vue&type=style&index=0&lang=scss&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../storefront-framework/node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../storefront-framework/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??postcss!./node_modules/sass-loader/dist/cjs.js??ref--0-3!../widget-user/src/components/scss/EcUser.scss?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../storefront-framework/node_modules/vue-loader/lib/loaders/templateLoader.js?!../widget-user/src/components/html/EcUser.html?vue&type=template&id=9527e0c4&lang=html&":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ../storefront-framework/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../widget-user/src/components/html/EcUser.html?vue&type=template&id=9527e0c4&lang=html& ***!
  \*************************************************************************************************************************************************************************************************/
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
    { staticClass: "ec-user" },
    [
      _vm._t("button", [
        _c(
          "button",
          {
            directives: [
              {
                name: "b-tooltip",
                rawName: "v-b-tooltip.hover.left",
                modifiers: { hover: true, left: true }
              }
            ],
            staticClass: "btn btn-lg btn-light",
            attrs: {
              type: "button",
              id: "ec-user-popover",
              title: _vm.dictionary("my_account")
            }
          },
          [_c("i", { staticClass: "fas fa-user" })]
        )
      ]),
      _vm._v(" "),
      _c(
        "b-popover",
        {
          attrs: {
            target: "ec-user-popover",
            triggers: _vm.popoverTriggers,
            show: _vm.showPopover,
            placement: _vm.popoverPlacement
          },
          on: {
            "update:show": function($event) {
              _vm.showPopover = $event
            },
            hidden: _vm.resetPopover
          }
        },
        [
          _c("template", { slot: "title" }, [
            _vm._v("\n      " + _vm._s(_vm.greetings) + "\n    ")
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "ec-user__popover" },
            [
              _c(
                "b-alert",
                {
                  staticClass: "ec-user__alert",
                  attrs: {
                    show: _vm.loginErrorAlert,
                    fade: "",
                    variant: "warning"
                  }
                },
                [
                  _vm._v(
                    "\n        " +
                      _vm._s(_vm.dictionary("login_error")) +
                      ".\n      "
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "transition-group",
                {
                  attrs: {
                    "enter-active-class": "animated fadeIn",
                    "leave-active-class":
                      "animated position-absolute fadeOut faster"
                  }
                },
                [
                  _vm.waiting
                    ? _c("div", { key: "waiting" }, [
                        _c(
                          "div",
                          {
                            staticClass: "spinner-border m-3",
                            attrs: { role: "status" }
                          },
                          [
                            _c("span", { staticClass: "sr-only" }, [
                              _vm._v("Loading...")
                            ])
                          ]
                        )
                      ])
                    : _vm.isLogged
                    ? _c("div", { key: "logged" }, [
                        _c(
                          "div",
                          { staticClass: "list-group list-group-flush" },
                          [
                            _c(
                              "a",
                              {
                                staticClass:
                                  "list-group-item list-group-item-action",
                                attrs: { href: _vm.ordersUrl }
                              },
                              [
                                _vm._v(
                                  "\n              " +
                                    _vm._s(_vm.dictionary("my_orders")) +
                                    "\n            "
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "a",
                              {
                                staticClass:
                                  "list-group-item list-group-item-action",
                                attrs: { href: _vm.accountUrl }
                              },
                              [
                                _vm._v(
                                  "\n              " +
                                    _vm._s(_vm.dictionary("my_account")) +
                                    "\n            "
                                )
                              ]
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass:
                              "btn btn-block btn-danger ec-user__logout",
                            attrs: { type: "button" },
                            on: { click: _vm.logout }
                          },
                          [
                            _c("i", { staticClass: "fas fa-sign-out-alt" }),
                            _vm._v(
                              "\n            " +
                                _vm._s(_vm.dictionary("logout")) +
                                "\n          "
                            )
                          ]
                        )
                      ])
                    : !_vm.showLoginForm
                    ? _c(
                        "div",
                        { key: "oauth" },
                        [
                          _c(
                            "b-alert",
                            {
                              staticClass: "ec-user__alert",
                              attrs: {
                                show:
                                  !_vm.popupAlertCount && _vm.noProfileFound,
                                fade: "",
                                variant: "info"
                              }
                            },
                            [
                              _vm._v(
                                "\n            " +
                                  _vm._s(_vm.dictionary("profile_not_found")) +
                                  "\n            "
                              ),
                              _c("b", [_vm._v(_vm._s(_vm.email))]),
                              _vm._v(".\n            "),
                              _c("br"),
                              _vm._v(" "),
                              _c(
                                "a",
                                {
                                  staticClass: "alert-link",
                                  attrs: { href: "javascript:;" },
                                  on: {
                                    click: function($event) {
                                      _vm.noProfileFound = false
                                    }
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n              " +
                                      _vm._s(
                                        _vm.dictionary("sign_in_with") +
                                          " " +
                                          _vm.dictionary("another") +
                                          " " +
                                          _vm.dictionary("email")
                                      ) +
                                      "\n            "
                                  )
                                ]
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "b-alert",
                            {
                              staticClass: "ec-user__alert",
                              attrs: {
                                show: _vm.popupAlertCount,
                                dismissible: "",
                                fade: "",
                                variant: "info"
                              },
                              on: {
                                dismissed: function($event) {
                                  _vm.popupAlertCount = 0
                                },
                                "dismiss-count-down": _vm.popupAlertChanged
                              }
                            },
                            [
                              _vm._v(
                                "\n            " +
                                  _vm._s(_vm.dictionary("continue_on_popup")) +
                                  ".\n          "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _vm._l(_vm.oauthProviders, function(ref) {
                            var link = ref.link
                            var faIcon = ref.faIcon
                            var providerName = ref.providerName
                            var provider = ref.provider
                            return _c(
                              "button",
                              {
                                key: provider,
                                staticClass: "btn btn-block ec-user__btn",
                                class: "ec-user__btn--" + provider,
                                attrs: { type: "button" },
                                on: {
                                  click: function() {
                                    return _vm.oauthPopup(link, provider)
                                  }
                                }
                              },
                              [
                                _c(
                                  "span",
                                  { staticClass: "ec-user__btn__icon" },
                                  [
                                    _c("i", {
                                      staticClass: "fab",
                                      class: faIcon
                                    })
                                  ]
                                ),
                                _vm._v(
                                  "\n            " +
                                    _vm._s(
                                      _vm.dictionary(
                                        _vm.noProfileFound
                                          ? "sign_up_with"
                                          : "sign_in_with"
                                      )
                                    ) +
                                    "\n            " +
                                    _vm._s(providerName) +
                                    "\n          "
                                )
                              ]
                            )
                          }),
                          _vm._v(" "),
                          !_vm.noProfileFound
                            ? _c(
                                "button",
                                {
                                  key: "email",
                                  staticClass:
                                    "btn btn-block btn-secondary ec-user__btn",
                                  attrs: { type: "button" },
                                  on: {
                                    click: function($event) {
                                      _vm.showLoginForm = true
                                    }
                                  }
                                },
                                [
                                  _c(
                                    "span",
                                    { staticClass: "ec-user__btn__icon" },
                                    [
                                      _c("i", {
                                        staticClass: "fas fa-envelope"
                                      })
                                    ]
                                  ),
                                  _vm._v(
                                    "\n            " +
                                      _vm._s(
                                        _vm.dictionary("sign_in_with") +
                                          " " +
                                          _vm.dictionary("email")
                                      ) +
                                      "\n          "
                                  )
                                ]
                              )
                            : _c(
                                "div",
                                { staticClass: "ec-user__visitor-info" },
                                [
                                  _vm._v(
                                    "\n            " +
                                      _vm._s(
                                        _vm.dictionary("visitor_checkout")
                                      ) +
                                      "\n          "
                                  )
                                ]
                              )
                        ],
                        2
                      )
                    : _c("div", { key: "form" }, [
                        _c("form", { on: { submit: _vm.emailLoginSubmit } }, [
                          _c("div", { staticClass: "form-group" }, [
                            _c(
                              "button",
                              {
                                staticClass: "btn ec-user__back",
                                attrs: { type: "button" },
                                on: {
                                  click: function($event) {
                                    _vm.showLoginForm = false
                                  }
                                }
                              },
                              [_c("i", { staticClass: "fas fa-arrow-left" })]
                            ),
                            _vm._v(" "),
                            _c("label", { attrs: { for: "ec-user-email" } }, [
                              _vm._v(
                                "\n                " +
                                  _vm._s(
                                    _vm.dictionary("sign_in_with") +
                                      " " +
                                      _vm.dictionary("email")
                                  ) +
                                  "\n              "
                              )
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.email,
                                  expression: "email"
                                }
                              ],
                              ref: "input",
                              staticClass: "form-control",
                              attrs: {
                                type: "email",
                                id: "ec-user-email",
                                placeholder: "email@mail.com",
                                required: ""
                              },
                              domProps: { value: _vm.email },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.email = $event.target.value
                                }
                              }
                            })
                          ]),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-block btn-primary",
                              attrs: { type: "submit" }
                            },
                            [
                              _vm._v(
                                "\n              " +
                                  _vm._s(_vm.dictionary("login")) +
                                  "\n            "
                              )
                            ]
                          )
                        ])
                      ])
                ]
              )
            ],
            1
          )
        ],
        2
      )
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../widget-user/src/components/EcUser.vue":
/*!************************************************!*\
  !*** ../widget-user/src/components/EcUser.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _html_EcUser_html_vue_type_template_id_9527e0c4_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./html/EcUser.html?vue&type=template&id=9527e0c4&lang=html& */ "../widget-user/src/components/html/EcUser.html?vue&type=template&id=9527e0c4&lang=html&");
/* harmony import */ var _js_EcUser_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/EcUser.js?vue&type=script&lang=js& */ "../widget-user/src/components/js/EcUser.js?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _scss_EcUser_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scss/EcUser.scss?vue&type=style&index=0&lang=scss& */ "../widget-user/src/components/scss/EcUser.scss?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _storefront_template_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../storefront-template/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_storefront_template_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _js_EcUser_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _html_EcUser_html_vue_type_template_id_9527e0c4_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _html_EcUser_html_vue_type_template_id_9527e0c4_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "widget-user/src/components/EcUser.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "../widget-user/src/components/html/EcUser.html?vue&type=template&id=9527e0c4&lang=html&":
/*!***********************************************************************************************!*\
  !*** ../widget-user/src/components/html/EcUser.html?vue&type=template&id=9527e0c4&lang=html& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storefront_framework_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_EcUser_html_vue_type_template_id_9527e0c4_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../storefront-framework/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./EcUser.html?vue&type=template&id=9527e0c4&lang=html& */ "../storefront-framework/node_modules/vue-loader/lib/loaders/templateLoader.js?!../widget-user/src/components/html/EcUser.html?vue&type=template&id=9527e0c4&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _storefront_framework_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_EcUser_html_vue_type_template_id_9527e0c4_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _storefront_framework_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_EcUser_html_vue_type_template_id_9527e0c4_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "../widget-user/src/components/js/EcUser.js?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ../widget-user/src/components/js/EcUser.js?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storefront_template_node_modules_babel_loader_lib_index_js_ref_1_EcUser_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../storefront-template/node_modules/babel-loader/lib??ref--1!./EcUser.js?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!../widget-user/src/components/js/EcUser.js?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_storefront_template_node_modules_babel_loader_lib_index_js_ref_1_EcUser_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "../widget-user/src/components/scss/EcUser.scss?vue&type=style&index=0&lang=scss&":
/*!****************************************************************************************!*\
  !*** ../widget-user/src/components/scss/EcUser.scss?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcUser_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../storefront-framework/node_modules/mini-css-extract-plugin/dist/loader.js!../../../../storefront-template/node_modules/css-loader/dist/cjs.js!../../../../storefront-framework/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../storefront-template/node_modules/postcss-loader/src??postcss!../../../../storefront-template/node_modules/sass-loader/dist/cjs.js??ref--0-3!./EcUser.scss?vue&type=style&index=0&lang=scss& */ "../storefront-framework/node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../storefront-framework/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!../widget-user/src/components/scss/EcUser.scss?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcUser_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcUser_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcUser_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcUser_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcUser_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "../widget-user/src/index.js":
/*!***********************************!*\
  !*** ../widget-user/src/index.js ***!
  \***********************************/
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
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vue */ "../../../node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _ecomplus_storefront_twbs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ecomplus/storefront-twbs */ "../../../node_modules/@ecomplus/storefront-twbs/dist/storefront-twbs.min.js");
/* harmony import */ var _ecomplus_storefront_twbs__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_ecomplus_storefront_twbs__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_EcUser_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/EcUser.vue */ "../widget-user/src/components/EcUser.vue");








function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * @ecomplus/widget-user
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */



/* harmony default export */ __webpack_exports__["default"] = (function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var elId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'user-button';
  var $userButton = document.getElementById(elId);

  if ($userButton) {
    new vue__WEBPACK_IMPORTED_MODULE_7__["default"]({
      render: function render(h) {
        return h(_components_EcUser_vue__WEBPACK_IMPORTED_MODULE_9__["default"], {
          attrs: {
            id: elId
          },
          props: _objectSpread({}, options.props)
        });
      }
    }).$mount($userButton);
  }
});

/***/ }),

/***/ "../widget-user/src/lib/dictionary.js":
/*!********************************************!*\
  !*** ../widget-user/src/lib/dictionary.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var dictionary = {
  my_account: {
    en_us: 'My account',
    pt_br: 'Minha conta'
  },
  my_orders: {
    en_us: 'My orders',
    pt_br: 'Meus pedidos'
  },
  hello: {
    en_us: 'Hello',
    pt_br: 'Olá'
  },
  visitor: {
    en_us: 'visitor',
    pt_br: 'visitante'
  },
  sign_in_with: {
    en_us: 'Sign in with',
    pt_br: 'Entrar com'
  },
  sign_up_with: {
    en_us: 'Sign up with',
    pt_br: 'Cadastrar via'
  },
  another: {
    en_us: 'another',
    pt_br: 'outro'
  },
  email: {
    en_us: 'email',
    pt_br: 'e-mail'
  },
  logout: {
    en_us: 'Logout',
    pt_br: 'Sair'
  },
  login: {
    en_us: 'Login',
    pt_br: 'Entrar'
  },
  continue_on_popup: {
    en_us: 'Continue login on popup',
    pt_br: 'Continue o login no pop-up'
  },
  login_error: {
    en_us: 'There was an error trying to login, please try again or select another option',
    pt_br: 'Houve um erro ao tentar o login, por favor tente novamente ou selecione outra opção'
  },
  profile_not_found: {
    en_us: 'No profile found with email address',
    pt_br: 'Nenhum perfil encontrado com o endereço de e-mail'
  },
  visitor_checkout: {
    en_us: 'You can also buy as a visitor if you prefer',
    pt_br: 'Você também pode comprar como visitante se preferir'
  }
};
/* harmony default export */ __webpack_exports__["default"] = (function (word, lang) {
  if (!lang) {
    lang = this && this.lang || 'en_us';
  }

  return dictionary[word] && dictionary[word][lang] || '';
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!../widget-user/src/components/js/EcUser.js?vue&type=script&lang=js&":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--1!../widget-user/src/components/js/EcUser.js?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.concat */ "../../../node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.find */ "../../../node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "../../../node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.number.constructor */ "../../../node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "../../../node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.promise */ "../../../node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.promise.finally */ "../../../node_modules/core-js/modules/es.promise.finally.js");
/* harmony import */ var core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ecomplus_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ecomplus/utils */ "../../../node_modules/@ecomplus/utils/src/index.js");
/* harmony import */ var _lib_dictionary__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../lib/dictionary */ "../widget-user/src/lib/dictionary.js");
/* harmony import */ var _ecomplus_passport_client__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ecomplus/passport-client */ "../../../node_modules/@ecomplus/passport-client/src/index.js");










/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'EcUser',
  props: {
    lang: {
      type: String,
      default: _ecomplus_utils__WEBPACK_IMPORTED_MODULE_7__["$ecomConfig"].get('lang')
    },
    ecomPassport: {
      type: Object,
      default: function _default() {
        return _ecomplus_passport_client__WEBPACK_IMPORTED_MODULE_9__["default"];
      }
    },
    popoverPlacement: {
      type: String,
      default: 'bottomleft'
    },
    getGreetingsMsg: {
      type: Function
    },
    accountUrl: {
      type: String,
      default: '/app/#/account/'
    },
    ordersUrl: {
      type: String,
      default: '/app/#/account/orders'
    },
    popupAlertCountSecs: {
      type: Number,
      default: 3
    }
  },
  data: function data() {
    return {
      showPopover: false,
      popoverTriggers: 'click blur',
      waiting: false,
      waitingPopup: false,
      isLogged: false,
      email: '',
      name: '',
      oauthProviders: [],
      showLoginForm: false,
      popupAlertCount: 0,
      loginErrorAlert: false,
      noProfileFound: false,
      popoverHideTimer: null
    };
  },
  computed: {
    greetings: function greetings() {
      if (typeof this.getGreetingsMsg === 'function') {
        return this.getGreetingsMsg(this.name);
      } else {
        return "".concat(Object(_lib_dictionary__WEBPACK_IMPORTED_MODULE_8__["default"])('hello', this.lang), " ").concat(this.name || Object(_lib_dictionary__WEBPACK_IMPORTED_MODULE_8__["default"])('visitor', this.lang));
      }
    }
  },
  methods: {
    dictionary: _lib_dictionary__WEBPACK_IMPORTED_MODULE_8__["default"],
    update: function update() {
      var _this = this;

      this.fixPopoverTriggers();
      var _this$ecomPassport = this.ecomPassport,
          checkLogin = _this$ecomPassport.checkLogin,
          getCustomerName = _this$ecomPassport.getCustomerName;
      this.name = getCustomerName();
      this.isLogged = checkLogin();
      this.email = '';
      this.popupAlertCount = 0;

      if (this.isLogged) {
        this.showPopover = true;
        setTimeout(function () {
          if (_this.showPopover) {
            _this.popoverHideTimer = setTimeout(function () {
              _this.showPopover = false;
            }, 2000);
          }
        }, 200);
      }

      this.waitingPopup = false;
      clearTimeout(this.popoverHideTimer);
    },
    waitPromise: function waitPromise(promise) {
      this.fixPopoverTriggers();
      var vm = this;
      vm.waiting = true;
      promise.catch(function (err) {
        console.error(err);
      }).finally(function () {
        vm.waiting = false;
      });
    },
    setOauthProviders: function setOauthProviders() {
      var vm = this;
      var promise = vm.ecomPassport.fetchOauthProviders().then(function (_ref) {
        var host = _ref.host,
            baseUri = _ref.baseUri,
            oauthPath = _ref.oauthPath,
            providers = _ref.providers;
        var oauthProviders = [];

        for (var provider in providers) {
          if (providers[provider]) {
            var _providers$provider = providers[provider],
                faIcon = _providers$provider.faIcon,
                providerName = _providers$provider.providerName;
            oauthProviders.push({
              link: host + baseUri + provider + oauthPath,
              faIcon: faIcon,
              provider: provider,
              providerName: providerName
            });
          }
        }

        vm.oauthProviders = oauthProviders;
      }).catch(function (err) {
        vm.presetOauthProviders();
        throw err;
      });
      vm.waitPromise(promise);
      return promise;
    },
    presetOauthProviders: function presetOauthProviders() {
      this.oauthProviders = [{
        faIcon: 'fa-facebook-f',
        providerName: 'Facebook',
        provider: 'facebook'
      }, {
        faIcon: 'fa-google',
        providerName: 'Google',
        provider: 'google'
      }, {
        faIcon: 'fa-windows',
        providerName: 'Windows',
        provider: 'windowslive'
      }];
    },
    oauthPopup: function oauthPopup(link, provider) {
      var vm = this;
      this.loginErrorAlert = false;

      if (link) {
        vm.ecomPassport.popupOauthLink(link);
        vm.waitingPopup = true;
        setTimeout(function () {
          vm.popupAlertCount = vm.popupAlertCountSecs;
        }, 200);
      } else {
        var promise = vm.setOauthProviders().then(function () {
          var link = vm.oauthProviders.find(function (oauthProvider) {
            return oauthProvider.provider === provider;
          });
          vm.oauthPopup(link, provider);
        }).catch(function (err) {
          vm.loginErrorAlert = true;
          throw err;
        });
        vm.waitPromise(promise);
      }
    },
    popupAlertChanged: function popupAlertChanged(countDown) {
      this.popupAlertCount = countDown;
    },
    emailLoginSubmit: function emailLoginSubmit(e) {
      var vm = this;
      e.preventDefault();
      vm.showLoginForm = false;
      var promise = vm.ecomPassport.fetchLogin(this.email).catch(function (err) {
        var response = err.response;

        if (response && response.status === 403) {
          vm.noProfileFound = true;
        } else {
          setTimeout(function () {
            vm.loginErrorAlert = true;
          }, 100);
          throw err;
        }
      });
      vm.waitPromise(promise);
    },
    logout: function logout() {
      this.ecomPassport.logout();
    },
    resetErrors: function resetErrors() {
      this.noProfileFound = this.loginErrorAlert = false;
    },
    resetPopover: function resetPopover() {
      if (this.showLoginForm) {
        this.showLoginForm = false;
      } else {
        this.resetErrors();
      }
    },
    fixPopoverTriggers: function fixPopoverTriggers() {
      var _this2 = this;

      if (this.showPopover) {
        this.popoverTriggers = 'manual';
        setTimeout(function () {
          _this2.popoverTriggers = 'click blur';
        }, 310);
      }
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    var vm = this;
    ['login', 'logout'].forEach(function (ev) {
      _this3.ecomPassport.on(ev, function (payload) {
        vm.update();
        vm.$emit(ev, payload);
      });
    });
    vm.update();
    vm.setOauthProviders();
  },
  watch: {
    noProfileFound: function noProfileFound(newStatus) {
      if (newStatus === false) {
        this.email = '';
      }

      this.showLoginForm = !newStatus;
    },
    showLoginForm: function showLoginForm(newStatus) {
      var _this4 = this;

      this.loginErrorAlert = false;

      if (newStatus) {
        this.fixPopoverTriggers();
        setTimeout(function () {
          if (_this4.$refs.input) {
            _this4.$refs.input.focus();
          }
        }, 300);
      }
    },
    showPopover: function showPopover() {
      clearTimeout(this.popoverHideTimer);
    }
  }
});

/***/ })

}]);
//# sourceMappingURL=3a1d4c8c5f0737ca423e.js.map