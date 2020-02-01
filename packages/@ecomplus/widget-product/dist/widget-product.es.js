(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@ecomplus/utils"), require("@ecomplus/client"), require("vue"), require("@ecomplus/shopping-cart"), require("@glidejs/glide"), require("lozad"), require("vue-cleave-component"), require("@ecomplus/storefront-twbs"));
	else if(typeof define === 'function' && define.amd)
		define([, , , , , "lozad", "vue-cleave-component", ], factory);
	else if(typeof exports === 'object')
		exports["widgetProduct"] = factory(require("@ecomplus/utils"), require("@ecomplus/client"), require("vue"), require("@ecomplus/shopping-cart"), require("@glidejs/glide"), require("lozad"), require("vue-cleave-component"), require("@ecomplus/storefront-twbs"));
	else
		root["widgetProduct"] = factory(root["ecomUtils"], root["ecomClient"], root["Vue"], root["ecomCart"], root["Glide"], root["lozad"], root["vue-cleave-component"], root["__storefront_twbs"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__9__, __WEBPACK_EXTERNAL_MODULE__10__, __WEBPACK_EXTERNAL_MODULE__11__, __WEBPACK_EXTERNAL_MODULE__12__, __WEBPACK_EXTERNAL_MODULE__13__, __WEBPACK_EXTERNAL_MODULE__14__, __WEBPACK_EXTERNAL_MODULE__15__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 28);
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
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("8d2efb3c", content, true, {});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(19);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("038da914", content, true, {});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(21);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("4be1eb8c", content, true, {});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(23);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("41d7245a", content, true, {});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(25);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("398aac9a", content, true, {});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(2).default
var update = add("45ec027a", content, true, {});

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
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__13__;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__14__;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__15__;

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcPrices_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcPrices_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcPrices_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcPrices_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(1);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".ec-prices{line-height:1.2}.ec-prices:not(.ec-prices--big){font-size:.95rem}.ec-prices:not(.ec-prices--big) .ec-prices__installments{font-weight:300}.ec-prices__value{display:block;font-size:1.25rem}.ec-prices--big .ec-prices__value{font-size:250%;margin-bottom:.25rem}.ec-prices--literal .ec-prices__discount span,.ec-prices--literal .ec-prices__installments span{font-weight:700}.ec-prices--literal small{font-size:100%}.ec-prices:not(.ec-prices--literal) .ec-prices__compare{color:var(--gray)}", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcVariations_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcVariations_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcVariations_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcVariations_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(1);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".ec-variations__grid{margin-bottom:1rem}.ec-variations__grid--colors button{font-size:0}.ec-variations__option{min-height:2.3rem;min-width:2.3rem;border:2px solid var(--gray)}.ec-variations__option:hover{border-color:var(--secondary-light)}.ec-variations__option:not(:last-of-type){margin-right:.4rem}.ec-variations__option--selected:not(:disabled){border-color:var(--secondary)}.ec-variations__option:disabled{cursor:not-allowed;position:relative}.ec-variations__option:disabled:after{content:\"x\";text-align:center;font-size:10px;line-height:1;padding-top:1.5px;background:var(--danger);color:var(--danger-yiq);height:14px;width:14px;border-radius:50%;display:block;position:absolute;top:-3px;right:-3px}", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcImage_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcImage_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcImage_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcImage_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(1);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".ec-image img{max-width:100%;height:auto}", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcGallery_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcGallery_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcGallery_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcGallery_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(1);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".ec-gallery{width:100%;text-align:center;display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;position:relative;-webkit-box-pack:center;justify-content:center}@media (min-width:992px){.ec-gallery{margin-bottom:0}}.ec-gallery__thumbs{z-index:2;position:absolute;width:auto;padding:0;display:-webkit-inline-box;display:inline-flex;top:100%;margin:-35px 0 0}@media (min-width:992px){.ec-gallery__thumbs{position:static;display:block;width:90px;margin:0 1.5rem 0 0;left:auto;bottom:auto;overflow-y:auto}}.ec-gallery__item{opacity:.5;-webkit-transition:opacity .15s linear;transition:opacity .15s linear;cursor:pointer;margin-right:.75rem}.ec-gallery__item:last-of-type{margin-right:0}.ec-gallery__item:before{display:block;content:\" \";height:10px;width:10px;background:var(--gray);border-radius:50%}.ec-gallery__item--selected{cursor:auto;opacity:1}.ec-gallery__item--selected:before{background:var(--secondary)}@media (min-width:992px){.ec-gallery__item{margin:0 0 .5rem}.ec-gallery__item:last-of-type{margin-bottom:0}.ec-gallery__item:before{display:none}}.ec-gallery__stage{width:400px;max-width:100%;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ec-gallery__thumb,.ec-gallery__thumb img{display:none}@media (min-width:992px){.ec-gallery__thumb,.ec-gallery__thumb img{display:block;width:100%;height:auto}}.ec-gallery__open{display:none}@media (min-width:992px){.ec-gallery__open{font-weight:700;font-size:1.15rem;padding:0 .5rem;display:inline-block;margin-bottom:.5rem}}.ec-gallery__big-image,.ec-gallery__big-image img{max-width:100%;width:auto;height:auto;cursor:-webkit-zoom-in;cursor:zoom-in}.ec-gallery img{user-drag:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcShipping_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcShipping_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcShipping_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcShipping_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(1);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".ec-shipping__input{max-width:150px}.ec-shipping__services{max-width:350px;font-size:.9rem}.ec-shipping__services .active{cursor:auto}.ec-shipping__option{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between;width:100%}", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcProduct_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcProduct_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcProduct_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcProduct_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(1);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".ec-product__sku{color:var(--gray);font-size:.85rem}.ec-product__buy{cursor:pointer;margin-bottom:1rem}.ec-product__out-of-stock,.ec-product__unavailable{font-weight:500;font-size:1.3rem;color:var(--warning)}.ec-product__discount{color:var(--success)}", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__(10);
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// EXTERNAL MODULE: external {"commonjs":"@ecomplus/storefront-twbs","commonjs2":"@ecomplus/storefront-twbs","root":"__storefront_twbs"}
var storefront_twbs_root_storefront_twbs_ = __webpack_require__(15);

// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./src/components/html/EcProduct.html?vue&type=template&id=9fd29c52&lang=html&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ec-product"},[_c('transition',{attrs:{"enter-active-class":"animated fadeIn slower"}},[(_vm.body._id)?_c('div',{staticClass:"row"},[_vm._t("gallery-col",[_c('div',{staticClass:"col-12 col-md-6"},[_c('ec-gallery',{attrs:{"sliderOptions":{ rewind: true },"images":_vm.body.pictures,"current":_vm.currentGalleyImg},on:{"update:current":function($event){_vm.currentGalleyImg=$event},"click:stage":_vm.openPhotoswipe}})],1)]),_c('div',{staticClass:"col"},[_vm._t("heading",[_c('h1',{staticClass:"ec-product__name"},[_vm._v(" "+_vm._s(_vm.name)+" ")]),_c('p',{staticClass:"ec-product__sku"},[_vm._v(" COD: "+_vm._s(_vm.body.sku)+" ")])]),(!_vm.body.available)?_vm._t("unavailable",[_c('p',{staticClass:"ec-product__unavailable"},[_vm._v(" "+_vm._s(_vm.dictionary('unavailable'))+" ")])]):(!_vm.inStock(_vm.body))?_vm._t("out-of-stock",[_c('p',{staticClass:"ec-product__out-of-stock"},[_vm._v(" "+_vm._s(_vm.dictionary('out_of_stock'))+" ")])]):[_vm._t("prices",[_c('p',{staticClass:"ec-product__prices"},[_c('ec-prices',{attrs:{"lang":_vm.lang,"product":Object.assign({}, _vm.body, _vm.selectedVariation),"literal":true,"big":true}}),(_vm.discount > 0)?_c('span',{staticClass:"ec-product__discount"},[_vm._v(" "+_vm._s(_vm.dictionary('discount_of'))+" "),_c('strong',[_vm._v(_vm._s(_vm.discount)+"%")])]):_vm._e()],1)]),(_vm.hasVariations)?_vm._t("variations",[_c('ec-variations',{attrs:{"product":_vm.body,"selectedId":_vm.selectedVariationId},on:{"update:selectedId":function($event){_vm.selectedVariationId=$event},"update:selected-id":function($event){_vm.selectedVariationId=$event}}}),_c('b-alert',{attrs:{"show":_vm.hasClickedBuy && !_vm.selectedVariationId,"dismissible":"","fade":"","variant":"warning"}},[_vm._v(" "+_vm._s(_vm.dictionary('select_variation'))+" ")])]):_vm._e(),_c('div',{staticClass:"ec-product__buy"},[_vm._t("buy",[_c('button',{staticClass:"btn btn-lg btn-primary",attrs:{"type":"button","disabled":_vm.hasClickedBuy},on:{"click":_vm.buy}},[_c('i',{staticClass:"fas fa-shopping-bag mr-1"}),_vm._v(" "+_vm._s(_vm.strBuy)+" ")])])],2),_vm._t("shipping",[_c('ec-shipping',{attrs:{"lang":_vm.lang,"shippedItems":[Object.assign({}, _vm.body,
                {product_id: _vm.body._id,
                quantity: _vm.body.min_quantity || 1})]}})])],(_vm.body.short_description)?_vm._t("short-description",[_c('p',{staticClass:"ec-product__info lead"},[_vm._v(" "+_vm._s(_vm.body.short_description)+" ")])]):_vm._e()],2)],2):_vm._e()]),(!_vm.body._id)?[_vm._t("default")]:_vm._e()],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/html/EcProduct.html?vue&type=template&id=9fd29c52&lang=html&

