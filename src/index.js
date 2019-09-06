import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import EcUser from './components/EcUser.vue'

export default (options = {}, elId = 'user-button') => {
  const $userButton = document.getElementById(elId)

  if ($userButton) {
    new Vue({
      components: {
        EcUser
      },

      data () {
        return {
          options
        }
      },

      template: `
      <ec-user
        id="${elId}"
        v-bind="options"
      />`
    }).$mount($userButton)
  }
}
