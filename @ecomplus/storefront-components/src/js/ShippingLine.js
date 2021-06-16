import {
  i19days,
  i19free,
  i19freeShipping,
  // i19pickUpToday,
  i19receiveToday,
  i19untilTomorrow,
  i19upTo,
  i19workingDays
} from '@ecomplus/i18n'

import {
  i18n,
  formatMoney
} from '@ecomplus/utils'

const i19pickUpToday = 'Retire hoje'

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
      if (days > 1) {
        return `${i18n(i19upTo)} ${days} ` +
          i18n(isWorkingDays ? i19workingDays : i19days).toLowerCase()
      }
      return i18n(days === 1
        ? i19untilTomorrow
        : shipping.pick_up ? i19pickUpToday : i19receiveToday)
    },

    freightValueStr () {
      const { shippingLine } = this
      const freight = typeof shippingLine.total_price === 'number'
        ? shippingLine.total_price
        : shippingLine.price
      if (freight) {
        return formatMoney(freight)
      } else {
        return i18n(shippingLine.pick_up ? i19free : i19freeShipping)
      }
    }
  }
}
