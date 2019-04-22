'use strict'

import dictionary from './lib/dictionary'

export default {
  name: 'EcomSearch',

  props: {
    lang: {
      type: String,
      default: 'pt_br'
    },
    placeholder: {
      type: String
    }
  },

  computed: {
    label () {
      // for input placeholder and aria-label
      return this.placeholder || dictionary('search_products', this.lang)
    }
  },

  methods: {
    submit () {
    }
  }
}
