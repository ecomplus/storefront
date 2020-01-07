/*!
 * @ecomplus/widget-product-card
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */

import Vue from 'vue'
import lozad from 'lozad'
import '@ecomplus/storefront-twbs'
import EcProductCard from './components/EcProductCard.vue'
import EcomSearch from '@ecomplus/search-engine'

export default (options = {}, elClass = 'product-card') => {
  const setupComponent = ($productCard, productId, sku, product, isLoaded) => {
    new Vue({
      render: h => h(EcProductCard, {
        class: elClass,
        attrs: {
          'data-product-id': productId,
          'data-sku': sku
        },
        props: {
          ...options.props,
          prerenderedHTML: $productCard.outerHTML,
          productId,
          product,
          isLoaded
        }
      })
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

    preFetchPromise = search.fetch({ timeout: 5000 })
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
