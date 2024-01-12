const getDefaultState = () => {
  return {
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
      loyalty_points_entries: []
    },
    orders: []
  }
}

const state = getDefaultState()

const customerFields = Object.keys(state.customer)

const getters = {
  customer: ({ customer }) => customer,

  selectedAddress: ({ customer }) => customer.addresses.find(addr => addr.default) ||
    customer.addresses[0],

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
  },

  setOrders (state, orders) {
    state.orders = orders
  },

  resetAccount (state) {
    Object.assign(state, getDefaultState())
  }
}

const actions = {
  fetchCustomer ({ commit }, { ecomPassport }) {
    return new Promise((resolve, reject) => {
      let isRetry = false
      const sendRequest = () => {
        ecomPassport.requestApi('/me.json')
          .then(({ data }) => {
            commit('setCustomer', data)
            ecomPassport.setCustomer(data)
            resolve()
          })
          .catch(err => {
            if (!isRetry && ecomPassport.checkAuthorization()) {
              isRetry = true
              return setTimeout(sendRequest, 1500)
            } else if (err.response && err.response.status === 401) {
              ecomPassport.logout()
            } else {
              console.error(err)
            }
            reject(err)
          })
      }
      sendRequest()
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
        if (
          (val || val === false) &&
          (typeof val !== 'object' || Object.keys(val).length)
        ) {
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
