/*!
 * @ecomplus/widget-product
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */

import Vue from 'vue'
import TheProduct from '#components/TheProduct.vue'

export default (options = {}, elId = 'product') => {
  const $productBlock = document.getElementById(elId)
  if ($productBlock) {
    const getScopedSlots = window.storefront && window.storefront.getScopedSlots

    new Vue({
      render: h => h(TheProduct, {
        attrs: {
          id: elId
        },
        props: {
          buyText: options.buyText
        },

        scopedSlots: Object.assign(
          {
            buy: !options.buy ? undefined : function () {
              return h('span', {
                domProps: {
                  innerHTML: options.buy
                }
              })
            }
          },
          typeof getScopedSlots === 'function' ? getScopedSlots($productBlock, h) : {}
        )
      })
    }).$mount($productBlock)
  }
}
