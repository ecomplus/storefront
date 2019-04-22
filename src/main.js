import Vue from 'vue'
import EcomSearch from './EcomSearch.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(EcomSearch, {
    props: {
      show: true
    }
  })
}).$mount('#search')
