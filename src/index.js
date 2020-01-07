/*!
 * @ecomplus/widget-search
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */

import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import EcSearch from './components/EcSearch.vue'

export default (options = {}, elId = 'search-input') => {
  const $searchInput = document.getElementById(elId)

  if ($searchInput) {
    const attrs = {}
    for (let i = $searchInput.attributes.length - 1; i >= 0; i--) {
      const { name, value } = $searchInput.attributes[i]
      attrs[name] = value
    }

    new Vue({
      render: h => h(EcSearch, {
        props: {
          ...options.props
        },
        scopedSlots: {
          input: () => h('input', { attrs })
        }
      })
    }).$mount($searchInput)
  }
}
