(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@ecomplus/utils"), require("vue"), require("@ecomplus/search-engine"), require("@ecomplus/client"), require("@ecomplus/shopping-cart"), require("lozad"), require("@ecomplus/storefront-twbs"));
	else if(typeof define === 'function' && define.amd)
		define([, , , , , "lozad", ], factory);
	else if(typeof exports === 'object')
		exports["widgetSearch"] = factory(require("@ecomplus/utils"), require("vue"), require("@ecomplus/search-engine"), require("@ecomplus/client"), require("@ecomplus/shopping-cart"), require("lozad"), require("@ecomplus/storefront-twbs"));
	else
		root["widgetSearch"] = factory(root["ecomUtils"], root["Vue"], root["EcomSearch"], root["ecomClient"], root["ecomCart"], root["lozad"], root["__storefront_twbs"]);
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
var update = add("79f60801", content, true, {});

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
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcSearch_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcSearch_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcSearch_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcSearch_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(1);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".ec-search__popover{max-width:calc(100vw - 2rem);max-height:calc(100vh - 200px);margin-top:10px;overflow-y:auto;box-shadow:0 0 .75rem rgba(0,0,0,.075)}@media (min-width:576px){.ec-search__popover{min-width:400px}}@media (min-width:850px){.ec-search__popover{max-height:calc(100vh - 100px)}}@media (min-width:1200px){.ec-search__popover{max-width:1100px;min-width:800px}}.ec-search__head{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:start;align-items:flex-start}.ec-search__close{padding:0 .25rem}.ec-search__close:focus{box-shadow:none}.ec-search__history,.ec-search__info{font-weight:300;margin-bottom:.25rem;font-size:1.15rem;overflow-x:auto;white-space:nowrap;color:var(--gray)}.ec-search__info em{color:var(--secondary);margin-right:.5rem}.ec-search__info span{display:inline-block}.ec-search__history__link{margin-left:.5rem}.ec-search__items{display:-webkit-box;display:flex;overflow-x:auto}@media (min-width:992px){.ec-search__items{margin-top:1rem;width:850px}}.ec-search__item{padding-right:1rem}.ec-search__item:last-child{padding-right:0}@media (max-width:849.98px){.ec-search__item{width:200px;-webkit-box-flex:0;flex:0 0 200px}}@media (min-width:850px){.ec-search__item{width:25%}}.ec-search__item .btn,.ec-search__item button{display:none}.ec-search__item .ec-prices{height:auto;white-space:normal}", ""]);
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

// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./src/components/html/EcSearch.html?vue&type=template&id=acead506&lang=html&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ec-search"},[_vm._t("input",[_c('input',{staticClass:"form-control",attrs:{"type":"search"}})]),(_vm.elInput)?[_c('b-popover',{attrs:{"triggers":"focus","custom-class":'ec-search__popover',"target":_vm.elInput.id,"show":_vm.showPopover,"placement":_vm.popoverPlacement,"fallback-placement":[_vm.popoverPlacement]},on:{"update:show":function($event){_vm.showPopover=$event}}},[_c('div',{staticClass:"ec-search__head"},[_c('div',[(_vm.searching)?_c('div',{staticClass:"spinner-border m-4",attrs:{"role":"status"}},[_c('span',{staticClass:"sr-only"},[_vm._v("Loading...")])]):_vm._e(),_c('transition',{attrs:{"enter-active-class":"animated fadeIn"}},[(!_vm.searching && _vm.searchedTerm)?_c('div',{staticClass:"ec-search__info"},[(_vm.suggestedTerm)?[_vm._v(" "+_vm._s(_vm.dictionary('did_you_mean'))+" "),_c('a',{staticClass:"ec-search__suggestion",attrs:{"href":"#"},domProps:{"textContent":_vm._s(_vm.suggestedTerm)},on:{"click":function($event){$event.preventDefault();return _vm.setSearchTerm(_vm.suggestedTerm)}}}),_vm._v(" ? ")]:_vm._e(),(!_vm.totalSearchResults)?_c('span',{staticClass:"ec-search__no-results"},[_vm._v(" "+_vm._s(_vm.dictionary('no_results_for'))+" "),_c('em',[_vm._v(_vm._s(_vm.searchedTerm))])]):_c('span',{staticClass:"ec-search__count-results"},[_c('strong',[_vm._v(_vm._s(_vm.totalSearchResults))]),_vm._v(" "+_vm._s(_vm.dictionary('total_results_for'))+" "),_c('em',[_vm._v(_vm._s(_vm.searchedTerm))]),(_vm.totalSearchResults > _vm.maxItems)?_c('a',{attrs:{"href":"#"},domProps:{"textContent":_vm._s(("+" + (_vm.dictionary('see_all'))))},on:{"click":function($event){$event.preventDefault();return _vm.setSearchTerm(_vm.searchedTerm)}}}):_vm._e()])],2):_vm._e()]),_c('transition',{attrs:{"enter-active-class":"animated fadeInLeft"}},[(_vm.history.length)?_c('div',{staticClass:"ec-search__history"},[_c('i',{staticClass:"fas fa-history"}),_vm._l((_vm.history),function(term){return _c('a',{staticClass:"ec-search__history__link",attrs:{"href":"#"},domProps:{"textContent":_vm._s(term)},on:{"click":function($event){$event.preventDefault();return _vm.setSearchTerm(term)}}})})],2):_vm._e()])],1),_c('button',{staticClass:"btn ec-search__close",attrs:{"type":"button"},on:{"click":function($event){_vm.showPopover = false}}},[_c('i',{staticClass:"fas fa-times"})])]),_c('transition',{attrs:{"enter-active-class":"animated fadeIn slow"}},[(!_vm.searching && _vm.suggestedItems.length)?_c('div',{staticClass:"ec-search__items"},_vm._l((_vm.suggestedItems),function(product){return _c('ec-product-card',{key:product._id,staticClass:"ec-search__item",attrs:{"lang":_vm.lang,"storeId":_vm.storeId,"product":product}})}),1):_vm._e()])],1)]:_vm._e()],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/html/EcSearch.html?vue&type=template&id=acead506&lang=html&

