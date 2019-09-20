import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import { _config } from '@ecomplus/utils'
import App from './App.vue'
import router from './router/'
import store from './store/'

export default (settings = window._settings, shop = window._store) => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#storefront-app')

  console.log(`Starting Storefront App with Store ID #${_config.get('store_id')}`)
}
