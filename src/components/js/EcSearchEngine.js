import { _config } from '@ecomplus/utils'
import EcomSearch from '@ecomplus/search-engine'
import dictionary from './../../lib/dictionary'
import EcProductCard from '@ecomplus/widget-product-card/src/components/EcProductCard.vue'
import { SlideXRightTransition, SlideYUpTransition } from 'vue2-transitions'

export default {
  name: 'EcSearchEngine',

  components: {
    EcProductCard,
    SlideXRightTransition,
    SlideYUpTransition
  },

  props: {
    lang: {
      type: String,
      default: _config.get('lang')
    },
    storeId: {
      type: Number,
      default: _config.get('store_id')
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
      default: 0.83
    },
    showFilters: {
      type: Boolean,
      default: false
    },
    navbarId: {
      type: String
    }
  },

  data () {
    return {
      ecomSearch: new EcomSearch(this.storeId),
      suggestedItems: [],
      suggestedTerm: '',
      totalSearchResults: 0,
      searching: false,
      searched: false,
      filters: [],
      lastSelectedFilter: null,
      selectedOptions: {},
      priceRange: {
        min: null,
        avg: null,
        max: null
      },
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
    }
  },

  methods: {
    dictionary,

    handleSuggestions () {
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

    fetchItems (isRetry) {
      this.searching = true
      this.ecomSearch.fetch()
        .then(() => {
          const { getItems, getPriceRange, getTotalCount } = this.ecomSearch
          this.suggestedItems = getItems()
          this.totalSearchResults = getTotalCount()
          this.priceRange = getPriceRange()
          this.handleSuggestions(this.term)
          this.updateFilters()
          this.searched = true
        })
        .catch(err => {
          console.error(err)
          if (!isRetry) {
            this.fetchItems(true)
          }
        })
        .finally(() => {
          this.searching = false
        })
    },

    toggleFilters (toShow = false) {
      this.$emit('update:showFilters', toShow)
    },

    filterLabel (filter) {
      const label = this.dictionary(filter.toLowerCase())
      if (!label) {
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
    if (page) {
      ecomSearch.setPageNumber(page)
    }
    if (pageSize) {
      ecomSearch.setPageSize(pageSize)
    }
    if (Array.isArray(brands) && brands.length) {
      ecomSearch.setBrandNames(brands)
    }
    if (Array.isArray(categories) && categories.length) {
      ecomSearch.setCategoryNames(categories)
    }
    this.fetchItems()
  },

  mounted () {
    if (this.navbarId) {
      const $nav = this.$refs.nav
      document.getElementById(this.navbarId).appendChild($nav)
    }
  }
}
