import Vue from 'vue'

// Vuex Centralized State Management
// https://vuex.vuejs.org/en/
import Vuex from 'vuex'
import shop from './modules/shop'
import cart from './modules/cart'
import products from './modules/products'
import customer from './modules/customer'
import createLogger from 'vuex/dist/logger'
// abstractions for making API requests
import api from '@/api'

// setup Vuex
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// global namespace
// define common getters, mutations and actions

const state = {
  loading: 0
}

const mutations = {
  init (state, payload) {
    let body = state[payload.module].body
    let Body = payload.body
    // reset entire module state body
    // ensure to not write new (unused) properties
    Object.keys(Body).forEach((key) => {
      if (key in body) {
        body[key] = Body[key]
      }
    })
  },

  triggerLoading (state, payload) {
    // count opened async processes
    if (!payload) {
      if (state.loading <= 0) {
        // should not be less than zero
        return
      }
      state.loading--
    } else {
      state.loading++
    }
  },

  // setup session synchronous methods
  logout (state) {
    let customer = state.customer.body
    if (customer.display_name) {
      // unset customer info
      customer._id = null
      customer.display_name = null
    }
    // clear session
    api.session.logout()
  }
}

const actions = {
  // create action for API requests
  api ({ commit }, [ method, module, arg ]) {
    // show loading spinner
    commit('triggerLoading', true)
    return api[method][module](arg).finally(() => {
      // hide loading
      commit('triggerLoading', false)
    })
  },

  // initialize modules
  init ({ commit, state, dispatch }, payload) {
    // get body from API
    let module = payload.module
    if (api.get.hasOwnProperty(module)) {
      // call API
      dispatch('api', [ 'get', module, state[module].body._id ]).then(body => {
        // merge payload
        payload = { ...payload, body }
        // call mutation to change state
        commit('init', payload)
      })
    }
  },

  // setup session methods
  // customer authentication
  login ({ commit, dispatch }) {
    // pass to passport API
    return dispatch('api', [ 'session', 'login' ]).then(body => {
      if (typeof body === 'object' && body !== null) {
        // update customer info
        dispatch('init', { module: 'customer' })
      }
    })
  }
}

const modules = {
  shop,
  cart,
  products,
  customer
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
  strict: debug,
  plugins: debug ? [ createLogger() ] : []
})

// setup API
api.init(debug).then(() => {
  // init startup modules
  // get store info
  store.dispatch('init', { module: 'shop' })
  // get customer data
  store.dispatch('init', { module: 'customer' })
  // show body
  document.getElementsByTagName('body')[0].style.opacity = 1
})

export default store
