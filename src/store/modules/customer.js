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
  customer: state => state.body,

  // get customer full name string
  customerName: (state) => {
    let nameObj = state.body.name
    let name = ''
    if (nameObj && nameObj.given_name) {
      // first name is the only required
      name += nameObj.given_name
      if (nameObj.hasOwnProperty('middle_name')) {
        name += ' ' + nameObj.middle_name
      }
      if (nameObj.hasOwnProperty('family_name')) {
        name += ' ' + nameObj.family_name
      }
    }
    return name
  }
}

export default {
  state,
  getters
}
