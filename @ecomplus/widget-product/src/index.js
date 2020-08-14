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
    const $dock = document.getElementById(`${elId}-dock`)
    const getScopedSlots = window.storefront && window.storefront.getScopedSlots

    new Vue({
      render: h => h(TheProduct, {
        attrs: {
          id: $dock ? null : elId
        },
        props: {
          ...options.props,
          buyText: options.buyText,
          isSSR: Boolean($dock)
        },
        on: {
          'update:product' () {
            const $loading = document.getElementById('product-loading')
            if ($loading) {
              $loading.remove()
            }
            delete $productBlock.dataset.toRender
          }
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
          typeof getScopedSlots === 'function'
            ? getScopedSlots($productBlock, h, !$dock) : {}
        )
      })
    }).$mount($dock || $productBlock)
  }
}
