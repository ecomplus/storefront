// initial state
// https://developers.e-com.plus/docs/api/#/store/customers
const state = {
  body: {
    _id: null,
    locale: null,
    main_email: null,
    accepts_marketing: false,
    display_name: null,
    name: {},
    birth_date: {},
    gender: null,
    photos: [],
    phones: [],
    registry_type: null,
    doc_country: null,
    doc_number: null,
    inscription_type: null,
    inscription_number: null,
    corporate_name: null,
    addresses: [],
    orders: []
  }
}

const getters = {
  customer: state => state.body
}

export default {
  state,
  getters
}
