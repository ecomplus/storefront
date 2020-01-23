import parseContext from './lib/parse-context'
import parseDom from './lib/parse-dom'
import watchAppRoutes from './lib/watch-app-routes'
import watchShoppingCart from './lib/watch-shopping-cart'

export default (options = {}) => {
  const { parseDomMsDelay } = options

  //Example Object
  // {
  //   content_name: 'Really Fast Running Shoes',
  //   content_category: 'Apparel & Accessories > Shoes',
  //   content_ids: ['1234'],
  //   content_type: 'product',
  //   value: 0.50,
  //   currency: 'USD'
  // }
  const fbq = (event, item={}) => {
    fbq('track', event, item);
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