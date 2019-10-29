import { i18n, formatDate } from '@ecomplus/utils'
import {
  OrderCreated,
  PaymentConfirmed,
  PaymentRealized,
  _FulfillmentStatus
} from './../../lib/i18n'

export default {
  name: 'OrderStep',

  props: {
    order: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      payment: null,
      confirmation: null,
      prepared: null,
      shipped: null,
      delivered: null
    }
  },

  computed: {
    dictionary () {
      return {
        OrderCreated,
        PaymentConfirmed,
        PaymentRealized,
        _FulfillmentStatus
      }
    },

    // maps current order financial_status
    financialStatus () {
      const { financial_status } = this.order
      if (financial_status && financial_status.current) {
        return financial_status.current
      } else {
        // check on transaction object
        const { transaction } = this.order
        if (transaction && Array.isArray(transaction)) {
          const { status } = transaction[0]
          if (status && status.current) {
            return status.current
          }
        }
      }
      // default pending
      return 'pending'
    },

    // map current order fulfillment status
    fulfillmentStatus () {
      const { fulfillment_status } = this.order
      if (fulfillment_status && fulfillment_status.current) {
        return fulfillment_status.current
      } else {
        // check on shipping_lines object
        const { shipping_lines } = this.order
        if (shipping_lines && Array.isArray(shipping_lines)) {
          const { status } = shipping_lines[0]
          if (status && status.current) {
            return status.current
          }
        }
      }
      return null
    },

    // return date string of first positive payment entry
    paymentDate () {
      let date = null
      const { payments_history } = this.order
      payments_history.forEach(entry => {
        switch (entry.status) {
          case 'under_analysis':
          case 'authorized':
          case 'paid':
            if (entry.date_time && (typeof date !== 'string' || date > entry.date_time)) {
              date = entry.date_time
            }
            break
        }
      })
      return date
    },

    confirmationDate () {
      let date = null
      const { payments_history } = this.order
      payments_history.forEach(entry => {
        if (entry.status === 'paid') {
          if (entry.date_time && (!date || date < entry.date_time)) {
            date = entry.date_time
          }
        }
      })
      return date
    }
  },

  methods: {
    i18n (label, prop) {
      return i18n(prop ? this.dictionary[label][prop] : this.dictionary[label])
    },

    // return date string of last fulfillment entry with some status
    fulfillmentDate (status) {
      let date = null
      const { fulfillments } = this.order || []

      fulfillments.forEach(entry => {
        if (entry.status === status) {
          if (entry.date_time && (!date || date < entry.date_time)) {
            date = entry.date_time
          }
        }
      })
      return date
    },

    // check if order shipping line still with pending delivery
    deliveryPending (shipping) {
      if (shipping.status) {
        switch (shipping.status.current) {
          case 'delivered':
          case 'returned_for_exchange':
          case 'received_for_exchange':
          case 'returned':
            return false
        }
      }
      return true
    }
  },

  created () {
    // check current status and setup dates
    if (this.financialStatus !== 'pending') {
      this.payment = formatDate(this.paymentDate)
    }

    if (this.financialStatus === 'paid') {
      this.confirmation = formatDate(this.confirmationDate)
      this.prepared = formatDate(this.fulfillmentDate('ready_for_shipping'))
    }

    switch (this.fulfillmentStatus) {
      case 'shipped':
      case 'delivered':
        this.shipped = formatDate(this.fulfillmentDate('shipped'))
        if (!this.prepared) {
          this.prepared = formatDate(this.fulfillmentDate('ready_for_shipping'))
        }
        if (this.fulfillmentStatus === 'delivered') {
          this.delivered = formatDate(this.fulfillmentDate('delivered'))
        }
        break
    }
  }
}
