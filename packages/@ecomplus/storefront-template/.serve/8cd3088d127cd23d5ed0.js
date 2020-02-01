(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "../../../node_modules/core-js/internals/is-integer.js":
/*!***************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/core-js/internals/is-integer.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "../../../node_modules/core-js/internals/is-object.js");

var floor = Math.floor;

// `Number.isInteger` method implementation
// https://tc39.github.io/ecma262/#sec-number.isinteger
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),

/***/ "../../../node_modules/core-js/modules/es.number.is-integer.js":
/*!***********************************************************************************************!*\
  !*** /home/leo/code/storefront-template/node_modules/core-js/modules/es.number.is-integer.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "../../../node_modules/core-js/internals/export.js");
var isInteger = __webpack_require__(/*! ../internals/is-integer */ "../../../node_modules/core-js/internals/is-integer.js");

// `Number.isInteger` method
// https://tc39.github.io/ecma262/#sec-number.isinteger
$({ target: 'Number', stat: true }, {
  isInteger: isInteger
});


/***/ }),

/***/ "../storefront-framework/node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../storefront-framework/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!../widget-minicart/src/components/scss/EcCartItem.scss?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../storefront-framework/node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../storefront-framework/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??postcss!./node_modules/sass-loader/dist/cjs.js??ref--0-3!../widget-minicart/src/components/scss/EcCartItem.scss?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../storefront-framework/node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../storefront-framework/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!../widget-minicart/src/components/scss/EcMinicart.scss?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../storefront-framework/node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../storefront-framework/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??postcss!./node_modules/sass-loader/dist/cjs.js??ref--0-3!../widget-minicart/src/components/scss/EcMinicart.scss?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../storefront-framework/node_modules/vue-loader/lib/loaders/templateLoader.js?!../widget-minicart/src/components/html/EcCartItem.html?vue&type=template&id=44d5e35c&lang=html&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ../storefront-framework/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../widget-minicart/src/components/html/EcCartItem.html?vue&type=template&id=44d5e35c&lang=html& ***!
  \*********************************************************************************************************************************************************************************************************/
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
  return _c("section", { staticClass: "ec-cart-item" }, [
    _c(
      "div",
      { staticClass: "ec-cart-item__name" },
      [
        _vm.item.slug
          ? _c("a", { attrs: { href: "/" + _vm.item.slug } }, [
              _vm._v("\n      " + _vm._s(_vm.item.name) + "\n    ")
            ])
          : [_vm._v("\n      " + _vm._s(_vm.item.name) + "\n    ")]
      ],
      2
    ),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "ec-cart-item__row" },
      [
        _vm.item.picture && Object.keys(_vm.item.picture).length
          ? _c(
              _vm.item.slug ? "a" : "span",
              { tag: "component", attrs: { href: "/" + _vm.item.slug } },
              [
                _c("img", {
                  staticClass: "ec-cart-item__picture",
                  attrs: { src: _vm.img.url, alt: _vm.img.alt || _vm.item.name }
                })
              ]
            )
          : _vm._e(),
        _vm._v(" "),
        _c("div", { staticClass: "ec-cart-item__edit" }, [
          !_vm.skipSelect && _vm.inputType === "select"
            ? _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model.number",
                      value: _vm.quantity,
                      expression: "quantity",
                      modifiers: { number: true }
                    }
                  ],
                  staticClass: "custom-select",
                  on: {
                    change: function($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function(o) {
                          return o.selected
                        })
                        .map(function(o) {
                          var val = "_value" in o ? o._value : o.value
                          return _vm._n(val)
                        })
                      _vm.quantity = $event.target.multiple
                        ? $$selectedVal
                        : $$selectedVal[0]
                    }
                  }
                },
                [
                  _vm._l(_vm.item.max_quantity || 10, function(qnt) {
                    return _c(
                      "option",
                      {
                        domProps: { value: qnt, selected: qnt === _vm.quantity }
                      },
                      [_vm._v("\n          " + _vm._s(qnt) + "\n        ")]
                    )
                  }),
                  _vm._v(" "),
                  _c("option", { domProps: { value: 11 } }, [
                    _vm._v("\n          11+\n        ")
                  ])
                ],
                2
              )
            : _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model.number",
                    value: _vm.quantity,
                    expression: "quantity",
                    modifiers: { number: true }
                  }
                ],
                ref: "input",
                staticClass: "ec-cart-item__quantity form-control",
                attrs: {
                  type:
                    _vm.inputType && _vm.inputType !== "select"
                      ? _vm.inputType
                      : "number"
                },
                domProps: { value: _vm.quantity },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.quantity = _vm._n($event.target.value)
                  },
                  blur: function($event) {
                    return _vm.$forceUpdate()
                  }
                }
              }),
          _vm._v(" "),
          _c(
            "a",
            {
              staticClass: "ec-cart-item__remove",
              attrs: { href: "#" },
              on: {
                click: function($event) {
                  $event.preventDefault()
                  return _vm.$emit("remove")
                }
              }
            },
            [
              _vm._v(
                "\n        " + _vm._s(_vm.dictionary("remove")) + "\n      "
              )
            ]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "ec-cart-item__prices" }, [
          _vm.item.quantity > 1
            ? _c("div", { staticClass: "ec-cart-item__price-un" }, [
                _vm._v(
                  "\n        " +
                    _vm._s(_vm.formatMoney(_vm.price)) +
                    "\n        "
                ),
                _c("small", [_vm._v("/un")])
              ])
            : _vm._e(),
          _vm._v(
            "\n      " +
              _vm._s(_vm.formatMoney(_vm.price * _vm.item.quantity)) +
              "\n    "
          )
        ])
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../storefront-framework/node_modules/vue-loader/lib/loaders/templateLoader.js?!../widget-minicart/src/components/html/EcMinicart.html?vue&type=template&id=57ee5df6&lang=html&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ../storefront-framework/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../widget-minicart/src/components/html/EcMinicart.html?vue&type=template&id=57ee5df6&lang=html& ***!
  \*********************************************************************************************************************************************************************************************************/
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
    { staticClass: "ec-minicart" },
    [
      _vm._t("button", [
        _c(
          "button",
          {
            directives: [
              {
                name: "b-tooltip",
                rawName: "v-b-tooltip.hover.bottom",
                modifiers: { hover: true, bottom: true }
              }
            ],
            staticClass: "ec-minicart__button btn btn-lg btn-light",
            attrs: { type: "button", title: _vm.dictionary("shopping_cart") },
            on: { click: _vm.show }
          },
          [
            _c("i", { staticClass: "fas fa-shopping-bag" }),
            _vm._v(" "),
            _c("span", { staticClass: "badge badge-sm badge-primary" }, [
              _vm._v("\n        " + _vm._s(_vm.cart.items.length) + "\n      ")
            ])
          ]
        )
      ]),
      _vm._v(" "),
      _c(
        "div",
        { ref: "sidebar" },
        [
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
                      value: _vm.showCart,
                      expression: "showCart"
                    }
                  ],
                  staticClass: "ec-minicart__sidebar card shadow"
                },
                [
                  _vm._t("header", [
                    _c("header", { staticClass: "card-header" }, [
                      _vm._v(
                        "\n            " +
                          _vm._s(_vm.dictionary("my_cart")) +
                          "\n            "
                      ),
                      _c(
                        "button",
                        {
                          staticClass: "close",
                          attrs: {
                            type: "button",
                            "aria-label": _vm.dictionary("close")
                          },
                          on: { click: _vm.hide }
                        },
                        [
                          _c("span", { attrs: { "aria-hidden": "true" } }, [
                            _vm._v("×")
                          ])
                        ]
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "article",
                    { staticClass: "card-body" },
                    [
                      _c(
                        "transition-group",
                        {
                          attrs: {
                            "enter-active-class": "animated fadeIn slow"
                          }
                        },
                        [
                          _vm.cart.items.length
                            ? _c(
                                "div",
                                {
                                  key: "list",
                                  staticClass: "ec-minicart__list"
                                },
                                [
                                  _vm._t(
                                    "list",
                                    [
                                      _c(
                                        "transition-group",
                                        {
                                          attrs: {
                                            "enter-active-class":
                                              "animated fadeInDown",
                                            "leave-active-class":
                                              "animated position-absolute fadeOutUp faster"
                                          }
                                        },
                                        _vm._l(_vm.cart.items, function(item) {
                                          return _c("ec-cart-item", {
                                            key: item._id,
                                            attrs: {
                                              item: item,
                                              resetQnt: _vm.showCart
                                            },
                                            on: {
                                              increase: function(qnt) {
                                                return _vm.ecomCart.increaseItemQnt(
                                                  item._id,
                                                  qnt
                                                )
                                              },
                                              remove: function($event) {
                                                return _vm.ecomCart.removeItem(
                                                  item._id
                                                )
                                              }
                                            }
                                          })
                                        }),
                                        1
                                      )
                                    ],
                                    null,
                                    { items: _vm.cart.items }
                                  )
                                ],
                                2
                              )
                            : _c(
                                "div",
                                {
                                  key: "empty",
                                  staticClass: "ec-minicart__empty"
                                },
                                [
                                  _vm._t("empty", [
                                    _c(
                                      "p",
                                      { staticClass: "lead text-muted" },
                                      [
                                        _vm._v(
                                          "\n                  " +
                                            _vm._s(
                                              _vm.dictionary("empty_cart")
                                            ) +
                                            " ...\n                "
                                        )
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "a",
                                      {
                                        staticClass:
                                          "btn btn-block btn-primary",
                                        attrs: { href: "#" },
                                        on: {
                                          click: function($event) {
                                            $event.preventDefault()
                                            return _vm.hide($event)
                                          }
                                        }
                                      },
                                      [
                                        _c("span", { staticClass: "mr-1" }, [
                                          _c("i", {
                                            staticClass: "fas fa-arrow-left"
                                          })
                                        ]),
                                        _vm._v(
                                          "\n                  " +
                                            _vm._s(
                                              _vm.dictionary(
                                                "continue_shopping"
                                              )
                                            ) +
                                            "\n                "
                                        )
                                      ]
                                    )
                                  ])
                                ],
                                2
                              )
                        ]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm._t("footer", [
                    _vm.cart.subtotal || _vm.cart.items.length
                      ? _c("footer", { staticClass: "card-footer" }, [
                          _c("div", { staticClass: "ec-minicart__summary" }, [
                            _c("span", [_vm._v("Subtotal")]),
                            _vm._v(" "),
                            _c(
                              "strong",
                              { staticClass: "ec-minicart__subtotal" },
                              [
                                _vm._v(
                                  "\n                " +
                                    _vm._s(_vm.formatMoney(_vm.cart.subtotal)) +
                                    "\n              "
                                )
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c(
                            "a",
                            {
                              staticClass:
                                "ec-minicart__btn-checkout btn btn-block btn-primary",
                              attrs: { role: "button", href: _vm.checkoutUrl }
                            },
                            [
                              _c("span", { staticClass: "mr-1" }, [
                                _c("i", { staticClass: "fas fa-check" })
                              ]),
                              _vm._v(
                                "\n              " +
                                  _vm._s(_vm.dictionary("checkout")) +
                                  "\n            "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "a",
                            {
                              staticClass:
                                "ec-minicart__btn-cart btn btn-block btn-outline-secondary",
                              attrs: { role: "button", href: _vm.cartUrl }
                            },
                            [
                              _vm._v(
                                "\n              " +
                                  _vm._s(_vm.dictionary("see_cart")) +
                                  "\n            "
                              )
                            ]
                          )
                        ])
                      : _vm._e()
                  ])
                ],
                2
              )
            ]
          )
        ],
        1
      )
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../widget-minicart/src/components/EcCartItem.vue":
/*!********************************************************!*\
  !*** ../widget-minicart/src/components/EcCartItem.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _html_EcCartItem_html_vue_type_template_id_44d5e35c_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./html/EcCartItem.html?vue&type=template&id=44d5e35c&lang=html& */ "../widget-minicart/src/components/html/EcCartItem.html?vue&type=template&id=44d5e35c&lang=html&");
/* harmony import */ var _js_EcCartItem_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/EcCartItem.js?vue&type=script&lang=js& */ "../widget-minicart/src/components/js/EcCartItem.js?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _scss_EcCartItem_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scss/EcCartItem.scss?vue&type=style&index=0&lang=scss& */ "../widget-minicart/src/components/scss/EcCartItem.scss?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _storefront_template_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../storefront-template/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_storefront_template_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _js_EcCartItem_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _html_EcCartItem_html_vue_type_template_id_44d5e35c_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _html_EcCartItem_html_vue_type_template_id_44d5e35c_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "widget-minicart/src/components/EcCartItem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "../widget-minicart/src/components/EcMinicart.vue":
/*!********************************************************!*\
  !*** ../widget-minicart/src/components/EcMinicart.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _html_EcMinicart_html_vue_type_template_id_57ee5df6_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./html/EcMinicart.html?vue&type=template&id=57ee5df6&lang=html& */ "../widget-minicart/src/components/html/EcMinicart.html?vue&type=template&id=57ee5df6&lang=html&");
/* harmony import */ var _js_EcMinicart_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/EcMinicart.js?vue&type=script&lang=js& */ "../widget-minicart/src/components/js/EcMinicart.js?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _scss_EcMinicart_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scss/EcMinicart.scss?vue&type=style&index=0&lang=scss& */ "../widget-minicart/src/components/scss/EcMinicart.scss?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _storefront_template_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../storefront-template/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_storefront_template_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _js_EcMinicart_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _html_EcMinicart_html_vue_type_template_id_57ee5df6_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"],
  _html_EcMinicart_html_vue_type_template_id_57ee5df6_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "widget-minicart/src/components/EcMinicart.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "../widget-minicart/src/components/html/EcCartItem.html?vue&type=template&id=44d5e35c&lang=html&":
/*!*******************************************************************************************************!*\
  !*** ../widget-minicart/src/components/html/EcCartItem.html?vue&type=template&id=44d5e35c&lang=html& ***!
  \*******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storefront_framework_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_EcCartItem_html_vue_type_template_id_44d5e35c_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../storefront-framework/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./EcCartItem.html?vue&type=template&id=44d5e35c&lang=html& */ "../storefront-framework/node_modules/vue-loader/lib/loaders/templateLoader.js?!../widget-minicart/src/components/html/EcCartItem.html?vue&type=template&id=44d5e35c&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _storefront_framework_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_EcCartItem_html_vue_type_template_id_44d5e35c_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _storefront_framework_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_EcCartItem_html_vue_type_template_id_44d5e35c_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "../widget-minicart/src/components/html/EcMinicart.html?vue&type=template&id=57ee5df6&lang=html&":
/*!*******************************************************************************************************!*\
  !*** ../widget-minicart/src/components/html/EcMinicart.html?vue&type=template&id=57ee5df6&lang=html& ***!
  \*******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storefront_framework_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_EcMinicart_html_vue_type_template_id_57ee5df6_lang_html___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../storefront-framework/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./EcMinicart.html?vue&type=template&id=57ee5df6&lang=html& */ "../storefront-framework/node_modules/vue-loader/lib/loaders/templateLoader.js?!../widget-minicart/src/components/html/EcMinicart.html?vue&type=template&id=57ee5df6&lang=html&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _storefront_framework_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_EcMinicart_html_vue_type_template_id_57ee5df6_lang_html___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _storefront_framework_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_EcMinicart_html_vue_type_template_id_57ee5df6_lang_html___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "../widget-minicart/src/components/js/EcCartItem.js?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ../widget-minicart/src/components/js/EcCartItem.js?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storefront_template_node_modules_babel_loader_lib_index_js_ref_1_EcCartItem_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../storefront-template/node_modules/babel-loader/lib??ref--1!./EcCartItem.js?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!../widget-minicart/src/components/js/EcCartItem.js?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_storefront_template_node_modules_babel_loader_lib_index_js_ref_1_EcCartItem_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "../widget-minicart/src/components/js/EcMinicart.js?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ../widget-minicart/src/components/js/EcMinicart.js?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storefront_template_node_modules_babel_loader_lib_index_js_ref_1_EcMinicart_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../storefront-template/node_modules/babel-loader/lib??ref--1!./EcMinicart.js?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!../widget-minicart/src/components/js/EcMinicart.js?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_storefront_template_node_modules_babel_loader_lib_index_js_ref_1_EcMinicart_js_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "../widget-minicart/src/components/scss/EcCartItem.scss?vue&type=style&index=0&lang=scss&":
/*!************************************************************************************************!*\
  !*** ../widget-minicart/src/components/scss/EcCartItem.scss?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcCartItem_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../storefront-framework/node_modules/mini-css-extract-plugin/dist/loader.js!../../../../storefront-template/node_modules/css-loader/dist/cjs.js!../../../../storefront-framework/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../storefront-template/node_modules/postcss-loader/src??postcss!../../../../storefront-template/node_modules/sass-loader/dist/cjs.js??ref--0-3!./EcCartItem.scss?vue&type=style&index=0&lang=scss& */ "../storefront-framework/node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../storefront-framework/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!../widget-minicart/src/components/scss/EcCartItem.scss?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcCartItem_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcCartItem_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcCartItem_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcCartItem_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcCartItem_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "../widget-minicart/src/components/scss/EcMinicart.scss?vue&type=style&index=0&lang=scss&":
/*!************************************************************************************************!*\
  !*** ../widget-minicart/src/components/scss/EcMinicart.scss?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcMinicart_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../storefront-framework/node_modules/mini-css-extract-plugin/dist/loader.js!../../../../storefront-template/node_modules/css-loader/dist/cjs.js!../../../../storefront-framework/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../storefront-template/node_modules/postcss-loader/src??postcss!../../../../storefront-template/node_modules/sass-loader/dist/cjs.js??ref--0-3!./EcMinicart.scss?vue&type=style&index=0&lang=scss& */ "../storefront-framework/node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../storefront-framework/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!../widget-minicart/src/components/scss/EcMinicart.scss?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcMinicart_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcMinicart_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcMinicart_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcMinicart_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_storefront_framework_node_modules_mini_css_extract_plugin_dist_loader_js_storefront_template_node_modules_css_loader_dist_cjs_js_storefront_framework_node_modules_vue_loader_lib_loaders_stylePostLoader_js_storefront_template_node_modules_postcss_loader_src_index_js_postcss_storefront_template_node_modules_sass_loader_dist_cjs_js_ref_0_3_EcMinicart_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "../widget-minicart/src/index.js":
/*!***************************************!*\
  !*** ../widget-minicart/src/index.js ***!
  \***************************************/
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
/* harmony import */ var _components_EcMinicart_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/EcMinicart.vue */ "../widget-minicart/src/components/EcMinicart.vue");








function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * @ecomplus/widget-minicart
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */



/* harmony default export */ __webpack_exports__["default"] = (function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var elId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'cart-button';
  var $cartButton = document.getElementById(elId);

  if ($cartButton) {
    var $overlay = window.storefront.$overlay;
    new vue__WEBPACK_IMPORTED_MODULE_7__["default"]({
      data: {
        showCart: false
      },
      render: function render(createElement) {
        var vm = this;
        return createElement(_components_EcMinicart_vue__WEBPACK_IMPORTED_MODULE_9__["default"], {
          attrs: {
            id: elId
          },
          props: _objectSpread({}, options.props, {
            showCart: vm.showCart
          }),
          on: {
            'update:showCart': function updateShowCart(isVisible) {
              vm.showCart = isVisible;

              if ($overlay) {
                if (isVisible) {
                  $overlay.show();
                  $overlay.once('hide', function () {
                    vm.showCart = false;
                  });
                } else {
                  $overlay.hide();
                }
              }
            }
          }
        });
      }
    }).$mount($cartButton);
  }
});

/***/ }),

/***/ "../widget-minicart/src/lib/dictionary.js":
/*!************************************************!*\
  !*** ../widget-minicart/src/lib/dictionary.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var dictionary = {
  shopping_cart: {
    en_us: 'Shopping cart',
    pt_br: 'Carrinho de compras'
  },
  my_cart: {
    en_us: 'My cart',
    pt_br: 'Meu carrinho'
  },
  close: {
    en_us: 'Close',
    pt_br: 'Fechar'
  },
  remove: {
    en_us: 'Remove',
    pt_br: 'Remover'
  },
  checkout: {
    en_us: 'Checkout',
    pt_br: 'Finalizar compra'
  },
  see_cart: {
    en_us: 'See shopping cart',
    pt_br: 'Ver carrinho'
  },
  empty_cart: {
    en_us: 'Your shopping cart is empty',
    pt_br: 'Seu carrinho de compras está vazio'
  },
  continue_shopping: {
    en_us: 'Continue shopping',
    pt_br: 'Continuar comprando'
  }
};
/* harmony default export */ __webpack_exports__["default"] = (function (word, lang) {
  if (!lang) {
    lang = this && this.lang || 'en_us';
  }

  return dictionary[word] && dictionary[word][lang] || '';
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!../widget-minicart/src/components/js/EcCartItem.js?vue&type=script&lang=js&":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--1!../widget-minicart/src/components/js/EcCartItem.js?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.number.constructor */ "../../../node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_number_is_integer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.number.is-integer */ "../../../node_modules/core-js/modules/es.number.is-integer.js");
/* harmony import */ var core_js_modules_es_number_is_integer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_is_integer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ecomplus_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ecomplus/utils */ "../../../node_modules/@ecomplus/utils/src/index.js");
/* harmony import */ var _lib_dictionary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../lib/dictionary */ "../widget-minicart/src/lib/dictionary.js");




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'EcCartItem',
  props: {
    lang: {
      type: String,
      default: _ecomplus_utils__WEBPACK_IMPORTED_MODULE_2__["$ecomConfig"].get('lang')
    },
    item: {
      type: Object,
      required: true
    },
    inputType: {
      type: String,
      default: 'select'
    },
    resetQnt: {
      type: Boolean
    }
  },
  data: function data() {
    return {
      quantity: 1,
      skipSelect: false
    };
  },
  computed: {
    price: function price() {
      return Object(_ecomplus_utils__WEBPACK_IMPORTED_MODULE_2__["price"])(this.item);
    },
    img: function img() {
      return Object(_ecomplus_utils__WEBPACK_IMPORTED_MODULE_2__["img"])(this.item, null, 'small');
    }
  },
  methods: {
    dictionary: _lib_dictionary__WEBPACK_IMPORTED_MODULE_3__["default"],
    formatMoney: _ecomplus_utils__WEBPACK_IMPORTED_MODULE_2__["formatMoney"],
    updateQnt: function updateQnt() {
      this.quantity = this.item.quantity;
      this.skipSelect = !Number.isInteger(this.item.quantity) || this.item.quantity > 10;
    }
  },
  created: function created() {
    this.updateQnt();
  },
  watch: {
    quantity: function quantity(qnt, oldQnt) {
      var _this = this;

      if (typeof qnt !== 'number' || isNaN(qnt)) {
        this.quantity = 0;
      }

      if (this.quantity !== this.item.quantity) {
        this.$emit('increase', this.quantity - oldQnt);
        this.quantity = this.item.quantity;
      }

      if (qnt > 10 && oldQnt <= 10) {
        this.skipSelect = true;
        setTimeout(function () {
          _this.$refs.input.focus();
        }, 300);
      }
    },
    resetQnt: function resetQnt(reload) {
      if (reload) {
        this.updateQnt();
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!../widget-minicart/src/components/js/EcMinicart.js?vue&type=script&lang=js&":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--1!../widget-minicart/src/components/js/EcMinicart.js?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ecomplus_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ecomplus/utils */ "../../../node_modules/@ecomplus/utils/src/index.js");
/* harmony import */ var _ecomplus_shopping_cart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ecomplus/shopping-cart */ "../../../node_modules/@ecomplus/shopping-cart/src/index.js");
/* harmony import */ var _lib_dictionary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../lib/dictionary */ "../widget-minicart/src/lib/dictionary.js");
/* harmony import */ var _EcCartItem_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../EcCartItem.vue */ "../widget-minicart/src/components/EcCartItem.vue");




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'EcMinicart',
  components: {
    EcCartItem: _EcCartItem_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  props: {
    lang: {
      type: String,
      default: _ecomplus_utils__WEBPACK_IMPORTED_MODULE_0__["$ecomConfig"].get('lang')
    },
    ecomCart: {
      type: Object,
      default: function _default() {
        return _ecomplus_shopping_cart__WEBPACK_IMPORTED_MODULE_1__["default"];
      }
    },
    showCart: {
      type: Boolean,
      default: false
    },
    showOnItemAdded: {
      type: Boolean,
      default: true
    },
    checkoutUrl: {
      type: String,
      default: '/app/#/checkout'
    },
    cartUrl: {
      type: String,
      default: '/app/#/cart'
    }
  },
  computed: {
    cart: function cart() {
      return this.ecomCart.data;
    }
  },
  methods: {
    dictionary: _lib_dictionary__WEBPACK_IMPORTED_MODULE_2__["default"],
    formatMoney: _ecomplus_utils__WEBPACK_IMPORTED_MODULE_0__["formatMoney"],
    show: function show() {
      this.$emit('update:showCart', true);
    },
    hide: function hide() {
      this.$emit('update:showCart', false);
    }
  },
  created: function created() {
    var _this = this;

    if (this.showOnItemAdded) {
      _ecomplus_shopping_cart__WEBPACK_IMPORTED_MODULE_1__["default"].on('addItem', function (_ref) {
        var data = _ref.data;

        _this.$set(_this.ecomCart, 'data', data);

        _this.show();
      });
    }
  },
  mounted: function mounted() {
    document.querySelector('body').appendChild(this.$refs.sidebar);
  }
});

/***/ })

}]);
//# sourceMappingURL=8cd3088d127cd23d5ed0.js.map