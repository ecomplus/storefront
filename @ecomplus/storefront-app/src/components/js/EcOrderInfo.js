import { i18n, formatMoney } from '@ecomplus/utils'
import { store } from '@ecomplus/client'
import ecomPassport from '@ecomplus/passport-client'
import EcShippingLine from './../EcShippingLine.vue'
import EcSummary from './../EcSummary.vue'

import {
  // i19cancelOrder,
  i19codeCopied,
  i19copyCode,
  i19copyErrorMsg,
  i19doPaymentMsg,
  i19myOrders,
  i19of,
  i19orderConfirmationMsg,
  i19orderNumber,
  i19printBillet,
  i19redirectToPayment,
  i19referenceCode,
  // i19reopenOrder,
  i19transactionCode,
  i19ticketCode,
  i19FinancialStatus,
  i19FulfillmentStatus,
  i19OrderStatus
} from '@ecomplus/i18n'

export default {
  name: 'EcOrderInfo',

  components: {
    EcShippingLine,
    EcSummary
  },

  props: {
    ecomPassport: {
      type: Object,
      default: () => ecomPassport
    },
    order: {
      type: Object,
      required: true
    },
    isNew: {
      type: Boolean
    },
    skipDataLoad: {
      type: Boolean
    },
    skipFirstDataLoad: {
      type: Boolean
    },
    skipCustomerUpdate: {
      type: Boolean
    },
    accountOrdersUrl: {
      type: String,
      default: '/app/#/account/orders'
    }
  },

  data () {
    return {
      loaded: this.skipDataLoad || this.skipFirstDataLoad,
      isUpdating: false,
      reloadInterval: null,
      orderBody: this.order
    }
  },

  computed: {
    i19cancelOrder: () => 'Cancelar pedido',
    i19codeCopied: () => i18n(i19codeCopied),
    i19copyCode: () => i18n(i19copyCode),
    i19copyErrorMsg: () => i18n(i19copyErrorMsg),
    i19doPaymentMsg: () => i18n(i19doPaymentMsg),
    i19myOrders: () => i18n(i19myOrders),
    i19of: () => i18n(i19of),
    i19orderConfirmationMsg: () => i18n(i19orderConfirmationMsg),
    i19orderNumber: () => i18n(i19orderNumber),
    i19printBillet: () => i18n(i19printBillet),
    i19redirectToPayment: () => i18n(i19redirectToPayment),
    i19referenceCode: () => i18n(i19referenceCode),
    i19reopenOrder: () => 'Reabrir pedido',
    i19transactionCode: () => i18n(i19transactionCode),
    i19ticketCode: () => i18n(i19ticketCode),
    i19observationOrder: () => 'Observações do pedido',

    localOrder: {
      get () {
        return this.orderBody
      },
      set (body) {
        this.orderBody = body
        this.$emit('update:order', body)
        this.saveCustomerOrder()
      }
    },

    transaction () {
      const { transactions } = this.localOrder
      return transactions && transactions.length
        ? transactions[0]
        : {}
    },

    shippingAddress () {
      const { localOrder } = this
      if (localOrder.shipping_lines && localOrder.shipping_lines.length) {
        return localOrder.shipping_lines[0].to
      }
      return undefined
    },

    status () {
      return this.localOrder.status
    },

    financialStatus () {
      const { localOrder, transaction } = this
      const status = localOrder.financial_status && localOrder.financial_status.current
      if (status) {
        return status
      } else {
        if (transaction && transaction.status) {
          return transaction.status.current
        }
      }
      return 'pending'
    },

    fulfillmentStatus () {
      const { localOrder } = this
      const status = localOrder.fulfillment_status && localOrder.fulfillment_status.current
      if (status) {
        return status
      } else {
        const shippingLine = localOrder.shipping_lines && localOrder.shipping_lines[0]
        if (shippingLine && shippingLine.status) {
          return shippingLine.status.current
        }
      }
      return null
    }
  },

  methods: {
    formatMoney,
    i19FinancialStatus: prop => i18n(i19FinancialStatus)[prop],
    i19FulfillmentStatus: prop => i18n(i19FulfillmentStatus)[prop],
    i19OrderStatus: prop => i18n(i19OrderStatus)[prop],

    toClipboard (text) {
      this.$copyText(text).then(() => {
        this.$bvToast.toast(text, {
          title: this.i18n('CodeCopied'),
          variant: 'success',
          solid: true,
          autoHideDelay: 1500
        })
      }, err => {
        console.error(err)
        this.$bvToast.toast('Oops', {
          title: `${this.i18n('copyErrorMsg')}: ${text}`,
          variant: 'warning',
          solid: true
        })
      })
    },

    saveCustomerOrder () {
      const { localOrder, ecomPassport } = this
      if (!this.skipCustomerUpdate && localOrder.number && ecomPassport && ecomPassport.checkAuthorization()) {
        ecomPassport.requestApi('/me.json')
          .then(({ data }) => {
            const orders = data.orders || []
            const resumedOrderBody = {}
            ;[
              '_id',
              'created_at',
              'number',
              'currency_id',
              'currency_symbol',
              'amount',
              'payment_method_label',
              'shipping_method_label'
            ].forEach(field => {
              if (localOrder[field]) {
                resumedOrderBody[field] = localOrder[field]
              }
            })
            const orderIndex = orders.findIndex(({ _id, number }) => {
              return _id === localOrder._id || number === localOrder.number
            })
            if (orderIndex > -1) {
              Object.assign(orders[orderIndex], resumedOrderBody)
            } else {
              orders.push(resumedOrderBody)
            }
            ecomPassport.requestApi('/me.json', 'patch', { orders })
          })
      }
    },

    toggle () {
      this.isUpdating = true
      const data = this.localOrder.status === 'open'
        ? {
          status: 'cancelled',
          cancel_reason: 'customer'
        }
        : {
          status: 'open'
        }
      ecomPassport.requestApi(`/orders/${this.order._id}.json`, 'patch', data)
        .then(() => {
          this.localOrder = {
            ...this.localOrder,
            ...data
          }
        })
        .finally(() => {
          this.isUpdating = false
        })
    }
  },

  created () {
    if (this.order._id) {
      if (this.isNew) {
        this.saveCustomerOrder()
      }
      if (!this.skipDataLoad) {
        const update = () => {
          return store({ url: `/orders/${this.order._id}.json` })
            .then(({ data }) => {
              this.localOrder = {
                ...this.localOrder,
                ...data
              }
            })
            .catch(err => {
              console.error(err)
            })
        }
        this.reloadInterval = setInterval(update, 9000)
        if (!this.skipFirstDataLoad) {
          setTimeout(() => {
            update().finally(() => {
              this.loaded = true
            })
          }, this.isNew ? 1000 : 3000)
        }
      }
    }
  },

  beforeDestroy () {
    clearInterval(this.reloadInterval)
  }
}
