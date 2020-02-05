import { currencyCode } from './common'

export default dataLayer => {
  const $products = document.querySelectorAll('[data-sku]')
  if ($products.length) {
    const skus = []
    const listNameBySku = {}
    const isSearchPage = window.location.pathname === '/search'

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
    }

    dataLayer.push({
      event: 'eec.impressions',
      ecommerce: {
        currencyCode,
        impressions: skus.map(sku => {
          const listName = isSearchPage ? 'Search results' : listNameBySku[sku]
          const item = { id: sku }
          if (listName) {
            item.list = listName
          }
          return item
        })
      }
    })
  }
}
