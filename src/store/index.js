import Vue from 'vue'
import Vuex from 'vuex'
import shop from './modules/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: 0
  },

  mutations: {
    triggerLoading (state, payload = true) {
      if (!payload) {
        if (state.loading > 0) {
          state.loading--
        }
      } else {
        state.loading++
      }
    }
  },

  modules: {
    shop
  }
})
