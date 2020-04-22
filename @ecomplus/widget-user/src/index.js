/*!
 * @ecomplus/widget-user
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */

import Vue from 'vue'
import LoginModal from '#components/LoginModal.vue'

export default (options = {}, elId = 'login-modal', buttonId = 'user-button') => {
  const $loginModal = document.getElementById(elId)
  const $userButton = document.getElementById(buttonId)
  if ($loginModal && $userButton) {
    const getScopedSlots = window.storefront && window.storefront.getScopedSlots

    new Vue({
      data: {
        isVisible: false
      },
      created () {
        $userButton.addEventListener('click', e => {
          e.preventDefault()
          this.isVisible = true
        })
      },

      render (createElement) {
        const vm = this
        return createElement(LoginModal, {
          attrs: {
            id: elId
          },
          props: {
            ...options.props,
            isVisible: vm.isVisible
          },
          on: {
            'update:is-visible' (isVisible) {
              vm.isVisible = isVisible
            }
          },
          scopedSlots: typeof getScopedSlots === 'function'
            ? getScopedSlots($loginModal, createElement)
            : undefined
        })
      }
    }).$mount($loginModal)
  }
}
