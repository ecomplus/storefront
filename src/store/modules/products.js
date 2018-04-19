// initial state
const state = {
  list: []
}

const getters = {
  products: state => state.list
}

export default {
  state,
  getters
}
