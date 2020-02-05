import parseContext from './lib/parse-context'
import watchAppRoutes from './lib/watch-app-routes'
import watchShoppingCart from './lib/watch-shopping-cart'

export default (options = {}) => {
  if (typeof window.fbq === 'function') {
    const track = (evName, data = {}, isCustomEv = false) => {
      if (options.debug) {
        console.log('fbq', evName, data)
      }
      window.fbq(isCustomEv ? 'trackCustom' : 'track', evName, data)
    }

    parseContext(track)
    watchAppRoutes(track)
    watchShoppingCart(track)
  }
}
