import { i18n, formatMoney, img, price, name, phone } from '@ecomplus/utils'
import {
  Summary,
  Freight,
  Discount,
  Days,
  Buyer,
  DocNumber,
  ContactPhone,
  ShippingMethod,
  WillReceive,
  WorkingDays
} from './../../lib/i18n'

export default {
  name: 'EcOrderSummary',

  props: {
    order: {
      type: Object
    }
  },

  computed: {
    dictionary() {
      return {
        Summary,
        Freight,
        Discount,
        Days,
        Buyer,
        DocNumber,
        ContactPhone,
        ShippingMethod,
        WillReceive,
        WorkingDays
      }
    },

    customerName() {
      const { name } = this.order.buyers ? this.order.buyers[0] : {}
      return `${name.given_name} ${(name.middle_name || '')} ${name.family_name}`
    },

    customerPhone () {
      const { phones } = this.order.buyers ? this.order.buyers[0] : {}
      if (phone && Array.isArray(phones)) {
        return phone(phones[0])
      }
    },

    docNumber () {
      const { doc_number } = this.order.buyers ? this.order.buyers[0] : {}
      return doc_number
    },

    shippingLines () {
      const shippingLines = this.order.shipping_lines ? this.order.shipping_lines[0] : {}
      return shippingLines
    },

    shippingMethod () {
      const { app } = this.shippingLines
      return app.label
    },

    workingDays () {
      const { delivery_time } = this.shippingLines || {}
      return delivery_time
    }
  },

  methods: {
    name,
    price,
    formatMoney,
    img(item) {
      return img(item, null, 'small')
    },

    i18n(label) {
      return i18n(this.dictionary[label])
    }
  }
}
