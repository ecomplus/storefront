import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import EcSearchEngine from './components/EcSearchEngine.vue'
import { dynamicVueSlots } from '@ecomplus/widget-product/src/lib/utils'

export default (options = {}, elId = 'search-engine') => {
  const $searchEngine = document.getElementById(elId)

  if ($searchEngine) {
    new Vue({
      components: {
        EcSearchEngine
      },

      data () {
        return {
          options,
          urlParams: new URLSearchParams(window.location.search)
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
      >
        ${dynamicVueSlots(options.slots)}
        ${$searchEngine.outerHTML}
      </ec-search-engine>`
    }).$mount(`#${elId}`)
  }
}
