// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// Element UI kit
// http://element.eleme.io
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'

// custom additional plugins
import Inputmask from 'inputmask'

// internationalization
import VueI18n from 'vue-i18n'
import enUs from 'element-ui/lib/locale/lang/en'
import ptBr from 'element-ui/lib/locale/lang/pt-br'
// custom dictionary
import dictionary from './lib/dictionary'
import { DEFAULT_LANG } from '@/lib/constants'

// Font Awesome Icons
import './lib/icons'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
Vue.component('a-icon', FontAwesomeIcon)

// setup Element UI fully
Vue.use(ElementUI)
// setup i18n
Vue.use(VueI18n)
Vue.locale('en_us', { ...enUs, ...dictionary.enUs })
Vue.locale('pt_br', { ...ptBr, ...dictionary.ptBr })
let locale = (lang) => {
  // change language
  Vue.config.lang = lang
  Vue.prototype.$lang = lang
}
Vue.prototype.$locale = locale
// preset default language
locale(DEFAULT_LANG)

// handle form inputs masking
Vue.directive('mask', {
  bind: function (el, binding) {
    Inputmask(binding.value).mask(el.getElementsByTagName('INPUT')[0])
  }
})

/* eslint-disable no-new */
// set Vue instance globally
window.App = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
