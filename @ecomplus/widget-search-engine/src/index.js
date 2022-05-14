/*!
 * @ecomplus/widget-search-engine
 * (c) E-Com Club <ti@e-com.club>
 * Released under the MIT License.
 */

import { $ } from '@ecomplus/storefront-twbs'
import Vue from 'vue'
import SearchEngine from '#components/SearchEngine.vue'

export default (options = {}, elId = 'search-engine', paginationElId = 'search-pagination') => {
  const $searchEngine = document.getElementById(elId)
  if ($searchEngine) {
    const $dock = document.getElementById(`${elId}-dock`)
    let $productItems
    const getScopedSlots = window.storefront && window.storefront.getScopedSlots
    const { dataset } = $searchEngine

    const urlParams = new URLSearchParams(window.location.search)
    const props = {
      ...options.props,
      term: urlParams.get('term'),
      brands: urlParams.getAll('brands[]'),
      categories: urlParams.getAll('categories[]'),
      defaultFilters: urlParams.getAll('filters[]').reduce((filters, gridAndOption) => {
        const [gridId, option] = gridAndOption.split(':')
        if (!filters[gridId]) {
          filters[gridId] = []
        }
        filters[gridId].push(option)
        return filters
      }, {}),
      defaultSort: dataset.sort || urlParams.get('sort')
    }

    ;['brands', 'categories'].forEach(resource => {
      if (dataset[resource]) {
        try {
          props[resource] = JSON.parse(dataset[resource])
        } catch (err) {
          console.error(err)
          return
        }
        if (props[resource] && props[resource].length < 2) {
          props[`isFixed${resource.charAt(0).toUpperCase()}${resource.slice(1)}`] = true
        }
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

    const pageTitle = document.title
    const updatePageUrl = () => {
      const term = urlParams.get('term')
      let title = term ? `${term} ~ ${pageTitle}` : pageTitle
      const page = urlParams.get('page')
      if (page > 1) {
        title += ` (${page}) `
      }
      if (window.history) {
        const query = urlParams.toString()
        const { pathname } = window.location
        window.history.pushState({
          pathname,
          query
        }, title, pathname + (query ? `?${query}` : ''))
      }
      document.title = title
    }
    updatePageUrl()

    const vueApp = new Vue({
      data: {
        countRequests: 0,
        canShowItems: !$dock,
        term: props.term,
        page: parseInt(urlParams.get('page'), 10) || 1,
        totalItems: 0
      },

      render (createElement) {
        const vm = this
        if (options.pagination) {
          import('#components/APagination.vue')
            .then(pagination => {
              new Vue({
                render: h => h(pagination.default, {
                  props: {
                    totalItems: vm.totalItems,
                    page: vm.page
                  },
                  on: {
                    'update:page' (page) {
                      vm.page = page
                      urlParams.set('page', page)
                      updatePageUrl()
                      window.scroll({
                        top: 0,
                        behavior: 'smooth'
                      })
                    }
                  }
                })
              }).$mount(document.getElementById(paginationElId))
            })
        }

        return createElement(SearchEngine, {
          attrs: {
            id: $dock ? null : elId
          },
          props: {
            ...props,
            term: vm.term,
            page: vm.page,
            canLoadMore: !options.pagination && !dataset.disableLoadMore,
            canShowItems: vm.canShowItems,
            loadMoreSelector: $dock ? '#search-engine-load' : null,
            isFilterable: !dataset.disableFilters
          },

          on: {
            'update:term' (term) {
              vm.term = term
              urlParams.set('term', term)
              updatePageUrl()
            },

            fetch ({ ecomSearch, fetching, isPopularItems }) {
              fetching.then(result => {
                if (!isPopularItems) {
                  vm.totalItems = ecomSearch.getTotalCount()
                }
                if ($dock) {
                  vm.countRequests++
                  const renderNewItems = () => {
                    vm.canShowItems = true
                    const $searchSnap = $searchEngine.querySelector('#search-engine-snap')
                    const $nextSearchResults = $searchEngine.querySelector('.search-engine__results')
                    $nextSearchResults.style.minHeight = $searchSnap.offsetHeight + 'px'
                    $searchSnap.remove()
                    setTimeout(() => {
                      $nextSearchResults.style.minHeight = null
                    }, 600)
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
                }
              })
            }
          },

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
