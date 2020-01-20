/*!
 * @ecomplus/widget-product
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */

import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import EcProduct from './components/EcProduct.vue'

export default (options = {}, elId = 'product-block') => {
  const $productBlock = document.getElementById(elId)

  if ($productBlock) {
    new Vue({
      render: h => h(EcProduct, {
        attrs: {
          id: elId
        },
        props: {
          ...options.props,
          prerenderedHTML: $productBlock.outerHTML
        }
      })
    }).$mount($productBlock)
  }
}
