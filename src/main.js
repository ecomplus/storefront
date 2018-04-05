// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// Vuex Centralized State Management
// https://vuex.vuejs.org/en/
import Vuex from 'vuex'

// Element UI kit
// http://element.eleme.io
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// internationalization
import VueI18n from 'vue-i18n'
import en from 'element-ui/lib/locale/lang/en'
import br from 'element-ui/lib/locale/lang/pt-br'

// setup Vuex
Vue.use(Vuex)
// setup Element UI fully
Vue.use(ElementUI)
// i18n
Vue.use(VueI18n)
Vue.config.lang = 'en_us'
Vue.locale('en_us', en)
Vue.locale('pt_br', br)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
