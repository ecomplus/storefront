// initial state
// https://ecomstore.docs.apiary.io/#reference/stores
const state = {
  body: {
    name: null,
    contact_email: null,
    logo: {},
    languages: []
  }
}

const getters = {
  shop: state => state.body
}

export default {
  state,
  getters
}
