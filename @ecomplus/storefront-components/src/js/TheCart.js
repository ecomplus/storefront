import {
  $ecomConfig,
  i18n,
  formatMoney
} from '@ecomplus/utils'

import ecomCart from '@ecomplus/shopping-cart'
import APrices from './../APrices.vue'
import CartItem from './../CartItem.vue'
import DiscountApplier from './../DiscountApplier.vue'
import ShippingCalculator from './../ShippingCalculator.vue'
import RecommendedItems from './../RecommendedItems.vue'

import {
  i19checkout,
  i19continueShopping,
  i19discount,
  i19emptyCart
} from '@ecomplus/i18n'

export default {
  name: 'TheCart',

  components: {
    APrices,
    CartItem,
    DiscountApplier,
    ShippingCalculator,
    RecommendedItems
  },

  props: {
    ecomCart: {
      type: Object,
      default () {
        return ecomCart
      }
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
      default () {
        return {}
      }
    },
    discountCoupon: String,
    baseModulesRequestData: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  computed: {
    i19checkout: () => i18n(i19checkout),
    i19continueShopping: () => i18n(i19continueShopping),
    i19discount: () => i18n(i19discount),
    i19emptyCart: () => i18n(i19emptyCart),
    cart () {
      return this.ecomCart.data
    },
    localDiscountCoupon: {
      get () {
        return this.discountCoupon
      },
      set (couponCode) {
        this.$emit('update:discount-coupon', couponCode)
      }
    }
  },

  methods: {
    formatMoney,
    selectShippingService (service) {
      this.$emit('shipping-service', service)
      this.$nextTick(() => {
        this.hasShippingService = true
      })
    }
  },

  mounted () {
    const cartWatcher = () => {
      this.hasShippingService = false
    }
    this.ecomCart.on('change', cartWatcher)
    this.$once('hook:beforeDestroy', () => {
      this.ecomCart.off('change', cartWatcher)
    })
  }
}
