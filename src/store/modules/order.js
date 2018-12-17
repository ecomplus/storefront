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
  orderFinancialStatus: ({ body }) => {
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
  orderFulfillmentStatus: ({ body }) => {
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
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
