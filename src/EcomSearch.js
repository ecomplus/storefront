'use strict'

/* global EcomIo */

import dictionary from './lib/dictionary'

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
    // optionally preset popular terms array
    presetedTerms: {
      type: Array
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
      popularTerms: []
    }
  },

  created () {
    if (this.presetedTerms) {
      this.popularTerms = this.presetedTerms
    } else {
      // TODO: get general popular terms on Search API
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

        if (val && val !== '') {
          // get products and completed terms from E-Com Plus Search API
          let callback = (err, body) => {
            if (err) {
              console.error(err)
              return
            }

            const { hits, suggest } = body
            // update suggested items
            this.suggestedItems = hits.hits.map(({ _id, _source }) => {
              return Object.assign(_source, { _id })
            })

            if (suggest) {
              // handle terms fix
              // 'did you mean?'
              let fixedTerm = val
              this.suggestedTerms = []
              suggest.words.forEach(({ options, text }) => {
                if (options.length) {
                  fixedTerm = fixedTerm.replace(text, options[0].text)
                }
              })
              if (fixedTerm !== val) {
                // suggest fixed term
                this.suggestedTerms.push(fixedTerm)
              }
            }
          }

          // https://github.com/ecomclub/ecomplus-sdk-js#search-products
          EcomIo.searchProducts(callback, val)
        }
      }
    },

    label () {
      // for input placeholder and aria-label
      return this.placeholder || dictionary('search_products', this.lang)
    }
  },

  methods: {
    change () {
      this.$emit('change', this.term)
    },

    submit () {
      this.$emit('submit', this.term)
    },

    toggleSuggestions (state) {
      let vm = this
      // show or hide suggestions block
      vm.showSuggestions = typeof state === 'boolean' ? state : !vm.showSuggestions
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
