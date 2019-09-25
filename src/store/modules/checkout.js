import EcomCart from '@ecomplus/shopping-cart'

const cart = new EcomCart()

const state = {
  amount: {
    freight: 0,
    discount: 0,
    total: 0
  },
  discount: {
    coupon: {
      name: '',
      value: 0
    }
  },
  shipping: {},
  payment: {}
}

const getters = {
  totalValue: ({ amount }) => amount.total
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
  }
}

export default {
  state,
  getters,
  mutations
}
