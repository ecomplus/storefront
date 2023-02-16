import ecomCart from '@ecomplus/shopping-cart'
import { currency } from './common'

export default (ttq, options) => {
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
        contents: []
      }
      if (ecomCart.data && Array.isArray(ecomCart.data.items)) {
        ecomCart.data.items.forEach(({ sku, quantity, name, price }) => {
          data.contents.push({
            content_id: sku,
            content_name: name,
            price,
            content_type: 'product',
            quantity
          })
        })
      }
      return data
    }

    const emitCheckout = (step) => {
      const purchaseData = getPurchaseData()
      if (!isCartSent || step <= 1) {
        ttq.track('InitiateCheckout', purchaseData)
        isCartSent = true
      } else if (step <= 2) {
        ttq.track('CompleteRegistration')
      } else if (!isCheckoutSent) {
        ttq.track('AddPaymentInfo')
        isCheckoutSent = true
      }
    }

    const emitPurchase = (orderId, orderJson) => {
      if (!isPurchaseSent) {
        if (window.localStorage.getItem('ttq.orderIdSent') !== orderId) {
          let order
          if (orderJson) {
            try {
              order = JSON.parse(orderJson)
            } catch (e) {
              order = null
            }
          }
          ttq.track('CompletePayment', {
            ...getPurchaseData(order)
          })
          window.localStorage.setItem('ttq.orderIdSent', orderId)
        }
        isPurchaseSent = true
      }
    }

    let emitPurchaseTimer
    const addRouteToData = ({ name, params }) => {
      switch (name) {
        case 'cart':
          emitCheckout(1)
          break
        case 'checkout':
          if (!params.id) {
            emitCheckout(2)
          }
          emitCheckout(3)
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
