import Vue from 'vue'
import lozad from 'lozad'
import '@ecomplus/storefront-twbs'
import EcProductCard from './components/EcProductCard.vue'
import EcomCart from '@ecomplus/shopping-cart'
import { dynamicVueSlots } from '@ecomplus/widget-product/src/lib/utils'

export default (options = {}, elClass = 'product-card') => {
  const cart = new EcomCart()

  const load = $productCard => {
    if (!$productCard.classList.contains('ec-product-card')) {
      const { productId, sku } = $productCard.dataset

      new Vue({
        components: {
          EcProductCard
        },

        data () {
          return {
            options,
            productId,
            sku
          }
        },

        methods: {
          addToCart ({ product }) {
            const { variations, slug } = product
            if (variations && variations.length) {
              window.location = `/${slug}`
            } else {
              cart.addProduct(product)
            }
          }
        },

        template: `
        <ec-product-card
          class="${elClass}"
          v-bind="options.props"
          :data-product-id="productId"
          :data-sku="sku"
          :productId="productId"
          @buy="addToCart"
        >
          ${$productCard.outerHTML}
          ${dynamicVueSlots(options.slots)}
        </ec-product-card>`
      }).$mount($productCard)
    }
  }

  const observer = lozad(`.${elClass}`, { load })
  observer.observe()
}
