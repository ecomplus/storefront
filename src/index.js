import parseContext from './lib/parse-context'
import parseDom from './lib/parse-dom'
import watchAppRoutes from './lib/watch-app-routes'
import watchShoppingCart from './lib/watch-shopping-cart'

export default (options = {}) => {
  const { dataLayerVar, parseDomMsDelay } = options
  const dataLayer = window[dataLayerVar] || window.dataLayer

  if (dataLayer) {
    parseContext(dataLayer)
    watchAppRoutes(dataLayer)
    watchShoppingCart(dataLayer)

    setTimeout(() => {
      parseDom(dataLayer)
    }, parseDomMsDelay >= 0 ? parseDomMsDelay : 300)
  }
}
