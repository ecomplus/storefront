(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"), require("@ecomplus/utils"), require("@ecomplus/passport-client"), require("@ecomplus/storefront-twbs"));
	else if(typeof define === 'function' && define.amd)
		define([, , , ], factory);
	else if(typeof exports === 'object')
		exports["widgetUser"] = factory(require("vue"), require("@ecomplus/utils"), require("@ecomplus/passport-client"), require("@ecomplus/storefront-twbs"));
	else
		root["widgetUser"] = factory(root["Vue"], root["ecomUtils"], root["EcomPassport"], root["__storefront_twbs"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__3__, __WEBPACK_EXTERNAL_MODULE__4__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(9).default
var update = add("5e827ac4", content, true, {});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcUser_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcUser_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcUser_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_EcUser_scss_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(7);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".ec-user{display:inline}.ec-user__popover{max-width:100%;min-width:12rem;font-size:1rem;line-height:1.4}.ec-user__alert{font-size:.85rem;margin-bottom:1rem}.ec-user__logout{margin-top:1rem}.ec-user__btn{color:#fff;text-align:left;line-height:1.2rem;padding:.7rem;min-width:15rem;font-size:.9rem}.ec-user__btn:hover{color:#fff}.ec-user__btn:focus{box-shadow:none}.ec-user__btn--facebook{background:#3b5999;border-color:#2f4d8a}.ec-user__btn--facebook:hover{background:#274480;border-color:#274480}.ec-user__btn--google{background:#cb4023;border-color:#be3419}.ec-user__btn--google:hover{background:#c1361a;border-color:#c1361a}.ec-user__btn--windowslive{background:#329ffc;border-color:#2996f2}.ec-user__btn--windowslive:hover{background:#1f8ce9;border-color:#1f8ce9}.ec-user__btn__icon{display:inline-block;width:1.4rem;text-align:center;margin-right:.2rem}.ec-user__back{display:block;padding-left:.3rem;padding-right:.3rem}.ec-user__back:focus{box-shadow:none}.ec-user__visitor-info{font-size:.875rem;margin-top:.6rem;text-align:center;color:var(--gray)}", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__(1);
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// EXTERNAL MODULE: external {"commonjs":"@ecomplus/storefront-twbs","commonjs2":"@ecomplus/storefront-twbs","root":"__storefront_twbs"}
var storefront_twbs_root_storefront_twbs_ = __webpack_require__(4);

// CONCATENATED MODULE: /home/leo/code/storefront-template/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./src/components/html/EcUser.html?vue&type=template&id=c9fc643a&lang=html&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ec-user"},[_vm._t("button",[_c('button',{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.left",modifiers:{"hover":true,"left":true}}],staticClass:"btn btn-lg btn-light",attrs:{"type":"button","id":"ec-user-popover","title":_vm.dictionary('my_account')}},[_c('i',{staticClass:"fas fa-user"})])]),_c('b-popover',{attrs:{"target":"ec-user-popover","triggers":_vm.popoverTriggers,"show":_vm.showPopover,"placement":_vm.popoverPlacement},on:{"update:show":function($event){_vm.showPopover=$event},"hidden":_vm.resetPopover}},[_c('template',{slot:"title"},[_vm._v(" "+_vm._s(_vm.greetings)+" ")]),_c('div',{staticClass:"ec-user__popover"},[_c('b-alert',{staticClass:"ec-user__alert",attrs:{"show":_vm.loginErrorAlert,"fade":"","variant":"warning"}},[_vm._v(" "+_vm._s(_vm.dictionary('login_error'))+". ")]),_c('transition-group',{attrs:{"enter-active-class":"animated fadeIn","leave-active-class":"animated position-absolute fadeOut faster"}},[(_vm.waiting)?_c('div',{key:"waiting"},[_c('div',{staticClass:"spinner-border m-3",attrs:{"role":"status"}},[_c('span',{staticClass:"sr-only"},[_vm._v("Loading...")])])]):(_vm.isLogged)?_c('div',{key:"logged"},[_c('div',{staticClass:"list-group list-group-flush"},[_c('a',{staticClass:"list-group-item list-group-item-action",attrs:{"href":_vm.ordersUrl}},[_vm._v(" "+_vm._s(_vm.dictionary('my_orders'))+" ")]),_c('a',{staticClass:"list-group-item list-group-item-action",attrs:{"href":_vm.accountUrl}},[_vm._v(" "+_vm._s(_vm.dictionary('my_account'))+" ")])]),_c('button',{staticClass:"btn btn-block btn-danger ec-user__logout",attrs:{"type":"button"},on:{"click":_vm.logout}},[_c('i',{staticClass:"fas fa-sign-out-alt"}),_vm._v(" "+_vm._s(_vm.dictionary('logout'))+" ")])]):(!_vm.showLoginForm)?_c('div',{key:"oauth"},[_c('b-alert',{staticClass:"ec-user__alert",attrs:{"show":!_vm.popupAlertCount && _vm.noProfileFound,"fade":"","variant":"info"}},[_vm._v(" "+_vm._s(_vm.dictionary('profile_not_found'))+" "),_c('b',[_vm._v(_vm._s(_vm.email))]),_vm._v(". "),_c('br'),_c('a',{staticClass:"alert-link",attrs:{"href":"javascript:;"},on:{"click":function($event){_vm.noProfileFound = false}}},[_vm._v(" "+_vm._s(((_vm.dictionary('sign_in_with')) + " " + (_vm.dictionary('another')) + " " + (_vm.dictionary('email'))))+" ")])]),_c('b-alert',{staticClass:"ec-user__alert",attrs:{"show":_vm.popupAlertCount,"dismissible":"","fade":"","variant":"info"},on:{"dismissed":function($event){_vm.popupAlertCount = 0},"dismiss-count-down":_vm.popupAlertChanged}},[_vm._v(" "+_vm._s(_vm.dictionary('continue_on_popup'))+". ")]),_vm._l((_vm.oauthProviders),function(ref){
var link = ref.link;
var faIcon = ref.faIcon;
var providerName = ref.providerName;
var provider = ref.provider;
return _c('button',{key:provider,staticClass:"btn btn-block ec-user__btn",class:("ec-user__btn--" + provider),attrs:{"type":"button"},on:{"click":function () { return _vm.oauthPopup(link, provider); }}},[_c('span',{staticClass:"ec-user__btn__icon"},[_c('i',{staticClass:"fab",class:faIcon})]),_vm._v(" "+_vm._s(_vm.dictionary(_vm.noProfileFound ? 'sign_up_with' : 'sign_in_with'))+" "+_vm._s(providerName)+" ")])}),(!_vm.noProfileFound)?_c('button',{key:"email",staticClass:"btn btn-block btn-secondary ec-user__btn",attrs:{"type":"button"},on:{"click":function($event){_vm.showLoginForm = true}}},[_c('span',{staticClass:"ec-user__btn__icon"},[_c('i',{staticClass:"fas fa-envelope"})]),_vm._v(" "+_vm._s(((_vm.dictionary('sign_in_with')) + " " + (_vm.dictionary('email'))))+" ")]):_c('div',{staticClass:"ec-user__visitor-info"},[_vm._v(" "+_vm._s(_vm.dictionary('visitor_checkout'))+" ")])],2):_c('div',{key:"form"},[_c('form',{on:{"submit":_vm.emailLoginSubmit}},[_c('div',{staticClass:"form-group"},[_c('button',{staticClass:"btn ec-user__back",attrs:{"type":"button"},on:{"click":function($event){_vm.showLoginForm = false}}},[_c('i',{staticClass:"fas fa-arrow-left"})]),_c('label',{attrs:{"for":"ec-user-email"}},[_vm._v(" "+_vm._s(((_vm.dictionary('sign_in_with')) + " " + (_vm.dictionary('email'))))+" ")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.email),expression:"email"}],ref:"input",staticClass:"form-control",attrs:{"type":"email","id":"ec-user-email","placeholder":"email@mail.com","required":""},domProps:{"value":(_vm.email)},on:{"input":function($event){if($event.target.composing){ return; }_vm.email=$event.target.value}}})]),_c('button',{staticClass:"btn btn-block btn-primary",attrs:{"type":"submit"}},[_vm._v(" "+_vm._s(_vm.dictionary('login'))+" ")])])])])],1)],2)],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/html/EcUser.html?vue&type=template&id=c9fc643a&lang=html&

