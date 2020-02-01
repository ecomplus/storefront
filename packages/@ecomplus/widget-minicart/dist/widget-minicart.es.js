(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@ecomplus/utils"), require("@ecomplus/shopping-cart"), require("vue"), require("@ecomplus/storefront-twbs"));
	else if(typeof define === 'function' && define.amd)
		define([, , , ], factory);
	else if(typeof exports === 'object')
		exports["widgetMinicart"] = factory(require("@ecomplus/utils"), require("@ecomplus/shopping-cart"), require("vue"), require("@ecomplus/storefront-twbs"));
	else
		root["widgetMinicart"] = factory(root["ecomUtils"], root["ecomCart"], root["Vue"], root["__storefront_twbs"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__3__, __WEBPACK_EXTERNAL_MODULE__6__, __WEBPACK_EXTERNAL_MODULE__7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/vendor/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(5).default
var update = add("cdd1eb20", content, true, {});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(5).default
var update = add("3555e7f0", content, true, {});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/vue-style-loader/lib/addStylesClient.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addStylesClient; });
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__6__;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7__;

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcCartItem_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcCartItem_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcCartItem_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcCartItem_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".ec-cart-item{margin-bottom:1rem}.ec-cart-item__name{font-size:.88rem;line-height:1.2;margin-bottom:.25rem}.ec-cart-item__row{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.ec-cart-item__picture{max-width:90px;margin-right:1rem}.ec-cart-item__edit{margin-right:.25rem}.ec-cart-item__quantity{display:inline-block;width:75px}.ec-cart-item__remove{display:block;text-align:center;margin-top:.15rem;color:var(--danger);font-size:.85rem;text-transform:lowercase}.ec-cart-item__remove:hover{color:var(--danger)}.ec-cart-item__prices{text-align:right;-webkit-box-flex:1;flex-grow:1;overflow:hidden}.ec-cart-item__price-un{font-size:.83rem;color:var(--gray)}", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcMinicart_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcMinicart_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcMinicart_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcMinicart_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".ec-minicart{display:inline}.ec-minicart__button{position:relative}.ec-minicart__button .badge{position:absolute;top:-.2rem;right:-.2rem;font-size:.8rem}.ec-minicart__sidebar{position:fixed;width:330px;max-width:100%;height:100%;top:0;right:0;z-index:1100;border-radius:0}.ec-minicart__sidebar>article{overflow-y:auto}.ec-minicart__summary{color:var(--gray);display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:justify;justify-content:space-between;padding-bottom:1rem}.ec-minicart__subtotal{color:var(--secondary)}", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__(6);
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// EXTERNAL MODULE: external {"commonjs":"@ecomplus/storefront-twbs","commonjs2":"@ecomplus/storefront-twbs","root":"__storefront_twbs"}
var storefront_twbs_root_storefront_twbs_ = __webpack_require__(7);

// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./src/components/html/EcMinicart.html?vue&type=template&id=5bdbc88a&lang=html&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ec-minicart"},[_vm._t("button",[_c('button',{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.bottom",modifiers:{"hover":true,"bottom":true}}],staticClass:"ec-minicart__button btn btn-lg btn-light",attrs:{"type":"button","title":_vm.dictionary('shopping_cart')},on:{"click":_vm.show}},[_c('i',{staticClass:"fas fa-shopping-bag"}),_c('span',{staticClass:"badge badge-sm badge-primary"},[_vm._v(" "+_vm._s(_vm.cart.items.length)+" ")])])]),_c('div',{ref:"sidebar"},[_c('transition',{attrs:{"enter-active-class":"animated slideInRight","leave-active-class":"animated slideOutRight"}},[_c('aside',{directives:[{name:"show",rawName:"v-show",value:(_vm.showCart),expression:"showCart"}],staticClass:"ec-minicart__sidebar card shadow"},[_vm._t("header",[_c('header',{staticClass:"card-header"},[_vm._v(" "+_vm._s(_vm.dictionary('my_cart'))+" "),_c('button',{staticClass:"close",attrs:{"type":"button","aria-label":_vm.dictionary('close')},on:{"click":_vm.hide}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])])]),_c('article',{staticClass:"card-body"},[_c('transition-group',{attrs:{"enter-active-class":"animated fadeIn slow"}},[(_vm.cart.items.length)?_c('div',{key:"list",staticClass:"ec-minicart__list"},[_vm._t("list",[_c('transition-group',{attrs:{"enter-active-class":"animated fadeInDown","leave-active-class":"animated position-absolute fadeOutUp faster"}},_vm._l((_vm.cart.items),function(item){return _c('ec-cart-item',{key:item._id,attrs:{"item":item,"resetQnt":_vm.showCart},on:{"increase":function (qnt) { return _vm.ecomCart.increaseItemQnt(item._id, qnt); },"remove":function($event){return _vm.ecomCart.removeItem(item._id)}}})}),1)],null,{ items: _vm.cart.items })],2):_c('div',{key:"empty",staticClass:"ec-minicart__empty"},[_vm._t("empty",[_c('p',{staticClass:"lead text-muted"},[_vm._v(" "+_vm._s(_vm.dictionary('empty_cart'))+" ... ")]),_c('a',{staticClass:"btn btn-block btn-primary",attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return _vm.hide($event)}}},[_c('span',{staticClass:"mr-1"},[_c('i',{staticClass:"fas fa-arrow-left"})]),_vm._v(" "+_vm._s(_vm.dictionary('continue_shopping'))+" ")])])],2)])],1),_vm._t("footer",[(_vm.cart.subtotal || _vm.cart.items.length)?_c('footer',{staticClass:"card-footer"},[_c('div',{staticClass:"ec-minicart__summary"},[_c('span',[_vm._v("Subtotal")]),_c('strong',{staticClass:"ec-minicart__subtotal"},[_vm._v(" "+_vm._s(_vm.formatMoney(_vm.cart.subtotal))+" ")])]),_c('a',{staticClass:"ec-minicart__btn-checkout btn btn-block btn-primary",attrs:{"role":"button","href":_vm.checkoutUrl}},[_c('span',{staticClass:"mr-1"},[_c('i',{staticClass:"fas fa-check"})]),_vm._v(" "+_vm._s(_vm.dictionary('checkout'))+" ")]),_c('a',{staticClass:"ec-minicart__btn-cart btn btn-block btn-outline-secondary",attrs:{"role":"button","href":_vm.cartUrl}},[_vm._v(" "+_vm._s(_vm.dictionary('see_cart'))+" ")])]):_vm._e()])],2)])],1)],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/html/EcMinicart.html?vue&type=template&id=5bdbc88a&lang=html&

// EXTERNAL MODULE: external {"commonjs":"@ecomplus/utils","commonjs2":"@ecomplus/utils","root":"ecomUtils"}
var utils_root_ecomUtils_ = __webpack_require__(0);

// EXTERNAL MODULE: external {"commonjs":"@ecomplus/shopping-cart","commonjs2":"@ecomplus/shopping-cart","root":"ecomCart"}
var shopping_cart_root_ecomCart_ = __webpack_require__(3);
var shopping_cart_root_ecomCart_default = /*#__PURE__*/__webpack_require__.n(shopping_cart_root_ecomCart_);

// CONCATENATED MODULE: ./src/lib/dictionary.js
const dictionary = {
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
}

/* harmony default export */ var lib_dictionary = (function (word, lang) {
  if (!lang) {
    lang = (this && this.lang) || 'en_us'
  }
  return (dictionary[word] && dictionary[word][lang]) || ''
});

// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./src/components/html/EcCartItem.html?vue&type=template&id=6c60aaf3&lang=html&
var EcCartItemvue_type_template_id_6c60aaf3_lang_html_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"ec-cart-item"},[_c('div',{staticClass:"ec-cart-item__name"},[(_vm.item.slug)?_c('a',{attrs:{"href":("/" + (_vm.item.slug))}},[_vm._v(" "+_vm._s(_vm.item.name)+" ")]):[_vm._v(" "+_vm._s(_vm.item.name)+" ")]],2),_c('div',{staticClass:"ec-cart-item__row"},[(_vm.item.picture && Object.keys(_vm.item.picture).length)?_c(_vm.item.slug ? 'a' : 'span',{tag:"component",attrs:{"href":("/" + (_vm.item.slug))}},[_c('img',{staticClass:"ec-cart-item__picture",attrs:{"src":_vm.img.url,"alt":_vm.img.alt || _vm.item.name}})]):_vm._e(),_c('div',{staticClass:"ec-cart-item__edit"},[(!_vm.skipSelect && _vm.inputType === 'select')?_c('select',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.quantity),expression:"quantity",modifiers:{"number":true}}],staticClass:"custom-select",on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return _vm._n(val)}); _vm.quantity=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},[_vm._l(((_vm.item.max_quantity || 10)),function(qnt){return _c('option',{domProps:{"value":qnt,"selected":qnt === _vm.quantity}},[_vm._v(" "+_vm._s(qnt)+" ")])}),_c('option',{domProps:{"value":11}},[_vm._v(" 11+ ")])],2):_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.quantity),expression:"quantity",modifiers:{"number":true}}],ref:"input",staticClass:"ec-cart-item__quantity form-control",attrs:{"type":_vm.inputType && _vm.inputType !== 'select' ? _vm.inputType : 'number'},domProps:{"value":(_vm.quantity)},on:{"input":function($event){if($event.target.composing){ return; }_vm.quantity=_vm._n($event.target.value)},"blur":function($event){return _vm.$forceUpdate()}}}),_c('a',{staticClass:"ec-cart-item__remove",attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return _vm.$emit('remove')}}},[_vm._v(" "+_vm._s(_vm.dictionary('remove'))+" ")])]),_c('div',{staticClass:"ec-cart-item__prices"},[(_vm.item.quantity > 1)?_c('div',{staticClass:"ec-cart-item__price-un"},[_vm._v(" "+_vm._s(_vm.formatMoney(_vm.price))+" "),_c('small',[_vm._v("/un")])]):_vm._e(),_vm._v(" "+_vm._s(_vm.formatMoney(_vm.price * _vm.item.quantity))+" ")])],1)])}
var EcCartItemvue_type_template_id_6c60aaf3_lang_html_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/html/EcCartItem.html?vue&type=template&id=6c60aaf3&lang=html&

