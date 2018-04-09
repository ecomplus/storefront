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
import api from './../api'

// setup Vuex
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// global namespace
// define common getters, mutations and actions

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
  }
}

const actions = {
  init ({ commit }, payload) {
    // get body from API
    let get = api.get[payload.module]
    if (get) {
      get((body) => {
        // merge payload
        payload = { ...payload, body }
        // call mutation to change state
        commit('init', payload)
      })
    }
  }
}

const modules = {
  shop,
  cart,
  products,
  customer
}

const store = new Vuex.Store({
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
}
api.init(debug, initCallback)

export default store
