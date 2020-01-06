import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import EcProduct from './components/EcProduct.vue'
import ecomCart from '@ecomplus/shopping-cart'

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
        },
        on: {
          buy ({ product }) {
            ecomCart.addProduct({
              ...product,
              body_html: null,
              body_text: null
            })
          }
        }
      })
    }).$mount($productBlock)
  }
}
