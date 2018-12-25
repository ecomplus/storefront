const module = 'order'
// initial state
// https://developers.e-com.plus/docs/api/#/store/orders
const state = {
  body: {
    _id: null,
    number: null,
    status: null,
    fulfillment_status: {},
    financial_status: {},
    items: [],
    transactions: [],
    shipping_lines: [],
    amount: {},
    payment_method_label: null,
    shipping_method_label: null
  }
}

const mutations = {
  // setup order ID
  setOrderId (state, id) {
    state.body._id = id
  }
}

const getters = {
  order: state => state.body,

  // returns the first transaction object if any
  orderTransaction: state => state.body.transactions[0],

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
  }
}

const actions = {
  // save new order object
  saveOrder ({ dispatch, commit }, payload) {
    // call mutation to setup state
    commit('setOrderId', payload._id)
    // try to save order ID on local storage
    let db = window.localStorage
    if (db) {
      db.setItem('order', JSON.stringify(payload))
    }
    // read full order object from Store API and save
    return dispatch('init', { module }, { root: true })
  },

  // load order info when undefined
  loadOrder ({ dispatch }) {
    // try to setup order from local storage
    let db = window.localStorage
    if (db) {
      let json = db.getItem('order')
      let order
      try {
        order = JSON.parse(json)
      } catch (err) {
        // ignore
        return
      }
      return dispatch('saveOrder', order)
    }
  },

  // update order data on background
  updateOrder ({ dispatch }) {
    // read order object from Store API and save again
    let payload = {
      module,
      background: true
    }
    dispatch('init', payload, { root: true })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
