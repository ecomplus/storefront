const module = 'order'
// initial state
// https://developers.e-com.plus/docs/api/#/store/orders
const emptyOrder = {
  created_at: null,
  number: null,
  status: null,
  fulfillment_status: {},
  financial_status: {},
  items: [],
  transactions: [],
  shipping_lines: [],
  amount: {},
  payment_method_label: null,
  shipping_method_label: null,
  payments_history: [],
  fulfillments: []
}
const state = {
  body: {
    _id: null,
    ...emptyOrder
  }
}

const mutations = {
  // reset order body object
  editOrder (state, { body }) {
    state.body = {
      ...state.body,
      ...body
    }
  },

  // setup order ID
  setOrderId (state, id) {
    state.body._id = id
  }
}

const getters = {
  order: state => state.body,

  // returns the first transaction object if any
  orderTransaction: state => state.body.transactions[0] || {},

  // map current order financial status
  orderFinancialStatus ({ body }) {
    let status = body.financial_status.current
    if (status) {
      return status
    } else {
      // check on transaction object
      let transaction = body.transactions[0]
      if (transaction && transaction.status) {
        return transaction.status.current
      }
    }
    // default status: pending payment
    return 'pending'
  },

  // map current order fulfillment status
  orderFulfillmentStatus ({ body }) {
    let status = body.fulfillment_status.current
    if (status) {
      return status
    } else {
      // check on shipping line object
      let shippingLine = body.shipping_lines[0]
      if (shippingLine && shippingLine.status) {
        return shippingLine.status.current
      }
    }
    return null
  },

  // check if order shipping line still with pending delivery
  shippingDeliveryPending: state => shipping => {
    if (shipping.status) {
      switch (shipping.status.current) {
        case 'delivered':
        case 'returned_for_exchange':
        case 'received_for_exchange':
        case 'returned':
          return false
      }
    }
    return true
  },

  // returns delivery estimate date with order shipping line deadlines
  shippingDeliveryDate: state => shipping => {
    // base date is when order was paid
    let paymentsHistory = state.body.payments_history
    if (paymentsHistory) {
      let records = paymentsHistory.find(({ status }) => status === 'paid')
      if (records.length) {
        let dateString
        // get the last status update timestamp
        records.forEach(record => {
          if (!dateString || dateString < record.date_time) {
            dateString = record.date_time
          }
        })

        // mount date object to return
        let date = new Date(dateString)
        let addDays = deadline => {
          let days = deadline.days
          if (deadline.working_days) {
            // get day of week as a number
            let dow = date.getDay()
            // also count weekend days
            // https://gist.github.com/psdtohtml5/7000529
            days += ((dow === 6 ? 2 : +!dow) + (Math.floor((days - 1 + (dow % 6 || 1)) / 5) * 2))
          }
          date.setDate(date.getDate() + days)
        }

        if (!shipping.status || shipping.status.current !== 'shipped') {
          // add posting deadline
          if (shipping.posting_deadline) {
            addDays(shipping.posting_deadline)
          }
        }
        if (shipping.delivery_time) {
          // add delivery time
          addDays(shipping.delivery_time)
        }
        return date
      }
    }
    // unexpedted current payment status or shipping status
    return new Date()
  },

  // return date string of first positive payment entry
  orderPaymentDate ({ body }) {
    let date
    body.payments_history.forEach(entry => {
      switch (entry.status) {
        case 'under_analysis':
        case 'authorized':
        case 'paid':
          if (entry.date_time && (typeof date !== 'string' || date > entry.date_time)) {
            date = entry.date_time
          }
          break
      }
    })
    return date
  },

  // return date string of last payment confirmation entry
  orderConfirmationDate ({ body }) {
    let date
    body.payments_history.forEach(entry => {
      if (entry.status === 'paid') {
        if (entry.date_time && (!date || date < entry.date_time)) {
          date = entry.date_time
        }
      }
    })
    return date
  },

  // return date string of last fulfillment entry with some status
  orderFulfillmentDate: state => status => {
    let date = null
    state.body.fulfillments.forEach(entry => {
      if (entry.status === status) {
        if (entry.date_time && (!date || date < entry.date_time)) {
          date = entry.date_time
        }
      }
    })
    return date
  }
}

const actions = {
  // get and save order body
  loadOrder ({ state, commit, dispatch, rootGetters }, payload) {
    let background = !!(payload && payload.background)
    if (rootGetters.isCustomerLogged) {
      // authenticated request with customer logged
      return dispatch('init', { module, background }, { root: true })
    } else {
      // get only the public order data
      let apiArgs = [ 'get', 'orderInfo', state.body._id, background ]
      return dispatch('api', apiArgs, { root: true }).then(body => {
        // update state of order object
        commit('editOrder', { body })
      })
    }
  },

  // save new order object
  saveOrder ({ commit, dispatch }, payload) {
    // preset current order body first
    commit('editOrder', { body: { ...emptyOrder, ...payload } })
    // call mutation to setup state
    commit('setOrderId', payload._id)
    return dispatch('loadOrder')
  },

  // update order data on background
  updateOrder ({ state, commit, dispatch, rootGetters }) {
    // read order object from Store API and save again
    return dispatch('loadOrder', { background: true })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
