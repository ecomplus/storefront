/*!
 * @ecomplus/widget-search
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */

import Vue from 'vue'
import InstantSearch from '#components/InstantSearch.vue'

export default (options = {}, elId = 'instant-search', inputId = 'search-input') => {
  const $searchInput = document.getElementById(inputId)
  if ($searchInput) {
    const getScopedSlots = window.storefront && window.storefront.getScopedSlots

    new Vue({
      data: {
        isVisible: false,
        term: ''
      },
      created () {
        $searchInput.addEventListener('focusin', () => {
          this.isVisible = true
          this.term = $searchInput.value
        })
      },

      render (createElement) {
        const vm = this
        return createElement(InstantSearch, {
          props: {
            ...options.props,
            term: vm.term,
            isVisible: vm.isVisible
          },
          on: {
            'update:is-visible' (isVisible) {
              vm.isVisible = isVisible
            },
            'update:term' (term) {
              $searchInput.value = term
            }
          },
          scopedSlots: typeof getScopedSlots === 'function'
            ? getScopedSlots($searchInput.parentElement, createElement)
            : undefined
        })
      }
    }).$mount(document.getElementById(elId))
  }
}
