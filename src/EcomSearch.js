'use strict'

import dictionary from './lib/dictionary'

export default {
  name: 'EcomSearch',

  props: {
    lang: {
      type: String,
      default: 'pt_br'
    },
    value: {
      type: String
    },
    name: {
      type: String
    },
    placeholder: {
      type: String
    }
  },

  data () {
    return {
      term: this.value
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
