import ratingCards from './lib/rating-products'
import commentsProduct from './lib/comments-products'
import ratingSearch from './lib/rating-search'

export default options => {
  document.addEventListener('DOMContentLoaded', function () {
    ;[
      '//static.trustvox.com.br/assets/widget.js',
      '//s3-sa-east-1.amazonaws.com/trustvox-rate-widget-js/widget.js'
    ].forEach(script => {
      const scriptEl = document.createElement('script')
      scriptEl.src = script
      document.body.appendChild(scriptEl)
    })

    ratingCards(options)
    ratingSearch(options)
    commentsProduct(options)
  }, false)
}
