import { $ecomConfig, name, price } from '@ecomplus/utils'
import ecomCart from '@ecomplus/shopping-cart'

export default dataLayer => {
  const currencyCode = $ecomConfig.get('currency') || 'BRL'
  const productsBySku = {}

  const getProductData = item => ({
    name: name(item),
    id: item.sku,
    price: price(item),
    quantity: item.quantity
  })

  const emitAddToCart = item => {
    const productData = getProductData(item)
    dataLayer.push({
      event: 'addToCart',
      ecommerce: {
        currencyCode,
        add: {
          products: [productData]
        }
      }
    })
    productsBySku[item.sku] = productData
  }

  const emitRemoveFromCart = item => {
    const productData = productsBySku[item.sku]
    dataLayer.push({
      event: 'removeFromCart',
      ecommerce: {
        remove: {
          products: [
            (productData ? Object.assign({}, productData) : getProductData(item))
          ]
        }
      }
    })
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
