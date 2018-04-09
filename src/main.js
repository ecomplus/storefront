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

// internationalization
import VueI18n from 'vue-i18n'
import enUs from 'element-ui/lib/locale/lang/en'
import ptBr from 'element-ui/lib/locale/lang/pt-br'
// custom dictionary
import dictionary from './lib/dictionary'

// Font Awesome Icons
import './lib/icons'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
Vue.component('a-icon', FontAwesomeIcon)

// setup Element UI fully
Vue.use(ElementUI)
// i18n
Vue.use(VueI18n)
Vue.config.lang = 'pt_br'
Vue.locale('en_us', { ...enUs, ...dictionary.enUs })
Vue.locale('pt_br', { ...ptBr, ...dictionary.ptBr })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
