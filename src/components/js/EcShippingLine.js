import { i18n } from '@ecomplus/utils'

import {
  i19afterApproval,
  i19days,
  i19noNumber,
  i19postingDeadline,
  i19recipient,
  i19shippingAddress,
  i19shippingMethod,
  i19trackingCodes,
  i19willReceiveMsg,
  i19workingDays
} from '@ecomplus/i18n'

export default {
  name: 'EcShippingLine',

  props: {
    shippingLine: {
      type: Object,
      required: true
    },
    financialStatus: String
  },

  computed: {
    i19afterApproval: () => i18n(i19afterApproval),
    i19days: () => i18n(i19days).toLowerCase(),
    i19noNumber: () => i18n(i19noNumber),
    i19postingDeadline: () => i18n(i19postingDeadline),
    i19recipient: () => i18n(i19recipient),
    i19shippingAddress: () => i18n(i19shippingAddress),
    i19shippingMethod: () => i18n(i19shippingMethod),
    i19trackingCodes: () => i18n(i19trackingCodes),
    i19willReceiveMsg: () => i18n(i19willReceiveMsg),
    i19workingDays: () => i18n(i19workingDays).toLowerCase(),

    isDeliveryPending () {
      if (this.shippingLine.status) {
        switch (this.shippingLine.status.current) {
          case 'delivered':
          case 'returned_for_exchange':
          case 'received_for_exchange':
          case 'returned':
            return false
        }
      }
      return true
    },

    shippingTime () {
      const { shippingLine } = this
      let days = shippingLine.posting_deadline ? shippingLine.posting_deadline.days : 0
      if (shippingLine.delivery_time) {
        days += shippingLine.delivery_time.days
      }
      return days
    },

    isShippingTimeWorkingDays () {
      const { shippingLine } = this
      return (shippingLine.delivery_time && shippingLine.delivery_time.working_days) ||
        (shippingLine.posting_deadline && shippingLine.posting_deadline.working_days)
    }
  }
}
