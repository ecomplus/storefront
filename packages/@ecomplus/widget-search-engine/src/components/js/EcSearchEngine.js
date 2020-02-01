import { $ecomConfig } from '@ecomplus/utils'
import EcomSearch from '@ecomplus/search-engine'
import dictionary from './../../lib/dictionary'
import EcProductCard from '@ecomplus/widget-product-card/src/components/EcProductCard.vue'

export default {
  name: 'EcSearchEngine',

  components: {
    EcProductCard
  },

  props: {
    lang: {
      type: String,
      default: $ecomConfig.get('lang')
    },
    storeId: {
      type: Number,
      default: $ecomConfig.get('store_id')
    },
    term: {
      type: String
    },
    page: {
      type: Number
    },
    pageSize: {
      type: Number
    },
    brands: {
      type: Array
    },
    categories: {
      type: Array
    },
    autoFixScore: {
      type: [Number, Boolean],
      default: 0.6
    },
    showFilters: {
      type: Boolean,
      default: false
    },
    navbarId: String,
    prerenderedHTML: String
  },

  data () {
    return {
      ecomSearch: new EcomSearch(this.storeId),
      currentPage: 0,
      resultItems: [],
      fixedTerm: '',
      totalSearchResults: 0,
      searching: false,
      loadingMore: false,
      searched: false,
      emptyResult: false,
      networkError: false,
      filters: [],
      lastSelectedFilter: null,
      selectedOptions: {},
      sortOptions: [null, 'sales', 'lowest_price', 'highest_price'],
      selectedSortOption: null
    }
  },

  computed: {
    hasSelectedOptions () {
      for (const filter in this.selectedOptions) {
        if (this.selectedOptions[filter] && this.selectedOptions[filter].length) {
          return true
        }
      }
      return false
    },

    countedItems () {
      return (this.pageSize || 24) * (this.currentPage - 1) + this.resultItems.length
    }
  },

  methods: {
    dictionary,

    fixTerm () {
      if (this.term) {
        let fixedTerm = this.term
        let autoFix = true
        this.ecomSearch.getTermSuggestions().forEach(({ options, text }) => {
          if (options.length) {
            const opt = options[0]
            if (opt.score < this.autoFixScore) {
              autoFix = false
            }
            fixedTerm = fixedTerm.replace(text, opt.text)
          }
        })
        if (autoFix && fixedTerm !== this.term) {
          this.fixedTerm = fixedTerm
          this.ecomSearch.setSearchTerm(fixedTerm).history.shift()
          this.fetchItems()
          return true
        }
      }
      return false
    },

    updateFilters () {
      const keepFilter = this.filters.find(({ filter }) => filter === this.lastSelectedFilter)
      this.filters = keepFilter ? [keepFilter] : []
      const addFilter = (filter, options, isSpec) => {
        if (this.lastSelectedFilter !== filter) {
          this.filters.push({
            filter,
            filterObj: {
              show: this.filters.length < 5,
              options
            },
            isSpec
          })
          const { selectedOptions } = this
          const optionsList = selectedOptions[filter]
            ? selectedOptions[filter].filter(option => options.find(({ key }) => key === option))
            : []
          this.$set(this.selectedOptions, filter, optionsList)
        }
      }
      ;['Brands', 'Categories'].forEach(filter => {
        addFilter(filter, this.ecomSearch[`get${filter}`]())
      })
      this.ecomSearch.getSpecs().forEach(({ key, options }, index) => {
        addFilter(key, options, true)
      })
    },

    fetchItems (page, isRetry) {
      const { ecomSearch } = this
      this.searching = true
      this.loadingMore = page > 1 || this.page > 1
      ecomSearch.setPageNumber(page).fetch()
        .then(() => {
          this.totalSearchResults = ecomSearch.getTotalCount()
          if (this.totalSearchResults || this.fixedTerm || !this.fixTerm()) {
            if (page) {
              this.currentPage = page
              this.resultItems = this.resultItems.concat(ecomSearch.getItems())
            } else {
              this.currentPage = 1
              this.resultItems = ecomSearch.getItems()
            }
            if (!this.searched) {
              if (!this.resultItems.length) {
                ecomSearch.reset()
                this.emptyResult = true
                return this.fetchItems()
              }
              setTimeout(() => {
                this.searched = true
              }, 10)
            }
            this.updateFilters()
            this.networkError = false
          }
        })
        .catch(err => {
          console.error(err)
          if (!isRetry && (!err.response || err.response.status !== 400)) {
            this.fetchItems(page, true)
          } else {
            this.networkError = true
          }
        })
        .finally(() => {
          this.searching = this.loadingMore = false
        })
    },

    toggleFilters (toShow = false) {
      this.$emit('update:showFilters', toShow)
    },

    filterLabel (filter) {
      const label = this.dictionary(filter.toLowerCase())
      if (!label && window._data && Array.isArray(window._data.grids)) {
        const grid = window._data.grids.find(grid => grid.grid_id === filter)
        if (grid) {
          return grid.title || grid.grid_id
        }
      }
      return label || filter
    },

    updateSearchFilter (filter) {
      const { ecomSearch } = this
      let setOptions = this.selectedOptions[filter]
      if (!setOptions.length) {
        setOptions = null
      }
      switch (filter) {
        case 'Brands':
          ecomSearch.setBrandNames(setOptions)
          break
        case 'Categories':
          ecomSearch.setCategoryNames(setOptions)
          break
        default:
          ecomSearch.setSpec(filter, setOptions)
      }
    },

    setFilterOption (filter, option, isSet) {
      const { selectedOptions } = this
      const optionsList = selectedOptions[filter]
      if (isSet) {
        this.lastSelectedFilter = filter
        optionsList.push(option)
      } else {
        const optionIndex = optionsList.indexOf(option)
        if (optionIndex > -1) {
          optionsList.splice(optionIndex, 1)
        }
        if (!optionsList.length && this.lastSelectedFilter === filter) {
          this.lastSelectedFilter = null
        }
      }
      this.updateSearchFilter(filter)
      this.fetchItems()
    },

    clearFilters () {
      const { selectedOptions } = this
      for (const filter in selectedOptions) {
        if (selectedOptions[filter]) {
          selectedOptions[filter] = []
          this.updateSearchFilter(filter)
        }
      }
      this.fetchItems()
    },

    setSortOrder (sort) {
      this.selectedSortOption = sort
      this.ecomSearch.setSortOrder(sort)
      this.fetchItems()
    }
  },

  created () {
    const {
      ecomSearch,
      term,
      page,
      pageSize,
      brands,
      categories
    } = this
    if (term) {
      ecomSearch.setSearchTerm(term)
    }
    if (Array.isArray(brands) && brands.length) {
      ecomSearch.setBrandNames(brands)
    }
    if (Array.isArray(categories) && categories.length) {
      ecomSearch.setCategoryNames(categories)
    }
    ecomSearch.setPageSize(pageSize || 24)
    this.fetchItems(page || 1)
  },

  mounted () {
    if (this.navbarId) {
      const $nav = this.$refs.nav
      document.getElementById(this.navbarId).appendChild($nav)
    }
    let onScrollTimer
    window.addEventListener('scroll', () => {
      clearTimeout(onScrollTimer)
      if (!this.searching && this.totalSearchResults > this.countedItems) {
        onScrollTimer = setTimeout(() => {
          const { offsetTop, offsetHeight } = this.$el
          if (window.pageYOffset + window.screen.height >= offsetTop + offsetHeight) {
            this.fetchItems(this.currentPage + 1)
          }
        }, 100)
      }
    })
  }
}
