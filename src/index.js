import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import EcProduct from './components/EcProduct.vue'

export default options => {
  const elId = 'product-block'
  const $productBlock = document.getElementById(elId)
  new Vue({
    components: {
      EcProduct
    },
    template: `
    <ec-product id="${elId}">${$productBlock.outerHTML}</ec-product>`
  }).$mount($productBlock)
}
