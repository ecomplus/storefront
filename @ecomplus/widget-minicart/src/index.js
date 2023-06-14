/*!
 * @ecomplus/widget-minicart
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */

import Vue from 'vue'
import CartQuickview from '#components/CartQuickview.vue'

export default (options = {}, elId = 'cart-quickview', buttonId = 'cart-button') => {
  const $cartQuickview = document.getElementById(elId)
  const $cartButton = document.getElementById(buttonId)
  if ($cartQuickview && $cartButton) {
    const getScopedSlots = window.storefront && window.storefront.getScopedSlots
    const themeConfig = storefront.theme && storefront.theme.minicart

    const {
      strHasShippingCalculator
    } = options

    const strOptionToBool = (strOption, prop) => {
      return strOption === '_'
        ? Boolean(themeConfig && themeConfig[prop])
        : strOption ? Boolean(strOption.trim()) : false
    }

    new Vue({
      data: {
        isVisible: false
      },
      created () {
        $cartButton.addEventListener('click', e => {
          e.preventDefault()
          this.isVisible = true
        })
      },

      render (createElement) {
        const vm = this
        return createElement(CartQuickview, {
          attrs: {
            id: elId
          },
          props: {
            ...options.props,
            isVisible: vm.isVisible,
            hasShippingCalculator: strOptionToBool(strHasShippingCalculator, 'hasShippingCalculator')
          },
          on: {
            'update:is-visible' (isVisible) {
              vm.isVisible = isVisible
            }
          },
          scopedSlots: typeof getScopedSlots === 'function'
            ? getScopedSlots($cartQuickview, createElement)
            : undefined
        })
      }
    }).$mount($cartQuickview)
  }
}
