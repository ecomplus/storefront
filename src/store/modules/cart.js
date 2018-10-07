// abstractions for making API requests
import { get } from '@/api'

// initial state
// https://developers.e-com.plus/docs/api/#/store/carts
const state = {
  body: {
    _id: null,
    items: []
  }
}

const mutations = {
  // reset cart body object
  editCart (state, payload) {
    state.body = {
      ...state.body,
      ...payload.body
    }
  }
}

const getters = {
  cart: state => state.body
}

const actions = {
  // load cart body object
  loadCart ({ commit, state }, payload) {
    let id = payload.id
    // test with current state body
    let body = state.body
    if (id) {
      if (body._id !== id) {
        // try to get from Store API with cart ID
        // API request
        let callback = (body) => {
          commit('editCart', { body })
        }
        get.cart(callback, id)
      }
    } else if (!body.items.length) {
      // try to load JSON from client storage
      let db = window.localStorage
      if (db) {
        let json = db.getItem('cart')
        if (json) {
          let body
          try {
            body = JSON.parse(json)
          } catch (e) {
            console.error('Invalid stored cart JSON', e)
            return
          }
          if (typeof body === 'object' && Array.isArray(body.items)) {
            // valid JSON data
            // update cart
            commit('editCart', { body })
          }
        }
      }
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
