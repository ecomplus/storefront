import { _config, formatMoney } from '@ecomplus/utils'
import dictionary from './../../lib/dictionary'

export default {
  name: 'EcShippingLine',

  props: {
    lang: {
      type: String,
      default: _config.get('lang')
    },
    shippingLine: {
      type: Object,
      required: true
    }
  },

  computed: {
    isWorkingDays () {
      const shipping = this.shippingLine
      return (shipping.posting_deadline && shipping.posting_deadline.working_days) ||
        (shipping.delivery_time && shipping.delivery_time.working_days)
    },

    deadline () {
      const shipping = this.shippingLine
      let days = shipping.posting_deadline ? shipping.posting_deadline.days : 0
      if (shipping.delivery_time) {
        days += shipping.delivery_time.days
      }
      return days
    }
  },

  methods: {
    dictionary,
    formatMoney
  }
}
