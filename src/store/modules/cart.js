// initial state
// https://ecomstore.docs.apiary.io/#reference/carts
const state = {
  body: {
    _id: null,
    items: []
  }
}

const getters = {
  cart: state => state.body
}

export default {
  state,
  getters
}
