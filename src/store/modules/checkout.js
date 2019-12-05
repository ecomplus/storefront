import ecomCart from '@ecomplus/shopping-cart'
import ecomClient from '@ecomplus/client'

const fetchProduct = _id => {
  return ecomClient.store({
    url: `/products/${_id}.json`,
    axiosConfig: {
      timeout: 30000
    }
  })
}

const prepareTransaction = ({ customer, transaction }) => {
  const { name } = customer
  Object.assign(transaction, {
    buyer: {
      email: customer.main_email,
      fullname: `${name.given_name}${(` ${name.middle_name} ` || ' ')}${name.family_name}`
    },
    domain: window.location.hostname
  })
  ;[
    'inscription_number',
    'inscription_type',
    'doc_number',
    'doc_country',
    'registry_type',
    'birth_date',
    'gender'
  ].forEach(prop => {
    const value = customer[prop]
    if (value) {
      transaction.buyer[prop] = value
    }
  })
  if (customer.phones.length) {
    transaction.buyer.phone = customer.phones[0]
  }
  if (!transaction.billing_address) {
    transaction.billing_address = customer.addresses.find(addr => addr.default)
  }
  return transaction
}

const state = {
  shippingService: {},
  discountCoupon: '',
  discountRule: {},
  paymentGateway: {}
}

const getters = {
  amount: ({ shippingService, discountRule, paymentGateway }) => {
    const amount = {
      subtotal: ecomCart.data.subtotal,
      freight: shippingService.shipping_line ? shippingService.shipping_line.total_price : 0,
      discount: 0
    }
    amount.total = amount.subtotal + amount.freight
    const addDiscount = discountValue => {
      amount.discount += discountValue
      amount.total -= discountValue
    }
    if (discountRule.extra_discount) {
      addDiscount(discountRule.extra_discount.value)
    }
    if (paymentGateway.discount) {
      const maxDiscount = amount[paymentGateway.discount.apply_at || 'total']
      if (maxDiscount > 0) {
        const { type, value } = paymentGateway.discount
        let discountValue
        if (type === 'percentage') {
          discountValue = maxDiscount * value / 100
        } else {
          discountValue = value <= maxDiscount ? value : maxDiscount
        }
        addDiscount(discountValue)
      }
    }
    if (amount.total < 0) {
      amount.total = 0
    }
    return amount
  },

  discountCoupon: ({ discountCoupon }) => discountCoupon,

  discountRule: ({ discountRule }) => discountRule.app_id ? discountRule : undefined,

  shippingZipCode: ({ shippingService }) => {
    if (shippingService.shipping_line) {
      return shippingService.shipping_line.to.zip
    } else {
      return ''
    }
  },

  shippingService: ({ shippingService }) => shippingService.app_id ? shippingService : undefined,

  paymentGateway: ({ paymentGateway }) => paymentGateway.app_id ? paymentGateway : undefined
}

const mutations = {
  selectShippingService (state, shippingService) {
    state.shippingService = shippingService
  },

  setDiscountCoupon (state, discountCoupon) {
    state.discountCoupon = discountCoupon
  },

  setDiscountRule (state, discountRule) {
    state.discountRule = discountRule
  },

  selectPaymentGateway (state, paymentGateway) {
    state.paymentGateway = paymentGateway
  }
}

const actions = {
  fetchCartItems ({ commit }, { removeOnError }) {
    const promises = []
    ecomCart.data.items.forEach(item => {
      const { _id, quantity } = item
      const promise = new Promise(resolve => {
        fetchProduct(item.product_id)
          .then(({ data }) => {
            Object.assign(item, data, {
              final_price: data.price,
              quantity: 0,
              body_html: '',
              body_text: ''
            })
            ecomCart.increaseItemQnt(_id, quantity, false)
          })
          .catch(err => {
            console.error(err)
            const status = err.response && err.response.status
            if (removeOnError || (status >= 400 && status < 500)) {
              ecomCart.removeItem(_id, false)
            }
          })
          .finally(resolve)
      })
      promises.push(promise)
    })
    return Promise.all(promises).then(() => {
      ecomCart.save()
    })
  },

  sendCheckout ({ getters }, payload) {
    const customer = { ...payload.customer }
    for (const prop in customer) {
      if (
        Object.prototype.hasOwnProperty.call(customer, prop) &&
        (customer[prop] === null || customer[prop] === '')
      ) {
        delete customer[prop]
      }
    }
    const checkoutBody = {
      items: ecomCart.data.items,
      shipping: {
        ...getters.shippingService,
        to: customer.addresses.find(addr => addr.default)
      },
      transaction: prepareTransaction(payload),
      customer
    }
    if (getters.discountRule) {
      checkoutBody.discount = {
        ...getters.discountRule,
        discount_coupon: getters.discountCoupon
      }
    }
    return ecomClient.modules({
      url: '/@checkout.json',
      method: 'post',
      data: checkoutBody
    }).then(({ data }) => {
      const { order, transaction } = data
      if (transaction.redirect_to_payment && transaction.payment_link) {
        window.location = transaction.payment_link
      } else {
        order.transactions = order.transactions || []
        order.transactions.push(transaction)
      }
      return {
        status: 'open',
        ...order
      }
    }).catch(err => {
      console.error(err)
      throw err
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
