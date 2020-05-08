import {
  i19checkout,
  i19close,
  i19continueShopping,
  i19emptyCart,
  i19myShoppingCart,
  i19seeCart,
  i19subtotal
} from '@ecomplus/i18n'

import {
  i18n,
  formatMoney
} from '@ecomplus/utils'

import ecomCart from '@ecomplus/shopping-cart'
import ALink from '../ALink.vue'
import ABackdrop from '../ABackdrop.vue'
import APrices from '../APrices.vue'
import CartItem from '../CartItem.vue'

export default {
  name: 'CartQuickview',

  components: {
    ALink,
    ABackdrop,
    APrices,
    CartItem
  },

  props: {
    isVisible: {
      type: Boolean,
      default: true
    },
    checkoutUrl: {
      type: String,
      default: '/app/#/checkout'
    },
    cartUrl: {
      type: String,
      default: '/app/#/cart'
    },
    canOpenOnNewItem: {
      type: Boolean,
      default: true
    },
    ecomCart: {
      type: Object,
      default () {
        return ecomCart
      }
    }
  },

  computed: {
    i19checkout: () => i18n(i19checkout),
    i19close: () => i18n(i19close),
    i19continueShopping: () => i18n(i19continueShopping),
    i19emptyCart: () => i18n(i19emptyCart),
    i19myShoppingCart: () => i18n(i19myShoppingCart),
    i19seeCart: () => i18n(i19seeCart),
    i19subtotal: () => i18n(i19subtotal),

    cart () {
      return this.ecomCart.data
    }
  },

  methods: {
    formatMoney,

    toggle (isVisible) {
      this.$emit(
        'update:is-visible',
        typeof isVisible === 'boolean' ? isVisible : !this.isVisible
      )
    }
  },

  created () {
    if (this.canOpenOnNewItem) {
      this.ecomCart.on('addItem', ({ data }) => {
        this.$set(this.ecomCart, 'data', data)
        this.$nextTick(() => {
          this.toggle(true)
        })
      })
    }
  }
}
