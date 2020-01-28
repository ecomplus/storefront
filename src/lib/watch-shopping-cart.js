import ecomCart from '@ecomplus/shopping-cart'
import { getProductData } from './common'

export default fbq => {
  ecomCart.on('addItem', ({ item }) => {
    fbq('AddToCart', getProductData(item))
  })
}
