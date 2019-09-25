import { _config, i18n } from '@ecomplus/utils'
import EcIdentify from './../EcIdentify.vue'

export default {
  name: 'EcCheckout',

  components: {
    EcIdentify
  },

  props: {
    lang: {
      type: String
    },
    storeId: {
      type: Number,
      default: _config.get('store_id')
    }
  },

  methods: {
    i18n (dictionary) {
      return i18n(dictionary, this.lang)
    },

    customerLogin (ecomPassport) {
    }
  }
}
