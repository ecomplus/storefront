const state = {
  customer: {
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
    registry_type: 'p',
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
  customer: ({ customer }) => customer,

  customerEmail: ({ customer }) => customer.main_email
}

const mutations = {
  setCustomer (state, customer) {
    state.customer = customer
  },

  setCustomerEmail (state, email) {
    state.customer.main_email = email
  }
}

const actions = {
  fetchCustomer ({ commit }, { ecomPassport }) {
    return ecomPassport.requestApi('/me.json')
      .then(({ data }) => {
        commit('setCustomer', data)
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
