import Vue from 'vue'
import Vuex from 'vuex'
import checkout from './modules/checkout'
import account from './modules/account'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: 0,
    title: '',
    fluidPage: false
  },

  mutations: {
    triggerLoading (state, loading = true) {
      if (!loading) {
        if (state.loading > 0) {
          state.loading--
        }
      } else {
        state.loading++
      }
    },

    setTitle (state, title) {
      state.title = title
    },

    setFluidPage (state, isFluid = true) {
      state.fluidPage = isFluid
    }
  },

  modules: {
    checkout,
    account
  }
})
