// initial state
const state = {
  amount: {
    freight: 0,
    discount: 0,
    total: 0
  },
  discount: {
    coupon: {
      name: '',
      value: 0
    }
  },
  shipping: {
    loading: false,
    timer: null,
    error: {},
    zip: '',
    services: []
  },
  payment: {
    gateways: []
  }
}

const mutations = {
  // reset checkout object
  editCheckout (state, payload) {
    Object.assign(state, payload)
  },

  // update checkout total value
  setCheckoutTotal (state, value) {
    state.amount.total = value
  },

  // update shipping zip code
  setCheckoutZip (state, value) {
    state.shipping.zip = value
  },

  // controls timer to update shipping services asynchronously
  updateShippingTimer (state, value) {
    state.shipping.timer = value
  },

  // update shipping services loading state
  toggleShippingLoading (state) {
    state.shipping.loading = !state.shipping.loading
  },

  // mark selected shipping service from list
  selectShippingService (state, value = 0) {
    state.shipping.services.forEach((service, index) => {
      if (index === value) {
        service.selected = true
        // update checkout freight and total value
        let { amount } = state
        amount.total -= amount.freight
        amount.freight = service.shipping_line.total_price
        amount.total += amount.freight
      } else {
        service.selected = false
      }
    })
  },

  // mark selected payment gateway from list
  selectPaymentGateway (state, value = 0) {
    state.payment.gateways.forEach((gateway, index) => {
      if (index === value) {
        gateway.selected = true
        let { discount } = gateway
        if (discount) {
          // discount by payment method
          // update checkout discount and total value
          // TODO: handle discount
        }
      } else {
        gateway.selected = false
      }
    })
  },

  // reset available shipping services
  setShippingServices (state, services) {
    state.shipping.services = services
  },

  // reset available payment gateways
  setPaymentGateways (state, gateways) {
    state.payment.gateways = gateways
  }
}

const getters = {
  checkout: state => state,

  // auxiliary maps
  checkoutZip: state => state.shipping.zip,
  shippingServices: state => state.shipping.services,
  shippingLoading: state => state.shipping.loading,
  shippingLoadError: state => state.shipping.error.code,
  paymentGateways: state => state.payment.gateways,

  // map selected shipping service and payment method objects
  checkoutShipping: state => state.shipping.services.find(option => option.selected === true),
  checkoutPayment: state => state.payment.gateways.find(option => option.selected === true),

  // calculate total time with delivery and posting deadline
  shippingServiceTime: state => service => {
    let shipping = service.shipping_line
    let days
    if (shipping.posting_deadline) {
      // start days with deadline for posting
      days = shipping.posting_deadline.days
    } else {
      days = 0
    }
    if (shipping.delivery_time) {
      // sum delivery time
      days += shipping.delivery_time.days
    }
    return days
  },

  // whether shipping time is calculated with working days
  shippingServiceWorkingDays: state => service => {
    let shipping = service.shipping_line
    // returns true if any deadline uses working days
    if (shipping.posting_deadline && shipping.posting_deadline.working_days) {
      return true
    }
    if (shipping.delivery_time && shipping.delivery_time.working_days) {
      return true
    }
    // default not working days
    return false
  }
}

