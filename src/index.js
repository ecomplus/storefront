import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import EcProduct from './components/EcProduct.vue'
import EcomCart from '@ecomplus/shopping-cart'
import { dynamicVueSlots } from './lib/utils'

export default (options = {}, elId = 'product-block') => {
  const $productBlock = document.getElementById(elId)
  if ($productBlock) {
    const cart = new EcomCart()

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
          cart.addProduct({
            ...product,
            body_html: null,
            body_text: null
          })
        }
      },

      template: `
      <ec-product
        id="${elId}"
        v-bind="options.props"
        @buy="addToCart"
      >
        ${$productBlock.outerHTML}
        ${dynamicVueSlots(options.slots)}
      </ec-product>`
    }).$mount($productBlock)
  }
}
