import ecomCart from '@ecomplus/shopping-cart'
import ecomPassport from '@ecomplus/passport-client'
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
            price: parseFloat(price),
            content_type: 'product',
            quantity
          })
        })
      }
      return data
    }

    const emitCheckout = (step, option) => {
      if (window.localStorage.getItem('ttq.orderIdSent')) {
        window.localStorage.removeItem('ttq.orderIdSent')
      }
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
          let eventID
          if (order && order.number) {
            eventID = `${order.number}:r${parseInt(Math.random() * 1000, 10)}`
          } else {
            eventID = orderId
          }
          ttq.track('CompletePayment', {
            ...getPurchaseData(order)
          })
          ecomPassport.requestApi(`/orders/${orderId}/metafields.json`, 'POST', {
            namespace: 'tiktok',
            field: 'pixel',
            value: JSON.stringify({
              eventID,
              userAgent: navigator.userAgent
            })
          })
          window.localStorage.setItem('ttq.orderIdSent', orderId)
        }
        isPurchaseSent = true
      }
    }

    let emitPurchaseTimer
    const addRouteToData = ({ name, params }) => {
      console.log(params)
      switch (name) {
        case 'cart':
          emitCheckout(1, 'Review Cart')
          break
        case 'checkout':
          if (!params.id) {
            emitCheckout(2, 'Register')
          }
          emitCheckout(3, 'Confirm Purchase')
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
