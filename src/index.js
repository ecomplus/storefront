import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import EcProduct from './components/EcProduct.vue'
import ecomCart from '@ecomplus/shopping-cart'
import { dynamicVueSlots } from './lib/utils'

export default (options = {}, elId = 'product-block') => {
  const $productBlock = document.getElementById(elId)
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
          ecomCart.addProduct({
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
