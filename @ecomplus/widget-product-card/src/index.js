/*!
 * @ecomplus/widget-product-card
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */

import Vue from 'vue'
import lozad from 'lozad'
import EcomSearch from '@ecomplus/search-engine'
import ProductCard from '#components/ProductCard.vue'

export default (options = {}, elClass = 'product-card') => {
  if (options.buyText) {
    window.productCardBuyText = options.buyText
  }
  if (options.buy) {
    window.productCardBuyHtml = options.buy
  }
  if (options.footer) {
    window.productCardFooterHtml = options.footer
  }
  const getScopedSlots = window.storefront && window.storefront.getScopedSlots

  const setupComponent = ($productCard, productId, sku, product, isLoaded) => {
    new Vue({
      render: h => h(ProductCard, {
        class: elClass !== 'product-card' ? elClass : null,
        attrs: {
          'data-product-id': productId,
          'data-sku': sku
        },
        props: {
          ...options.props,
          productId,
          product,
          isLoaded,
          transitionClass: null
        },
        scopedSlots: typeof getScopedSlots === 'function'
          ? getScopedSlots($productCard, h)
          : undefined
      })
    }).$mount($productCard)
  }

  const $productCards = document.querySelectorAll(`.${elClass}`)
  const productIds = []
  for (let i = 0; i < $productCards.length; i++) {
    if ($productCards[i]) {
      const { productId, toRender } = $productCards[i].dataset
      if (toRender && productIds.indexOf(productId) === -1) {
        productIds.push(productId)
      }
    }
  }

  let preFetchPromise
  if (productIds.length >= 6 && productIds.length <= 70 && !options.skipSearchApi) {
    const search = new EcomSearch()
    preFetchPromise = search
      .setPageSize(productIds.length)
      .setProductIds(productIds)
      .fetch(true, { timeout: 5000 })
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

  const observer = lozad($productCards, {
    rootMargin: '350px 0px',
    threshold: 0,
    load
  })
  observer.observe()
}
