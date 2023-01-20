import ecomCart from '@ecomplus/shopping-cart'
import { currencyCode } from './common'

export default dataLayer => {
  const $products = document.querySelectorAll('[data-sku]')
  if ($products.length) {
    const skus = []
    const listNameBySku = {}
    const isSearchPage = window.location.pathname === '/search'

    let defaultList
    if (isSearchPage) {
      defaultList = 'Search results'
    } else {
      const context = window.storefront && window.storefront.context
      if (context && context.body) {
        const { name } = context.body
        switch (context.resource) {
          case 'categories':
            defaultList = `Category: ${name}`
            break
          case 'brands':
            defaultList = `Brand: ${name}`
            break
          case 'collections':
            defaultList = `Collection: ${name}`
        }
      } else {
        defaultList = 'Home'
      }
    }

    for (let i = 0; i < $products.length; i++) {
      const $product = $products[i]
      const { sku } = $product.dataset
      if (skus.indexOf(sku) === -1) {
        skus.push(sku)
        if ($product.closest) {
          const $carousel = $product.closest('.products-carousel')
          if (!isSearchPage && $carousel) {
            listNameBySku[sku] = $carousel.dataset.title
          }
        }
      }

      const $item = $product.parentElement
      if ($item) {
        let evTarget
        let fallbackTimer = null
        let isAddedToCart = false
        const eventCallback = function () {
          clearTimeout(fallbackTimer)
          $item.removeEventListener('click',
            sendProductClick,
            false
          )
          if (isAddedToCart) {
            return
          }
          setTimeout(() => {
            if (!isAddedToCart && !evTarget.disabled && !evTarget.parentElement.disabled) {
              evTarget.click()
            }
          }, evTarget.tagName === 'BUTTON' || evTarget.tagName === 'I' ? 150 : 20)
        }
        const sendProductClick = function (ev) {
          if (isAddedToCart) {
            return
          }
          ecomCart.once('addItem', ({ item }) => {
            isAddedToCart = item.sku === sku
          })
          ecomCart.once('increaseItemQnt', ({ item }) => {
            isAddedToCart = item.sku === sku
          })
          evTarget = ev.target
          ev.stopPropagation()
          ev.preventDefault()
          const impression = impressions.find(({ id }) => id === sku)
          dataLayer.push({ ecommerce: null })
          dataLayer.push({
            event: 'eec.click',
            ecommerce: {
              click: {
                actionField: { list: impression.list || '' },
                products: [impression]
              }
            },
            eventCallback
          })
          fallbackTimer = setTimeout(eventCallback, 1000)
        }
        $item.addEventListener('click',
          sendProductClick,
          false
        )
      }
    }

    const countPerList = {}
    const impressions = skus.map(sku => {
      const listName = listNameBySku[sku] || defaultList
      const item = { id: sku }
      if (listName) {
        item.list = listName
        if (!countPerList[listName]) {
          countPerList[listName] = 1
        } else {
          countPerList[listName]++
        }
        item.position = countPerList[listName]
      }
      return item
    })

    dataLayer.push({ ecommerce: null })
    dataLayer.push({
      event: 'eec.impressions',
      ecommerce: {
        currencyCode,
        impressions
      }
    })
  }
}
