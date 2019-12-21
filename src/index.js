import Vue from 'vue'
import lozad from 'lozad'
import '@ecomplus/storefront-twbs'
import EcProductCard from './components/EcProductCard.vue'
import EcomSearch from '@ecomplus/search-engine'
import ecomCart from '@ecomplus/shopping-cart'
import { dynamicVueSlots } from '@ecomplus/widget-product/src/lib/utils'

export default (options = {}, elClass = 'product-card') => {
  const setupComponent = ($productCard, productId, sku, product, isLoaded) => {
    new Vue({
      components: {
        EcProductCard
      },

      computed: {
        options: () => options,
        productId: () => productId,
        sku: () => sku,
        product: () => product,
        isLoaded: () => isLoaded
      },

      methods: {
        addToCart ({ product }) {
          const { variations, slug } = product
          if (variations && variations.length) {
            window.location = `/${slug}`
          } else {
            ecomCart.addProduct(product)
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
        :product="product"
        :isLoaded="isLoaded"
        @buy="addToCart"
      >
        ${$productCard.outerHTML}
        ${dynamicVueSlots(options.slots)}
      </ec-product-card>`
    }).$mount($productCard)
  }

  const load = $productCard => {
    if (!$productCard.classList.contains('ec-product-card')) {
      const { productId, sku } = $productCard.dataset
      let product
      const $parent = $productCard.parentNode
      if ($parent) {
        product = $parent.dataset.product
        if (typeof product === 'string') {
          try {
            product = JSON.parse(product)
          } catch (e) {
            product = undefined
          }
        }
      }
      setupComponent($productCard, productId, sku, product)
    }
  }

  const $productCards = document.querySelectorAll(`.${elClass}`)
  const loadWithObserver = () => {
    const observer = lozad($productCards, { load })
    observer.observe()
  }

  const skus = []
  const cardsBySku = {}
  for (let i = 0; i < $productCards.length; i++) {
    if ($productCards[i]) {
      const { sku } = $productCards[i].dataset
      if (skus.indexOf(sku) === -1) {
        skus.push(sku)
      }
      if (!cardsBySku[sku]) {
        cardsBySku[sku] = []
      }
      cardsBySku[sku].push($productCards[i])
    }
  }

  if (skus.length >= 8) {
    const search = new EcomSearch()
    search.setSkus(skus).fetch()
      .then(() => {
        search.getItems().forEach(item => {
          const { _id, sku } = item
          cardsBySku[sku].forEach($productCard => {
            setupComponent($productCard, _id, sku, item, true)
          })
        })
      })
      .catch(err => {
        console.error(err)
        loadWithObserver()
      })
  } else {
    loadWithObserver()
  }
}
