'use strict'

import dictionary from './lib/dictionary'

// E-Com Plus public APIs SDK
/* global EcomIo */

// map items objects from Elasticsearch hits response
const mapItems = hits => hits.hits.map(({ _id, _source }) => {
  return Object.assign(_source, { _id })
})

export default {
  name: 'EcomSearch',

  props: {
    overlay: {
      type: Boolean,
      default: true
    },
    lang: {
      type: String,
      default: 'pt_br'
    },
    // native input attributes
    value: {
      type: String
    },
    name: {
      type: String
    },
    placeholder: {
      type: String
    },
    // max items to suggest
    maxItems: {
      type: Number,
      default: 4
    },
    // optionally preset popular terms and items arrays
    presetedTerms: {
      type: Array
    },
    presetedItems: {
      type: Array
    },
    // try to fix search term when result is empty
    autoFix: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      term: this.value,
      showSuggestions: false,
      // best matched search results
      suggestedItems: [],
      // suggested terms based on current term
      suggestedTerms: [],
      // general popular terms
      popularTerms: this.presetedTerms || [],
      // most popular or recommended items
      popularItems: this.presetedItems || []
    }
  },

  created () {
    if (!this.presetedTerms) {
      // TODO: get general popular terms on Search API
    }

    if (!this.presetedItems) {
      // get most popular items
      // query Search API without term
      this.searchProducts((err, body) => {
        if (err) {
          console.error(err)
        } else {
          this.popularItems = mapItems(body.hits)
        }
      })
    }
  },

  computed: {
    inputValue: {
      get () {
        return this.term
      },

      set (val) {
        this.term = val
        // handle v-model
        this.$emit('input', val)

        if (val && val.length > 2) {
          let vm = this
          // get products and completed terms from E-Com Plus Search API
          let callback = (err, body) => {
            if (err) {
              console.error(err)
            } else if (val === vm.term) {
              // term checked
              const { hits, suggest } = body
              // update suggested items
              vm.suggestedItems = mapItems(hits)

              if (suggest) {
                // handle terms fix
                // 'did you mean?'
                let fixedTerm = val
                vm.suggestedTerms = []
                suggest.words.forEach(({ options, text }) => {
                  if (options.length) {
                    fixedTerm = fixedTerm.replace(text, options[0].text)
                  }
                })

                if (fixedTerm !== val) {
                  if (!vm.suggestedItems.length && vm.autoFix && fixedTerm.indexOf(val) === -1) {
                    // no search results
                    // searched terms with grammar errors ?
                    vm.inputValue = fixedTerm
                  } else {
                    // suggest fixed term
                    vm.suggestedTerms.push(fixedTerm)
                  }
                }
              }
            }
          }

          // search products by name and keywords
          // https://github.com/ecomclub/ecomplus-sdk-js#term
          this.searchProducts(callback, val)
        }
      }
    },

    label () {
      // for input placeholder and aria-label
      return this.placeholder || dictionary('search_products', this.lang)
    }
  },

  methods: {
    dictionary,

    blur () {
      if (this.term && this.term.length < 3) {
        // unset suggestions
        this.suggestedItems = this.suggestedTerms = []
      }
    },

    change () {
      this.$emit('change', this.term)
    },

    submit () {
      this.toggleSuggestions()
      if (!this.suggestedItems.length && this.suggestedTerms.length && this.autoFix) {
        // no search results
        // fix searched term to suggested
        this.term = this.suggestedTerms[0]
      }
      this.$emit('submit', this.term)
    },

    toggleSuggestions (state) {
      let vm = this
      // show or hide suggestions block
      vm.showSuggestions = typeof state === 'boolean' ? state : !vm.showSuggestions
    },

    searchProducts (callback, term) {
      // https://github.com/ecomclub/ecomplus-sdk-js#search-products
      // apply from = 0 and size = maxItems
      EcomIo.searchProducts(callback, term, 0, this.maxItems)
    }
  },

  watch: {
    value (val) {
      if (val !== this.inputValue) {
        // value changed externally
        this.inputValue = val
      }
    }
  }
}
