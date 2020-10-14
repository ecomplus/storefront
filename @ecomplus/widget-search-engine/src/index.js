/*!
 * @ecomplus/widget-search-engine
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */

import { $ } from '@ecomplus/storefront-twbs'
import Vue from 'vue'
import SearchEngine from '#components/SearchEngine.vue'

export default (options = {}, elId = 'search-engine') => {
  const $searchEngine = document.getElementById(elId)
  if ($searchEngine) {
    const $dock = document.getElementById(`${elId}-dock`)
    let $productItems
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

    const vueApp = new Vue({
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
            fetching.then(result => {
              vm.countRequests++
              const renderNewItems = () => {
                vm.canShowItems = true
                $('#search-engine-snap').remove()
              }
              if (!vm.canShowItems) {
                if (vm.countRequests > 1) {
                  renderNewItems()
                } else if (result && result.hits) {
                  if (!$productItems || $productItems.length !== result.hits.hits.length) {
                    renderNewItems()
                  } else {
                    let isSameItems = true
                    const { hits } = result.hits
                    for (let i = 0; i < hits.length; i++) {
                      if (!$productItems.find(`[data-product-id="${hits[i]._id}"]`).length) {
                        isSameItems = false
                        break
                      }
                    }
                    if (!isSameItems) {
                      renderNewItems()
                    }
                  }
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
            canShowItems: vm.canShowItems,
            loadMoreSelector: $dock ? '#search-engine-load' : null
          },
          on,
          scopedSlots: typeof getScopedSlots === 'function'
            ? getScopedSlots($searchEngine, createElement, !$dock)
            : undefined
        })
      }
    })

    if ($dock) {
      $($searchEngine).append($('<div>', {
        id: 'search-engine-load'
      }))

      const mount = () => vueApp.$mount($dock)
      $productItems = $('#search-engine-snap .product-item')
      if ($productItems.length) {
        const observer = new window.MutationObserver(() => {
          clearTimeout(fallbackTimer)
          observer.disconnect()
          setTimeout(mount, 150)
        })
        observer.observe($productItems[0], {
          childList: true
        })
        const fallbackTimer = setTimeout(() => {
          observer.disconnect()
          mount()
        }, 3000)
      } else {
        mount()
      }
    } else {
      vueApp.$mount($searchEngine)
    }
  }
}
