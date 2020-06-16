
export default (options = {}) => {
  const { body } = window._context
  const { _widgets } = window
  options.btnOutStock = false
  options.btnPriceChange = false

  if (_widgets && _widgets['@ecomplus/widget-offers-notification']) {
    const { enabledOutOfStock, enabledPriceChange } = _widgets['@ecomplus/widget-offers-notification']

    if (body.quantity === 0 && enabledOutOfStock) {
      options.btnOutStock = true
    }

    if (body.quantity > 0 && enabledPriceChange) {
      options.btnPriceChange = true
    }
  }

  const $offersBtns = window.document.querySelectorAll('.offers-notification')

  if ($offersBtns) {
    for (let i = 0; i < $offersBtns.length; i++) {
      const element = $offersBtns[i]
      element.onClick = function () {
        console.log(this)
        // open iframe
      }
    }
  }
}
