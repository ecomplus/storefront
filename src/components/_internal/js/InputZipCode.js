import { _config, i18n } from '@ecomplus/utils'
import CleaveInput from 'vue-cleave-component'

import {
  ZipCode
} from './../../../lib/i18n'

const countryCode = _config.get('country_code')

export default {
  name: 'InputZipCode',

  components: {
    CleaveInput
  },

  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },

  computed: {
    placeholder () {
      return i18n(ZipCode)
    },

    pattern () {
      if (countryCode === 'BR') {
        return '[\\d]{5}-[\\d]{3}'
      }
      return null
    },

    localValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },

    cleaveOptions () {
      return countryCode === 'BR'
        ? { blocks: [5, 3], delimiter: '-' }
        : { blocks: [30] }
    }
  }
}