// EXTERNAL MODULE: external {"commonjs":"@ecomplus/utils","commonjs2":"@ecomplus/utils","root":"ecomUtils"}
var utils_root_ecomUtils_ = __webpack_require__(0);

// EXTERNAL MODULE: external {"commonjs":"@ecomplus/client","commonjs2":"@ecomplus/client","root":"ecomClient"}
var client_root_ecomClient_ = __webpack_require__(9);

// EXTERNAL MODULE: external {"commonjs":"@ecomplus/shopping-cart","commonjs2":"@ecomplus/shopping-cart","root":"ecomCart"}
var shopping_cart_root_ecomCart_ = __webpack_require__(11);
var shopping_cart_root_ecomCart_default = /*#__PURE__*/__webpack_require__.n(shopping_cart_root_ecomCart_);

// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./src/components/html/EcPrices.html?vue&type=template&id=f6a1fefe&lang=html&
var EcPricesvue_type_template_id_f6a1fefe_lang_html_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ec-prices",class:{ 'ec-prices--literal': _vm.literal, 'ec-prices--big': _vm.big }},[(_vm.comparePrice)?_c('span',{staticClass:"ec-prices__compare"},[(_vm.literal)?[_vm._v(" "+_vm._s(_vm.dictionary('from'))+" "),_c('s',[_vm._v(_vm._s(_vm.formatMoney(_vm.comparePrice)))]),_vm._v(" "+_vm._s(_vm.dictionary('to'))+" ")]:_c('s',[_vm._v(_vm._s(_vm.formatMoney(_vm.comparePrice)))])],2):_vm._e(),_c('strong',{staticClass:"ec-prices__value"},[_vm._v(" "+_vm._s(_vm.formatMoney(_vm.price))+" ")]),_c('transition-group',{attrs:{"enter-active-class":"animated slideInDown"}},[(_vm.interestFreeInstallments > 1)?_c('div',{key:"installments",staticClass:"ec-prices__installments"},[_vm._v(" "+_vm._s(_vm.interestFreeInstallments)+"x "),_c('span',[_vm._v(" "+_vm._s(_vm.formatMoney(_vm.price / _vm.interestFreeInstallments))+" ")]),(_vm.literal)?_c('small',[_vm._v(" "+_vm._s(_vm.dictionary('interest_free'))+" ")]):_vm._e()]):_vm._e(),(typeof _vm.priceWithDiscount === 'number' && _vm.priceWithDiscount < _vm.price)?_c('div',{key:"discount",staticClass:"ec-prices__discount"},[_c('span',[_vm._v(" "+_vm._s(_vm.formatMoney(_vm.priceWithDiscount))+" ")]),(typeof _vm.discountLabel === 'string')?_c('small',[_vm._v(" "+_vm._s(_vm.discountLabel)+" ")]):_vm._e()]):_vm._e()])],1)}
var EcPricesvue_type_template_id_f6a1fefe_lang_html_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/html/EcPrices.html?vue&type=template&id=f6a1fefe&lang=html&

