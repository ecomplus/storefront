const state = {
  customer: {
    _id: '',
    locale: '',
    main_email: '',
    accepts_marketing: false,
    display_name: '',
    name: {},
    birth_date: {},
    gender: '',
    photos: [],
    phones: [],
    registry_type: 'p',
    doc_country: '',
    doc_number: '',
    inscription_type: '',
    inscription_number: '',
    corporate_name: '',
    addresses: [],
    orders: []
  }
}

const getters = {
  customer: ({ customer }) => customer,

  selectedAddress: ({ customer }) => customer.addresses.find(addr => addr.default)
}

const mutations = {
  setCustomer (state, customer) {
    state.customer = customer
  },

  setCustomerEmail (state, email) {
    state.customer.main_email = email
  },

  selectAddress (state, addressId) {
    state.customer.addresses.forEach(address => {
      address.default = address._id === addressId
    })
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
