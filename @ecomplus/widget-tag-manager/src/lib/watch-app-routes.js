import {
  nickname as getNickname,
  phone as getPhone
} from '@ecomplus/utils'
import ecomCart from '@ecomplus/shopping-cart'
import ecomPassport from '@ecomplus/passport-client'
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

    const emitCheckoutOption = actionField => {
      dataLayer.push({ ecommerce: null })
      dataLayer.push({
        event: 'eec.checkout_option',
        ecommerce: {
          currencyCode,
          checkout_option: { actionField }
        }
      })
    }

    const emitCheckout = (step, option) => {
      const actionField = { step, option }
      if (step === 1 && isCartSent) {
        return
      }
      if (step === 2 && isCheckoutSent) {
        return
      }
      dataLayer.push({ ecommerce: null })
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
      if (step === 1) {
        isCartSent = true
      } else {
        isCheckoutSent = true
      }
    }

    const emitPurchase = (orderId, orderJson) => {
      if (!isPurchaseSent) {
        if (window.localStorage.getItem('gtm.orderIdSent') !== orderId) {
          let order
          if (orderJson) {
            try {
              order = JSON.parse(orderJson)
            } catch (e) {
            }
          }
          const { amount } = order || window.storefrontApp
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

          if (order) {
            ;['shipping_method_label', 'payment_method_label'].forEach((field, i) => {
              if (order[field]) {
                emitCheckoutOption({
                  step: 3 + i,
                  option: order[field]
                })
              }
            })
            if (order.extra_discount && order.extra_discount.discount_coupon) {
              actionField.coupon = order.extra_discount.discount_coupon
            }
          }

          let purchaseTimeout = 1
          if (window.__sendGTMExtraPurchaseData) {
            const customer = ecomPassport.getCustomer()
            const extraPurchaseData = {}
            let shippingAddr
            if (customer) {
              extraPurchaseData.customerDisplayName = getNickname(customer)
              if (customer.name) {
                extraPurchaseData.customerGivenName = customer.name.given_name
                extraPurchaseData.customerFamilyName = customer.name.family_name
              }
              extraPurchaseData.customerEmail = customer.main_email
              extraPurchaseData.customerPhone = getPhone(customer)
              shippingAddr = customer.addresses && customer.addresses[0]
            }
            try {
              const sessionShippingAddr = JSON.parse(window.sessionStorage
                .getItem('ecomCustomerAddress'))
              if (typeof shippingAddr === 'object' && shippingAddr) {
                Object.assign(shippingAddr, sessionShippingAddr)
              } else {
                shippingAddr = sessionShippingAddr
              }
            } catch {
            }
            if (shippingAddr && shippingAddr.zip) {
              extraPurchaseData.shippingAddrZip = shippingAddr.zip
              extraPurchaseData.shippingAddrStreet = shippingAddr.street
              extraPurchaseData.shippingAddrNumber = shippingAddr.number
              if (shippingAddr.street && shippingAddr.number) {
                extraPurchaseData.shippingAddrStreet += `, ${shippingAddr.number}`
              }
              extraPurchaseData.shippingAddrCity = shippingAddr.city
              extraPurchaseData.shippingAddrProvinceCode = shippingAddr.province_code
            }
            dataLayer.push({
              event: 'purchaseExtraData',
              ...extraPurchaseData
            })
            purchaseTimeout = 100
          }
          setTimeout(() => {
            dataLayer.push({ ecommerce: null })
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
          }, purchaseTimeout)
          window.localStorage.setItem('gtm.orderIdSent', orderId)
        }
        isPurchaseSent = true
      }
    }

    let emitPurchaseTimer
    const addRouteToData = ({ name, params }) => {
      switch (name) {
        case 'cart':
          emitCheckout(1, 'Review Cart')
          break
        case 'checkout':
          if (!params.step || !isCheckoutSent) {
            emitCheckout(2, 'Login / Signup')
          }
          if (Number(params.step) === 1) {
            emitCheckout(3, 'Shipping Method')
          } else if (Number(params.step) === 2) {
            emitCheckout(4, 'Payment Method')
          }
          break
        case 'confirmation':
          clearTimeout(emitPurchaseTimer)
          if (params.json) {
            emitPurchase(params.id, decodeURIComponent(params.json))
          } else {
            emitPurchaseTimer = setTimeout(() => {
              emitPurchase(params.id)
            }, 1500)
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
