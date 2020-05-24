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

    ;['brands', 'categories'].forEach(resource => {
      if ($searchEngine.dataset[resource]) {
        try {
          props[resource] = JSON.parse($searchEngine.dataset[resource])
        } catch (err) {
          console.error(err)
          return
        }
        if (props[resource] && props[resource].length < 2) {
          props[`isFixed${resource.charAt(0).toUpperCase()}${resource.slice(1)}`] = true
        }
        props.defaultSort = 'sales'
        props.hasPopularItems = false
      }
    })

    const { resource } = window.document.body.dataset
    switch (resource) {
      case 'brands':
      case 'categories':
        if (!props[resource] || !props[resource].length) {
          console.error(new Error(`Skipping SearchEngine with empty '${resource}' filter`))
          return
        }
    }

    new Vue({
      data: {
        term: props.term
      },

      render (createElement) {
        const vm = this
        return createElement(SearchEngine, {
          attrs: {
            id: elId
          },
          props: {
            ...props,
            term: vm.term
          },
          on: {
            'update:term' (term) {
              vm.term = term
            }
          },
          scopedSlots: typeof getScopedSlots === 'function'
            ? getScopedSlots($searchEngine, createElement)
            : undefined
        })
      }
    }).$mount($searchEngine)
  }
}
