import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import EcMinicart from './components/EcMinicart.vue'

export default (options = {}, elId = 'cart-button') => {
  const $cartButton = document.getElementById(elId)

  if ($cartButton) {
    const { $overlay } = window.storefront

    new Vue({
      components: {
        EcMinicart
      },

      data () {
        return {
          options,
          showCart: false
        }
      },

      watch: {
        showCart (show) {
          if ($overlay) {
            if (show) {
              $overlay.show()
              $overlay.once('hide', () => {
                this.showCart = false
              })
            } else {
              $overlay.hide()
            }
          }
        }
      },

      template: `
      <ec-minicart
        id="${elId}"
        v-bind="options.props"
        :showCart.sync="showCart"
      />`
    }).$mount($cartButton)
  }
}
