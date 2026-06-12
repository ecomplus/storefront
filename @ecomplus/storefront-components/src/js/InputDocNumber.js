import { i19docNumber } from '@ecomplus/i18n'
import { $ecomConfig, i18n } from '@ecomplus/utils'

import {
  isValidCPF as validateCPF,
  isValidCNPJ as validateCNPJ
} from '@brazilian-utils/brazilian-utils'

import CleaveInput from 'vue-cleave-component'

const countryCode = $ecomConfig.get('country_code')

export default {
  name: 'InputDocNumber',

  components: {
    CleaveInput
  },

  props: {
    value: {
      type: [String, Number],
      required: true
    },
    isCompany: Boolean,
    allowBoth: Boolean
  },

  computed: {
    placeholder () {
      if (countryCode === 'BR') {
        if (this.allowBoth) return 'CPF / CNPJ'
        return this.isCompany ? 'CNPJ' : 'CPF'
      }
      return i18n(i19docNumber)
    },

    pattern () {
      if (countryCode === 'BR') {
        if (this.allowBoth) return '[\\d]{11}|[\\d]{14}'
        if (this.isCompany) return '[\\d]{2}\\..{15}'
        return '[\\d]{3}\\..{10}'
      }
      return '[\\d]+{9,19}'
    },

    isInvalid () {
      if (countryCode === 'BR') {
        const docNumber = this.localValue.toString().replace(/\D/g, '')
        if (this.allowBoth) {
          if (docNumber.length === 11) return !validateCPF(this.localValue)
          if (docNumber.length === 14) return !validateCNPJ(this.localValue)
          return false
        }
        const docNumberLegacy = this.localValue.toString().replace(/D/g, '')
        if (this.isCompany) {
          if (docNumberLegacy.length === 14) return !validateCNPJ(this.localValue)
        } else if (docNumberLegacy.length === 11) {
          return !validateCPF(this.localValue)
        }
      }
      return false
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
      if (this.allowBoth) return { blocks: [30] }
      return countryCode === 'BR'
        ? this.isCompany
          ? { blocks: [2, 3, 3, 4, 2], delimiters: ['.', '.', '/', '-'] }
          : { blocks: [3, 3, 3, 2], delimiters: ['.', '.', '-'] }
        : { blocks: [30] }
    }
  }
}
