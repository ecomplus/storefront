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
      loyalty_points_entries: [],
      group: ''
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
    if (window.storefrontApp) {
      window.storefrontApp.order = order
    }
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
      if (!ecomPassport.checkAuthorization()) {
        const customer = ecomPassport.getCustomer()
        if (customer.doc_number) {
          commit('setCustomer', customer)
          resolve()
          return
        }
      }
      const getAccessToken = () => {
        const { auth } = ecomPassport.session
        return auth && auth.token && auth.token.access_token
      }
      let isRetry = false
      const sendRequest = () => {
        const accessToken = getAccessToken()
        ecomPassport.requestApi('/me.json')
          .then(({ data }) => {
            commit('setCustomer', data)
            ecomPassport.setCustomer(data)
            resolve()
          })
          .catch(err => {
            const isUnauthorized = Boolean(err.response && err.response.status === 401)
            if (!isRetry && ecomPassport.checkAuthorization()) {
              isRetry = true
              if (isUnauthorized) {
                // retry once the passport session is renewed, `login` is also
                // emitted for unauthorized sessions, so check the auth level
                // and keep waiting when it can't request the API yet
                const doRetry = isFallback => {
                  if (!isFallback && !ecomPassport.checkAuthorization()) {
                    return
                  }
                  clearTimeout(retryTimer)
                  ecomPassport.off('login', doRetry)
                  sendRequest()
                }
                const retryTimer = setTimeout(() => doRetry(true), 3000)
                if (getAccessToken() !== accessToken) {
                  // session was renewed while the request was in flight,
                  // the `login` event is already gone
                  doRetry()
                } else {
                  ecomPassport.on('login', doRetry)
                }
              } else {
                setTimeout(sendRequest, 1500)
              }
              return
            } else if (isUnauthorized) {
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
