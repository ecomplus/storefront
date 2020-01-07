/*!
 * @ecomplus/widget-minicart
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */

import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import EcMinicart from './components/EcMinicart.vue'

export default (options = {}, elId = 'cart-button') => {
  const $cartButton = document.getElementById(elId)

  if ($cartButton) {
    const { $overlay } = window.storefront

    new Vue({
      data: {
        showCart: false
      },

      render (createElement) {
        const vm = this
        return createElement(EcMinicart, {
          attrs: {
            id: elId
          },
          props: {
            ...options.props,
            showCart: vm.showCart
          },

          on: {
            'update:showCart' (isVisible) {
              vm.showCart = isVisible
              if ($overlay) {
                if (isVisible) {
                  $overlay.show()
                  $overlay.once('hide', () => {
                    vm.showCart = false
                  })
                } else {
                  $overlay.hide()
                }
              }
            }
          }
        })
      }
    }).$mount($cartButton)
  }
}
