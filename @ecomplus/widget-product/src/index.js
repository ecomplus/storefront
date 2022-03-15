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
    let getScopedSlots, body, themeConfig
    if (storefront) {
      getScopedSlots = storefront.getScopedSlots
      body = storefront.context && storefront.context.body
      themeConfig = storefront.theme && storefront.theme.product
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

    const {
      buyText,
      strHasQuantitySelector,
      lowQuantityToWarn,
      maxVariationOptionsBtns
    } = options

    new Vue({
      render: h => h(TheProduct, {
        attrs: {
          id: $dock ? null : elId
        },
        props: {
          ...options.props,
          product: isSSR && body && body.available && checkInStock(body) ? body : null,
          buyText,
          hasQuantitySelector: strHasQuantitySelector === '_'
            ? Boolean(themeConfig && themeConfig.hasQuantitySelector)
            : strHasQuantitySelector ? Boolean(strHasQuantitySelector.trim()) : false,
          lowQuantityToWarn,
          maxVariationOptionsBtns,
          isSSR,
          hasPromotionTimer: options.hasPromotionTimer || false
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
