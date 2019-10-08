import EcomCart from '@ecomplus/shopping-cart'
import ecomClient from '@ecomplus/client'

const cart = new EcomCart()

const fetchProduct = _id => {
  return ecomClient.store({
    url: `/products/${_id}.json`,
    axiosConfig: {
      timeout: 30000
    }
  })
}

const state = {
  amount: {
    freight: 0,
    discount: 0,
    total: 0
  },
  discount: {
    coupon: '',
    value: 0
  },
  shipping: {},
  payment: {}
}

const getters = {
  amount: ({ amount }) => amount,

  totalValue: ({ amount }) => amount.total,

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
  updateAmount (state) {
    const { freight, discount } = state.amount
    state.amount.total = cart.data.subtotal + freight - discount
  },

  setDiscount (state, discountValue) {
    state.amount.discount = discountValue
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
    cart.data.items.forEach(item => {
      const { _id, quantity } = item
      const promise = new Promise(resolve => {
        fetchProduct(item.product_id)
          .then(({ data }) => {
            Object.assign(item, data, {
              quantity: 0,
              body_html: null,
              body_text: null
            })
            cart.increaseItemQnt(_id, quantity, false)
          })
          .catch(err => {
            console.error(err)
            const status = err.response && err.response.status
            if (removeOnError || (status >= 400 && status < 500)) {
              cart.removeItem(_id, false)
            }
            // TODO: Notify error
          })
          .finally(resolve)
      })
      promises.push(promise)
    })
    return Promise.all(promises).then(() => {
      cart.save()
      commit('updateAmount')
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