const actions = {
  // recalculate checkout total value
  fixCheckoutTotal ({ commit, state, rootGetters }) {
    let { freight, discount } = state.amount
    commit('setCheckoutTotal', rootGetters.cart.subtotal + freight - discount)
  },

  // update shipping services list
  initShippingServices ({ state, commit, dispatch, rootGetters }) {
    // mark loading
    commit('toggleShippingLoading')

    // get shipping options from Modules API
    // https://apx-mods.e-com.plus/api/v1/calculate_shipping/schema.json?store_id=100
    let body = {
      items: rootGetters.extendedCartItems,
      to: {
        zip: state.shipping.zip
      },
      subtotal: rootGetters.cart.subtotal
    }

    // call module endpoint
    return dispatch('api', [ 'module', 'shipping', body ], { root: true }).then(body => {
      // update available shipping services
      let services = []
      body.result.forEach(result => {
        if (result.validated) {
          result.response.shipping_services.forEach(service => {
            let serviceObj = {
              app_id: result.app_id,
              selected: false,
              ...service
            }
            // fix shipping line
            let line = serviceObj.shipping_line
            if (line && line.price && !line.total_price) {
              // set total price same as price
              line.total_price = line.price
            }
            services.push(serviceObj)
          })
        }
      })

      // handle shipping methods state change
      commit('setShippingServices', services)
      // select one shipping option
      commit('selectShippingService')
    }).finally(() => {
      // loaded
      commit('toggleShippingLoading')
    })
  },

  // update shipping zip code and services
  setCheckoutZip ({ commit, dispatch, state }, value) {
    // check if zip is changed
    let { zip, timer, error } = state.shipping
    if (zip !== value) {
      let load = () => {
        commit('setCheckoutZip', value)
        // reload asynchronously with big timeout
        commit('updateShippingTimer', setTimeout(load, 30 * 60000))
        // load shipping services
        return dispatch('initShippingServices')
      }
      // check scheduled services reload
      if (timer) {
        // clear last timer
        clearTimeout(timer)
      }

      // start loading and returns respective promise
      return load()
    } else if (!error.code) {
      // already loaded for this zip code
      return Promise.resolve()
    } else {
      return Promise.reject(error.object)
    }
  },

  // update payment gateway options list
  initPaymentGateways ({ state, commit, dispatch, rootGetters }) {
    // list payments options from Modules API
    // https://apx-mods.e-com.plus/api/v1/list_payments/schema.json?store_id=100
    let body = {
      items: rootGetters.extendedCartItems,
      amount: {
        ...state.amount,
        subtotal: rootGetters.cart.subtotal
      }
    }

    // call module endpoint
    return dispatch('api', [ 'module', 'payment', body ], { root: true }).then(body => {
      // update available shipping services
      let gateways = []
      body.result.forEach(result => {
        if (result.validated) {
          result.response.payment_gateways.forEach(gateway => {
            gateways.push({
              app_id: result.app_id,
              selected: false,
              ...gateway
            })
          })
        }
      })

      // handle payment methods state change
      commit('setPaymentGateways', gateways)
    })
  },

  // handle checkout request
  handleCheckout ({ dispatch, getters, rootGetters }, payload) {
    // checkout from Modules API
    // https://apx-mods.e-com.plus/api/v1/@checkout/schema.json?store_id=100
    let customer = { ...rootGetters.customer }
    // remove null properties from customer
    for (let prop in customer) {
      if (customer.hasOwnProperty(prop) && customer[prop] === null) {
        delete customer[prop]
      }
    }

    // setup transaction body
    let transaction = {
      ...getters.checkoutPayment,
      buyer: {
        email: rootGetters.customerEmail,
        fullname: rootGetters.customerName
      }
    }
    // copy info from customer to buyer object
    ;[
      'inscription_number',
      'inscription_type',
      'doc_number',
      'doc_country',
      'registry_type',
      'birth_date',
      'gender'
    ].forEach(prop => {
      let value = rootGetters.customer[prop]
      if (value) {
        transaction.buyer[prop] = value
      }
    })
    if (rootGetters.customer.phones.length) {
      transaction.buyer.phone = rootGetters.customer.phones[0]
    }

    // checkout request body
    let body = {
      items: rootGetters.extendedCartItems,
      shipping: {
        ...getters.checkoutShipping,
        to: rootGetters.customerAddress
      },
      transaction,
      customer
    }

    // treat credit card payment data
    if (payload) {
      let { number, name, hash, cvv, doc, birth, installment, address } = payload
      if (installment) {
        transaction.installments_number = installment
      }
      if (number && cvv && name && hash) {
        if (typeof cvv === 'string') {
          // CVV must be integer
          cvv = parseInt(cvv, 10)
        }
        transaction.credit_card = {
          holder_name: payload.name,
          last_digits: payload.number.slice(-4),
          save: true,
          hash,
          cvv
        }
      }
      transaction.billing_address = address || rootGetters.customerAddress
      if (name && doc) {
        transaction.payer = {
          fullname: name,
          doc_number: doc.replace(/\D/g, '')
        }
        if (birth) {
          // same birth date object as customer
          transaction.payer.birth_date = rootGetters.parseCustomerBirth(birth).birth_date
        }
      }
    } else {
      // send customer address
      transaction.billing_address = rootGetters.customerAddress
    }

    return dispatch('api', [ 'module', 'checkout', body ], { root: true }).then(response => {
      // handle response with order body
      let { transaction } = response
      // console.log(order)
      if (transaction.redirect_to_payment && transaction.payment_link) {
        // redirect payment links
        window.location = transaction.payment_link
      }
    })

    .catch(err => {
      console.error(err)
      // show notification
      this.$message({
        showClose: true,
        message: this.$t('checkout.printBillet'),
        type: 'danger'
      })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
