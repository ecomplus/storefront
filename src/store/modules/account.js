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
    addresses: []
  },
  orders: []
}

const customerFields = Object.keys(state.customer)

const getters = {
  customer: ({ customer }) => customer,

  selectedAddress: ({ customer }) => customer.addresses.find(addr => addr.default),

  orders: ({ orders }) => orders
}

const mutations = {
  setCustomer (state, customer) {
    customerFields.forEach(field => {
      const val = customer[field]
      if (val !== undefined) {
        state.customer[field] = val
      }
    })
  },

  setCustomerEmail (state, email) {
    state.customer.main_email = email
  },

  selectAddress (state, addressId) {
    state.customer.addresses.forEach(address => {
      address.default = address._id === addressId
    })
  },

  addOrder (state, order) {
    state.orders.push(order)
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
  },

  saveCustomer ({ getters, commit }, { ecomPassport, customer }) {
    if (customer) {
      commit('setCustomer', customer)
    } else {
      customer = getters.customer
    }
    const data = {}
    customerFields.forEach(field => {
      if (field !== '_id') {
        const val = customer[field]
        if (val && (typeof val !== 'object' || Object.keys(val).length)) {
          data[field] = val
        }
      }
    })
    return ecomPassport.requestApi('/me.json', 'patch', data)
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
