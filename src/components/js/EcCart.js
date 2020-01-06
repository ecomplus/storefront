import { $ecomConfig, i18n, formatMoney } from '@ecomplus/utils'
import dictionary from '@ecomplus/widget-minicart/src/lib/dictionary'
import ecomCart from '@ecomplus/shopping-cart'
import EcCartItem from '@ecomplus/widget-minicart/src/components/EcCartItem.vue'
import EcShipping from '@ecomplus/widget-product/src/components/EcShipping.vue'
import EcPrices from '@ecomplus/widget-product/src/components/EcPrices.vue'
import EcDiscount from './../EcDiscount.vue'
import { SlideYUpTransition } from 'vue2-transitions'

import {
  i19discount
} from '@ecomplus/i18n'

export default {
  name: 'EcCart',

  components: {
    EcCartItem,
    EcShipping,
    EcPrices,
    EcDiscount,
    SlideYUpTransition
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
    i19discount: () => i18n(i19discount),

    cart () {
      return this.ecomCart.data
    },

    asProduct () {
      const { total, discount } = this.amount
      const body = {
        price: total >= 0 ? total : this.cart.subtotal
      }
      if (discount > 0) {
        body.base_price = body.price + discount
      }
      return body
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
    dictionary,
    formatMoney
  }
}
