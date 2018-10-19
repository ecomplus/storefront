// initial state
const state = {
  freight: 0,
  discount: 0,
  total: 0,
  freight_calculed: false
}

const mutations = {
  // update checkout total value
  setCheckoutTotal (state, value) {
    state.total = value
  }
}

const getters = {
  checkout: state => state
}

const actions = {
  // recalculate checkout total value
  fixCheckoutTotal ({ commit, state, rootGetters }) {
    commit('setCheckoutTotal', rootGetters.cart.subtotal + state.freight - state.discount)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
