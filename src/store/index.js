import Vue from 'vue'

// Vuex Centralized State Management
// https://vuex.vuejs.org/en/
import Vuex from 'vuex'
import shop from './modules/shop'
import cart from './modules/cart'
import products from './modules/products'
import customer from './modules/customer'
import createLogger from 'vuex/dist/logger'

// E-Com Plus SDK JS
import EcomIo from 'ecomplus-sdk'

// setup Vuex
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const initCallback = () => {
  console.log('x')
}
if (debug) {
  // test
  EcomIo.init(initCallback, 1004, '5a99b7e338f4774795b90773')
} else {
  // production
  EcomIo.init(initCallback)
}

// global namespace
// define common getters, mutations and actions

const mutations = {
  init (state, payload) {
    let module = payload.module
    // reset entire state body
    state[module].body = { ...state[module].body, ...payload.body }
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

let store = new Vuex.Store({
  mutations,
  actions,
  modules: {
    shop,
    cart,
    products,
    customer
  },
  strict: debug,
  plugins: debug ? [ createLogger() ] : []
})

store.dispatch('init', {
  module: 'shop'
})

export default store