// EXTERNAL MODULE: external {"commonjs":"@ecomplus/utils","commonjs2":"@ecomplus/utils","root":"ecomUtils"}
var utils_root_ecomUtils_ = __webpack_require__(0);

// EXTERNAL MODULE: external {"commonjs":"@ecomplus/search-engine","commonjs2":"@ecomplus/search-engine","root":"EcomSearch"}
var search_engine_root_EcomSearch_ = __webpack_require__(8);
var search_engine_root_EcomSearch_default = /*#__PURE__*/__webpack_require__.n(search_engine_root_EcomSearch_);

// CONCATENATED MODULE: ./src/lib/dictionary.js
const dictionary = {
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
// CONCATENATED MODULE: ./src/components/js/EcSearch.js?vue&type=script&lang=js&





/* harmony default export */ var EcSearchvue_type_script_lang_js_ = ({
  name: 'EcSearch',

  components: {
    EcProductCard: EcProductCard
  },

  props: {
    lang: {
      type: String,
      default: utils_root_ecomUtils_["_config"].get('lang')
    },
    storeId: {
      type: Number,
      default: utils_root_ecomUtils_["_config"].get('store_id')
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

  data () {
    return {
      ecomSearch: new search_engine_root_EcomSearch_default.a(this.storeId),
      searchTerm: this.term,
      searchedTerm: null,
      searching: false,
      suggestedItems: [],
      suggestedTerm: '',
      totalSearchResults: 0,
      elInput: null,
      showPopover: false
    }
  },

  computed: {
    history () {
      return this.ecomSearch.history
        .filter(term => term.length > 2 && this.searchTerm.indexOf(term) === -1)
        .slice(0, 5)
    }
  },

  methods: {
    dictionary: lib_dictionary,

    setSearchTerm (term) {
      this.elInput.value = term
      const $form = this.$el.parentElement
      if ($form && $form.tagName === 'FORM') {
        $form.submit()
      } else {
        this.searchTerm = term
      }
    },

    checkCurrentTerm (term) {
      return (!term && !this.elInput.value) || this.elInput.value === term
    },

    handleSuggestions (term) {
      let suggestTerm = term
      let autoFix = false
      this.suggestedTerm = ''
      this.ecomSearch.getTermSuggestions().forEach(({ options, text }) => {
        if (options.length) {
          const opt = options[0]
          if (
            !this.totalSearchResults &&
            this.autoFixScore > 0 &&
            opt.score >= this.autoFixScore &&
            opt.text.indexOf(term) === -1
          ) {
            autoFix = true
          }
          suggestTerm = suggestTerm.replace(text, opt.text)
        }
      })
      if (suggestTerm !== term) {
        if (autoFix) {
          this.elInput.value = this.searchTerm = suggestTerm
        } else {
          this.suggestedTerm = suggestTerm
        }
        this.ecomSearch.history.shift()
      }
    },

    fetchItems (term) {
      const { ecomSearch } = this
      if (term !== false) {
        if (!term) {
          term = this.searchTerm
        }
        ecomSearch.setSearchTerm(term)
      } else {
        ecomSearch.reset().setPageSize(this.maxItems)
      }
      this.searching = true
      ecomSearch.fetch()
        .then(() => {
          if (this.checkCurrentTerm(term)) {
            const { getItems, getTotalCount } = ecomSearch
            this.searchedTerm = term
            this.suggestedItems = getItems()
            this.totalSearchResults = getTotalCount()
            this.handleSuggestions(term)
          }
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          this.searching = false
        })
    },

    instantSearch (term) {
      if (this.searchedTerm === null) {
        this.fetchItems(term)
      } else if (this.searchedTerm !== term) {
        this.showPopover = false
        setTimeout(() => {
          if (this.checkCurrentTerm(term)) {
            this.fetchItems(term)
          }
          setTimeout(() => {
            if (this.checkCurrentTerm(term)) {
              this.showPopover = true
            }
          }, 100)
        }, 400)
      }
    }
  },

  created () {
    let onScrollTimer
    let lastScrollOffset = window.pageYOffset
    window.addEventListener('scroll', () => {
      clearTimeout(onScrollTimer)
      onScrollTimer = setTimeout(() => {
        if (Math.abs(window.pageYOffset - lastScrollOffset) > 50) {
          if (this.elInput === document.activeElement) {
            this.elInput.blur()
          }
        }
        lastScrollOffset = window.pageYOffset
      }, 50)
    })
    this.ecomSearch.setPageSize(this.maxItems)
  },

  mounted () {
    let $input
    for (let i = 0; i < this.$el.childNodes.length; i++) {
      if (this.$el.childNodes[0].tagName === 'INPUT') {
        $input = this.$el.childNodes[0]
        break
      }
    }
    if ($input) {
      $input.addEventListener('keyup', ev => {
        this.searchTerm = $input.value
        if (!this.showPopover) {
          this.showPopover = true
        }
      })
      $input.addEventListener('focus', ev => {
        if (!this.totalSearchResults) {
          this.instantSearch(false)
        }
      })
      if (!this.term) {
        this.searchTerm = $input.value
      } else {
        this.fetchItems()
      }
      $input.setAttribute('autocomplete', 'off')
      this.elInput = $input
    } else {
      this.fetchItems()
    }
  },

  watch: {
    searchTerm (term) {
      if (term) {
        if (term.length > 2) {
          this.instantSearch(term)
        }
      } else {
        this.instantSearch(false)
      }
    }
  }
});

// CONCATENATED MODULE: ./src/components/js/EcSearch.js?vue&type=script&lang=js&
 /* harmony default export */ var js_EcSearchvue_type_script_lang_js_ = (EcSearchvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/scss/EcSearch.scss?vue&type=style&index=0&lang=scss&
var EcSearchvue_type_style_index_0_lang_scss_ = __webpack_require__(19);

// CONCATENATED MODULE: ./src/components/EcSearch.vue






/* normalize component */

var EcSearch_component = normalizeComponent(
  js_EcSearchvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var EcSearch = (EcSearch_component.exports);
// CONCATENATED MODULE: ./src/index.js
/*!
 * @ecomplus/widget-search
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */





/* harmony default export */ var src = __webpack_exports__["default"] = ((options = {}, elId = 'search-input') => {
  const $searchInput = document.getElementById(elId)

  if ($searchInput) {
    const attrs = {}
    for (let i = $searchInput.attributes.length - 1; i >= 0; i--) {
      const { name, value } = $searchInput.attributes[i]
      attrs[name] = value
    }

    new external_commonjs_vue_commonjs2_vue_root_Vue_default.a({
      render: h => h(EcSearch, {
        props: options.props,
        scopedSlots: {
          input: () => h('input', { attrs })
        }
      })
    }).$mount($searchInput)
  }
});


/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=widget-search.es.js.map