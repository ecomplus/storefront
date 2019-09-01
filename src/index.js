import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import EcUser from './EcProduct.vue'

export default options => {
  new Vue({
    render: h => h(EcUser)
  }).$mount('#product-block')
}
