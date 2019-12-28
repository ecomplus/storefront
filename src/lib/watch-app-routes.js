import ecomCart from '@ecomplus/shopping-cart'
import { currencyCode, getProductData } from './common'

export default dataLayer => {
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
        dataLayer.push({
          event: 'eec.checkout',
          ecommerce: {
            currencyCode,
            checkout: {
              actionField,
              products: getCartProductsList()
            }
          }
        })
        dataLayer.push({ event: 'checkout' })
        isCartSent = true
      } else {
        dataLayer.push({
          event: 'eec.checkout_option',
          ecommerce: {
            currencyCode,
            checkout_option: { actionField }
          }
        })
        dataLayer.push({ event: 'checkoutOption' })
      }
    }

    const emitPurchase = orderId => {
      const { amount } = window.storefrontApp
      const revenue = (
        (amount && amount.total) ||
        (ecomCart.data && ecomCart.data.subtotal) ||
        0
      ).toFixed(2)

      dataLayer.push({
        event: 'eec.purchase',
        ecommerce: {
          currencyCode,
          purchase: {
            actionField: {
              id: orderId,
              revenue
            },
            products: getCartProductsList()
          }
        }
      })
    }

    const addRouteToData = ({ name, params }) => {
      if (name) {
        const data = {
          name,
          event: `goto.${name}`
        }
        if (params) {
          for (const field in params) {
            if (params[field]) {
              data[`params.${field}`] = params[field]
            }
          }
        }
        dataLayer.push(data)

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
    }

    if (router.currentRoute) {
      addRouteToData(router.currentRoute)
    }
    router.afterEach(addRouteToData)
  }
}
