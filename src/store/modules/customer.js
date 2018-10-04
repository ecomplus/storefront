// abstractions for making API requests
import { set } from '@/api'

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

const mutations = {
  // reset customer body object
  editCustomer (state, payload) {
    state.body = {
      ...state.body,
      ...payload.body
    }
  }
}

const getters = {
  customer: state => state.body,

  // get customer full name
  customerName (state) {
    let nameObj = state.body.name
    let name = ''
    if (nameObj && nameObj.given_name) {
      // first name is the only required
      name += nameObj.given_name
      if (nameObj.hasOwnProperty('middle_name')) {
        name += ' ' + nameObj.middle_name
      }
      if (nameObj.hasOwnProperty('family_name')) {
        // last name
        name += ' ' + nameObj.family_name
      }
    }
    // return concatenated string
    return name
  },

  // parse full name string to name object
  parseCustomerName: () => (nameString) => {
    let names = nameString.split(/\s+/)
    let nameObj = {}
    if (names.length) {
      // first name
      nameObj.given_name = names.shift()
      if (names.length) {
        // last name from last array element
        nameObj.family_name = names.pop()
        if (names.length) {
          // rest of names on middle
          nameObj.middle_name = ''
          for (let i = 0; i < names.length; i++) {
            nameObj.middle_name += ' ' + names[i]
          }
        }
      }
    }
    return { name: nameObj }
  }
}

const actions = {
  // update customer object
  editCustomer ({ commit }, payload) {
    commit('editCustomer', { body: payload })
    // API request
    // send customer body object
    set.customer(payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