// CONCATENATED MODULE: ./src/components/js/EcCartItem.js?vue&type=script&lang=js&



/* harmony default export */ var EcCartItemvue_type_script_lang_js_ = ({
  name: 'EcCartItem',

  props: {
    lang: {
      type: String,
      default: utils_root_ecomUtils_["$ecomConfig"].get('lang')
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

  data () {
    return {
      quantity: 1,
      skipSelect: false
    }
  },

  computed: {
    price () {
      return Object(utils_root_ecomUtils_["price"])(this.item)
    },

    img () {
      return Object(utils_root_ecomUtils_["img"])(this.item, null, 'small')
    }
  },

  methods: {
    dictionary: lib_dictionary,
    formatMoney: utils_root_ecomUtils_["formatMoney"],

    updateQnt () {
      this.quantity = this.item.quantity
      this.skipSelect = !Number.isInteger(this.item.quantity) ||
        this.item.quantity > 10
    }
  },

  created () {
    this.updateQnt()
  },

  watch: {
    quantity (qnt, oldQnt) {
      if (typeof qnt !== 'number' || isNaN(qnt)) {
        this.quantity = 0
      }
      if (this.quantity !== this.item.quantity) {
        this.$emit('increase', this.quantity - oldQnt)
        this.quantity = this.item.quantity
      }
      if (qnt > 10 && oldQnt <= 10) {
        this.skipSelect = true
        setTimeout(() => {
          this.$refs.input.focus()
        }, 300)
      }
    },

    resetQnt (reload) {
      if (reload) {
        this.updateQnt()
      }
    }
  }
});

// CONCATENATED MODULE: ./src/components/js/EcCartItem.js?vue&type=script&lang=js&
 /* harmony default export */ var js_EcCartItemvue_type_script_lang_js_ = (EcCartItemvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/scss/EcCartItem.scss?vue&type=style&index=0&lang=scss&
var EcCartItemvue_type_style_index_0_lang_scss_ = __webpack_require__(8);

// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/EcCartItem.vue






/* normalize component */

var component = normalizeComponent(
  js_EcCartItemvue_type_script_lang_js_,
  EcCartItemvue_type_template_id_6c60aaf3_lang_html_render,
  EcCartItemvue_type_template_id_6c60aaf3_lang_html_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var EcCartItem = (component.exports);
// CONCATENATED MODULE: ./src/components/js/EcMinicart.js?vue&type=script&lang=js&





/* harmony default export */ var EcMinicartvue_type_script_lang_js_ = ({
  name: 'EcMinicart',

  components: {
    EcCartItem: EcCartItem
  },

  props: {
    lang: {
      type: String,
      default: utils_root_ecomUtils_["$ecomConfig"].get('lang')
    },
    ecomCart: {
      type: Object,
      default: () => shopping_cart_root_ecomCart_default.a
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
    cart () {
      return this.ecomCart.data
    }
  },

  methods: {
    dictionary: lib_dictionary,
    formatMoney: utils_root_ecomUtils_["formatMoney"],

    show () {
      this.$emit('update:showCart', true)
    },

    hide () {
      this.$emit('update:showCart', false)
    }
  },

  created () {
    if (this.showOnItemAdded) {
      shopping_cart_root_ecomCart_default.a.on('addItem', ({ data }) => {
        this.$set(this.ecomCart, 'data', data)
        this.show()
      })
    }
  },

  mounted () {
    document.querySelector('body').appendChild(this.$refs.sidebar)
  }
});

// CONCATENATED MODULE: ./src/components/js/EcMinicart.js?vue&type=script&lang=js&
 /* harmony default export */ var js_EcMinicartvue_type_script_lang_js_ = (EcMinicartvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/scss/EcMinicart.scss?vue&type=style&index=0&lang=scss&
var EcMinicartvue_type_style_index_0_lang_scss_ = __webpack_require__(10);

// CONCATENATED MODULE: ./src/components/EcMinicart.vue






/* normalize component */

var EcMinicart_component = normalizeComponent(
  js_EcMinicartvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var EcMinicart = (EcMinicart_component.exports);
// CONCATENATED MODULE: ./src/index.js
/*!
 * @ecomplus/widget-minicart
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */





/* harmony default export */ var src = __webpack_exports__["default"] = ((options = {}, elId = 'cart-button') => {
  const $cartButton = document.getElementById(elId)

  if ($cartButton) {
    const { $overlay } = window.storefront

    new external_commonjs_vue_commonjs2_vue_root_Vue_default.a({
      data: {
        showCart: false
      },

      render (createElement) {
        const vm = this
        return createElement(EcMinicart, {
          attrs: {
            id: elId
          },
          props: {
            ...options.props,
            showCart: vm.showCart
          },

          on: {
            'update:showCart' (isVisible) {
              vm.showCart = isVisible
              if ($overlay) {
                if (isVisible) {
                  $overlay.show()
                  $overlay.once('hide', () => {
                    vm.showCart = false
                  })
                } else {
                  $overlay.hide()
                }
              }
            }
          }
        })
      }
    }).$mount($cartButton)
  }
});


/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=widget-minicart.es.js.map