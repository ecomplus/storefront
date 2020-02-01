import ecomCart from '@ecomplus/shopping-cart'
import { currencyCode, getProductData } from './common'

export default dataLayer => {
  const productsBySku = {}

  const emitAddToCart = item => {
    const productData = getProductData(item)
    dataLayer.push({
      event: 'eec.add',
      ecommerce: {
        currencyCode,
        add: {
          products: [productData]
        }
      }
    })
    dataLayer.push({ event: 'addToCart' })
    productsBySku[item.sku] = productData
  }

  const emitRemoveFromCart = item => {
    const productData = productsBySku[item.sku]
    dataLayer.push({
      event: 'eec.remove',
      ecommerce: {
        currencyCode,
        remove: {
          products: [
            (productData ? Object.assign({}, productData) : getProductData(item))
          ]
        }
      }
    })
    dataLayer.push({ event: 'removeFromCart' })
    delete productsBySku[item.sku]
  }

  ecomCart.on('addItem', ({ item }) => emitAddToCart(item))

  ecomCart.on('increaseItemQnt', ({ item }) => {
    const productData = productsBySku[item.sku]
    if (!productData) {
      emitAddToCart(item)
    } else {
      const quantity = item.quantity - productData.quantity
      if (quantity > 0) {
        emitAddToCart({ ...item, quantity })
      } else {
        emitRemoveFromCart({
          ...item,
          quantity: -quantity
        })
      }
    }
  })

  ecomCart.on('removeItem', ({ item }) => emitRemoveFromCart(item))

  ecomCart.on('clear', () => {
    for (const sku in productsBySku) {
      if (productsBySku[sku]) {
        emitRemoveFromCart(productsBySku[sku])
      }
    }
  })
}
