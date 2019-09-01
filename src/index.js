import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import EcProduct from './EcProduct.vue'

export default options => {
  const $productBlock = document.getElementById('product-block')
  new Vue({
    components: {
      EcProduct
    },
    template: `
    <ec-product>${$productBlock.outerHTML}</ec-product>`
  }).$mount($productBlock)
}
