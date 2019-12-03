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
    discountValue: {
      type: Number
    },
    totalValue: {
      type: Number
    }
  },

  computed: {
    cart () {
      return this.ecomCart.data
    },

    asProduct () {
      const body = {
        price: this.totalValue >= 0 ? this.totalValue : this.cart.subtotal
      }
      if (this.discountValue > 0) {
        body.base_price = body.price + this.discountValue
      }
      return body
    }
  },

  methods: {
    dictionary,
    formatMoney
  }
}
