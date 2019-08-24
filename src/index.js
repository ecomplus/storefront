import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import EcomUser from './EcomUser.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(EcomUser)
}).$mount('#app')

window.alert(10)