// CONCATENATED MODULE: ./src/lib/dictionary.js
const dictionary = {
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

/* harmony default export */ var lib_dictionary = (function (word, lang) {
  if (!lang) {
    lang = (this && this.lang) || 'en_us'
  }
  return (dictionary[word] && dictionary[word][lang]) || ''
});



// CONCATENATED MODULE: ./src/components/js/EcPrices.js?vue&type=script&lang=js&



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
    dictionary: lib_dictionary,
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

// CONCATENATED MODULE: ./src/components/js/EcPrices.js?vue&type=script&lang=js&
 /* harmony default export */ var js_EcPricesvue_type_script_lang_js_ = (EcPricesvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/scss/EcPrices.scss?vue&type=style&index=0&lang=scss&
var EcPricesvue_type_style_index_0_lang_scss_ = __webpack_require__(16);

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

// CONCATENATED MODULE: ./src/components/EcPrices.vue






/* normalize component */

var component = normalizeComponent(
  js_EcPricesvue_type_script_lang_js_,
  EcPricesvue_type_template_id_f6a1fefe_lang_html_render,
  EcPricesvue_type_template_id_f6a1fefe_lang_html_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var EcPrices = (component.exports);
// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./src/components/html/EcVariations.html?vue&type=template&id=02e5a3c8&lang=html&
var EcVariationsvue_type_template_id_02e5a3c8_lang_html_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.product.variations)?_c('div',{staticClass:"ec-variations"},_vm._l((_vm.variationsGrids),function(options,grid,index){return _c('div',{class:("ec-variations__grid ec-variations__grid--" + grid)},[_c('h5',[_vm._v(_vm._s(_vm.getGridTitle(grid)))]),_vm._l((options),function(optionText){return _c('button',{staticClass:"ec-variations__option btn btn-light",class:_vm.selectedOptions[grid] === optionText ? 'ec-variations__option--selected' : null,style:(grid === 'colors' ? _vm.getColorOptionBg(optionText) : null),attrs:{"disabled":!_vm.filteredGrids[grid].includes(optionText)},on:{"click":function () { return _vm.selectOption(optionText, grid, index); }}},[_vm._v(" "+_vm._s(optionText)+" ")])})],2)}),0):_vm._e()}
var EcVariationsvue_type_template_id_02e5a3c8_lang_html_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/html/EcVariations.html?vue&type=template&id=02e5a3c8&lang=html&

// CONCATENATED MODULE: ./src/components/js/EcVariations.js?vue&type=script&lang=js&


const { storefront } = window
const grids = (storefront && storefront.data && storefront.data.grids) || []

/* harmony default export */ var EcVariationsvue_type_script_lang_js_ = ({
  name: 'EcVariations',

  props: {
    product: {
      type: Object,
      required: true
    },
    selectedId: String
  },

  data () {
    return {
      selectedOptions: {},
      filteredGrids: Object(utils_root_ecomUtils_["variationsGrids"])(this.product, null, true)
    }
  },

  methods: {
    getColorOptionBg (optionText) {
      const rgbs = optionText.split(',').map(colorName => {
        return Object(utils_root_ecomUtils_["specValueByText"])(this.product.variations, colorName.trim(), 'colors')
      })
      return rgbs.length > 1
        ? `background:linear-gradient(to right bottom, ${rgbs[0]} 50%, ${rgbs[1]} 50%)`
        : `background:${rgbs[0]}`
    },

    getSpecValue (optionText, grid) {
      const { variations } = this.product
      let values
      if (grid === 'colors') {
        const colorNames = optionText.split(',')
        if (colorNames.length > 1) {
          values = []
          colorNames.forEach(color => {
            values.push(Object(utils_root_ecomUtils_["specValueByText"])(variations, color.trim(), grid))
          })
        }
      }
      return values || Object(utils_root_ecomUtils_["specValueByText"])(variations, optionText, grid)
    },

    getGridTitle (grid) {
      return Object(utils_root_ecomUtils_["gridTitle"])(grid, grids)
    },

    selectOption (optionText, grid, gridIndex) {
      const { product, selectedOptions, orderedGrids } = this
      this.$set(selectedOptions, grid, optionText)
      const filterGrids = {}
      for (let i = 0; i <= gridIndex; i++) {
        const grid = orderedGrids[i]
        if (selectedOptions[grid]) {
          filterGrids[grid] = selectedOptions[grid]
        }
      }
      const nextFilteredGrids = Object(utils_root_ecomUtils_["variationsGrids"])(product, filterGrids, true)
      for (let i = gridIndex + 1; i < orderedGrids.length; i++) {
        const grid = orderedGrids[i]
        this.filteredGrids[grid] = nextFilteredGrids[grid]
      }
      const variations = product.variations.slice(0)
      for (let i = 0; i < variations.length; i++) {
        const variation = variations[i]
        if (!Object(utils_root_ecomUtils_["inStock"])(variation)) {
          variations.splice(i, 1)
        } else {
          const { specifications } = variation
          for (const grid in specifications) {
            if (selectedOptions[grid] !== Object(utils_root_ecomUtils_["specTextValue"])(variation, grid)) {
              variations.splice(i, 1)
              i--
              break
            }
          }
        }
      }
      this.$emit('update:selectedId', variations.length ? variations[0]._id : null)
    }
  },

  computed: {
    variationsGrids () {
      return Object(utils_root_ecomUtils_["variationsGrids"])(this.product)
    },

    orderedGrids () {
      return Object.keys(this.variationsGrids)
    }
  }
});

// CONCATENATED MODULE: ./src/components/js/EcVariations.js?vue&type=script&lang=js&
 /* harmony default export */ var js_EcVariationsvue_type_script_lang_js_ = (EcVariationsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/scss/EcVariations.scss?vue&type=style&index=0&lang=scss&
var EcVariationsvue_type_style_index_0_lang_scss_ = __webpack_require__(18);

// CONCATENATED MODULE: ./src/components/EcVariations.vue






/* normalize component */

var EcVariations_component = normalizeComponent(
  js_EcVariationsvue_type_script_lang_js_,
  EcVariationsvue_type_template_id_02e5a3c8_lang_html_render,
  EcVariationsvue_type_template_id_02e5a3c8_lang_html_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var EcVariations = (EcVariations_component.exports);
// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./src/components/html/EcGallery.html?vue&type=template&id=59a3baf1&lang=html&
var EcGalleryvue_type_template_id_59a3baf1_lang_html_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ec-gallery",attrs:{"data-slideout-ignore":""}},[_c('div',{staticClass:"ec-gallery__thumbs"},[_vm._l((_vm.images),function(image,i){return _c('div',{key:'img-' + i,staticClass:"ec-gallery__item",class:{ 'ec-gallery__item--selected': i === _vm.activeIndex },on:{"click":function($event){_vm.activeIndex = i}}},[(i < 4)?_c('ec-image',{staticClass:"ec-gallery__thumb",attrs:{"fade":false,"src":image.small.url,"alt":image.small.alt,"fallback-src":image.zoom ? image.zoom.url : null}}):_vm._e()],1)}),(_vm.images.length > 4)?_c('button',{staticClass:"btn btn-dark ec-gallery__open",attrs:{"type":"button"},on:{"click":function($event){$event.preventDefault();return _vm.$emit('click:stage', { index: 4 })}}},[_vm._v(" +"+_vm._s(_vm.images.length - 4)+" ")]):_vm._e()],2),_c('div',{staticClass:"ec-gallery__stage"},[_c('div',{ref:"glide",staticClass:"glide"},[_c('div',{staticClass:"glide__track",attrs:{"data-glide-el":"track"}},[_c('ul',{staticClass:"glide__slides"},_vm._l((_vm.mapPictures),function(picture,index){return _c('li',{key:'slide-' + index,staticClass:"glide__slide"},[_c('div',{on:{"click":function($event){return _vm.$emit('click:stage', { picture: picture, index: index })}}},[_c('ec-image',{staticClass:"ec-gallery__big-image",attrs:{"src":picture,"picture-breakpoint":380}})],1)])}),0)])])])])}
var EcGalleryvue_type_template_id_59a3baf1_lang_html_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/html/EcGallery.html?vue&type=template&id=59a3baf1&lang=html&

// EXTERNAL MODULE: external {"commonjs":"@glidejs/glide","commonjs2":"@glidejs/glide","root":"Glide"}
var glide_root_Glide_ = __webpack_require__(12);
var glide_root_Glide_default = /*#__PURE__*/__webpack_require__.n(glide_root_Glide_);

// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./src/components/html/EcImage.html?vue&type=template&id=0e9496ff&lang=html&
var EcImagevue_type_template_id_0e9496ff_lang_html_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ec-image"},[(typeof _vm.src === 'string')?_c('img',{ref:"lazyImg",class:_vm.imgClasses,attrs:{"alt":_vm.alt,"data-src":_vm.src}}):(_vm.src && _vm.imgObj)?_c('picture',{ref:"lazyImg",class:_vm.imgClasses,attrs:{"data-iesrc":_vm.src.zoom ? _vm.src.zoom.url : _vm.imgObj.url,"data-alt":_vm.imgObj.alt}},[(_vm.src.small)?_c('source',{attrs:{"srcset":_vm.src.small.url,"media":("(max-width: " + (_vm.pictureBreakpoint - 0.02) + "px)")}}):_vm._e(),_c('source',{attrs:{"srcset":_vm.imgObj.url,"media":("(min-width: " + _vm.pictureBreakpoint + "px)")}})]):_c('img',{attrs:{"src":_vm.placeholder,"alt":"No image"}})])}
var EcImagevue_type_template_id_0e9496ff_lang_html_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/html/EcImage.html?vue&type=template&id=0e9496ff&lang=html&

// EXTERNAL MODULE: external "lozad"
var external_lozad_ = __webpack_require__(13);
var external_lozad_default = /*#__PURE__*/__webpack_require__.n(external_lozad_);

// CONCATENATED MODULE: ./src/components/js/EcImage.js?vue&type=script&lang=js&



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

// CONCATENATED MODULE: ./src/components/js/EcImage.js?vue&type=script&lang=js&
 /* harmony default export */ var js_EcImagevue_type_script_lang_js_ = (EcImagevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/scss/EcImage.scss?vue&type=style&index=0&lang=scss&
var EcImagevue_type_style_index_0_lang_scss_ = __webpack_require__(20);

// CONCATENATED MODULE: ./src/components/EcImage.vue






/* normalize component */

var EcImage_component = normalizeComponent(
  js_EcImagevue_type_script_lang_js_,
  EcImagevue_type_template_id_0e9496ff_lang_html_render,
  EcImagevue_type_template_id_0e9496ff_lang_html_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var EcImage = (EcImage_component.exports);
// CONCATENATED MODULE: ./src/components/js/EcGallery.js?vue&type=script&lang=js&



/* harmony default export */ var EcGalleryvue_type_script_lang_js_ = ({
  name: 'EcGallery',

  components: {
    EcImage: EcImage
  },

  props: {
    images: {
      type: Array,
      default: () => []
    },
    current: {
      type: Number,
      default: 1
    },
    sliderOptions: {
      type: Object,
      default: () => ({
        type: 'slider',
        autoplay: false,
        rewind: false
      })
    }
  },

  data () {
    return {
      glide: null,
      activeIndex: null
    }
  },

  computed: {
    mapPictures () {
      return this.images.map(({ normal, big, zoom }) => {
        return {
          small: normal,
          normal: big,
          zoom
        }
      })
    }
  },

  methods: {
    go (index) {
      this.activeIndex = index
      this.$emit('update:current', index + 1)
      if (this.glide) {
        this.glide.go('=' + index)
      }
    }
  },

  mounted () {
    const glide = new glide_root_Glide_default.a(this.$refs.glide, this.sliderOptions)
    glide.on('run', () => {
      this.go(glide.index)
    })
    glide.mount()
    this.glide = glide
  },

  beforeDestroy () {
    if (this.glide) {
      this.glide.destroy()
    }
  },

  watch: {
    current: {
      handler (current) {
        this.activeIndex = current - 1
      },
      immediate: true
    },

    activeIndex (index) {
      this.go(index)
    }
  }
});

// CONCATENATED MODULE: ./src/components/js/EcGallery.js?vue&type=script&lang=js&
 /* harmony default export */ var js_EcGalleryvue_type_script_lang_js_ = (EcGalleryvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/scss/EcGallery.scss?vue&type=style&index=0&lang=scss&
var EcGalleryvue_type_style_index_0_lang_scss_ = __webpack_require__(22);

// CONCATENATED MODULE: ./src/components/EcGallery.vue






/* normalize component */

var EcGallery_component = normalizeComponent(
  js_EcGalleryvue_type_script_lang_js_,
  EcGalleryvue_type_template_id_59a3baf1_lang_html_render,
  EcGalleryvue_type_template_id_59a3baf1_lang_html_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var EcGallery = (EcGallery_component.exports);
// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./src/components/html/EcShipping.html?vue&type=template&id=5b0eefc9&lang=html&
var EcShippingvue_type_template_id_5b0eefc9_lang_html_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ec-shipping"},[(_vm.zipInput)?_c('form',{staticClass:"ec-shipping__form",on:{"submit":function($event){$event.preventDefault();return _vm.submitZipCode($event)}}},[_c('div',{staticClass:"form-group"},[_c('label',{attrs:{"for":"ec-shipping-zip"}},[_vm._v(" "+_vm._s(_vm.dictionary('calculate_shipping'))+" ")]),_c('div',{staticClass:"input-group"},[_c('cleave-input',{staticClass:"form-control ec-shipping__input",attrs:{"type":"tel","id":"ec-shipping-zip","placeholder":_vm.dictionary('zip'),"aria-label":_vm.dictionary('zip'),"options":_vm.countryCode === 'BR'
            ? { blocks: [5, 3], delimiter: '-' }
            : { blocks: [30] }},model:{value:(_vm.zipCodeValue),callback:function ($$v) {_vm.zipCodeValue=$$v},expression:"zipCodeValue"}}),_vm._m(0)],1)])]):_vm._e(),_c('div',{staticClass:"ec-shipping__services"},[_c('transition-group',{attrs:{"enter-active-class":"animated fadeInDown","leave-active-class":"animated position-absolute fadeOutUp"}},[(_vm.waiting)?_c('div',{key:"waiting",staticClass:"spinner-border spinner-border-sm",attrs:{"role":"status"}},[_c('span',{staticClass:"sr-only"},[_vm._v("Loading...")])]):_c('div',{key:"services",staticClass:"list-group"},_vm._l((_vm.shippingServices),function(service,i){return _c(_vm.selectServices ? 'a' : 'div',{key:i,tag:"component",staticClass:"list-group-item",class:{
            'list-group-item-action': _vm.selectServices,
            active: _vm.selectServices && _vm.selectedService === i
          },attrs:{"href":_vm.selectServices && '#'},on:{"click":function($event){$event.preventDefault();return _vm.setSelectedService(i)}}},[_c('span',{staticClass:"ec-shipping__option"},[_c('ec-shipping-line',{attrs:{"shippingLine":service.shipping_line,"lang":_vm.lang}}),_c('small',[_vm._v(_vm._s(service.label))])],1)])}),1)])],1)])}
