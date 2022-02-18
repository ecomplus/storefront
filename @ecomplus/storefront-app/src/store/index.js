// Dependencies
import Vue from 'vue'
import { createStore } from 'vuex'

// Store modules
import modules from './modules'

// Vuex 4 store create
const store = createStore({
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
  // All store modules joined by file name example: account.store.js -> account
  modules
})

// Attach store
Vue.use(store)

// Exporting store
export default store
