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

    methods: {
      addToCart () {
        console.log('cart')
      },

      openPhotoswipe () {
        console.log('photoswipe')
      }
    },

    template: `
    <ec-product
      id="${elId}"
      @buy="addToCart"
      @click:stage="openPhotoswipe"
    >
      ${$productBlock.outerHTML}
    </ec-product>`
  }).$mount($productBlock)
}
