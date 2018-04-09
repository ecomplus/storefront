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

const modules = {
  shop,
  cart,
  products,
  customer
}

const initCallback = () => {
  // init modules
  console.log('init')
}
api.init(debug, initCallback)

// global namespace
// define common getters, mutations and actions

const mutations = {
  init (state, payload) {
    state = state[payload.module]
    // reset entire module state body
    state.body = { ...state.body, ...payload.body }
  }
}

const actions = {
  init ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // merge payload
        let body = {
          name: 'Hello Vuex'
        }
        payload = { ...payload, body }
        // call mutation to change state
        commit('init', payload)
        resolve()
      }, 1000)
    })
  }
}

export default new Vuex.Store({
  mutations,
  actions,
  modules,
  strict: debug,
  plugins: debug ? [ createLogger() ] : []
})
