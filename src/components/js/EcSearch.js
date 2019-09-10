import { _config } from '@ecomplus/utils'
import EcomSearch from '@ecomplus/search-engine'
import dictionary from './../../lib/dictionary'
import EcProductCard from '@ecomplus/widget-product-card/src/components/EcProductCard.vue'
import { SlideYUpTransition } from 'vue2-transitions'

export default {
  name: 'EcSearch',

  components: {
    EcProductCard,
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
    autoFixScore: {
      type: [Number, Boolean],
      default: 0.83
    },
    popoverPlacement: {
      type: String,
      default: 'bottom'
    }
  },

  data () {
    return {
      ecomSearch: new EcomSearch(this.storeId),
      searchTerm: this.term,
      searching: false,
      suggestedItems: [],
      suggestedTerm: '',
      totalSearchResults: 0,
      elInput: null,
      showPopover: false
    }
  },

  computed: {
    history () {
      return this.ecomSearch.history
        .filter(term => term.length > 2 && this.searchTerm.indexOf(term) === -1)
        .slice(0, 5)
    }
  },

  methods: {
    dictionary,

    setSearchTerm (term) {
      this.elInput.value = term
      const $form = this.$el.parentElement
      if ($form && $form.tagName === 'FORM') {
        $form.submit()
      } else {
        this.searchTerm = term
      }
    },

    handleSuggestions (term) {
      if (this.elInput.value === term) {
        let suggestTerm, autoFixTerm
        suggestTerm = autoFixTerm = term
        this.suggestedTerm = ''
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
        if (autoFixTerm !== term) {
          this.elInput.value = this.searchTerm = autoFixTerm
        } else if (suggestTerm !== term) {
          this.suggestedTerm = suggestTerm
        }
      }
    },

    fetchItems (term) {
      if (!term) {
        term = this.searchTerm
      }
      this.searching = true
      this.ecomSearch.setSearchTerm(term).fetch()
        .then(() => {
          const { getItems, getTotalCount } = this.ecomSearch
          this.suggestedItems = getItems()
          this.totalSearchResults = getTotalCount()
          this.handleSuggestions(term)
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
    window.addEventListener('scroll', () => {
      if (window.navFixed && this.showPopover && window.screen.height > 450) {
        this.showPopover = false
      }
    })
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
        if (!this.showPopover) {
          this.showPopover = true
        }
      })
      if (!this.term) {
        this.searchTerm = $input.value
      } else {
        this.fetchItems()
      }
      $input.setAttribute('autocomplete', 'off')
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