var EcShippingvue_type_template_id_5b0eefc9_lang_html_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-append"},[_c('button',{staticClass:"btn btn-outline-secondary",attrs:{"type":"submit"}},[_c('i',{staticClass:"fas fa-shipping-fast"})])])}]


// CONCATENATED MODULE: ./src/components/html/EcShipping.html?vue&type=template&id=5b0eefc9&lang=html&

// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./src/components/html/EcShippingLine.html?vue&type=template&id=47e0a9e0&lang=html&
var EcShippingLinevue_type_template_id_47e0a9e0_lang_html_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ec-shipping-line"},[_c('strong',[_vm._v(" "+_vm._s(((_vm.dictionary('up_to')) + " " + _vm.deadline))+" "+_vm._s(_vm.dictionary(_vm.isWorkingDays ? 'working_days' : 'days'))+" ")]),_c('span',{staticClass:"mx-2"},[(_vm.shippingLine.total_price)?[_vm._v(" "+_vm._s(_vm.formatMoney(_vm.shippingLine.total_price))+" ")]:[_vm._v(" "+_vm._s(_vm.dictionary('free_shipping'))+" ")]],2)])}
var EcShippingLinevue_type_template_id_47e0a9e0_lang_html_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/html/EcShippingLine.html?vue&type=template&id=47e0a9e0&lang=html&

