import {
  i19all,
  i19asOf,
  i19brands,
  i19categories,
  i19clearFilters,
  i19closeFilters,
  i19didYouMean,
  i19filter,
  i19filterResults,
  i19highestPrice,
  i19itemsFound,
  i19lowestPrice,
  i19name,
  i19noResultsFor,
  i19popularProducts,
  i19price,
  i19refineSearch,
  i19releases,
  i19relevance,
  i19results,
  i19sales,
  i19searchAgain,
  i19searchingFor,
  i19searchOfflineErrorMsg,
  i19sort,
  i19upTo
} from '@ecomplus/i18n'

import {
  i18n,
  formatMoney
} from '@ecomplus/utils'

import lozad from 'lozad'
import EcomSearch from '@ecomplus/search-engine'
import { Portal } from '@linusborg/vue-simple-portal'
import scrollToElement from './helpers/scroll-to-element'
import ABackdrop from '../ABackdrop.vue'
import ProductCard from '../ProductCard.vue'

const resetEcomSearch = ({ ecomSearch, term, page, defaultSort }) => {
  ecomSearch.reset()
  if (defaultSort) {
    ecomSearch.setSortOrder(defaultSort)
  }
  if (term) {
    ecomSearch.setSearchTerm(term)
  }
  if (page) {
    ecomSearch.setPageNumber(page)
  }
}

