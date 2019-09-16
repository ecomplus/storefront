import { _config } from '@ecomplus/utils'
import EcomSearch from '@ecomplus/search-engine'
import dictionary from './../../lib/dictionary'
import EcProductCard from '@ecomplus/widget-product-card/src/components/EcProductCard.vue'
import { SlideXLeftTransition, SlideYUpTransition } from 'vue2-transitions'

export default {
  name: 'EcSearchEngine',

  components: {
    EcProductCard,
    SlideXLeftTransition,
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
      showFilters: window.screen.width >= 992,
      filters: {},
      lastSelectedFilter: null,
      priceRange: {
        min: null,
        avg: null,
        max: null
      }
    }
  },

  methods: {
    dictionary,

    handleSuggestions () {
    },

    fetchItems () {
      this.searching = true
      this.ecomSearch.fetch()
        .then(() => {
          const { getItems, getPriceRange, getTotalCount } = this.ecomSearch
          this.suggestedItems = getItems()
          this.totalSearchResults = getTotalCount()
          this.handleSuggestions(this.term)
          ;['Brands', 'Categories', 'Specs'].forEach(filter => {
            if (this.lastSelectedFilter !== filter) {
              this.filters[filter] = this.ecomSearch[`get${filter}`]()
            }
          })
          this.priceRange = getPriceRange()
          this.searched = true
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          this.searching = false
        })
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
  }
}
