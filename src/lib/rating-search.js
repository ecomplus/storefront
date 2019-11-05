import observer from './observer'
import newRatingWidget from './rating-widget'

export default () => {
  const $search = document.getElementById('search')
  if ($search) {
    observer($search, () => {
      const $productCards = document.querySelectorAll('#search-engine .product-card')
      for (let i = 0; i < $productCards.length; i++) {
        const $productCard = $productCards[i]
        const { sku } = $productCard.dataset
        const $productCardLink = document.querySelectorAll(`[data-sku="${sku}"] .ec-product-card__link`)
        if ($productCardLink.length) {
          const $rating = newRatingWidget(sku)
          for (let j = 0; j < $productCardLink.length; j++) {
            $productCardLink[j].appendChild($rating)
          }
        }
      }
      window._trustvox_shelf_rate.push(['_productContainer', '#search'])
    })
  }
}
