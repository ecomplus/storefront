import { _config, i18n } from '@ecomplus/utils'
import EcIdentify from './../EcIdentify.vue'
import EcAddresses from './../EcAddresses.vue'
import EcPayment from './../EcPayment.vue'
import EcCartItem from '@ecomplus/widget-minicart/src/components/EcCartItem.vue'
import EcShipping from '@ecomplus/widget-product/src/components/EcShipping.vue'
import EcPrices from '@ecomplus/widget-product/src/components/EcPrices.vue'
import { FadeTransition } from 'vue2-transitions'

import {
  BackToCart,
  Continue
} from './../../lib/i18n'

export default {
  name: 'EcCheckout',

  components: {
    EcIdentify,
    EcAddresses,
    EcPayment,
    EcCartItem,
    EcShipping,
    EcPrices,
    FadeTransition
  },

  props: {
    lang: {
      type: String
    },
    storeId: {
      type: Number,
      default: _config.get('store_id')
    },
    mergeDictionary: {
      type: Object,
      default: () => {}
    },
    cartUrl: {
      type: String,
      default: '/app/#/cart'
    },
    customerEmail: {
      type: String
    },
    checkoutStep: {
      type: Number,
      default: 1
    }
  },

  data () {
    return {
      toCheckoutStep: this.checkoutStep,
      isLogged: false,
      userEmail: this.customerEmail
    }
  },

  computed: {
    dictionary () {
      return {
        BackToCart,
        Continue,
        ...this.mergeDictionary
      }
    },

    userIdentified () {
      return this.isLogged || this.userEmail
    },

    shownCheckoutStep () {
      if (!this.userIdentified) {
        return 0
      } else {
        return this.toCheckoutStep
      }
    }
  },

  methods: {
    i18n (label) {
      return i18n(this.dictionary[label], this.lang)
    },

    login (ecomPassport) {
      this.isLogged = ecomPassport.isLogged()
      if (this.isLogged) {
        this.userEmail = ecomPassport.getCustomer().main_email
        this.$emit('login', ecomPassport)
      }
    }
  },

  watch: {
    userEmail (email) {
      if (this.shownCheckoutStep === 0) {
        this.toCheckoutStep = 1
      }
      this.$emit('update:customerEmail', email)
    },

    toCheckoutStep (stepNumber) {
      this.$emit('update:checkoutStep', stepNumber)
    }
  }
}
