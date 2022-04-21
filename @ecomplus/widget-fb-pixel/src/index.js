import parseContext from './lib/parse-context'
import watchAppRoutes from './lib/watch-app-routes'
import watchShoppingCart from './lib/watch-shopping-cart'

export default (options = {}) => {
  if (typeof window.fbq === 'function') {
    const track = (evName, data = {}, isCustomEv = false) => {
      if (options.debug) {
        console.log('fbq', evName, data)
      }
      const action = isCustomEv ? 'trackCustom' : 'track'
      if (data.eventID) {
        const eventID = data.eventID
        delete data.eventID
        window.fbq(action, evName, data, { eventID })
      } else {
        window.fbq(action, evName, data)
      }
    }

    parseContext(track)
    watchAppRoutes(track, options)
    watchShoppingCart(track)
  }
}
