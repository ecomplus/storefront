import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import EcUser from './components/EcUser.vue'

export default options => {
  const elId = 'user-button'
  new Vue({
    components: {
      EcUser
    },
    template: `
    <ec-user id="${elId}"/>`
  }).$mount(`#${elId}`)
}
