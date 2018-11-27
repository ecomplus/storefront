const module = 'order'
// initial state
// https://developers.e-com.plus/docs/api/#/store/orders
const state = {
  body: {
    _id: null,
    items: [],
    amount: {}
  }
}

const getters = {
  order: state => state.body
}

const actions = {
  // save new order object
  saveOrder ({ dispatch, commit }, body) {
    // call mutation to setup state
    commit('init', { module, body }, { root: true })
    dispatch('storeOrder')
  },

  // save order object on local storage for further load
  storeOrder ({ getters }) {
    // try to save order on local storage
    let db = window.localStorage
    if (db) {
      db.setItem('order', JSON.stringify(getters.order))
    }
  },

  // load order object when undefined
  loadOrder ({ dispatch }) {
    // try to save order body from local storage
    let db = window.localStorage
    if (db) {
      let json = db.getItem('cart')
      try {
        let body = JSON.parse(json)
        dispatch('saveOrder', body)
      } catch (err) {
        // ignore
      }
    }
  }
}

export default {
  state,
  getters,
  actions
}
