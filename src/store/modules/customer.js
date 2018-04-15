// initial state
// https://ecomstore.docs.apiary.io/#reference/customers
const state = {
  body: {
    _id: null,
    locale: null,
    main_email: null,
    accepts_marketing: false,
    display_name: null,
    birth_date: {},
    gender: null,
    photos: []
  }
}

const getters = {
  customer: state => state.body
}

export default {
  state,
  getters
}
