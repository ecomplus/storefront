import { i18n, name, formatMoney, price, img, phone } from '@ecomplus/utils'

import {
  i19buyer,
  i19contactPhone,
  i19discount,
  i19docNumber,
  i19freight,
  i19myAccount,
  i19subtotal,
  i19summary,
  i19total
} from '@ecomplus/i18n'

export default {
  name: 'EcSummary',

  props: {
    amount: {
      type: Object,
      required: true
    },
    items: Array,
    buyer: Object,
    shippingAddress: Object
  },

  computed: {
    i19buyer: () => i18n(i19buyer),
    i19contactPhone: () => i18n(i19contactPhone),
    i19discount: () => i18n(i19discount),
    i19docNumber: () => i18n(i19docNumber),
    i19freight: () => i18n(i19freight),
    i19myAccount: () => i18n(i19myAccount),
    i19subtotal: () => i18n(i19subtotal),
    i19summary: () => i18n(i19summary),
    i19total: () => i18n(i19total),

    buyerName () {
      if (!this.buyer) {
        return ''
      }
      const { name } = this.buyer
      return `${name.given_name} ${(name.middle_name || '')} ${name.family_name}`
    },

    buyerPhone () {
      return phone(this.buyer)
    }
  },

  methods: {
    name,
    price,
    formatMoney,
    img: item => img(item, null, 'small')
  }
}
