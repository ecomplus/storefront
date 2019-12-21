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

  const $productCards = document.querySelectorAll(`.${elClass}`)
  const productIds = []
  for (let i = 0; i < $productCards.length; i++) {
    if ($productCards[i]) {
      const { productId } = $productCards[i].dataset
      if (productIds.indexOf(productId) === -1) {
        productIds.push(productId)
      }
    }
  }

  let preFetchPromise
  if (productIds.length >= 6 && productIds.length <= 70 && !options.skipSearchApi) {
    const search = new EcomSearch()
    delete search.dsl.aggs
    delete search.dsl.sort
    search.setPageSize(productIds.length).setProductIds(productIds)

    preFetchPromise = search.fetch()
      .then(() => {
        const items = search.getItems()
        for (let i = 0; i < 2; i++) {
          load($productCards[i])
        }
        return items
      })
      .catch(err => {
        console.error(err)
      })
  } else {
    preFetchPromise = Promise.resolve()
  }

  const load = $productCard => {
    if ($productCard) {
      const { productId, sku, toRender } = $productCard.dataset
      if (toRender) {
        let product

        preFetchPromise
          .then(items => {
            if (Array.isArray(items)) {
              product = items.find(({ _id }) => _id === productId)
            }
          })

          .finally(() => {
            let isLoaded
            if (product) {
              isLoaded = true
            } else {
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
            }
            setupComponent($productCard, productId, sku, product, isLoaded)
          })
      }
    }
  }

  const observer = lozad($productCards, { load })
  observer.observe()
}
