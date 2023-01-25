/*!
 * @ecomplus/widget-product
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */

import Vue from 'vue'
import { inStock as checkInStock } from '@ecomplus/utils'
import TheProduct from '#components/TheProduct.vue'
import { isMobile } from '@ecomplus/storefront-twbs'

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
      strHasPromotionTimer,
      lowQuantityToWarn,
      maxVariationOptionsBtns,
      quoteInfo
    } = options

    const strOptionToBool = (strOption, prop) => {
      return strOption === '_'
        ? Boolean(themeConfig && themeConfig[prop])
        : strOption ? Boolean(strOption.trim()) : false
    }

    const formatLink = (quoteInfo) => {
      if (quoteInfo.indexOf('http') === -1) {
        const cellphone = quoteInfo.replace(/\D/g, '')
        return 'https://' + (isMobile ? 'api' : 'web') + '.whatsapp.com/send?phone=' + encodeURIComponent('+' + cellphone ? cellphone : `+55${cellphone}`) + `&text=Cotar produto: ${encodeURIComponent(window.location.href)}`
      }
      return quoteInfo
    }

    new Vue({
      render: h => h(TheProduct, {
        attrs: {
          id: $dock ? null : elId
        },
        props: {
          ...options.props,
          product: isSSR && body && body.available && checkInStock(body) ? body : null,
          buyText,
          hasQuantitySelector: strOptionToBool(strHasQuantitySelector, 'hasQuantitySelector'),
          hasPromotionTimer: strOptionToBool(strHasPromotionTimer, 'hasPromotionTimer'),
          lowQuantityToWarn,
          maxVariationOptionsBtns,
          quoteLink: formatLink(quoteInfo),
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
