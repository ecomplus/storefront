import observer from './observer'
import newRatingWidget from './rating-widget'
export default options => {
  const elClass = 'product-card'
  const $productCards = document.getElementsByClassName(elClass)
  if ($productCards) {
    const skus = []
    const $ratingsBySku = {}
    for (let i = 0; i < $productCards.length; i++) {
      const { sku } = $productCards[i].dataset
      if (skus.indexOf(sku) === -1) {
        const $rating = newRatingWidget(sku)
        $rating.style.display = 'none'
        skus.push(sku)
        $ratingsBySku[sku] = $rating
        document.body.appendChild($rating)
      }
      const $shelf = $productCards[i].parentElement
      observer($shelf, () => {
        for (let i = 0; i < $shelf.childNodes.length; i++) {
          const $productCard = $shelf.childNodes[i]
          const { sku, toRender } = $productCard.dataset
          if (!toRender) {
            if (skus.indexOf(sku) > -1) {
              const $rating = $ratingsBySku[sku]
              const $productCardLink = document.querySelectorAll(`[data-sku="${sku}"] .ec-product-card__link`)
              if ($productCardLink.length) {
                for (let j = 0; j < $productCardLink.length; j++) {
                  $productCardLink[j].appendChild($rating)
                }
                $rating.style.display = 'inherit'
              }
            }
          }
        }
      })
    }
    window._trustvox_shelf_rate = window._trustvox_shelf_rate || []
    window._trustvox_shelf_rate.push(['_storeId', options.storeId])
  }
}
