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
    const $dock = document.getElementById(`${elId}-dock`)
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
        countRequests: 0,
        canShowItems: !$dock,
        term: props.term
      },

      render (createElement) {
        const vm = this
        const on = {
          'update:term' (term) {
            vm.term = term
          }
        }
        if ($dock) {
          on.fetch = function ({ fetching }) {
            fetching.then(() => {
              vm.countRequests++
              if (vm.countRequests > 1 && !vm.canShowItems) {
                vm.canShowItems = true
                const $snap = document.getElementById('search-engine-snap')
                if ($snap) {
                  $snap.remove()
                }
              }
            })
          }
        }

        return createElement(SearchEngine, {
          attrs: {
            id: $dock ? null : elId
          },
          props: {
            ...props,
            term: vm.term,
            canShowItems: vm.canShowItems
          },
          on,
          scopedSlots: typeof getScopedSlots === 'function'
            ? getScopedSlots($searchEngine, createElement, !$dock)
            : undefined
        })
      }
    }).$mount($dock || $searchEngine)
  }
}
