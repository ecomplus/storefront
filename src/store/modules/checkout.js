// initial state
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
  shipping: {
    zip: '',
    services: [{
      // sample only
      label: 'PAC',
      carrier: 'Correios',
      service_name: 'PAC',
      shipping_line: {
        total_price: 10,
        posting_deadline: 3,
        delivery_time: 5
      }
    }]
  },
  payment: {
    gateways: []
  }
}

const mutations = {
  // reset checkout object
  editCheckout (state, payload) {
    Object.assign(state, payload)
  },

  // update checkout total value
  setCheckoutTotal (state, value) {
    state.amount.total = value
  }
}

const getters = {
  checkout: state => state,

  // auxiliary maps
  checkoutShippingZip: state => state.shipping.zip,

  // map selected shipping service and payment method objects
  checkoutShippingService: state => state.shipping.services.find(option => option.selected === true),
  checkoutPaymentMethod: state => state.payment.gateways.find(option => option.selected === true)
}

const actions = {
  // recalculate checkout total value
  fixCheckoutTotal ({ commit, state, rootGetters }) {
    let { freight, discount } = state.amount
    commit('setCheckoutTotal', rootGetters.cart.subtotal + freight - discount)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
