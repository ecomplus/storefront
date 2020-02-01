(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@ecomplus/utils"), require("vue"), require("@ecomplus/search-engine"), require("@ecomplus/client"), require("@ecomplus/shopping-cart"), require("lozad"), require("@ecomplus/storefront-twbs"));
	else if(typeof define === 'function' && define.amd)
		define([, , , , , "lozad", ], factory);
	else if(typeof exports === 'object')
		exports["widgetSearchEngine"] = factory(require("@ecomplus/utils"), require("vue"), require("@ecomplus/search-engine"), require("@ecomplus/client"), require("@ecomplus/shopping-cart"), require("lozad"), require("@ecomplus/storefront-twbs"));
	else
		root["widgetSearchEngine"] = factory(root["ecomUtils"], root["Vue"], root["EcomSearch"], root["ecomClient"], root["ecomCart"], root["lozad"], root["__storefront_twbs"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__7__, __WEBPACK_EXTERNAL_MODULE__8__, __WEBPACK_EXTERNAL_MODULE__9__, __WEBPACK_EXTERNAL_MODULE__10__, __WEBPACK_EXTERNAL_MODULE__11__, __WEBPACK_EXTERNAL_MODULE__12__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
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
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(14);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("36d272bd", content, true, {});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(16);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("05bb3383", content, true, {});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(18);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("07f6a160", content, true, {});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(20);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("0c57e03a", content, true, {});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7__;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8__;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__9__;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__10__;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__11__;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__12__;

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _vue_style_loader_index_js_css_loader_dist_cjs_js_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_postcss_sass_loader_dist_cjs_js_EcImage_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _vue_style_loader_index_js_css_loader_dist_cjs_js_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_postcss_sass_loader_dist_cjs_js_EcImage_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_vue_style_loader_index_js_css_loader_dist_cjs_js_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_postcss_sass_loader_dist_cjs_js_EcImage_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_vue_style_loader_index_js_css_loader_dist_cjs_js_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_postcss_sass_loader_dist_cjs_js_EcImage_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(1);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".ec-image img{max-width:100%;height:auto}", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _vue_style_loader_index_js_css_loader_dist_cjs_js_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_postcss_sass_loader_dist_cjs_js_EcPrices_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _vue_style_loader_index_js_css_loader_dist_cjs_js_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_postcss_sass_loader_dist_cjs_js_EcPrices_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_vue_style_loader_index_js_css_loader_dist_cjs_js_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_postcss_sass_loader_dist_cjs_js_EcPrices_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_vue_style_loader_index_js_css_loader_dist_cjs_js_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_postcss_sass_loader_dist_cjs_js_EcPrices_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(1);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".ec-prices{line-height:1.2}.ec-prices:not(.ec-prices--big){font-size:.95rem}.ec-prices:not(.ec-prices--big) .ec-prices__installments{font-weight:300}.ec-prices__value{display:block;font-size:1.25rem}.ec-prices--big .ec-prices__value{font-size:250%;margin-bottom:.25rem}.ec-prices--literal .ec-prices__discount span,.ec-prices--literal .ec-prices__installments span{font-weight:700}.ec-prices--literal small{font-size:100%}.ec-prices:not(.ec-prices--literal) .ec-prices__compare{color:var(--gray)}", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _vue_style_loader_index_js_css_loader_dist_cjs_js_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_postcss_sass_loader_dist_cjs_js_EcProductCard_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _vue_style_loader_index_js_css_loader_dist_cjs_js_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_postcss_sass_loader_dist_cjs_js_EcProductCard_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_vue_style_loader_index_js_css_loader_dist_cjs_js_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_postcss_sass_loader_dist_cjs_js_EcProductCard_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_vue_style_loader_index_js_css_loader_dist_cjs_js_vue_loader_lib_loaders_stylePostLoader_js_postcss_loader_src_index_js_postcss_sass_loader_dist_cjs_js_EcProductCard_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(1);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".ec-product-card{position:relative;padding-bottom:.1rem;margin-bottom:0}.ec-product-card--inactive,.ec-product-card--inactive img{opacity:.7}.ec-product-card__offer-stamp{background-color:var(--success);color:var(--success-yiq);min-width:40px;font-size:.78rem;line-height:1.8;text-align:center;position:absolute;z-index:9;top:.35rem;right:.35rem;border-radius:.125rem;opacity:.9}.ec-product-card__link:hover h3{text-decoration:underline}.ec-product-card__name{margin-top:.5rem;font-size:.88rem;line-height:1.2;height:3.168rem;overflow:hidden;font-weight:400;display:block;z-index:1}.ec-product-card__pictures{display:-webkit-box;display:flex;background-color:var(--body-bg);-webkit-box-align:center;align-items:center;text-align:center;overflow:hidden}@media (max-width:575.98px){.ec-product-card__pictures{height:180px}}@media (min-width:576px) and (max-width:991.98px){.ec-product-card__pictures{height:200px}}@media (min-width:992px){.ec-product-card__pictures{height:250px}}.ec-product-card__picture{display:block;-webkit-box-flex:0;flex:0 0 100%;opacity:0;-webkit-transition:opacity .25s;transition:opacity .25s}.ec-product-card__picture:first-child{opacity:1}@media (max-width:300px){.ec-product-card__picture{max-width:100px}}@media (max-width:575.98px){.ec-product-card__picture img{max-height:180px}}@media (min-width:576px) and (max-width:991.98px){.ec-product-card__picture img{max-height:200px}}@media (min-width:992px){.ec-product-card__picture img{max-height:250px}}.ec-product-card__prices{margin-bottom:.15rem;height:4.95rem;overflow:hidden;white-space:nowrap}.ec-product-card__prices .ec-prices__value:first-child{margin-top:1.14rem}.ec-product-card:hover .ec-product-card__picture{display:none}.ec-product-card:hover .ec-product-card__picture:last-child{display:block;opacity:1}.ec-product-card:hover .ec-product-card__buy{opacity:1}", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcSearchEngine_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcSearchEngine_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcSearchEngine_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcSearchEngine_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(1);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".ec-search-engine__nav{background:hsla(0,0%,50.2%,.1);color:var(--gray)}.ec-search-engine__count{padding-left:.5rem;position:relative;line-height:2.5}.ec-search-engine__spinner{position:absolute;top:.4rem;right:-3rem;color:var(--secondary);margin-left:1.5rem;width:1.75rem;height:1.75rem}.ec-search-engine__toggle{color:inherit;display:inline-block;text-decoration:none;-webkit-transition:opacity .15s,color .2s;transition:opacity .15s,color .2s;padding:0 .5rem;opacity:.75;line-height:2.5;border:none}.ec-search-engine__toggle i,.ec-search-engine__toggle svg{font-size:.825rem;color:var(--gray-dark);margin-right:.15rem}.ec-search-engine__toggle:focus,.ec-search-engine__toggle:hover{opacity:1;text-decoration:none;color:inherit;box-shadow:none}.ec-search-engine__toggle[aria-expanded=true]{color:var(--gray-dark);opacity:1}.ec-search-engine__results{-webkit-transition:opacity .25s;transition:opacity .25s}.ec-search-engine__info{margin-bottom:1.5rem;padding-top:1rem}.ec-search-engine__terms{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:center;align-items:center}.ec-search-engine__terms small{font-size:.95rem;color:var(--gray)}.ec-search-engine__retail{padding-top:.5rem}.ec-search-engine__item{margin-bottom:1rem}.ec-search-engine__sidebar{position:fixed;width:280px;max-width:100%;height:100%;top:0;right:0;z-index:1100;border-radius:0}.ec-search-engine__sidebar .card-body{overflow-y:auto}.ec-search-engine__filter:not(:first-child){margin-top:1rem}.ec-search-engine__filter:last-child{margin-bottom:1.5rem}.ec-search-engine__filter__btn{padding-left:0;color:var(--secondary);font-size:1.2rem;font-weight:300}.ec-search-engine__filter__btn i,.ec-search-engine__filter__btn svg{margin-right:.25rem;color:var(--gray);opacity:.6}.ec-search-engine__filter__btn:focus{box-shadow:none}.ec-search-engine__option small{color:var(--gray)}", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__(7);
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// EXTERNAL MODULE: external {"commonjs":"@ecomplus/storefront-twbs","commonjs2":"@ecomplus/storefront-twbs","root":"__storefront_twbs"}
var storefront_twbs_root_storefront_twbs_ = __webpack_require__(12);

// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./src/components/html/EcSearchEngine.html?vue&type=template&id=1abf0101&lang=html&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"ec-search-engine"},[_c('nav',{ref:"nav"},[_c('portal-target',{attrs:{"name":"search-nav"}})],1),_c('portal',{attrs:{"to":"search-nav"}},[_c('transition',{attrs:{"enter-active-class":"animated fadeInDown fast"}},[(_vm.searched && (_vm.searching || _vm.totalSearchResults > 8 || _vm.hasSelectedOptions))?_c('div',{staticClass:"ec-search-engine__nav"},[_vm._t("nav",[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-auto"},[_c('div',{staticClass:"ec-search-engine__count"},[_c('strong',[_vm._v(_vm._s(_vm.totalSearchResults))]),_vm._v(" "+_vm._s(_vm.dictionary('items'))+" "),(_vm.searching)?_c('div',{staticClass:"spinner-grow ec-search-engine__spinner",attrs:{"role":"status"}},[_c('span',{staticClass:"sr-only"},[_vm._v("Loading...")])]):_vm._e()])]),_c('div',{staticClass:"text-right col"},[(_vm.hasSelectedOptions || _vm.filters.find(function (ref) {
	var filterObj = ref.filterObj;

	return filterObj.options.length;
}))?_c('button',{staticClass:"btn ec-search-engine__toggle",attrs:{"type":"button"},on:{"click":function($event){return _vm.toggleFilters(true)}}},[_c('i',{staticClass:"fas fa-filter"}),_vm._v(" "+_vm._s(_vm.dictionary('filter'))+" "),_c('span',{staticClass:"d-none d-md-inline"},[_vm._v(" "+_vm._s(_vm.dictionary('results'))+" ")])]):_vm._e(),_c('b-dropdown',{attrs:{"variant":"link","toggle-class":"ec-search-engine__toggle","right":"","no-caret":""},scopedSlots:_vm._u([{key:"button-content",fn:function(){return [_c('i',{staticClass:"fas fa-sort"}),_c('span',{staticClass:"d-none d-md-inline"},[_vm._v(" "+_vm._s(_vm.dictionary('sort'))+" ")])]},proxy:true}],null,false,2883328033)},_vm._l((_vm.sortOptions),function(sortOption,index){return _c('b-dropdown-item',{key:("sort-" + index),attrs:{"href":"#","active":_vm.selectedSortOption === sortOption},on:{"click":function($event){$event.preventDefault();return _vm.setSortOrder(sortOption)}}},[_vm._v(" "+_vm._s(_vm.dictionary(sortOption || 'relevance'))+" ")])}),1)],1)])])],null,{ totalSearchResults: _vm.totalSearchResults, toggleFilters: _vm.toggleFilters })],2):_vm._e()])],1),_c('transition',{attrs:{"enter-active-class":"animated slideInRight","leave-active-class":"animated slideOutRight"}},[_c('aside',{directives:[{name:"show",rawName:"v-show",value:(_vm.showFilters),expression:"showFilters"}],staticClass:"ec-search-engine__sidebar card shadow"},[_vm._t("filters",[_c('header',{staticClass:"card-header"},[_vm._v(" "+_vm._s(_vm.dictionary('refine_search'))+" "),_c('button',{staticClass:"close",attrs:{"type":"button","aria-label":_vm.dictionary('close_filters')},on:{"click":function($event){return _vm.toggleFilters(false)}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])]),_c('div',{staticClass:"card-body"},_vm._l((_vm.filters),function(ref){
var filter = ref.filter;
var filterObj = ref.filterObj;
var isSpec = ref.isSpec;
return (filterObj.options.length)?_c('div',{key:("filters-" + filter),staticClass:"ec-search-engine__filter",class:("ec-search-engine__filter--" + filter)},[_c('button',{staticClass:"btn ec-search-engine__filter__btn",attrs:{"type":"button","aria-expanded":filterObj.show ? 'true' : 'false',"aria-controls":("collapse-" + filter)},on:{"click":function($event){filterObj.show = !filterObj.show}}},[_c('i',{staticClass:"fas fa-chevron-down"}),_vm._v(" "+_vm._s(_vm.filterLabel(filter))+" ")]),_c('b-collapse',{attrs:{"id":("collapse-" + filter)},model:{value:(filterObj.show),callback:function ($$v) {_vm.$set(filterObj, "show", $$v)},expression:"filterObj.show"}},_vm._l((filterObj.options),function(opt,index){return _c('div',{key:(filter + "-" + index),staticClass:"custom-control custom-checkbox ec-search-engine__option"},[_c('input',{staticClass:"custom-control-input",attrs:{"type":"checkbox","id":(filter + "-" + index)},domProps:{"checked":_vm.selectedOptions[filter].indexOf(opt.key) > -1},on:{"change":function (ev) { return _vm.setFilterOption(filter, opt.key, ev.target.checked); }}}),_c('label',{staticClass:"custom-control-label",attrs:{"for":(filter + "-" + index)}},[_vm._v(" "+_vm._s(opt.key)+" "),(!isSpec)?_c('small',[_vm._v(" ("+_vm._s(opt.doc_count)+") ")]):_vm._e()])])}),0)],1):_vm._e()}),0),_c('footer',{staticClass:"card-footer"},[_c('button',{staticClass:"btn btn-sm btn-block btn-outline-secondary",attrs:{"type":"button"},on:{"click":_vm.clearFilters}},[_c('span',{staticClass:"mr-1"},[_c('i',{staticClass:"fas fa-trash-alt"})]),_vm._v(" "+_vm._s(_vm.dictionary('clear_filters'))+" ")])])])],2)]),_c('transition',{attrs:{"enter-active-class":"animated fadeIn slower"}},[(_vm.searched)?_c('div',{staticClass:"ec-search-engine__results",style:({ opacity: _vm.searching && !_vm.loadingMore ? 0.4 : 1 })},[_c('div',{staticClass:"ec-search-engine__info"},[(_vm.term)?[(_vm.emptyResult)?_c('div',{staticClass:"ec-search-engine__no-results"},[_c('div',{staticClass:"lead"},[_vm._v(" "+_vm._s(_vm.dictionary('no_results_for'))+" "),_c('em',[_vm._v(_vm._s(_vm.term))])]),_c('h1',[_vm._v(_vm._s(_vm.dictionary('popular_products')))])]):_c('div',{staticClass:"ec-search-engine__terms"},[_c('h1',[_c('small',{staticClass:"d-none d-md-block"},[_vm._v(" "+_vm._s(_vm.dictionary('searching_for'))+": ")]),_vm._v(" "+_vm._s(_vm.fixedTerm || _vm.term)+" ")]),(_vm.fixedTerm)?_c('em',{staticClass:"d-none d-lg-block"},[_vm._v(" "+_vm._s(_vm.dictionary('no_results_for'))+" "),_c('s',[_vm._v(_vm._s(_vm.term))])]):_vm._e()])]:_vm._e(),_c('transition',{attrs:{"enter-active-class":"animated fadeInDown","leave-active-class":"animated position-absolute fadeOutUp"}},[(_vm.hasSelectedOptions)?_c('div',[_c('button',{staticClass:"btn btn-sm btn-outline-secondary",attrs:{"type":"button"},on:{"click":_vm.clearFilters}},[_c('span',{staticClass:"mr-1"},[_c('i',{staticClass:"fas fa-trash-alt"})]),_vm._v(" "+_vm._s(_vm.dictionary('clear_filters'))+" ")]),_vm._l((_vm.selectedOptions),function(options,filter){return _vm._l((options),function(option){return _c('button',{staticClass:"btn m-1 btn-sm btn-light",attrs:{"type":"button"},on:{"click":function($event){return _vm.setFilterOption(filter, option, false)}}},[_c('span',{staticClass:"mr-1"},[_c('i',{staticClass:"fas fa-times"})]),_vm._v(" "+_vm._s(option)+" "),_c('small',[_vm._v("\\ "+_vm._s(_vm.filterLabel(filter)))])])})})],2):_vm._e()])],2),_c('article',{staticClass:"ec-search-engine__retail"},[_c('div',{staticClass:"row"},_vm._l((_vm.resultItems),function(product){return _c('div',{key:product._id,staticClass:"col-6 col-md-4 col-lg-3"},[_vm._t("product",[_c('ec-product-card',{staticClass:"ec-search-engine__item",attrs:{"lang":_vm.lang,"storeId":_vm.storeId,"product":product}})],null,{ product: product })],2)}),0)]),_c('transition',{attrs:{"enter-active-class":"animated fadeInDown","leave-active-class":"animated position-absolute fadeOutUp"}},[(_vm.networkError)?_c('div',{staticClass:"alert alert-warning",attrs:{"role":"alert"}},[_c('h4',{staticClass:"alert-heading"},[_vm._v("Offline")]),(_vm.lang === 'pt_br')?[_vm._v(" Não foi possível buscar os produtos, por favor verifique sua conexão com a internet. ")]:[_vm._v(" Unable to fetch the products, please check your internet connection. ")],_c('hr'),_c('button',{staticClass:"btn btn-primary",attrs:{"type":"button"},on:{"click":function($event){return _vm.fetchItems(_vm.currentPage)}}},[_c('i',{staticClass:"fas fa-search mr-1"}),_vm._v(" "+_vm._s(_vm.dictionary('search_again'))+" ")])],2):_vm._e()])],1):_vm._e()]),_c('transition',{attrs:{"enter-active-class":"animated fadeInDown","leave-active-class":"animated fadeOutUp"}},[(!_vm.searched || _vm.loadingMore)?_vm._t("default",[_c('div',{domProps:{"innerHTML":_vm._s(_vm.prerenderedHTML)}})]):_vm._e()],2)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/html/EcSearchEngine.html?vue&type=template&id=1abf0101&lang=html&

// EXTERNAL MODULE: external {"commonjs":"@ecomplus/utils","commonjs2":"@ecomplus/utils","root":"ecomUtils"}
var utils_root_ecomUtils_ = __webpack_require__(0);

// EXTERNAL MODULE: external {"commonjs":"@ecomplus/search-engine","commonjs2":"@ecomplus/search-engine","root":"EcomSearch"}
var search_engine_root_EcomSearch_ = __webpack_require__(8);
var search_engine_root_EcomSearch_default = /*#__PURE__*/__webpack_require__.n(search_engine_root_EcomSearch_);

// CONCATENATED MODULE: ./src/lib/dictionary.js
const dictionary = {
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
}

/* harmony default export */ var lib_dictionary = (function (word, lang) {
  if (!lang) {
    lang = (this && this.lang) || 'en_us'
  }
  return (dictionary[word] && dictionary[word][lang]) || ''
});

// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/leo/code/storefront-template/node_modules/@ecomplus/widget-product-card/src/components/html/EcProductCard.html?vue&type=template&id=d113e326&lang=html&
var EcProductCardvue_type_template_id_d113e326_lang_html_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ec-product-card",class:_vm.body._id && !_vm.isActive ? 'ec-product-card--inactive' : null},[_c('transition',{attrs:{"enter-active-class":"animated fadeIn"}},[(!_vm.isLoading)?_c('section',[_vm._t("discount-tag",[(_vm.isActive && _vm.discount > 0)?_c('span',{staticClass:"ec-product-card__offer-stamp"},[_vm._v(" -"),_c('b',[_vm._v(_vm._s(_vm.discount))]),_vm._v("% ")]):_vm._e()]),_vm._t("body",[_c('a',{staticClass:"ec-product-card__link",attrs:{"href":("/" + (_vm.body.slug)),"title":_vm.name(_vm.body)}},[_c('div',{staticClass:"ec-product-card__pictures"},[(_vm.body.pictures && _vm.body.pictures.length)?_vm._l((_vm.body.pictures.slice(0, 2)),function(picture,index){return _c('ec-image',{key:index,staticClass:"ec-product-card__picture",attrs:{"src":picture,"pictureBreakpoint":300}})}):_c('ec-image',{staticClass:"ec-product-card__picture"})],2),_c('h3',{staticClass:"ec-product-card__name"},[_vm._v(" "+_vm._s(_vm.name(_vm.body))+" ")])])]),(!_vm.body.available || !_vm.body.visible)?_vm._t("unavailable",[_c('p',{staticClass:"badge badge-warning"},[_vm._v(" "+_vm._s(_vm.dictionary('unavailable'))+" ")])]):(!_vm.inStock(_vm.body))?_vm._t("out-of-stock",[_c('p',{staticClass:"badge badge-dark"},[_vm._v(" "+_vm._s(_vm.dictionary('out_of_stock'))+" ")])]):[_vm._t("prices",[_c('ec-prices',{staticClass:"ec-product-card__prices",attrs:{"lang":_vm.lang,"product":_vm.body}})]),_c('div',{staticClass:"ec-product-card__buy fade",on:{"click":_vm.buy}},[_vm._t("buy",[_c('button',{staticClass:"btn btn-block btn-primary",attrs:{"type":"button"}},[_c('i',{staticClass:"fas fa-shopping-bag mr-1"}),_vm._v(" "+_vm._s(_vm.strBuy)+" ")])])],2)],_vm._t("footer")],2):_vm._e()]),(_vm.isLoading)?[_vm._t("default"),(_vm.error)?_c('div',{staticClass:"alert alert-warning small",attrs:{"role":"alert"}},[_vm._v(" "+_vm._s(_vm.error)+" ")]):_vm._e()]:_vm._e()],2)}
var EcProductCardvue_type_template_id_d113e326_lang_html_staticRenderFns = []


// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/@ecomplus/widget-product-card/src/components/html/EcProductCard.html?vue&type=template&id=d113e326&lang=html&

// EXTERNAL MODULE: external {"commonjs":"@ecomplus/client","commonjs2":"@ecomplus/client","root":"ecomClient"}
var client_root_ecomClient_ = __webpack_require__(9);

// EXTERNAL MODULE: external {"commonjs":"@ecomplus/shopping-cart","commonjs2":"@ecomplus/shopping-cart","root":"ecomCart"}
var shopping_cart_root_ecomCart_ = __webpack_require__(10);
var shopping_cart_root_ecomCart_default = /*#__PURE__*/__webpack_require__.n(shopping_cart_root_ecomCart_);

// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/@ecomplus/widget-product/src/lib/dictionary.js
const dictionary_dictionary = {
  from: {
    en_us: 'from',
    pt_br: 'de'
  },
  to: {
    en_us: 'to',
    pt_br: 'por'
  },
  unavailable: {
    en_us: 'Unavailable',
    pt_br: 'Indisponível'
  },
  out_of_stock: {
    en_us: 'Out of stock',
    pt_br: 'Sem estoque'
  },
  buy: {
    en_us: 'Buy',
    pt_br: 'Comprar'
  },
  up_to: {
    en_us: 'up to',
    pt_br: 'até'
  },
  zip: {
    en_us: 'Zip code',
    pt_br: 'CEP'
  },
  calculate_shipping: {
    en_us: 'Calculate shipping',
    pt_br: 'Calcular frete e prazo'
  },
  days: {
    en_us: 'days',
    pt_br: 'dias'
  },
  working_days: {
    en_us: 'working days',
    pt_br: 'dias úteis'
  },
  free_shipping: {
    en_us: 'free shipping',
    pt_br: 'frete grátis'
  },
  interest_free: {
    en_us: 'interest free',
    pt_br: 'sem juros'
  },
  discount_of: {
    en_us: 'discount of',
    pt_br: 'desconto de'
  },
  select_variation: {
    en_us: 'Please select an option in each field above',
    pt_br: 'Por favor selecione uma opção em cada campo acima'
  }
}

/* harmony default export */ var src_lib_dictionary = (function (word, lang) {
  if (!lang) {
    lang = (this && this.lang) || 'en_us'
  }
  return (dictionary_dictionary[word] && dictionary_dictionary[word][lang]) || ''
});



// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/leo/code/storefront-template/node_modules/@ecomplus/widget-product/src/components/html/EcImage.html?vue&type=template&id=ea3a7ad8&lang=html&
var EcImagevue_type_template_id_ea3a7ad8_lang_html_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ec-image"},[(typeof _vm.src === 'string')?_c('img',{ref:"lazyImg",class:_vm.imgClasses,attrs:{"alt":_vm.alt,"data-src":_vm.src}}):(_vm.src && _vm.imgObj)?_c('picture',{ref:"lazyImg",class:_vm.imgClasses,attrs:{"data-iesrc":_vm.src.zoom ? _vm.src.zoom.url : _vm.imgObj.url,"data-alt":_vm.imgObj.alt}},[(_vm.src.small)?_c('source',{attrs:{"srcset":_vm.src.small.url,"media":("(max-width: " + (_vm.pictureBreakpoint - 0.02) + "px)")}}):_vm._e(),_c('source',{attrs:{"srcset":_vm.imgObj.url,"media":("(min-width: " + _vm.pictureBreakpoint + "px)")}})]):_c('img',{attrs:{"src":_vm.placeholder,"alt":"No image"}})])}
var EcImagevue_type_template_id_ea3a7ad8_lang_html_staticRenderFns = []


// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/@ecomplus/widget-product/src/components/html/EcImage.html?vue&type=template&id=ea3a7ad8&lang=html&

// EXTERNAL MODULE: external "lozad"
var external_lozad_ = __webpack_require__(11);
var external_lozad_default = /*#__PURE__*/__webpack_require__.n(external_lozad_);

// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/@ecomplus/widget-product/src/components/js/EcImage.js?vue&type=script&lang=js&



/* harmony default export */ var EcImagevue_type_script_lang_js_ = ({
  name: 'EcImage',

  props: {
    src: [String, Object],
    fallbackSrc: String,
    alt: {
      type: String,
      default: ''
    },
    fade: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '/assets/img-placeholder.png'
    },
    pictureBreakpoint: {
      type: Number,
      default: 576
    }
  },

  data () {
    return {
      imgClasses: `lozad ${(this.fade ? 'fade' : 'show')}`
    }
  },

  computed: {
    imgObj () {
      return Object(utils_root_ecomUtils_["img"])(this.src)
    }
  },

  mounted () {
    const $img = this.$refs.lazyImg
    if ($img) {
      const observer = external_lozad_default()($img, {
        loaded: $el => {
          $el.classList.add('show')
          const fallbackSrc = this.fallbackSrc || (this.src.zoom && this.src.zoom.url)
          if (fallbackSrc) {
            const $img = $el.tagName === 'IMG' ? $el : $el.lastChild
            $img.onerror = function () {
              console.error(this)
              $el.style.display = 'none'
              const $newImg = document.createElement('IMG')
              $newImg.src = fallbackSrc
              $el.parentNode.insertBefore($newImg, $el.nextSibling)
            }
          }
        }
      })
      observer.observe()
    }
  }
});

// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/@ecomplus/widget-product/src/components/js/EcImage.js?vue&type=script&lang=js&
 /* harmony default export */ var js_EcImagevue_type_script_lang_js_ = (EcImagevue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/leo/code/storefront-template/node_modules/@ecomplus/widget-product/src/components/scss/EcImage.scss?vue&type=style&index=0&lang=scss&
var EcImagevue_type_style_index_0_lang_scss_ = __webpack_require__(13);

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

// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/@ecomplus/widget-product/src/components/EcImage.vue






/* normalize component */

var component = normalizeComponent(
  js_EcImagevue_type_script_lang_js_,
  EcImagevue_type_template_id_ea3a7ad8_lang_html_render,
  EcImagevue_type_template_id_ea3a7ad8_lang_html_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var EcImage = (component.exports);
// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/leo/code/storefront-template/node_modules/@ecomplus/widget-product/src/components/html/EcPrices.html?vue&type=template&id=dfb94cd4&lang=html&
var EcPricesvue_type_template_id_dfb94cd4_lang_html_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ec-prices",class:{ 'ec-prices--literal': _vm.literal, 'ec-prices--big': _vm.big }},[(_vm.comparePrice)?_c('span',{staticClass:"ec-prices__compare"},[(_vm.literal)?[_vm._v(" "+_vm._s(_vm.dictionary('from'))+" "),_c('s',[_vm._v(_vm._s(_vm.formatMoney(_vm.comparePrice)))]),_vm._v(" "+_vm._s(_vm.dictionary('to'))+" ")]:_c('s',[_vm._v(_vm._s(_vm.formatMoney(_vm.comparePrice)))])],2):_vm._e(),_c('strong',{staticClass:"ec-prices__value"},[_vm._v(" "+_vm._s(_vm.formatMoney(_vm.price))+" ")]),_c('transition-group',{attrs:{"enter-active-class":"animated slideInDown"}},[(_vm.interestFreeInstallments > 1)?_c('div',{key:"installments",staticClass:"ec-prices__installments"},[_vm._v(" "+_vm._s(_vm.interestFreeInstallments)+"x "),_c('span',[_vm._v(" "+_vm._s(_vm.formatMoney(_vm.price / _vm.interestFreeInstallments))+" ")]),(_vm.literal)?_c('small',[_vm._v(" "+_vm._s(_vm.dictionary('interest_free'))+" ")]):_vm._e()]):_vm._e(),(typeof _vm.priceWithDiscount === 'number' && _vm.priceWithDiscount < _vm.price)?_c('div',{key:"discount",staticClass:"ec-prices__discount"},[_c('span',[_vm._v(" "+_vm._s(_vm.formatMoney(_vm.priceWithDiscount))+" ")]),(typeof _vm.discountLabel === 'string')?_c('small',[_vm._v(" "+_vm._s(_vm.discountLabel)+" ")]):_vm._e()]):_vm._e()])],1)}
var EcPricesvue_type_template_id_dfb94cd4_lang_html_staticRenderFns = []


// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/@ecomplus/widget-product/src/components/html/EcPrices.html?vue&type=template&id=dfb94cd4&lang=html&

// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/@ecomplus/widget-product/src/components/js/EcPrices.js?vue&type=script&lang=js&



const getPriceWithDiscount = (price, discount) => {
  const { type, value } = discount
  if (value) {
    if (type === 'percentage') {
      return price * (100 - value) / 100
    } else {
      return price - value
    }
  }
}

/* harmony default export */ var EcPricesvue_type_script_lang_js_ = ({
  name: 'EcPrices',

  props: {
    lang: {
      type: String,
      default: utils_root_ecomUtils_["$ecomConfig"].get('lang')
    },
    product: {
      type: Object,
      required: true
    },
    literal: {
      type: Boolean
    },
    big: {
      type: Boolean
    },
    installmentsOption: {
      type: Object
    },
    discountOption: {
      type: Object
    },
    discountText: {
      type: [String, Boolean],
      default: ''
    }
  },

  data () {
    return {
      interestFreeInstallments: 0,
      discount: {
        type: null,
        value: 0
      },
      extraDiscount: {
        type: null,
        value: 0
      },
      discountLabel: this.discountText
    }
  },

  methods: {
    dictionary: src_lib_dictionary,
    formatMoney: utils_root_ecomUtils_["formatMoney"],

    updateInstallments (installments) {
      if (installments && !installments.monthly_interest) {
        const minInstallment = installments.min_installment || 5
        const installmentsNumber = parseInt(this.price / minInstallment, 10)
        this.interestFreeInstallments = Math.min(installmentsNumber, installments.max_number)
      }
    },

    updateDiscount (discount) {
      if (discount && (!discount.min_amount || discount.min_amount <= this.price)) {
        this.discount = discount
        if (!this.discountText && this.discountText !== false && discount.label) {
          this.discountLabel = `via ${discount.label}`
        }
      }
    }
  },

  computed: {
    price () {
      const price = Object(utils_root_ecomUtils_["price"])(this.product)
      if (this.extraDiscount.value) {
        return getPriceWithDiscount(price, this.extraDiscount)
      }
      return price
    },

    comparePrice () {
      if (Object(utils_root_ecomUtils_["onPromotion"])(this.product)) {
        return this.product.base_price
      } else if (this.extraDiscount.value) {
        return Object(utils_root_ecomUtils_["price"])(this.product)
      }
    },

    priceWithDiscount () {
      return getPriceWithDiscount(this.price, this.discount)
    }
  },

  created () {
    if (!this.installmentsOption && !this.discountOption) {
      const { storefront } = window
      if (storefront) {
        const getPaymentInfo = () => {
          const paymentInfo = storefront.info && storefront.info.list_payments
          if (paymentInfo) {
            this.updateInstallments(paymentInfo.installments_option)
            this.updateDiscount(paymentInfo.discount_option)
            return Object.keys(paymentInfo).length > 0
          }
          return false
        }
        if (!getPaymentInfo()) {
          storefront.on('info:list_payments', getPaymentInfo)
        }
        const getExtraDiscount = () => {
          const discountCampaign = storefront.info && storefront.info.apply_discount
          if (discountCampaign) {
            const discount = discountCampaign.available_extra_discount
            if (discount) {
              this.extraDiscount = discount
            }
            return Object.keys(discountCampaign).length > 0
          }
          return false
        }
        if (!getExtraDiscount()) {
          storefront.on('info:apply_discount', getExtraDiscount)
        }
      }
    } else {
      this.updateInstallments(this.installmentsOption)
      this.updateDiscount(this.discountOption)
    }
  }
});

// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/@ecomplus/widget-product/src/components/js/EcPrices.js?vue&type=script&lang=js&
 /* harmony default export */ var js_EcPricesvue_type_script_lang_js_ = (EcPricesvue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/leo/code/storefront-template/node_modules/@ecomplus/widget-product/src/components/scss/EcPrices.scss?vue&type=style&index=0&lang=scss&
var EcPricesvue_type_style_index_0_lang_scss_ = __webpack_require__(15);

// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/@ecomplus/widget-product/src/components/EcPrices.vue






/* normalize component */

var EcPrices_component = normalizeComponent(
  js_EcPricesvue_type_script_lang_js_,
  EcPricesvue_type_template_id_dfb94cd4_lang_html_render,
  EcPricesvue_type_template_id_dfb94cd4_lang_html_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var EcPrices = (EcPrices_component.exports);
// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/@ecomplus/widget-product-card/src/components/js/EcProductCard.js?vue&type=script&lang=js&







/* harmony default export */ var EcProductCardvue_type_script_lang_js_ = ({
  name: 'EcProductCard',

  components: {
    EcImage: EcImage,
    EcPrices: EcPrices
  },

  props: {
    lang: {
      type: String,
      default: utils_root_ecomUtils_["$ecomConfig"].get('lang')
    },
    storeId: {
      type: Number,
      default: utils_root_ecomUtils_["$ecomConfig"].get('store_id')
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

  data () {
    return {
      body: {},
      isLoading: false,
      error: ''
    }
  },

  computed: {
    strBuy () {
      return this.buyText || this.dictionary('buy')
    },

    isActive () {
      const { body } = this
      return body.available && body.visible && Object(utils_root_ecomUtils_["inStock"])(body)
    },

    discount () {
      const { body } = this
      return Object(utils_root_ecomUtils_["onPromotion"])(body)
        ? Math.round(((body.base_price - Object(utils_root_ecomUtils_["price"])(body)) * 100) / body.base_price)
        : 0
    }
  },

  methods: {
    dictionary: src_lib_dictionary,
    name: utils_root_ecomUtils_["name"],
    inStock: utils_root_ecomUtils_["inStock"],

    setBody (data) {
      this.body = Object.assign({}, data)
      delete this.body.body_html
      delete this.body.body_text
    },

    fetchItem () {
      if (this.productId) {
        this.isLoading = true
        const { storeId, productId } = this
        Object(client_root_ecomClient_["store"])({ url: `/products/${productId}.json`, storeId })
          .then(({ data }) => {
            this.$emit('update:product', data)
            this.setBody(data)
            this.$emit('update:is-loaded', true)
          })
          .catch(err => {
            console.error(err)
            if (!this.body.name || !this.body.slug || !this.body.pictures) {
              this.error = this.lang === 'pt_br'
                ? 'Erro de conexão, clique no produto para tentar novamente'
                : 'Connection error, click product to try again'
            }
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    },

    buy () {
      const product = this.body
      this.$emit('buy', { product })
      if (this.canAddToCart) {
        const { variations, slug } = product
        if (variations && variations.length) {
          window.location = `/${slug}`
        } else {
          shopping_cart_root_ecomCart_default.a.addProduct(product)
        }
      }
    }
  },

  created () {
    if (this.product) {
      this.setBody(this.product)
      if (this.product.available === undefined) {
        this.body.available = true
      }
      if (this.product.visible === undefined) {
        this.body.visible = true
      }
    }
    if (!this.isLoaded) {
      this.fetchItem()
    }
  }
});

// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/@ecomplus/widget-product-card/src/components/js/EcProductCard.js?vue&type=script&lang=js&
 /* harmony default export */ var js_EcProductCardvue_type_script_lang_js_ = (EcProductCardvue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/leo/code/storefront-template/node_modules/@ecomplus/widget-product-card/src/components/scss/EcProductCard.scss?vue&type=style&index=0&lang=scss&
var EcProductCardvue_type_style_index_0_lang_scss_ = __webpack_require__(17);

// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/@ecomplus/widget-product-card/src/components/EcProductCard.vue






/* normalize component */

var EcProductCard_component = normalizeComponent(
  js_EcProductCardvue_type_script_lang_js_,
  EcProductCardvue_type_template_id_d113e326_lang_html_render,
  EcProductCardvue_type_template_id_d113e326_lang_html_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var EcProductCard = (EcProductCard_component.exports);
// CONCATENATED MODULE: ./src/components/js/EcSearchEngine.js?vue&type=script&lang=js&





/* harmony default export */ var EcSearchEnginevue_type_script_lang_js_ = ({
  name: 'EcSearchEngine',

  components: {
    EcProductCard: EcProductCard
  },

  props: {
    lang: {
      type: String,
      default: utils_root_ecomUtils_["$ecomConfig"].get('lang')
    },
    storeId: {
      type: Number,
      default: utils_root_ecomUtils_["$ecomConfig"].get('store_id')
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

  data () {
    return {
      ecomSearch: new search_engine_root_EcomSearch_default.a(this.storeId),
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
    }
  },

  computed: {
    hasSelectedOptions () {
      for (const filter in this.selectedOptions) {
        if (this.selectedOptions[filter] && this.selectedOptions[filter].length) {
          return true
        }
      }
      return false
    },

    countedItems () {
      return (this.pageSize || 24) * (this.currentPage - 1) + this.resultItems.length
    }
  },

  methods: {
    dictionary: lib_dictionary,

    fixTerm () {
      if (this.term) {
        let fixedTerm = this.term
        let autoFix = true
        this.ecomSearch.getTermSuggestions().forEach(({ options, text }) => {
          if (options.length) {
            const opt = options[0]
            if (opt.score < this.autoFixScore) {
              autoFix = false
            }
            fixedTerm = fixedTerm.replace(text, opt.text)
          }
        })
        if (autoFix && fixedTerm !== this.term) {
          this.fixedTerm = fixedTerm
          this.ecomSearch.setSearchTerm(fixedTerm).history.shift()
          this.fetchItems()
          return true
        }
      }
      return false
    },

    updateFilters () {
      const keepFilter = this.filters.find(({ filter }) => filter === this.lastSelectedFilter)
      this.filters = keepFilter ? [keepFilter] : []
      const addFilter = (filter, options, isSpec) => {
        if (this.lastSelectedFilter !== filter) {
          this.filters.push({
            filter,
            filterObj: {
              show: this.filters.length < 5,
              options
            },
            isSpec
          })
          const { selectedOptions } = this
          const optionsList = selectedOptions[filter]
            ? selectedOptions[filter].filter(option => options.find(({ key }) => key === option))
            : []
          this.$set(this.selectedOptions, filter, optionsList)
        }
      }
      ;['Brands', 'Categories'].forEach(filter => {
        addFilter(filter, this.ecomSearch[`get${filter}`]())
      })
      this.ecomSearch.getSpecs().forEach(({ key, options }, index) => {
        addFilter(key, options, true)
      })
    },

    fetchItems (page, isRetry) {
      const { ecomSearch } = this
      this.searching = true
      this.loadingMore = page > 1 || this.page > 1
      ecomSearch.setPageNumber(page).fetch()
        .then(() => {
          this.totalSearchResults = ecomSearch.getTotalCount()
          if (this.totalSearchResults || this.fixedTerm || !this.fixTerm()) {
            if (page) {
              this.currentPage = page
              this.resultItems = this.resultItems.concat(ecomSearch.getItems())
            } else {
              this.currentPage = 1
              this.resultItems = ecomSearch.getItems()
            }
            if (!this.searched) {
              if (!this.resultItems.length) {
                ecomSearch.reset()
                this.emptyResult = true
                return this.fetchItems()
              }
              setTimeout(() => {
                this.searched = true
              }, 10)
            }
            this.updateFilters()
            this.networkError = false
          }
        })
        .catch(err => {
          console.error(err)
          if (!isRetry && (!err.response || err.response.status !== 400)) {
            this.fetchItems(page, true)
          } else {
            this.networkError = true
          }
        })
        .finally(() => {
          this.searching = this.loadingMore = false
        })
    },

    toggleFilters (toShow = false) {
      this.$emit('update:showFilters', toShow)
    },

    filterLabel (filter) {
      const label = this.dictionary(filter.toLowerCase())
      if (!label && window._data && Array.isArray(window._data.grids)) {
        const grid = window._data.grids.find(grid => grid.grid_id === filter)
        if (grid) {
          return grid.title || grid.grid_id
        }
      }
      return label || filter
    },

    updateSearchFilter (filter) {
      const { ecomSearch } = this
      let setOptions = this.selectedOptions[filter]
      if (!setOptions.length) {
        setOptions = null
      }
      switch (filter) {
        case 'Brands':
          ecomSearch.setBrandNames(setOptions)
          break
        case 'Categories':
          ecomSearch.setCategoryNames(setOptions)
          break
        default:
          ecomSearch.setSpec(filter, setOptions)
      }
    },

    setFilterOption (filter, option, isSet) {
      const { selectedOptions } = this
      const optionsList = selectedOptions[filter]
      if (isSet) {
        this.lastSelectedFilter = filter
        optionsList.push(option)
      } else {
        const optionIndex = optionsList.indexOf(option)
        if (optionIndex > -1) {
          optionsList.splice(optionIndex, 1)
        }
        if (!optionsList.length && this.lastSelectedFilter === filter) {
          this.lastSelectedFilter = null
        }
      }
      this.updateSearchFilter(filter)
      this.fetchItems()
    },

    clearFilters () {
      const { selectedOptions } = this
      for (const filter in selectedOptions) {
        if (selectedOptions[filter]) {
          selectedOptions[filter] = []
          this.updateSearchFilter(filter)
        }
      }
      this.fetchItems()
    },

    setSortOrder (sort) {
      this.selectedSortOption = sort
      this.ecomSearch.setSortOrder(sort)
      this.fetchItems()
    }
  },

  created () {
    const {
      ecomSearch,
      term,
      page,
      pageSize,
      brands,
      categories
    } = this
    if (term) {
      ecomSearch.setSearchTerm(term)
    }
    if (Array.isArray(brands) && brands.length) {
      ecomSearch.setBrandNames(brands)
    }
    if (Array.isArray(categories) && categories.length) {
      ecomSearch.setCategoryNames(categories)
    }
    ecomSearch.setPageSize(pageSize || 24)
    this.fetchItems(page || 1)
  },

  mounted () {
    if (this.navbarId) {
      const $nav = this.$refs.nav
      document.getElementById(this.navbarId).appendChild($nav)
    }
    let onScrollTimer
    window.addEventListener('scroll', () => {
      clearTimeout(onScrollTimer)
      if (!this.searching && this.totalSearchResults > this.countedItems) {
        onScrollTimer = setTimeout(() => {
          const { offsetTop, offsetHeight } = this.$el
          if (window.pageYOffset + window.screen.height >= offsetTop + offsetHeight) {
            this.fetchItems(this.currentPage + 1)
          }
        }, 100)
      }
    })
  }
});

// CONCATENATED MODULE: ./src/components/js/EcSearchEngine.js?vue&type=script&lang=js&
 /* harmony default export */ var js_EcSearchEnginevue_type_script_lang_js_ = (EcSearchEnginevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/scss/EcSearchEngine.scss?vue&type=style&index=0&lang=scss&
var EcSearchEnginevue_type_style_index_0_lang_scss_ = __webpack_require__(19);

// CONCATENATED MODULE: ./src/components/EcSearchEngine.vue






/* normalize component */

var EcSearchEngine_component = normalizeComponent(
  js_EcSearchEnginevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var EcSearchEngine = (EcSearchEngine_component.exports);
// CONCATENATED MODULE: ./src/index.js
/*!
 * @ecomplus/widget-search-engine
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */





/* harmony default export */ var src = __webpack_exports__["default"] = ((options = {}, elId = 'search-engine') => {
  const $searchEngine = document.getElementById(elId)

  if ($searchEngine) {
    const { $overlay } = window.storefront
    const urlParams = new URLSearchParams(window.location.search)

    new external_commonjs_vue_commonjs2_vue_root_Vue_default.a({
      data: {
        showFilters: false
      },

      render (createElement) {
        const vm = this
        return createElement(EcSearchEngine, {
          attrs: {
            id: elId
          },
          props: {
            ...options.props,
            term: urlParams.get('term'),
            page: parseInt(urlParams.get('page'), 10),
            brands: urlParams.getAll('brands'),
            categories: urlParams.getAll('categories'),
            navbarId: 'header',
            showFilters: vm.showFilters,
            prerenderedHTML: $searchEngine.outerHTML
          },

          on: {
            'update:showFilters' (canShow) {
              vm.showFilters = canShow
              if ($overlay) {
                if (canShow) {
                  $overlay.show()
                  $overlay.once('hide', () => {
                    vm.showFilters = false
                  })
                } else {
                  $overlay.hide()
                }
              }
            }
          }
        })
      }
    }).$mount($searchEngine)
  }
});


/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=widget-search-engine.es.js.map