import { _config } from '@ecomplus/utils'
import EcomSearch from '@ecomplus/search-engine'
import dictionary from './../../lib/dictionary'
import EcProductCard from '@ecomplus/widget-product-card/src/components/EcProductCard.vue'
import { FadeTransition } from 'vue2-transitions'

export default {
  name: 'EcSearch',

  components: {
    EcProductCard,
    FadeTransition
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
    autoFixScore: {
      type: [Number, Boolean],
      default: 0.83
    }
  },

  data () {
    return {
      ecomSearch: new EcomSearch(this.storeId),
      searchTerm: this.term,
      suggestedItems: [],
      suggestedTerms: [],
      totalSearchResults: 0,
      elInput: null
    }
  },

  methods: {
    dictionary,

    handleSuggestions (term) {
      if (this.elInput.value === term) {
        let suggestTerm, autoFixTerm
        suggestTerm = autoFixTerm = term
        this.suggestedTerms = []
        this.ecomSearch.getTermSuggestions().forEach(({ options, text }) => {
          if (options.length) {
            const opt = options[0]
            if (
              !this.totalSearchResults &&
              this.autoFixScore > 0 &&
              opt.score >= this.autoFixScore &&
              opt.text.indexOf(term) === -1
            ) {
              autoFixTerm = autoFixTerm.replace(text, opt.text)
            }
            suggestTerm = suggestTerm.replace(text, opt.text)
          }
        })
        if (this.autoFixTerm !== term) {
          this.elInput.value = autoFixTerm
        } else if (suggestTerm !== term) {
          this.suggestedTerms.push(suggestTerm)
        }
      }
    },

    fetchItems () {
      this.ecomSearch.setSearchTerm(this.searchTerm).fetch()
        .then(() => {
          const { getItems, getTotalCount } = this.ecomSearch
          this.suggestedItems = getItems()
          this.totalSearchResults = getTotalCount()
          this.handleSuggestions(this.searchTerm)
        })
        .catch(err => {
          console.error(err)
        })
    }
  },

  mounted () {
    let $input
    for (let i = 0; i < this.$el.childNodes.length; i++) {
      if (this.$el.childNodes[0].tagName === 'INPUT') {
        $input = this.$el.childNodes[0]
        break
      }
    }
    if ($input) {
      $input.addEventListener('keyup', ev => {
        this.searchTerm = $input.value
      })
      if (!this.term) {
        this.searchTerm = $input.value
      } else {
        this.fetchItems()
      }
      this.elInput = $input
    } else {
      this.fetchItems()
    }
  },

  watch: {
    searchTerm (term) {
      if (term && term.length > 2) {
        this.fetchItems()
      }
    }
  }
}
