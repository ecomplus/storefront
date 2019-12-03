import { _config, formatMoney } from '@ecomplus/utils'
import dictionary from '@ecomplus/widget-minicart/src/lib/dictionary'
import ecomCart from '@ecomplus/shopping-cart'
import EcCartItem from '@ecomplus/widget-minicart/src/components/EcCartItem.vue'
import EcShipping from '@ecomplus/widget-product/src/components/EcShipping.vue'
import EcPrices from '@ecomplus/widget-product/src/components/EcPrices.vue'
import EcDiscount from './../EcDiscount.vue'
import { SlideYUpTransition } from 'vue2-transitions'

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
      default: _config.get('lang')
    },
    checkoutUrl: {
      type: String,
      default: '/app/#/checkout'
    },
    amount: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    cart () {
      return this.ecomCart.data
    },

    localAmount: {
      get () {
        return this.amount
      },
      set (amount) {
        this.$emit('update:amount', amount)
      }
    },

    asProduct () {
      const { total, discount } = this.localAmount
      const body = {
        price: total >= 0 ? total : this.cart.subtotal
      }
      if (discount > 0) {
        body.base_price = body.price + discount
      }
      return body
    }
  },

  methods: {
    dictionary,
    formatMoney
  }
}
