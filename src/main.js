import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import App from './App.vue'
import router from './router'
import store from './store'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#storefront-app')
