/*!
 * @ecomplus/widget-search-engine
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */

import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import EcSearchEngine from './components/EcSearchEngine.vue'
import { dynamicVueSlots } from '@ecomplus/widget-product/src/lib/utils'

export default (options = {}, elId = 'search-engine') => {
  const $searchEngine = document.getElementById(elId)

  if ($searchEngine) {
    const { $overlay } = window.storefront

    new Vue({
      components: {
        EcSearchEngine
      },

      data () {
        return {
          options,
          urlParams: new URLSearchParams(window.location.search),
          showFilters: false
        }
      },

      watch: {
        showFilters (show) {
          if ($overlay) {
            if (show) {
              $overlay.show()
              $overlay.once('hide', () => {
                this.showFilters = false
              })
            } else {
              $overlay.hide()
            }
          }
        }
      },

      template: `
      <ec-search-engine
        id="${elId}"
        v-bind="options.props"
        :term="urlParams.get('term')"
        :page="parseInt(urlParams.get('page'), 10)"
        :brands="urlParams.getAll('brands')"
        :categories="urlParams.getAll('categories')"
        :showFilters.sync="showFilters"
        navbar-id="header"
      >
        ${dynamicVueSlots(options.slots)}
        ${$searchEngine.outerHTML}
      </ec-search-engine>`
    }).$mount(`#${elId}`)
  }
}