// CONCATENATED MODULE: ./src/components/js/EcShippingLine.js?vue&type=script&lang=js&



/* harmony default export */ var EcShippingLinevue_type_script_lang_js_ = ({
  name: 'EcShippingLine',

  props: {
    lang: {
      type: String,
      default: utils_root_ecomUtils_["_config"].get('lang')
    },
    shippingLine: {
      type: Object,
      required: true
    }
  },

  computed: {
    isWorkingDays () {
      const shipping = this.shippingLine
      return (shipping.posting_deadline && shipping.posting_deadline.working_days) ||
        (shipping.delivery_time && shipping.delivery_time.working_days)
    },

    deadline () {
      const shipping = this.shippingLine
      let days = shipping.posting_deadline ? shipping.posting_deadline.days : 0
      if (shipping.delivery_time) {
        days += shipping.delivery_time.days
      }
      return days
    }
  },

  methods: {
    dictionary: lib_dictionary,
    formatMoney: utils_root_ecomUtils_["formatMoney"]
  }
});

// CONCATENATED MODULE: ./src/components/js/EcShippingLine.js?vue&type=script&lang=js&
 /* harmony default export */ var js_EcShippingLinevue_type_script_lang_js_ = (EcShippingLinevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/EcShippingLine.vue





/* normalize component */

var EcShippingLine_component = normalizeComponent(
  js_EcShippingLinevue_type_script_lang_js_,
  EcShippingLinevue_type_template_id_47e0a9e0_lang_html_render,
  EcShippingLinevue_type_template_id_47e0a9e0_lang_html_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var EcShippingLine = (EcShippingLine_component.exports);
// EXTERNAL MODULE: external "vue-cleave-component"
var external_vue_cleave_component_ = __webpack_require__(14);
var external_vue_cleave_component_default = /*#__PURE__*/__webpack_require__.n(external_vue_cleave_component_);

// CONCATENATED MODULE: ./src/components/js/EcShipping.js?vue&type=script&lang=js&






const { localStorage } = window
const zipStorageKey = 'ec-shipping-zip'

const reduceItemBody = itemOrProduct => {
  const shippedItem = {}
  ;[
    'product_id',
    'variation_id',
    'sku',
    'name',
    'quantity',
    'currency_id',
    'currency_symbol',
    'price',
    'final_price',
    'dimensions',
    'weight'
  ].forEach(field => {
    if (itemOrProduct[field] !== undefined) {
      shippedItem[field] = itemOrProduct[field]
    }
  })
  return shippedItem
}

/* harmony default export */ var EcShippingvue_type_script_lang_js_ = ({
  name: 'EcShipping',

  components: {
    EcShippingLine: EcShippingLine,
    CleaveInput: external_vue_cleave_component_default.a
  },

  props: {
    lang: {
      type: String,
      default: utils_root_ecomUtils_["$ecomConfig"].get('lang')
    },
    countryCode: {
      type: String,
      default: utils_root_ecomUtils_["$ecomConfig"].get('country_code')
    },
    storeId: {
      type: Number,
      default: utils_root_ecomUtils_["$ecomConfig"].get('store_id')
    },
    zipInput: {
      type: Boolean,
      default: true
    },
    zipCode: {
      type: String
    },
    selectServices: {
      type: Boolean
    },
    shippedItems: {
      type: Array,
      default: () => []
    },
    shippingResult: {
      type: Array,
      default: () => []
    },
    shippingData: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      zipCodeValue: this.zipCode,
      shippingServices: [],
      selectedService: null,
      waiting: false
    }
  },

  methods: {
    dictionary: lib_dictionary,
    formatMoney: utils_root_ecomUtils_["formatMoney"],

    updateZipCode () {
      this.$emit('update:zipCode', this.zipCodeValue)
    },

    parseShippingOptions (shippingResult = [], isRetry) {
      this.shippingServices = []
      let canRetry
      if (shippingResult.length) {
        shippingResult.forEach(appResult => {
          const { validated, error, response } = appResult
          if (validated && !error) {
            response.shipping_services.forEach(service => {
              this.shippingServices.push({
                app_id: appResult.app_id,
                ...service
              })
            })
          } else if (isRetry !== true && (!response || !response.error)) {
            canRetry = true
          }
        })
        if (!this.shippingServices.length) {
          if (canRetry) {
            this.fetchShippingServices(true)
          }
        } else {
          this.setSelectedService(0)
        }
      }
    },

    fetchShippingServices (isRetry) {
      const { storeId } = this
      const url = '/calculate_shipping.json'
      const method = 'POST'
      const data = {
        ...this.shippingData,
        to: {
          zip: this.zipCodeValue,
          ...this.shippingData.to
        }
      }
      if (this.shippedItems.length) {
        data.items = this.shippedItems.map(reduceItemBody)
        const itemsToSubtotal = (subtotal, item) => subtotal + Object(utils_root_ecomUtils_["price"])(item) * item.quantity
        data.subtotal = data.items.reduce(itemsToSubtotal, 0)
      }
      this.waiting = true
      Object(client_root_ecomClient_["modules"])({ url, method, storeId, data })
        .then(({ data }) => this.parseShippingOptions(data.result, isRetry))
        .catch(console.error)
        .finally(() => {
          this.waiting = false
        })
    },

    submitZipCode (e) {
      this.updateZipCode()
      if (localStorage) {
        localStorage.setItem(zipStorageKey, this.zipCodeValue)
      }
      this.fetchShippingServices()
    },

    setSelectedService (i) {
      if (this.selectServices) {
        this.$emit('serviceSelected', this.shippingServices[i])
        this.selectedService = i
      }
    }
  },

  created () {
    if (localStorage) {
      if (!this.zipCode) {
        const storedZip = localStorage.getItem(zipStorageKey)
        if (storedZip) {
          this.zipCodeValue = storedZip
          this.updateZipCode()
        }
      }
      if (!this.shippingResult.length) {
        if (this.zipCodeValue) {
          this.fetchShippingServices()
        }
      } else {
        this.parseShippingOptions(this.shippingResult)
      }
    }
  }
});

// CONCATENATED MODULE: ./src/components/js/EcShipping.js?vue&type=script&lang=js&
 /* harmony default export */ var js_EcShippingvue_type_script_lang_js_ = (EcShippingvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/scss/EcShipping.scss?vue&type=style&index=0&lang=scss&
var EcShippingvue_type_style_index_0_lang_scss_ = __webpack_require__(24);

// CONCATENATED MODULE: ./src/components/EcShipping.vue






/* normalize component */

var EcShipping_component = normalizeComponent(
  js_EcShippingvue_type_script_lang_js_,
  EcShippingvue_type_template_id_5b0eefc9_lang_html_render,
  EcShippingvue_type_template_id_5b0eefc9_lang_html_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var EcShipping = (EcShipping_component.exports);
// CONCATENATED MODULE: ./src/components/js/EcProduct.js?vue&type=script&lang=js&










const { storefront: EcProductvue_type_script_lang_js_storefront } = window
const getContextBody = () => EcProductvue_type_script_lang_js_storefront
  ? EcProductvue_type_script_lang_js_storefront.context && EcProductvue_type_script_lang_js_storefront.context.body
  : {}
const getContextId = () => getContextBody()._id

/* harmony default export */ var EcProductvue_type_script_lang_js_ = ({
  name: 'EcProduct',

  components: {
    EcPrices: EcPrices,
    EcGallery: EcGallery,
    EcVariations: EcVariations,
    EcShipping: EcShipping
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
    productId: {
      type: String,
      default: getContextId()
    },
    product: Object,
    buyText: String,
    canAddToCart: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      body: {},
      selectedVariationId: null,
      currentGalleyImg: 1,
      hasClickedBuy: false
    }
  },

  computed: {
    selectedVariation () {
      return this.selectedVariationId
        ? this.body.variations.find(({ _id }) => _id === this.selectedVariationId)
        : {}
    },

    name () {
      return this.selectedVariation.name || Object(utils_root_ecomUtils_["name"])(this.body)
    },

    strBuy () {
      return this.buyText || this.dictionary('buy')
    },

    discount () {
      const { body } = this
      return Object(utils_root_ecomUtils_["onPromotion"])(body)
        ? Math.round(((body.base_price - Object(utils_root_ecomUtils_["price"])(body)) * 100) / body.base_price)
        : 0
    },

    hasVariations () {
      return this.body.variations && this.body.variations.length
    },

    photoswipeImages () {
      const { name, pictures } = this.body
      const psImages = []
      if (pictures) {
        pictures.forEach(({ zoom }) => {
          if (zoom && zoom.size) {
            const sizes = zoom.size.split('x')
            if (sizes.length === 2) {
              psImages.push({
                src: zoom.url,
                title: name,
                w: parseInt(sizes[0], 10),
                h: parseInt(sizes[1], 10)
              })
            }
          }
        })
      }
      return psImages
    }
  },

  methods: {
    dictionary: lib_dictionary,
    inStock: utils_root_ecomUtils_["inStock"],
    variationsGrids: utils_root_ecomUtils_["variationsGrids"],
    specValueByText: utils_root_ecomUtils_["specValueByText"],

    setBody (data) {
      this.body = data
      this.$emit('update:product', data)
    },

    fetchProduct (isRetry = false) {
      const vm = this
      const { storeId } = vm
      Object(client_root_ecomClient_["store"])({
        url: `/products/${vm.productId}.json`,
        storeId,
        axiosConfig: {
          timeout: isRetry ? 2500 : 6000
        }
      })
        .then(({ data }) => {
          this.setBody(data)
          if (getContextId() === vm.productId) {
            EcProductvue_type_script_lang_js_storefront.context.body = data
          }
        })
        .catch(err => {
          console.error(err)
          const { response } = err
          if (!response || !(response.status >= 400 && response.status < 500)) {
            if (!isRetry) {
              this.fetchProduct(true)
            } else {
              this.setBody(getContextBody())
              if (!this.body.name || !this.body.price || !this.body.pictures) {
                const errorMsg = vm.lang === 'pt_br'
                  ? 'Não foi possível carregar informações do produto, por favor verifique sua conexão'
                  : 'Unable to load product information, please check your internet connection'
                vm.$bvToast.toast(errorMsg, {
                  title: 'Offline',
                  variant: 'danger',
                  noAutoHide: true,
                  solid: true
                })
              }
            }
          }
        })
    },

    openPhotoswipe ({ index }) {
      if (EcProductvue_type_script_lang_js_storefront && typeof EcProductvue_type_script_lang_js_storefront.photoswipe === 'function') {
        EcProductvue_type_script_lang_js_storefront.photoswipe(this.photoswipeImages, index)
      }
    },

    buy () {
      this.hasClickedBuy = true
      const product = Object.assign({}, this.body)
      delete product.body_html
      delete product.body_text
      delete product.specifications
      let variationId
      if (this.hasVariations) {
        if (this.selectedVariationId) {
          variationId = this.selectedVariationId
        } else {
          return
        }
      }
      this.$emit('buy', { product, variationId })
      if (this.canAddToCart) {
        shopping_cart_root_ecomCart_default.a.addProduct(product, variationId)
      }
    }
  },

  created () {
    if (this.product) {
      this.body = this.product
    } else {
      this.fetchProduct()
    }
  },

  watch: {
    selectedVariationId (id) {
      if (id) {
        if (this.hasClickedBuy) {
          this.hasClickedBuy = false
        }
        if (this.selectedVariation.picture_id) {
          const pictureIndex = this.body.pictures.findIndex(({ _id }) => {
            return _id === this.selectedVariation.picture_id
          })
          this.currentGalleyImg = pictureIndex + 1
        }
      }
    }
  }
});

// CONCATENATED MODULE: ./src/components/js/EcProduct.js?vue&type=script&lang=js&
 /* harmony default export */ var js_EcProductvue_type_script_lang_js_ = (EcProductvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/scss/EcProduct.scss?vue&type=style&index=0&lang=scss&
var EcProductvue_type_style_index_0_lang_scss_ = __webpack_require__(26);

// CONCATENATED MODULE: ./src/components/EcProduct.vue






/* normalize component */

var EcProduct_component = normalizeComponent(
  js_EcProductvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var EcProduct = (EcProduct_component.exports);
// CONCATENATED MODULE: ./src/lib/get-scoped-slots.js
/* harmony default export */ var get_scoped_slots = (($el, h) => {
  const scopedSlots = {
    default () {
      return h('div', {
        domProps: {
          innerHTML: $el.outerHTML
        }
      })
    }
  }

  const $childs = $el.childNodes
  for (let i = 0; i < $childs.length; i++) {
    const { dataset, outerHTML } = $childs[i]
    if (dataset && dataset.slot) {
      scopedSlots[dataset.slot] = function () {
        return h('span', {
          domProps: {
            innerHTML: outerHTML
          }
        })
      }
    }
  }

  return scopedSlots
});

// CONCATENATED MODULE: ./src/index.js
/*!
 * @ecomplus/widget-product
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */






/* harmony default export */ var src = __webpack_exports__["default"] = ((options = {}, elId = 'product-block') => {
  const $productBlock = document.getElementById(elId)

  if ($productBlock) {
    new external_commonjs_vue_commonjs2_vue_root_Vue_default.a({
      render: h => h(EcProduct, {
        attrs: {
          id: elId
        },
        props: {
          ...options.props
        },
        scopedSlots: get_scoped_slots($productBlock, h)
      })
    }).$mount($productBlock)
  }
});


/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=widget-product.es.js.map