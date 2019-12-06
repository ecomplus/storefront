import { i18n, name, formatMoney, price, img } from '@ecomplus/utils'
import ecomCart from '@ecomplus/shopping-cart'

import {
  i19discount,
  i19freight,
  i19subtotal,
  i19summary,
  i19total
} from '@ecomplus/i18n'

export default {
  name: 'EcSummary',

  props: {
    ecomCart: {
      type: Object,
      default: () => ecomCart
    },
    amount: {
      type: Object,
      default: () => {}
    },
    customer: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    i19discount: () => i18n(i19discount),
    i19freight: () => i18n(i19freight),
    i19subtotal: () => i18n(i19subtotal),
    i19summary: () => i18n(i19summary),
    i19total: () => i18n(i19total),

    shippingAddress () {
      const { addresses } = this.customer
      return addresses && addresses.find(addr => addr.default)
    },

    cart () {
      return this.ecomCart.data
    },

    localAmount () {
      if (typeof this.amount.total === 'number') {
        return this.amount
      }
      const { subtotal } = this
      return {
        subtotal,
        total: subtotal
      }
    }
  },

  methods: {
    name,
    price,
    formatMoney,
    img: item => img(item, null, 'small')
  }
}
