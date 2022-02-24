import watchAppRoutes from './lib/watch-app-routes'
import watchShoppingCart from './lib/watch-shopping-cart'

export default (options = {}) => {
  const { gaTrackingId, googleAdsId } = options
  const { gtag } = window

  if (typeof gtag === 'function') {
    watchAppRoutes(gtag, gaTrackingId, googleAdsId)
    watchShoppingCart(gtag, gaTrackingId)
  }
}
