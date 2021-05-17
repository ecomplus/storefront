import {
  i19checkout,
  i19continueShopping,
  i19discount,
  i19emptyCart
} from '@ecomplus/i18n'

import {
  i18n,
  formatMoney
} from '@ecomplus/utils'

import ecomCart from '@ecomplus/shopping-cart'
import APrices from './../APrices.vue'
import CartItem from './../CartItem.vue'
import DiscountApplier from './../DiscountApplier.vue'
import ShippingCalculator from './../ShippingCalculator.vue'
import EarnPointsProgress from './../EarnPointsProgress.vue'
import RecommendedItems from './../RecommendedItems.vue'

export default {
  name: 'TheCart',

  components: {
    APrices,
    CartItem,
    DiscountApplier,
    ShippingCalculator,
    EarnPointsProgress,
    RecommendedItems
  },

  props: {
    amount: {
      type: Object,
      default () {
        return {}
      }
    },
    checkoutUrl: {
      type: String,
      default: '/app/#/checkout'
    },
    zipCode: String,
    discountCoupon: String,
    modulesPayload: Object,
    ecomCart: {
      type: Object,
      default () {
        return ecomCart
      }
    }
  },

  data () {
    return {
      localZipCode: this.zipCode,
      canApplyDiscount: false,
      isCouponApplied: false
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

    isValidCart () {
      return this.ecomCart.data.items.find(({ quantity }) => quantity)
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
      this.$emit('select-shipping', service)
      this.$nextTick(() => {
        this.canApplyDiscount = true
      })
    },

    setDiscountRule (discountRule) {
      this.$emit('set-discount-rule', discountRule)
      this.$nextTick(() => {
        this.isCouponApplied = Boolean(this.discountCoupon && this.amount.discount)
      })
    }
  },

  watch: {
    localZipCode (zipCode) {
      this.$emit('update:zip-code', zipCode)
    },

    canApplyDiscount (canApplyDiscount) {
      if (!canApplyDiscount) {
        this.isCouponApplied = false
      }
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.canApplyDiscount = !this.localZipCode
    })
    const { ecomCart } = this
    let oldSubtotal = ecomCart.data.subtotal
    const cartWatcher = ({ data }) => {
      this.canApplyDiscount = !this.localZipCode
      if (oldSubtotal > data.subtotal) {
        ecomCart.data.items.forEach(({ _id, quantity, flags }) => {
          if (Array.isArray(flags) && flags.includes('freebie') && quantity === 1) {
            ecomCart.removeItem(_id)
          }
        })
      }
      oldSubtotal = data.subtotal
    }
    ecomCart.on('change', cartWatcher)
    this.$once('hook:beforeDestroy', () => {
      ecomCart.off('change', cartWatcher)
    })
  }
}
