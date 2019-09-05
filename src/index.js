import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import EcProduct from './components/EcProduct.vue'
import EcomCart from '@ecomplus/shopping-cart'

export default options => {
  const elId = 'product-block'
  const $productBlock = document.getElementById(elId)
  const cart = new EcomCart()

  new Vue({
    components: {
      EcProduct
    },

    methods: {
      addToCart ({ product }) {
        cart.addProduct(product)
      }
    },

    template: `
    <ec-product
      id="${elId}"
      @buy="addToCart"
    >
      ${$productBlock.outerHTML}
    </ec-product>`
  }).$mount($productBlock)
}
