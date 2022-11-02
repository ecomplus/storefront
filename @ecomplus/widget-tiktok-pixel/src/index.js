import parseContext from './lib/parse-context'
import watchSearch from './lib/watch-search'
import watchAppRoutes from './lib/watch-app-routes'
import watchShoppingCart from './lib/watch-shopping-cart'

export default () => {
  if (typeof window.ttq === 'object') {
    const track = window.ttq
    parseContext(track)
    watchSearch(track)
    watchAppRoutes(track)
    watchShoppingCart(track)
  }
}
