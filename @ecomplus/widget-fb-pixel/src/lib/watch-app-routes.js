import ecomCart from '@ecomplus/shopping-cart'
import ecomPassport from '@ecomplus/passport-client'
import { currency } from './common'

export default (fbq, options) => {
  const router = window.storefrontApp && window.storefrontApp.router
  if (router) {
    let isCartSent, isCheckoutSent, isPurchaseSent

    const getPurchaseData = (order) => {
      const { amount } = order || window.storefrontApp
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

    const emitPurchase = (orderId, orderJson) => {
      if (!isPurchaseSent && window.localStorage.getItem('fbq.orderIdSent') !== orderId) {
        let order
        if (orderJson) {
          try {
            order = JSON.parse(orderJson)
          } catch (e) {
            order = null
          }
        }
        let eventID
        if (order && order.number) {
          eventID = `${order.number}:r${parseInt(Math.random() * 1000, 10)}`
        } else {
          eventID = orderId
        }
        if (options.disablePurchase !== true) {
          fbq('Purchase', {
            ...getPurchaseData(order),
            order_id: orderId,
            eventID
          })
        }
        ecomPassport.requestApi(`/orders/${orderId}/metafields.json`, 'POST', {
          namespace: 'fb',
          field: 'pixel',
          value: JSON.stringify({
            eventID,
            userAgent: navigator.userAgent
          })
        })
        isPurchaseSent = true
        window.localStorage.setItem('fbq.orderIdSent', orderId)
      }
    }

    let emitPurchaseTimer
    const addRouteToData = ({ name, params }) => {
      switch (name) {
        case 'cart':
          emitCheckout(1, 'Review Cart')
          break
        case 'checkout':
          emitCheckout(2, 'Confirm Purchase')
          break
        case 'confirmation':
          clearTimeout(emitPurchaseTimer)
          if (params.json) {
            emitPurchase(params.id, decodeURIComponent(params.json))
          } else {
            emitPurchaseTimer = setTimeout(() => {
              if (params.json) {
                emitPurchase(params.id, decodeURIComponent(params.json))
              } else {
                emitPurchase(params.id)
              }
            }, params.json ? 1 : 1500)
          }
          break
      }
    }

    if (router.currentRoute) {
      addRouteToData(router.currentRoute)
    }
    router.afterEach(addRouteToData)
  }
}
