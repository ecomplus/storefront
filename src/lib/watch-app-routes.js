import ecomCart from '@ecomplus/shopping-cart'
import { currencyCode, getProductData } from './common'

export default fbq => {
  const router = window.storefrontApp && window.storefrontApp.router
  if (router) {
    let isCartSent = false
    const getCartProductsList = () => {
      const products = []
      if (ecomCart.data && Array.isArray(ecomCart.data.items)) {
        ecomCart.data.items.forEach(item => {
          products.push(getProductData(item))
        })
      }
      return products
    }

    const emitCheckout = (step, option) => {
      const actionField = { step, option }
      if (step <= 1 || !isCartSent) {
        fbq('track', 'Purchase', {
          ecommerce: {
            currencyCode,
            checkout: {
              actionField,
              products: getCartProductsList()
            }
          }
        })
        fbq('checkout')
        isCartSent = true
      } else {
        fbq('track', 'Purchase', {
          ecommerce: {
            currencyCode,
            checkout_option: { actionField }
          }
        })
        fbq('checkoutOption')
      }
    }

    const emitPurchase = orderId => {
      const { amount } = window.storefrontApp
      const revenue = (
        (amount && amount.total) ||
        (ecomCart.data && ecomCart.data.subtotal) ||
        0
      ).toFixed(2)

      fbq('track', 'Purchase', {
        currency: currencyCode,
        value: getCartProductsList().reduce((total, current)=> total.price + current.price),
        contents: getCartProductsList(),
        content_ids: getCartProductsList().map(item=>item.id)
      })
    }

    const addRouteToData = ({ name, params }) => {
      switch (name) {
        case 'cart':
          emitCheckout(1, 'Review Cart')
          break
        case 'checkout':
          emitCheckout(2, 'Confirm Purchase')
          break
        case 'confirmation':
          emitPurchase(params.id)
          break
      }
    }

    if (router.currentRoute) {
      addRouteToData(router.currentRoute)
    }
    router.afterEach(addRouteToData)
  }
}
