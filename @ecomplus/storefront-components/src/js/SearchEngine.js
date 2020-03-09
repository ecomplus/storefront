import {
  i19didYouMean,
  i19highestPrice,
  i19items,
  i19lowestPrice,
  i19noResultsFor,
  i19relevance,
  i19sales,
  i19sort
} from '@ecomplus/i18n'

import { i18n } from '@ecomplus/utils'
import EcomSearch from '@ecomplus/search-engine'
import ABackdrop from '../ABackdrop.vue'
import ProductCard from '../ProductCard.vue'

const resetEcomSearch = ({
  ecomSearch,
  term,
  page,
  pageSize,
  brands,
  categories
}) => {
  ecomSearch.reset()
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
}

export default {
  name: 'SearchEngine',

  components: {
    ABackdrop,
    ProductCard
  },

  props: {
    term: String,
    page: Number,
    pageSize: Number,
    brands: Array,
    categories: Array,
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
    canRetry: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      suggestedTerm: '',
      searchedTerm: '',
      resultItems: [],
      totalSearchResults: 0,
      hasSearched: false,
      filters: [],
      lastSelectedFilter: null,
      selectedOptions: {},
      selectedSortOption: null,
      countOpenRequests: 0,
      lastRequestId: null,
      isScheduled: false,
      isLoadingMore: false,
      hasNetworkError: false,
      popularItems: [],
      hasSetPopularItems: false,
      isFilterVisible: false
    }
  },

  computed: {
    i19didYouMean: () => i18n(i19didYouMean),
    i19items: () => i18n(i19items),
    i19noResultsFor: () => i18n(i19noResultsFor),
    i19relevance: () => i18n(i19relevance),
    i19sort: () => i18n(i19sort),
    ecomSearch: () => new EcomSearch(),

    isSearching () {
      return this.countOpenRequests > 0
    },

    hasEmptyResult () {
      return this.searchedTerm && !this.resultItems.length
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
      return this.hasSearched &&
        (this.isSearching || this.totalSearchResults > 8 || this.hasSelectedOptions)
    },

    hasFilters () {
      return this.hasSelectedOptions ||
        this.filters.find(({ filterObj }) => filterObj.options.length)
    }
  },

  methods: {
    fetchItems (isRetry, isPopularItems) {
      const ecomSearch = isPopularItems ? new EcomSearch() : this.ecomSearch
      const requestId = Date.now()
      this.countOpenRequests++
      this.lastRequestId = requestId
      if (!isPopularItems) {
        this.isLoadingMore = this.page > 1
      }
      ecomSearch.fetch()
        .then(() => {
          if (this.lastRequestId === requestId) {
            this.hasNetworkError = false
            if (!isPopularItems) {
              this.handleSearchResult()
            }
          }
          if (isPopularItems) {
            this.hasSetPopularItems = true
            this.popularItems = ecomSearch.getItems()
          }
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
        })
    },

    updateFilters () {

    },

    handleSuggestions () {
      const { ecomSearch, term } = this
      let suggestTerm = term
      let canAutoFix = false
      this.suggestedTerm = ''
      ecomSearch.getTermSuggestions().forEach(({ options, text }) => {
        if (options.length) {
          const opt = options[0]
          if (
            !this.totalSearchResults &&
            this.autoFixScore > 0 &&
            opt.score >= this.autoFixScore &&
            opt.text.indexOf(term) === -1
          ) {
            canAutoFix = true
          }
          suggestTerm = suggestTerm.replace(text, opt.text)
        }
      })
      if (suggestTerm !== term) {
        if (canAutoFix) {
          this.$emit('update:term', suggestTerm)
        } else {
          this.suggestedTerm = suggestTerm
        }
        ecomSearch.history.shift()
      }
    },

    handleSearchResult () {
      this.totalSearchResults = this.ecomSearch.getTotalCount()
      this.resultItems = this.isLoadingMore
        ? this.resultItems.concat(this.ecomSearch.getItems())
        : this.ecomSearch.getItems()
      this.updateFilters()
      this.handleSuggestions()
      this.hasSearched = true
      this.searchedTerm = this.term
      if (!this.totalSearchResults && this.hasPopularItems && !this.hasSetPopularItems) {
        this.fetchItems(false, true)
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
      this.scheduleFetch()
    },

    toggleFilters (isVisible) {
      this.isFilterVisible = typeof isVisible === 'boolean'
        ? isVisible : !this.isFilterVisible
    }
  },

  watch: {
    term () {
      this.resetAndFetch()
    },
    pageSize () {
      this.resetAndFetch()
    },
    brands () {
      this.resetAndFetch()
    },
    categories () {
      this.resetAndFetch()
    },

    page (page) {
      this.ecomSearch.setPageNumber(page || 1)
      this.scheduleFetch()
    }
  },

  created () {
    resetEcomSearch(this)
    this.fetchItems()
  }
}
