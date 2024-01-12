import parseContext from './lib/parse-context'
import parseDom from './lib/parse-dom'
import watchAppRoutes from './lib/watch-app-routes'
import watchShoppingCart from './lib/watch-shopping-cart'

export default (options = {}) => {
  const { dataLayerVar, parseDomMsDelay, isDebug } = options
  const _dataLayer = window[dataLayerVar] || window.dataLayer

  if (_dataLayer) {
    const dataLayer = !isDebug
      ? _dataLayer
      : {
          push: (data) => {
            _dataLayer.push(data)
            if (data) {
              const { event, ecommerce } = data
              if (event && event.startsWith('eec.')) {
                console.log(event, ecommerce)
              }
            }
          }
        }

    parseContext(dataLayer)
    watchAppRoutes(dataLayer)
    watchShoppingCart(dataLayer)

    setTimeout(() => {
      parseDom(dataLayer)
    }, parseDomMsDelay >= 0 ? parseDomMsDelay : 300)
  }
}
