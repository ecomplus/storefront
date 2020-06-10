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
import RecommendedItems from '#components/RecommendedItems.vue'

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
    ShippingCalculator,
    RecommendedItems
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

  data () {
    return {
      hasShippingService: false
    }
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
    formatMoney,

    selectShippingService (service) {
      this.$emit('shippingService', service)
      this.$nextTick(() => {
        this.hasShippingService = true
      })
    }
  },

  mounted () {
    const { ecomCart } = this
    let oldSubtotal = ecomCart.data.subtotal
    const cartWatcher = ({ data }) => {
      this.hasShippingService = false
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
