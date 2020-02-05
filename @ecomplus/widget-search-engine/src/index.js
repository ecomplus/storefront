/*!
 * @ecomplus/widget-search-engine
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */

import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import EcSearchEngine from './components/EcSearchEngine.vue'

export default (options = {}, elId = 'search-engine') => {
  const $searchEngine = document.getElementById(elId)

  if ($searchEngine) {
    const { $overlay } = window.storefront
    const urlParams = new URLSearchParams(window.location.search)

    new Vue({
      data: {
        showFilters: false
      },

      render (createElement) {
        const vm = this
        return createElement(EcSearchEngine, {
          attrs: {
            id: elId
          },
          props: {
            ...options.props,
            term: urlParams.get('term'),
            page: parseInt(urlParams.get('page'), 10),
            brands: urlParams.getAll('brands'),
            categories: urlParams.getAll('categories'),
            navbarId: 'header',
            showFilters: vm.showFilters,
            prerenderedHTML: $searchEngine.outerHTML
          },

          on: {
            'update:showFilters' (canShow) {
              vm.showFilters = canShow
              if ($overlay) {
                if (canShow) {
                  $overlay.show()
                  $overlay.once('hide', () => {
                    vm.showFilters = false
                  })
                } else {
                  $overlay.hide()
                }
              }
            }
          }
        })
      }
    }).$mount($searchEngine)
  }
}
