import parseContext from './lib/parse-context'
import parseDom from './lib/parse-dom'
import watchAppRoutes from './lib/watch-app-routes'
import watchShoppingCart from './lib/watch-shopping-cart'

export default (options = {}) => {
  const { parseDomMsDelay } = options

  const fbq = (evName, data = {}) => {
    fbq('track', evName, data)
  }

  if (fbq) {
    parseContext(fbq)
    watchAppRoutes(fbq)
    watchShoppingCart(fbq)

    setTimeout(() => {
      parseDom(fbq)
    }, parseDomMsDelay >= 0 ? parseDomMsDelay : 300)
  }
}
