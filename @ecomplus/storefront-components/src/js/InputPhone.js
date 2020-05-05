import { $ecomConfig } from '@ecomplus/utils'
import CleavePhone from 'cleave.js/dist/addons/cleave-phone.br'
import CleaveInput from 'vue-cleave-component'

const countryCode = $ecomConfig.get('country_code')

export default {
  name: 'InputPhone',

  components: {
    CleaveInput,
    CleavePhone
  },

  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },

  computed: {
    placeholder () {
      return countryCode === 'BR'
        ? '11 9 9999-9999'
        : '+1 999 9999 9999'
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
        ? { phone: true, phoneRegionCode: countryCode }
        : { phone: true }
    }
  }
}