// EXTERNAL MODULE: external {"commonjs":"@ecomplus/utils","commonjs2":"@ecomplus/utils","root":"ecomUtils"}
var utils_root_ecomUtils_ = __webpack_require__(2);

// CONCATENATED MODULE: ./src/lib/dictionary.js
const dictionary = {
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
}

/* harmony default export */ var lib_dictionary = (function (word, lang) {
  if (!lang) {
    lang = (this && this.lang) || 'en_us'
  }
  return (dictionary[word] && dictionary[word][lang]) || ''
});

// EXTERNAL MODULE: external {"commonjs":"@ecomplus/passport-client","commonjs2":"@ecomplus/passport-client","root":"EcomPassport"}
var passport_client_root_EcomPassport_ = __webpack_require__(3);
var passport_client_root_EcomPassport_default = /*#__PURE__*/__webpack_require__.n(passport_client_root_EcomPassport_);

// CONCATENATED MODULE: ./src/components/js/EcUser.js?vue&type=script&lang=js&




/* harmony default export */ var EcUservue_type_script_lang_js_ = ({
  name: 'EcUser',

  props: {
    lang: {
      type: String,
      default: utils_root_ecomUtils_["$ecomConfig"].get('lang')
    },
    ecomPassport: {
      type: Object,
      default: () => passport_client_root_EcomPassport_default.a
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

  data () {
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
    }
  },

  computed: {
    greetings () {
      if (typeof this.getGreetingsMsg === 'function') {
        return this.getGreetingsMsg(this.name)
      } else {
        return `${lib_dictionary('hello', this.lang)} ${this.name || lib_dictionary('visitor', this.lang)}`
      }
    }
  },

  methods: {
    dictionary: lib_dictionary,

    update () {
      this.fixPopoverTriggers()
      const { checkLogin, getCustomerName } = this.ecomPassport
      this.name = getCustomerName()
      this.isLogged = checkLogin()
      this.email = ''
      this.popupAlertCount = 0
      if (this.isLogged) {
        this.showPopover = true
        setTimeout(() => {
          if (this.showPopover) {
            this.popoverHideTimer = setTimeout(() => {
              this.showPopover = false
            }, 2000)
          }
        }, 200)
      }
      this.waitingPopup = false
      clearTimeout(this.popoverHideTimer)
    },

    waitPromise (promise) {
      this.fixPopoverTriggers()
      const vm = this
      vm.waiting = true
      promise
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          vm.waiting = false
        })
    },

    setOauthProviders () {
      const vm = this
      const promise = vm.ecomPassport.fetchOauthProviders()
        .then(({ host, baseUri, oauthPath, providers }) => {
          const oauthProviders = []
          for (const provider in providers) {
            if (providers[provider]) {
              const { faIcon, providerName } = providers[provider]
              oauthProviders.push({
                link: host + baseUri + provider + oauthPath,
                faIcon,
                provider,
                providerName
              })
            }
          }
          vm.oauthProviders = oauthProviders
        })
        .catch(err => {
          vm.presetOauthProviders()
          throw err
        })
      vm.waitPromise(promise)
      return promise
    },

    presetOauthProviders () {
      this.oauthProviders = [
        {
          faIcon: 'fa-facebook-f',
          providerName: 'Facebook',
          provider: 'facebook'
        },
        {
          faIcon: 'fa-google',
          providerName: 'Google',
          provider: 'google'
        },
        {
          faIcon: 'fa-windows',
          providerName: 'Windows',
          provider: 'windowslive'
        }
      ]
    },

    oauthPopup (link, provider) {
      const vm = this
      this.loginErrorAlert = false
      if (link) {
        vm.ecomPassport.popupOauthLink(link)
        vm.waitingPopup = true
        setTimeout(() => {
          vm.popupAlertCount = vm.popupAlertCountSecs
        }, 200)
      } else {
        const promise = vm.setOauthProviders()
          .then(() => {
            const link = vm.oauthProviders
              .find(oauthProvider => oauthProvider.provider === provider)
            vm.oauthPopup(link, provider)
          })
          .catch(err => {
            vm.loginErrorAlert = true
            throw err
          })
        vm.waitPromise(promise)
      }
    },

    popupAlertChanged (countDown) {
      this.popupAlertCount = countDown
    },

    emailLoginSubmit (e) {
      const vm = this
      e.preventDefault()
      vm.showLoginForm = false
      const promise = vm.ecomPassport.fetchLogin(this.email)
        .catch(err => {
          const { response } = err
          if (response && response.status === 403) {
            vm.noProfileFound = true
          } else {
            setTimeout(() => {
              vm.loginErrorAlert = true
            }, 100)
            throw err
          }
        })
      vm.waitPromise(promise)
    },

    logout () {
      this.ecomPassport.logout()
    },

    resetErrors () {
      this.noProfileFound = this.loginErrorAlert = false
    },

    resetPopover () {
      if (this.showLoginForm) {
        this.showLoginForm = false
      } else {
        this.resetErrors()
      }
    },

    fixPopoverTriggers () {
      if (this.showPopover) {
        this.popoverTriggers = 'manual'
        setTimeout(() => {
          this.popoverTriggers = 'click blur'
        }, 310)
      }
    }
  },

  mounted () {
    const vm = this
    ;['login', 'logout'].forEach(ev => {
      this.ecomPassport.on(ev, payload => {
        vm.update()
        vm.$emit(ev, payload)
      })
    })
    vm.update()
    vm.setOauthProviders()
  },

  watch: {
    noProfileFound (newStatus) {
      if (newStatus === false) {
        this.email = ''
      }
      this.showLoginForm = !newStatus
    },

    showLoginForm (newStatus) {
      this.loginErrorAlert = false
      if (newStatus) {
        this.fixPopoverTriggers()
        setTimeout(() => {
          if (this.$refs.input) {
            this.$refs.input.focus()
          }
        }, 300)
      }
    },

    showPopover () {
      clearTimeout(this.popoverHideTimer)
    }
  }
});

// CONCATENATED MODULE: ./src/components/js/EcUser.js?vue&type=script&lang=js&
 /* harmony default export */ var js_EcUservue_type_script_lang_js_ = (EcUservue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/scss/EcUser.scss?vue&type=style&index=0&lang=scss&
var EcUservue_type_style_index_0_lang_scss_ = __webpack_require__(5);

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

// CONCATENATED MODULE: ./src/components/EcUser.vue






/* normalize component */

var component = normalizeComponent(
  js_EcUservue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var EcUser = (component.exports);
// CONCATENATED MODULE: ./src/index.js
/*!
 * @ecomplus/widget-user
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */





/* harmony default export */ var src = __webpack_exports__["default"] = ((options = {}, elId = 'user-button') => {
  const $userButton = document.getElementById(elId)

  if ($userButton) {
    new external_commonjs_vue_commonjs2_vue_root_Vue_default.a({
      render: h => h(EcUser, {
        attrs: {
          id: elId
        },
        props: {
          ...options.props
        }
      })
    }).$mount($userButton)
  }
});


/***/ }),
/* 9 */
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


/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=widget-user.es.js.map