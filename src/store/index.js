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
  }
}

const actions = {
  init ({ commit, state }, payload) {
    // get body from API
    let module = payload.module
    let get = api.get[module]
    if (get) {
      let callback = (body) => {
        // merge payload
        payload = { ...payload, body }
        // call mutation to change state
        commit('init', payload)
      }
      let resourceId = state[module].body._id
      // call API
      get(callback, resourceId)
    }
  },

  // setup session methods
  // customer authentication
  login ({ commit }) {
    let callback = (body) => {
      if (typeof body === 'object' && body !== null) {
        // call mutation changing customer info
        commit('init', {
          module: 'customer',
          body
        })
      }
      // hide loading
      commit('triggerLoading', false)
    }
    // show loading spinner
    commit('triggerLoading', true)
    // pass to passport API
    api.session.login(callback)
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

const initCallback = () => {
  // init modules
  for (let module in modules) {
    if (modules.hasOwnProperty(module)) {
      store.dispatch('init', {
        module
      })
    }
  }
  // show body
  document.getElementsByTagName('body')[0].style.opacity = 1
}
api.init(debug, initCallback)

export default store
