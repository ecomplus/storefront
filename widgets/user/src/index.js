/*!
 * @ecomplus/widget-user
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */

import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import EcUser from './components/EcUser.vue'

export default (options = {}, elId = 'user-button') => {
  const $userButton = document.getElementById(elId)

  if ($userButton) {
    new Vue({
      render: h => h(EcUser, {
        attrs: {
          id: elId
        },
        props: {
          ...options.props
        }
      })
    }).$mount($userButton)
  }
}
