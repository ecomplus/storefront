import Vue from 'vue'
import EcomUser from './EcomUser.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(EcomUser)
}).$mount('#user')
