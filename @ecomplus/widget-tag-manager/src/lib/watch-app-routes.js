import ecomCart from '@ecomplus/shopping-cart'
import { currencyCode, getProductData } from './common'

export default dataLayer => {
  const router = window.storefrontApp && window.storefrontApp.router
  if (router) {
    let isCartSent, isCheckoutSent, isPurchaseSent
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
      } else if (!isCheckoutSent) {
        dataLayer.push({
          event: 'eec.checkout_option',
          ecommerce: {
            currencyCode,
            checkout_option: { actionField }
          }
        })
        dataLayer.push({ event: 'checkoutOption' })
        isCheckoutSent = true
      }
    }

    const emitPurchase = orderId => {
      if (!isPurchaseSent) {
        const { amount } = window.storefrontApp
        const actionField = {
          id: orderId,
          revenue: (
            (amount && amount.total) ||
            (ecomCart.data && ecomCart.data.subtotal) ||
            0
          ).toFixed(2)
        }
        if (amount) {
          if (amount.freight !== undefined) {
            actionField.shipping = amount.freight.toFixed(2)
          }
          if (amount.tax !== undefined) {
            actionField.tax = amount.tax.toFixed(2)
          }
        }

        dataLayer.push({
          event: 'eec.purchase',
          ecommerce: {
            currencyCode,
            purchase: {
              actionField,
              products: getCartProductsList()
            }
          }
        })
        isPurchaseSent = true
      }
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
