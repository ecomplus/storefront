import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import EcUser from './EcUser.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(EcUser)
}).$mount('#user-button')
