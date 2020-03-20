import {
  i19days,
  i19freeShipping,
  i19upTo,
  i19workingDays
} from '@ecomplus/i18n'

import {
  i18n,
  formatMoney
} from '@ecomplus/utils'

export default {
  name: 'ShippingLine',

  props: {
    shippingLine: {
      type: Object,
      required: true
    }
  },

  computed: {
    deadlineStr () {
      const shipping = this.shippingLine
      const isWorkingDays = (shipping.posting_deadline && shipping.posting_deadline.working_days) ||
        (shipping.delivery_time && shipping.delivery_time.working_days)
      let days = shipping.posting_deadline ? shipping.posting_deadline.days : 0
      if (shipping.delivery_time) {
        days += shipping.delivery_time.days
      }
      return `${i18n(i19upTo)} ${days} ${i18n(isWorkingDays ? i19workingDays : i19days)}`
    },

    freightValueStr () {
      const freight = typeof this.shippingLine.total_price === 'number'
        ? this.shippingLine.total_price
        : this.shippingLine.price
      if (freight) {
        return formatMoney(freight)
      } else {
        return i18n(i19freeShipping)
      }
    }
  }
}
