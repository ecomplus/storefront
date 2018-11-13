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
  shop: state => state.body,

  // auxiliary maps
  shopName: state => state.body.name
}

export default {
  state,
  getters
}
