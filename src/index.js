import Vue from 'vue'
import App from './../ecom-user/src/EcomUser.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

console.log(1)
