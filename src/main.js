// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// Element UI kit
// http://element.eleme.io
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale'
import en from 'element-ui/lib/locale/lang/en'
import br from 'element-ui/lib/locale/lang/pt-br'

// Vuex Centralized State Management
// https://vuex.vuejs.org/en/
import Vuex from 'vuex'

// setup Vuex
Vue.use(Vuex)
// setup Element UI fully
Vue.use(ElementUI)
// i18n
locale.use(en)
locale.use(br)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
