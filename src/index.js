import parseContext from './lib/parse-context'
import watchAppRoutes from './lib/watch-app-routes'
import watchShoppingCart from './lib/watch-shopping-cart'

export default (options = {}) => {
  const fbq = (evName, data = {}, isCustomEv = false) => {
    fbq(isCustomEv ? 'trackCustom' : 'track', evName, data)
  }

  if (fbq) {
    parseContext(fbq)
    watchAppRoutes(fbq)
    watchShoppingCart(fbq)
  }
}
