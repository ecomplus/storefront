import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import EcUser from './components/EcUser.vue'

export default options => {
  const elId = (options && options.elId) || 'user-button'
  const $userButton = document.getElementById(elId)

  if ($userButton) {
    new Vue({
      components: {
        EcUser
      },
      template: `
      <ec-user id="${elId}"/>`
    }).$mount($userButton)
  }
}
