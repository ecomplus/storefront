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
    amount: {}
  }
}

const getters = {
  order: state => state.body,

  // returns the first transaction object if any
  orderTransaction: state => state.body.transactions[0]
}

const mutations = {
  // setup order ID
  setOrderId (state, id) {
    state.body._id = id
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
