import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import App from './App.vue'

export default options => {
  new Vue({
    render: h => h(App)
  }).$mount('#el')
}
