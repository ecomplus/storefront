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
        total_price: 7,
        posting_deadline: {
          days: 3,
          working_days: true
        },
        delivery_time: {
          days: 10,
          working_days: true
        }
      },
      selected: false
    }, {
      // sample only
      label: 'SEDEX',
      carrier: 'Correios',
      service_name: 'SEDEX',
      shipping_line: {
        total_price: 10,
        posting_deadline: {
          days: 3,
          working_days: true
        },
        delivery_time: {
          days: 5,
          working_days: true
        }
      },
      selected: false
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
  },

  // update shipping zip code
  setCheckoutZip (state, value) {
    state.shipping.zip = value
  },

  // mark selected shipping service from list
  selectShippingService (state, value) {
    state.shipping.services.forEach((service, index) => {
      if (index === value) {
        service.selected = true
        // update checkout freight and total value
        let { amount } = state
        amount.total -= amount.freight
        amount.freight = service.shipping_line.total_price
        amount.total += amount.freight
      } else {
        service.selected = false
      }
    })
  }
}

const getters = {
  checkout: state => state,

  // auxiliary maps
  checkoutZip: state => state.shipping.zip,
  shippingServices: state => state.shipping.services,

  // map selected shipping service and payment method objects
  checkoutShipping: state => state.shipping.services.find(option => option.selected === true),
  checkoutPayment: state => state.payment.gateways.find(option => option.selected === true),

  // calculate total time with delivery and posting deadline
  shippingServiceTime: state => service => {
    let shipping = service.shipping_line
    let days
    if (shipping.posting_deadline) {
      // start days with deadline for posting
      days = shipping.posting_deadline.days
    } else {
      days = 0
    }
    if (shipping.delivery_time) {
      // sum delivery time
      days += shipping.delivery_time.days
    }
    return days
  },

  // whether shipping time is calculated with working days
  shippingServiceWorkingDays: state => service => {
    let shipping = service.shipping_line
    // returns true if any deadline uses working days
    if (shipping.posting_deadline && shipping.posting_deadline.working_days) {
      return true
    }
    if (shipping.delivery_time && shipping.delivery_time.working_days) {
      return true
    }
    // default not working days
    return false
  }
}

const actions = {
  // recalculate checkout total value
  fixCheckoutTotal ({ commit, state, rootGetters }) {
    let { freight, discount } = state.amount
    commit('setCheckoutTotal', rootGetters.cart.subtotal + freight - discount)
  },

  // update shipping services list
  initShippingServices ({ commit }) {
    return new Promise(resolve => {
      // select the first shipping option
      commit('selectShippingService', 0)
      setTimeout(() => {
        resolve()
      }, 400)
    })
  },

  // update payment gateway options list
  initPaymentGateways ({ commit }) {
    return Promise.resolve()
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
