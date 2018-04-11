// initial state
// https://ecomstore.docs.apiary.io/#reference/customers
const state = {
  body: {
    _id: null,
    locale: null,
    accepts_marketing: false,
    display_name: null,
    gender: null
  }
}

const getters = {
  customer: state => state.body
}

export default {
  state,
  getters
}
