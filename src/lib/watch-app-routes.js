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
          event: 'checkout',
          ecommerce: {
            currencyCode,
            checkout: {
              actionField,
              products: getCartProductsList()
            }
          }
        })
        isCartSent = true
      } else {
        dataLayer.push({
          event: 'checkoutOption',
          ecommerce: {
            currencyCode,
            checkout_option: { actionField }
          }
        })
      }
    }

    const emitPurchase = orderId => {
      if (ecomCart.data) {
        const { amount } = window.storefrontApp
        const revenue = ((amount && amount.total) || ecomCart.data.subtotal || 0).toFixed(2)
        dataLayer.push({
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
    }

    const addRouteToData = ({ name, params }) => {
      if (name) {
        const data = {
          name,
          event: `goto:${name}`
        }
        if (params) {
          for (const field in params) {
            if (params[field]) {
              data[field] = params[field]
            }
          }
        }
        dataLayer.push(data)

        switch (name) {
          case 'cart':
          case 'checkout':
            emitCheckout(2, name)
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
