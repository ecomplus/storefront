import ecomCart from '@ecomplus/shopping-cart'
import { currency } from './common'

export default fbq => {
  const router = window.storefrontApp && window.storefrontApp.router
  if (router) {
    let isCartSent, isCheckoutSent, isPurchaseSent

    const getPurchaseData = () => {
      const { amount } = window.storefrontApp
      const data = {
        value: (
          (amount && amount.total) ||
          (ecomCart.data && ecomCart.data.subtotal) ||
          0
        ),
        currency,
        contents: [],
        content_type: 'product'
      }
      if (ecomCart.data && Array.isArray(ecomCart.data.items)) {
        ecomCart.data.items.forEach(({ sku, quantity }) => {
          data.contents.push({ id: sku, quantity })
        })
      }
      return data
    }

    const emitCheckout = (step, option) => {
      const purchaseData = getPurchaseData()
      const customData = {
        ...purchaseData,
        checkout_step: step,
        checkout_option: option
      }
      if (step <= 1 || !isCartSent) {
        fbq('InitiateCheckout', purchaseData)
        fbq('Checkout', customData, true)
        isCartSent = true
      } else if (!isCheckoutSent) {
        fbq('CheckoutOption', customData, true)
        isCheckoutSent = true
      }
    }

    const emitPurchase = orderId => {
      if (!isPurchaseSent) {
        fbq('Purchase', {
          ...getPurchaseData(),
          order_id: orderId
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
