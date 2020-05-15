import {
  $ecomConfig,
  i18n,
  formatMoney
} from '@ecomplus/utils'

import ecomCart from '@ecomplus/shopping-cart'
import baseModulesRequestData from '../../lib/base-modules-request-data'
import APrices from '#components/APrices.vue'
import CartItem from '#components/CartItem.vue'
import DiscountApplier from '#components/DiscountApplier.vue'
import ShippingCalculator from '#components/ShippingCalculator.vue'

import {
  i19checkout,
  i19continueShopping,
  i19discount,
  i19emptyCart
} from '@ecomplus/i18n'

export default {
  name: 'EcCart',

  components: {
    APrices,
    CartItem,
    DiscountApplier,
    ShippingCalculator
  },

  props: {
    ecomCart: {
      type: Object,
      default: () => ecomCart
    },
    lang: {
      type: String,
      default: $ecomConfig.get('lang')
    },
    checkoutUrl: {
      type: String,
      default: '/app/#/checkout'
    },
    amount: {
      type: Object,
      default: () => {}
    },
    discountCoupon: String
  },

  computed: {
    i19checkout: () => i18n(i19checkout),
    i19continueShopping: () => i18n(i19continueShopping),
    i19discount: () => i18n(i19discount),
    i19emptyCart: () => i18n(i19emptyCart),
    modulesPayload: () => baseModulesRequestData,

    cart () {
      return this.ecomCart.data
    },

    localDiscountCoupon: {
      get () {
        return this.discountCoupon
      },
      set (couponCode) {
        this.$emit('update:discountCoupon', couponCode)
      }
    }
  },

  methods: {
    formatMoney
  }
}
