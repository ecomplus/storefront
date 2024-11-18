import watchShoppingCart from '@ecomplus/widget-tag-manager/src/lib/watch-shopping-cart'
import { parseUaProduct } from './common'

export default gtag => {
  watchShoppingCart({
    push: ({ event, ecommerce }) => {
      if (ecommerce && (event === 'eec.add' || event === 'eec.remove')) {
        const isAdd = event === 'eec.add'
        const data = ecommerce[isAdd ? 'add' : 'remove']
        if (data && data.products) {
          gtag('event', isAdd ? 'add_to_cart' : 'remove_from_cart', {
            items: data.products.map(parseUaProduct)
          })
        }
      }
    }
  })
}
