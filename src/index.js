import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import EcUser from './EcUser.vue'

export default options => {
  new Vue({
    render: h => h(EcUser)
  }).$mount('#user-button')
}
