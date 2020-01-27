import ecomCart from '@ecomplus/shopping-cart'
import { currencyCode, getProductData } from './common'

export default fbq => {
  const productsBySku = {}

  const emitAddToCart = item => {
    const productData = getProductData(item)
    fbq('track', 'AddToCart', {
      ecommerce: {
        currencyCode,
        add: {
          products: [productData]
        }
      }
    })
    fbq('addToCart')
    productsBySku[item.sku] = productData
  }

  const emitRemoveFromCart = item => {
    const productData = productsBySku[item.sku]
    fbq('track', 'CustomEvent', {
      ecommerce: {
        currencyCode,
        remove: {
          products: [
            (productData ? Object.assign({}, productData) : getProductData(item))
          ]
        }
      }
    })
    fbq('removeFromCart')
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
