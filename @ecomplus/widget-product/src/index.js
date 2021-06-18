/*!
 * @ecomplus/widget-product
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */

import Vue from 'vue'
import { inStock as checkInStock } from '@ecomplus/utils'
import TheProduct from '#components/TheProduct.vue'

export default (options = {}, elId = 'product') => {
  const $productBlock = document.getElementById(elId)
  if ($productBlock) {
    const $dock = document.getElementById(`${elId}-dock`)
    const isSSR = Boolean($dock)
    const { storefront } = window
    let getScopedSlots, body
    if (storefront) {
      getScopedSlots = storefront.getScopedSlots
      body = storefront.context && storefront.context.body
    }

    let mounted
    const removeSpinner = () => {
      const $loading = document.getElementById('product-loading')
      if ($loading) {
        $loading.remove()
      }
      delete $productBlock.dataset.toRender
    }
    if (isSSR) {
      mounted = removeSpinner
    }

    new Vue({
      render: h => h(TheProduct, {
        attrs: {
          id: $dock ? null : elId
        },
        props: {
          ...options.props,
          product: isSSR && body && body.available && checkInStock(body) ? body : null,
          buyText: options.buyText,
          isSSR
        },
        on: {
          'update:product' (product) {
            if (!isSSR) {
              removeSpinner()
            }
            if (options.$emit) {
              options.$emit('update:product', product)
            }
          }
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
      }),
      mounted
    }).$mount($dock || $productBlock)
  }
}
