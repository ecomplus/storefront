/*!
 * @ecomplus/widget-search
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */

import Vue from 'vue'
import InstantSearch from '#components/InstantSearch.vue'

export default (options = {}, elId = 'instant-search', inputId = 'search-input') => {
  const $instantSearch = document.getElementById(elId)
  const $searchInput = document.getElementById(inputId)
  if ($instantSearch && $searchInput) {
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
          attrs: {
            id: elId
          },
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
            ? getScopedSlots($instantSearch, createElement)
            : undefined
        })
      }
    }).$mount($instantSearch)
  }
}
