// initial state
// https://ecomstore.docs.apiary.io/#reference/carts
const state = {
  body: {
    _id: null,
    items: []
  }
}

const mutations = {
  // reset cart body object
  editCart (state, payload) {
    state.body = {
      ...state.body,
      ...payload.body
    }
  },

  // load cart from client storage
  loadCart (state) {
  }
}

const getters = {
  cart: state => state.body
}

export default {
  state,
  getters,
  mutations
}
