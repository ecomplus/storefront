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
  amount: {
    freight: 0,
    discount: 0,
    subtotal: 0,
    total: 0
  },
  extraDiscount: {
    coupon: '',
    value: 0,
    rule: {}
  },
  shipping: {},
  payment: {}
}

const getters = {
  amount: ({ amount }) => amount,

  totalValue: ({ amount }) => amount.total,

  discountCoupon: ({ extraDiscount }) => extraDiscount.coupon,

  discountRule: ({ extraDiscount }) => extraDiscount.rule,

  shippingZipCode: ({ shipping }) => {
    if (shipping.shipping_line) {
      return shipping.shipping_line.to.zip
    } else {
      return ''
    }
  },

  shippingService: ({ shipping }) => shipping.app_id ? shipping : undefined,

  paymentGateway: ({ payment }) => payment.app_id ? payment : undefined
}

const mutations = {
  updateAmount (state, subtotalValue) {
    const { amount } = state
    const { freight, discount } = amount
    const subtotal = typeof subtotalValue === 'number' && !isNaN(subtotalValue)
      ? subtotalValue
      : ecomCart.data.subtotal
    amount.subtotal = subtotal
    amount.total = subtotal + freight - discount
  },

  setDiscountCoupon (state, couponCode) {
    state.extraDiscount.coupon = couponCode
  },

  setDiscountRule (state, discountRule) {
    state.extraDiscount.rule = discountRule
    const extraDiscountValue = discountRule.extra_discount.value
    const { amount, extraDiscount } = state
    const { discount } = amount
    amount.discount += (extraDiscountValue - extraDiscount.value)
    amount.total -= (amount.discount - discount)
    if (amount.total > 0) {
      amount.total = 0
    }
    extraDiscount.value = extraDiscountValue
  },

  selectShippingService (state, shippingService) {
    state.shipping = shippingService
    const { amount } = state
    amount.total -= amount.freight
    amount.freight = shippingService.shipping_line.total_price
    amount.total += amount.freight
  },

  selectPaymentGateway (state, paymentGateway) {
    state.payment = paymentGateway
    const { amount, discount } = state
    amount.subtotal = amount.total + amount.discount - amount.freight
    amount.total += amount.discount
    amount.discount = discount.value
    if (paymentGateway.discount) {
      const maxDiscount = amount[paymentGateway.discount.apply_at || 'total']
      if (maxDiscount) {
        const { type, value } = paymentGateway.discount
        if (type === 'percentage') {
          amount.discount += maxDiscount * value / 100
        } else {
          amount.discount += value <= maxDiscount ? value : maxDiscount
        }
      }
    }
    amount.total -= amount.discount
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
      commit('updateAmount')
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
      discount: {
        ...getters.discountRule,
        discount_coupon: getters.discountCoupon
      },
      transaction: prepareTransaction(payload),
      customer
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
