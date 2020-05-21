/*!
 * @ecomplus/widget-search-engine
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */

import Vue from 'vue'
import SearchEngine from '#components/SearchEngine.vue'

export default (options = {}, elId = 'search-engine') => {
  const $searchEngine = document.getElementById(elId)
  if ($searchEngine) {
    const getScopedSlots = window.storefront && window.storefront.getScopedSlots

    const urlParams = new URLSearchParams(window.location.search)
    const props = {
      ...options.props,
      term: urlParams.get('term'),
      page: parseInt(urlParams.get('page'), 10) || 1,
      brands: urlParams.getAll('brands[]'),
      categories: urlParams.getAll('categories[]')
    }
    const { resource } = document.body.dataset
    switch (resource) {
      case 'categories':
      case 'brands':
        props[resource] = [window.storefront.context.body.name]
        props.fixedFilters = resource
        break
    }

    new Vue({
      render: h => h(SearchEngine, {
        attrs: {
          id: elId
        },
        props,
        scopedSlots: typeof getScopedSlots === 'function'
          ? getScopedSlots($searchEngine, h)
          : undefined
      })
    }).$mount($searchEngine)
  }
}
