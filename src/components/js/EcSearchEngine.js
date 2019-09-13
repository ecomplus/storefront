import { _config } from '@ecomplus/utils'
import EcomSearch from '@ecomplus/search-engine'
import dictionary from './../../lib/dictionary'

export default {
  name: 'EcSearchEngine',

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
    brands: {
      type: Array
    },
    categories: {
      type: Array
    }
  },

  data () {
    return {
      ecomSearch: new EcomSearch(this.storeId),
      suggestedItems: [],
      suggestedTerm: '',
      totalSearchResults: 0,
      searching: false
    }
  },

  methods: {
    dictionary
  },

  created () {
  }
}
