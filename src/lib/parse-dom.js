import { currencyCode } from './common'

export default fbq => {
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

    fbq('Search', {
      content_ids: skus,
      currency: currencyCode,
      search_string: `Search results: ${ $carousel.dataset.title }`
    })
  }
}
