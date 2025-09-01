import {
  i19days,
  i19free,
  i19freeShipping,
  i19pickUpToday,
  i19receiveToday,
  i19untilTomorrow,
  i19upTo,
  i19workingDays
} from '@ecomplus/i18n'

import {
  i18n,
  formatMoney
} from '@ecomplus/utils'

const globalOpts = (typeof window === 'object' && window.propsShippingLine) || {}

export default {
  name: 'ShippingLine',

  props: {
    shippingLine: {
      type: Object,
      required: true
    },
    productionDeadline: {
      type: Number,
      default: 0
    },
    getDeadlineStr: {
      type: Function,
      default: globalOpts.getDeadlineStr
    }
  },

  computed: {
    i19workingDay: () => i18n({
      en_us: 'Working day',
      pt_br: 'Dia útil'
    }),

    deadlineStr () {
      const shipping = this.shippingLine
      const isWorkingDays = (shipping.posting_deadline && shipping.posting_deadline.working_days) ||
        (shipping.delivery_time && shipping.delivery_time.working_days)
      let days = shipping.posting_deadline ? shipping.posting_deadline.days : 0
      if (shipping.delivery_time) {
        days += shipping.delivery_time.days
      }
      days += this.productionDeadline
      if (this.getDeadlineStr) {
        const str = this.getDeadlineStr({
          days,
          isWorkingDays,
          shippingLine: this.shippingLine
        })
        if (str) return str
      }
      if (days > 1) {
        return `${i18n(i19upTo)} ${days} ` +
          i18n(isWorkingDays ? i19workingDays : i19days).toLowerCase()
      }
      if (days === 1) {
        if (isWorkingDays) {
          return `${i18n(i19upTo)} 1 ` + i18n(this.i19workingDay).toLowerCase()
        }
        return i19untilTomorrow
      }
      return shipping.pick_up ? i19pickUpToday : i19receiveToday
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
