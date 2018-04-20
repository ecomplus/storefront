// initial state
const state = {
  all: []
}

const getters = {
  products: state => state.all,
  // find product by ID
  getProduct: (state) => (id) => {
    return state.all.find(product => product._id === id)
  }
}

export default {
  state,
  getters
}
