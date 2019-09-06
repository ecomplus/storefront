import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import EcProduct from './components/EcProduct.vue'
import EcomCart from '@ecomplus/shopping-cart'

export default (options = {}, elId = 'product-block') => {
  const $productBlock = document.getElementById(elId)
  const cart = new EcomCart()

  if ($productBlock) {
    new Vue({
      components: {
        EcProduct
      },

      data () {
        return {
          options
        }
      },

      methods: {
        addToCart ({ product }) {
          cart.addProduct(product)
        }
      },

      template: `
      <ec-product
        id="${elId}"
        v-bind="options"
        @buy="addToCart"
      >
        ${$productBlock.outerHTML}
      </ec-product>`
    }).$mount($productBlock)
  }
}
