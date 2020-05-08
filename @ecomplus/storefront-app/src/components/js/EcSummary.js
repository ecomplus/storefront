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

import {
  i18n,
  name as getName,
  price as getPrice,
  img as getImg,
  phone as getPhone,
  formatMoney
} from '@ecomplus/utils'

import ALink from '#components/ALink.vue'
import APicture from '#components/APicture.vue'
import APrices from '#components/APrices.vue'

export default {
  name: 'EcSummary',

  components: {
    ALink,
    APicture,
    APrices
  },

  props: {
    amount: {
      type: Object,
      required: true
    },
    items: Array,
    buyer: Object,
    shippingAddress: Object,
    canShowPriceOptions: Boolean
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
      return getPhone(this.buyer)
    },

    asProduct () {
      const { total, discount } = this.amount
      const body = { price: total }
      if (discount > 0) {
        body.base_price = body.price + discount
      }
      return body
    }
  },

  methods: {
    getName,
    getPrice,
    formatMoney,
    getImg: item => getImg(item, null, 'small')
  }
}
