import ecomCart from '@ecomplus/shopping-cart'
import { getProductData } from './common'

export default ttq => {
  ecomCart.on('addItem', ({ item }) => {
    ttq.track('AddToCart', getProductData(item))
  })
}