export default {
  name: 'SearchEngine',

  components: {
    Portal,
    ABackdrop,
    ProductCard
  },

  props: {
    term: String,
    page: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 24
    },
    brands: Array,
    categories: Array,
    isFixedBrands: Boolean,
    isFixedCategories: Boolean,
    defaultSort: String,
    defaultFilters: Object,
    autoFixScore: {
      type: Number,
      default: 0.6
    },
    isFilterable: {
      type: Boolean,
      default: true
    },
    hasPopularItems: {
      type: Boolean,
      default: true
    },
    canLoadMore: {
      type: Boolean,
      default: true
    },
    loadMoreSelector: String,
    canRetry: {
      type: Boolean,
      default: true
    },
    canShowItems: {
      type: Boolean,
      default: true
    },
    productCardProps: Object,
    gridsData: {
      type: Array,
      default () {
        if (typeof window === 'object' && window.storefront && window.storefront.data) {
          return window.storefront.data.grids
        }
      }
    }
  },

  data () {
    return {
      suggestedTerm: '',
      resultItems: [],
      totalSearchResults: 0,
      hasSearched: false,
      noResultsTerm: '',
      keepNoResultsTerm: false,
      filters: [],
      priceRange: {},
      priceOptions: [],
      hasSetPriceRange: false,
      lastSelectedFilter: null,
      selectedOptions: {},
      selectedSortOption: null,
      countOpenRequests: 0,
      lastRequestId: null,
      isScheduled: false,
      isLoadingMore: false,
      mustSkipLoadMore: false,
      hasNetworkError: false,
      popularItems: [],
      hasSetPopularItems: false,
      isAsideVisible: false,
      searchFilterId: 0
    }
  },

  computed: {
    i19all: () => i18n(i19all),
    i19clearFilters: () => i18n(i19clearFilters),
    i19closeFilters: () => i18n(i19closeFilters),
    i19didYouMean: () => i18n(i19didYouMean),
    i19filter: () => i18n(i19filter),
    i19filterResults: () => i18n(i19filterResults),
    i19itemsFound: () => i18n(i19itemsFound),
    i19noResultsFor: () => i18n(i19noResultsFor),
    i19popularProducts: () => i18n(i19popularProducts),
    i19price: () => i18n(i19price),
    i19refineSearch: () => i18n(i19refineSearch),
    i19relevance: () => i18n(i19relevance),
    i19results: () => i18n(i19results),
    i19searchAgain: () => i18n(i19searchAgain),
    i19searchingFor: () => i18n(i19searchingFor),
    i19searchOfflineErrorMsg: () => i18n(i19searchOfflineErrorMsg),
    i19sort: () => i18n(i19sort),

    ecomSearch: () => new EcomSearch(),

    isSearching () {
      return this.countOpenRequests > 0
    },

    hasEmptyResult () {
      return this.hasSearched && !this.resultItems.length
    },

    sortOptions: () => [
      {
        value: null,
        label: i18n(i19relevance)
      }, {
        value: 'sales',
        label: i18n(i19sales)
      }, {
        value: 'lowest_price',
        label: i18n(i19lowestPrice)
      }, {
        value: 'highest_price',
        label: i18n(i19highestPrice)
      }, {
        value: 'news',
        label: i18n(i19releases)
      }, {
        value: 'slug',
        label: i18n(i19name)
      }
    ],

    hasSelectedOptions () {
      for (const filter in this.selectedOptions) {
        if (this.selectedOptions[filter] && this.selectedOptions[filter].length) {
          return true
        }
      }
      return false
    },

    isNavVisible () {
      return this.hasSearched && this.isFilterable &&
        (this.isSearching ||
          this.totalSearchResults > 8 ||
          this.hasSelectedOptions ||
          this.hasSetPriceRange)
    },

    isResultsVisible () {
      return (this.hasSearched && !this.isSearching) || this.suggestedItems.length
    },

    hasFilters () {
      return this.hasSelectedOptions ||
        this.filters.find(({ options }) => options.length) ||
        this.hasSetPriceRange
    },

    suggestedItems () {
      return this.resultItems.length ? this.resultItems : this.popularItems
    },

    loadObserver () {
      return this.canLoadMore && lozad('#search-engine-load-more', {
        load: () => {
          if (!this.mustSkipLoadMore) {
            this.mustSkipLoadMore = this.isLoadingMore = true
            this.fetchItems()
          }
        }
      })
    },

    pageAnchorIndex () {
      const count = this.suggestedItems.length
      const rest = count % this.pageSize
      return (rest === 0 ? count - this.pageSize : count - rest) - 1
    }
  },

  methods: {
    fetchItems (isRetry, isPopularItems) {
      const ecomSearch = isPopularItems ? new EcomSearch() : this.ecomSearch
      const requestId = Date.now()
      this.countOpenRequests++
      this.lastRequestId = requestId
      if (this.isLoadingMore) {
        ecomSearch.setPageNumber(this.page + Math.ceil(this.resultItems.length / this.pageSize))
      }
      const fetching = ecomSearch.setPageSize(this.pageSize).fetch()
        .then(result => {
          if (this.lastRequestId === requestId) {
            this.hasNetworkError = false
            if (!isPopularItems) {
              this.handleSearchResult()
            }
          }
          if (isPopularItems || (!this.term && !this.brands && !this.categories)) {
            this.hasSetPopularItems = true
            this.popularItems = ecomSearch.getItems()
          }
          return result
        })
        .catch(err => {
          console.error(err)
          if (this.lastRequestId === requestId || isPopularItems) {
            if (this.canRetry && !isRetry && (!err.response || err.response.status !== 400)) {
              this.fetchItems(true, isPopularItems)
            } else {
              this.hasNetworkError = true
            }
          }
        })
        .finally(() => {
          this.countOpenRequests--
          if (this.isLoadingMore) {
            this.isLoadingMore = false
            this.$nextTick(() => setTimeout(() => {
              this.mustSkipLoadMore = false
              this.loadObserver.observe()
            }, 300))
          }
        })
      this.$emit('fetch', { ecomSearch, fetching, isPopularItems })
    },

    updateFilters () {
      const updatedFilters = []
      const addFilter = (filter, options, isSpec) => {
        let filterIndex = this.filters.findIndex(filterObj => filterObj.filter === filter)
        if (filter !== this.lastSelectedFilter) {
          if (filterIndex === -1) {
            filterIndex = this.filters.length
          }
          if (this[`isFixed${filter}`]) {
            const presetedOptions = this[filter.toLowerCase()]
            if (presetedOptions) {
              options = options.filter(({ key }) => presetedOptions.indexOf(key) === -1)
            }
          }
          this.filters[filterIndex] = {
            filter,
            options,
            isSpec
          }
          const optionsList = !this.selectedOptions[filter]
            ? []
            : this.selectedOptions[filter]
              .filter(option => options.find(({ key }) => key === option))
          this.$set(this.selectedOptions, filter, optionsList)
        }
        updatedFilters.push(filterIndex)
      }
      addFilter('Brands', this.ecomSearch.getBrands())
      addFilter('Categories', this.ecomSearch.getCategories())
      this.ecomSearch.getSpecs().forEach(({ key, options }) => {
        addFilter(key, options, true)
      })
      this.filters = this.filters.filter((_, i) => updatedFilters.includes(i))
      this.searchFilterId = Date.now()
    },

    updatePriceOptions () {
      this.priceRange = this.ecomSearch.getPriceRange()
      if (Math.round(this.priceRange.min) < Math.round(this.priceRange.avg)) {
        const price1 = Math.ceil(Math.max(this.priceRange.min * 1.5, this.priceRange.avg / 2))
        const price2 = Math.ceil(Math.min(this.priceRange.max / 1.5, this.priceRange.avg * 2))
        if (price1 !== price2) {
          this.priceOptions = [Math.min(price1, price2), Math.max(price1, price2), null]
            .map((max, i, prices) => {
              const min = prices[i - 1]
              return {
                min,
                max,
                label: !min
                  ? `${i18n(i19upTo)} ${formatMoney(max)}`
                  : i < 2
                    ? `${formatMoney(min)} - ${formatMoney(max)}`
                    : `${i18n(i19asOf)} ${formatMoney(min)}`
              }
            })
          return
        }
      }
      this.priceOptions = []
    },

    handleSuggestions () {
      if (this.term) {
        const { ecomSearch } = this
        const term = this.term.toLowerCase()
        let suggestTerm = term
        let canAutoFix = false
        this.suggestedTerm = ''
        ecomSearch.getTermSuggestions().forEach(({ options, text }) => {
          if (options.length) {
            const opt = options[0]
            const optTerm = opt.text.toLowerCase()
            if (
              !this.totalSearchResults &&
              this.autoFixScore > 0 &&
              opt.score >= this.autoFixScore &&
              optTerm.indexOf(term) === -1
            ) {
              canAutoFix = true
            }
            suggestTerm = suggestTerm.replace(new RegExp(text, 'i'), optTerm)
          }
        })
        if (!this.keepNoResultsTerm) {
          this.noResultsTerm = ''
        } else {
          this.keepNoResultsTerm = false
        }
        if (suggestTerm !== term) {
          if (canAutoFix) {
            this.noResultsTerm = term
            this.keepNoResultsTerm = true
            this.$emit('update:term', suggestTerm)
          } else {
            this.suggestedTerm = suggestTerm
          }
          ecomSearch.history.shift()
        }
      }
    },

    handleSearchResult () {
      const { ecomSearch } = this
      this.totalSearchResults = ecomSearch.getTotalCount()
      this.resultItems = this.isLoadingMore
        ? this.resultItems.concat(ecomSearch.getItems())
        : ecomSearch.getItems()
      this.updateFilters()
      if (!this.hasSearched && this.defaultFilters) {
        for (const filter in this.defaultFilters) {
          const options = this.defaultFilters[filter]
          if (Array.isArray(options)) {
            options.forEach(option => this.setFilterOption(filter, option, true))
          } else if (typeof options === 'string') {
            this.setFilterOption(filter, options, true)
          }
        }
      }
      this.updatePriceOptions()
      this.handleSuggestions()
      if (!this.totalSearchResults && this.hasPopularItems && !this.hasSetPopularItems) {
        this.fetchItems(false, true)
      }
      this.$emit(this.isLoadingMore ? 'load-more' : 'search', { ecomSearch })
      if (!this.hasSearched) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.hasSearched = true
          }, 100)
        })
      }
    },

    scheduleFetch () {
      if (!this.isScheduled) {
        this.isScheduled = true
        this.$nextTick(() => {
          setTimeout(() => {
            this.fetchItems()
            this.isScheduled = false
          }, 30)
        })
      }
    },

    resetAndFetch () {
      resetEcomSearch(this)
      this.handlePresetedOptions()
      this.scheduleFetch()
    },

    toggleFilters (isVisible) {
      this.isAsideVisible = typeof isVisible === 'boolean'
        ? isVisible
        : !this.isAsideVisible
    },

    getFilterLabel (filter) {
      switch (filter) {
        case 'Brands':
          return i18n(i19brands)
        case 'Categories':
          return i18n(i19categories)
        default:
          if (this.gridsData) {
            const grid = this.gridsData.find(grid => grid.grid_id === filter)
            if (grid) {
              return grid.title || grid.grid_id
            }
          }
      }
      return filter
    },

    handlePresetedOptions () {
      ;['brands', 'categories'].forEach(prop => {
        if (this[prop] && this[prop].length) {
          const filter = prop.charAt(0).toUpperCase() + prop.slice(1)
          if (!this[`isFixed${filter}`]) {
            this.selectedOptions[filter] = this[prop]
          }
          this.updateSearchFilter(filter)
        }
      })
    },

    updateSearchFilter (filter) {
      const { ecomSearch } = this
      let setOptions = this.selectedOptions[filter]
      if (setOptions === undefined || !setOptions.length) {
        setOptions = null
      }
      switch (filter) {
        case 'Brands':
          if (this.isFixedBrands && this.brands) {
            setOptions = setOptions ? setOptions.concat(this.brands) : this.brands
          }
          ecomSearch.setBrandNames(setOptions)
          break
        case 'Categories':
          ecomSearch.setCategoryNames(setOptions)
          if (this.isFixedCategories && this.categories) {
            ecomSearch.mergeFilter({
              terms: {
                'categories.name': this.categories
              }
            })
          }
          break
        default:
          ecomSearch.setSpec(filter, setOptions)
      }
    },

    handlePriceInputs () {
      const { inputMinPrice, inputMaxPrice } = this.$refs
      const min = Number(inputMinPrice.value) || null
      const max = Number(inputMaxPrice.value) || null
      if ((min && !max) || min <= max) {
        this.setPriceRange(min, max)
      }
      inputMinPrice.value = (min || '')
      inputMaxPrice.value = (max || '')
    },

    setPriceRange (min, max) {
      if (
        (min && min !== this.priceRange.min) ||
        (max && max !== this.priceRange.max)
      ) {
        this.hasSetPriceRange = true
      } else if (this.hasSetPriceRange) {
        this.hasSetPriceRange = false
      } else {
        return
      }
      this.ecomSearch.setPriceRange(min, max)
      this.scheduleFetch()
    },

    setFilterOption (filter, option, isSet) {
      const { selectedOptions } = this
      const optionsList = selectedOptions[filter]
      if (optionsList) {
        const optionIndex = optionsList.indexOf(option)
        if (isSet) {
          if (optionIndex === -1) {
            this.lastSelectedFilter = filter
            optionsList.push(option)
          }
        } else {
          if (optionIndex > -1) {
            optionsList.splice(optionIndex, 1)
          }
          if (!optionsList.length && this.lastSelectedFilter === filter) {
            this.lastSelectedFilter = null
          }
        }
        this.updateSearchFilter(filter)
        this.scheduleFetch()
      }
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
      if (this.page > 1) {
        this.page = 1
      } else {
        this.scheduleFetch()
      }
    }
  },

  watch: {
    term () {
      this.resetAndFetch()
    },
    brands () {
      this.resetAndFetch()
    },
    categories () {
      this.resetAndFetch()
    },

    page (page) {
      this.ecomSearch.setPageNumber(page)
      this.scheduleFetch()
    },

    isSearching (isSearching) {
      if (!isSearching && this.loadObserver) {
        this.$nextTick(() => {
          if (!this.mustSkipLoadMore) {
            this.loadObserver.observe()
          } else {
            setTimeout(() => scrollToElement(this.$refs.pageAnchor[0], 40), 100)
          }
        })
      }
    }
  },

  created () {
    resetEcomSearch(this)
    this.handlePresetedOptions()
    this.fetchItems()
  }
}
