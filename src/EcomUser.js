'use strict'

import dictionary from './lib/dictionary'

// E-Com Plus Passport client to handle user login
/* global EcomPassport */

export default {
  name: 'EcomUser',

  props: {
    lang: {
      type: String,
      default: 'pt_br'
    },
    storeId: {
      type: Number,
      required: true
    }
  },

  methods: {
    dictionary,

    toggle () {
    }
  },

  created () {
    EcomPassport.init(this.storeId, this.lang)
  }
}
