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
    const isSSR = Boolean($dock)
    const { storefront } = window
    const getScopedSlots = storefront && storefront.getScopedSlots

    const vueOptions = {
      render: h => h(TheProduct, {
        attrs: {
          id: $dock ? null : elId
        },
        props: {
          ...options.props,
          product: isSSR && storefront && storefront.context
            ? storefront.context.body
            : null,
          buyText: options.buyText,
          isSSR
        },

        scopedSlots: Object.assign(
          {
            buy: !options.buy
              ? undefined
              : function () {
                return h('span', {
                  domProps: {
                    innerHTML: options.buy
                  }
                })
              }
          },
          typeof getScopedSlots === 'function'
            ? getScopedSlots($productBlock, h, !$dock)
            : {}
        )
      })
    }

    const removeSpinner = () => {
      const $loading = document.getElementById('product-loading')
      if ($loading) {
        $loading.remove()
      }
      delete $productBlock.dataset.toRender
    }
    if (isSSR) {
      vueOptions.mounted = removeSpinner
    } else {
      vueOptions.render.on = {
        'update:product': removeSpinner
      }
    }

    new Vue(vueOptions).$mount($dock || $productBlock)
  }
}
