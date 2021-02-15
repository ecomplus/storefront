import {
  i19buyAgain,
  i19cancelOrder,
  i19codeCopied,
  i19copyCode,
  i19copyErrorMsg,
  i19doPaymentMsg,
  i19freight,
  i19login,
  i19loginForOrderDetailsMsg,
  i19myOrders,
  i19of,
  i19orderConfirmationMsg,
  i19orderNumber,
  i19printBillet,
  i19redirectToPayment,
  i19referenceCode,
  i19reopenOrder,
  i19shippingAddress,
  i19transactionCode,
  i19ticketCode,
  i19trackDelivery,
  i19zipCode,
  i19FinancialStatus,
  i19FulfillmentStatus,
  i19OrderStatus
} from '@ecomplus/i18n'

import {
  i18n,
  formatMoney,
  formatDate
} from '@ecomplus/utils'

import { store } from '@ecomplus/client'
import ecomPassport from '@ecomplus/passport-client'
import ecomCart from '@ecomplus/shopping-cart'
import EcomSearch from '@ecomplus/search-engine'
import ShippingLine from '#components/ShippingLine.vue'
import EcSummary from './../EcSummary.vue'

export default {
  name: 'EcOrderInfo',

  components: {
    ShippingLine,
    EcSummary
  },

  props: {
    order: {
      type: Object,
      required: true
    },
    isNew: Boolean,
    skipDataLoad: Boolean,
    skipFirstDataLoad: Boolean,
    skipCustomerUpdate: Boolean,
    accountOrdersUrl: {
      type: String,
      default: '/app/#/account/orders'
    },
    cartUrl: {
      type: String,
      default: '/app/#/cart'
    },
    ecomCart: {
      type: Object,
      default () {
        return ecomCart
      }
    },
    ecomPassport: {
      type: Object,
      default () {
        return ecomPassport
      }
    }
  },

  data () {
    return {
      isLoaded: this.skipDataLoad || this.skipFirstDataLoad,
      isUpdating: false,
      reloadInterval: null,
      orderBody: this.order,
      canReopenOrder: false
    }
  },

  computed: {
    i19buyAgain: () => i18n(i19buyAgain),
    i19cancelOrder: () => i18n(i19cancelOrder),
    i19codeCopied: () => i18n(i19codeCopied),
    i19copyCode: () => i18n(i19copyCode),
    i19copyErrorMsg: () => i18n(i19copyErrorMsg),
    i19doPaymentMsg: () => i18n(i19doPaymentMsg),
    i19freight: () => i18n(i19freight),
    i19login: () => i18n(i19login),
    i19loginForOrderDetailsMsg: () => i18n(i19loginForOrderDetailsMsg),
    i19myOrders: () => i18n(i19myOrders),
    i19of: () => i18n(i19of),
    i19orderConfirmationMsg: () => i18n(i19orderConfirmationMsg),
    i19orderNumber: () => i18n(i19orderNumber),
    i19printBillet: () => i18n(i19printBillet),
    i19redirectToPayment: () => i18n(i19redirectToPayment),
    i19referenceCode: () => i18n(i19referenceCode),
    i19reopenOrder: () => i18n(i19reopenOrder),
    i19shippingAddress: () => i18n(i19shippingAddress),
    i19transactionCode: () => i18n(i19transactionCode),
    i19ticketCode: () => i18n(i19ticketCode),
    i19trackDelivery: () => i18n(i19trackDelivery),
    i19zipCode: () => i18n(i19zipCode),

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

    hasManyTransactions () {
      const { transactions } = this.localOrder
      return transactions && transactions.length > 1
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

    canShowShippingAddress () {
      const { localOrder, shippingAddress } = this
      if (shippingAddress && shippingAddress.street) {
        return !/(retira|pick\s?up|e-?mail)/i.test(localOrder.shipping_method_label)
      }
      return false
    },

    status () {
      return this.localOrder.status
    },

    financialStatus () {
      const { localOrder, transaction } = this
      if (localOrder.payments_history) {
        let statusRecord
        localOrder.payments_history.forEach(record => {
          if (record && (!statusRecord || !record.date_time || record.date_time >= statusRecord.date_time)) {
            statusRecord = record
          }
        })
        if (statusRecord) {
          return statusRecord.status
        }
      }
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
    },

    statusEntries () {
      const statusEntries = []
      let statusRecords = []
      ;['payments_history', 'fulfillments'].forEach(recordsField => {
        if (Array.isArray(this.localOrder[recordsField])) {
          statusRecords = statusRecords.concat(this.localOrder[recordsField])
        }
      })
      if (statusRecords.length) {
        statusRecords = statusRecords = statusRecords.sort((a, b) => {
          if (a.date_time && b.date_time) {
            return a.date_time > b.date_time
              ? -1
              : 1
          }
          return 0
        })
        statusRecords.forEach((statusRecord, i) => {
          if (i > 0 && statusRecord.status === statusRecords[i - 1].status) {
            return
          }
          statusEntries.push(statusRecord)
        })
      }
      return statusEntries
    },

    isAuthenticated () {
      return this.ecomPassport.checkAuthorization()
    }
  },

  methods: {
    i19FinancialStatus: prop => i18n(i19FinancialStatus)[prop],
    i19FulfillmentStatus: prop => i18n(i19FulfillmentStatus)[prop],
    i19OrderStatus: prop => i18n(i19OrderStatus)[prop],
    formatMoney,
    formatDate,

    formatTime (time) {
      const miliseconds = Date.parse(time)
      const date = new Date(miliseconds)
      return date.toLocaleTimeString()
    },

    toClipboard (text) {
      this.$copyText(text).then(() => {
        this.$toast({
          title: this.i19codeCopied,
          body: text,
          variant: 'success',
          delay: 2000
        })
      }, err => {
        console.error(err)
        this.$toast({
          title: 'Oops',
          body: `${this.i19copyErrorMsg}: <i>${text}</i>`,
          variant: 'warning',
          delay: 3000
        })
      })
    },

    saveCustomerOrder () {
      const { localOrder, ecomPassport } = this
      if (!this.skipCustomerUpdate && localOrder.number && ecomPassport.checkAuthorization()) {
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

    buyAgain () {
      const { localOrder } = this
      if (localOrder.items) {
        const { items } = localOrder
        ecomCart.clear()
        items.forEach((item, i) => {
          ecomCart.addItem(item, false)
          if (i + 1 === items.length) {
            ecomCart.save()
            window.location = this.cartUrl
          }
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

  watch: {
    isLoaded: {
      handler (isLoaded) {
        if (isLoaded && this.isAuthenticated && this.status === 'cancelled') {
          const { items } = this.localOrder
          if (items && items.length) {
            const productIds = items.map(item => item.product_id)
            const search = new EcomSearch()
            search.setPageSize(productIds.length)
              .setProductIds(productIds)
              .fetch(true)
              .then(() => {
                for (let i = 0; i < items.length; i++) {
                  const orderItem = items[i]
                  const product = search.getItems().find(({ _id }) => _id === orderItem.product_id)
                  if (product) {
                    if (orderItem.variation_id) {
                      if (product.variations) {
                        const variation = product.variations.find(({ sku }) => sku === orderItem.sku)
                        if (variation && variation.quantity >= orderItem.quantity) {
                          continue
                        }
                      }
                    }
                    if (product.quantity >= orderItem.quantity) {
                      continue
                    }
                  }
                  this.canReopenOrder = false
                  return
                }
                this.canReopenOrder = true
              })
              .catch(console.error)
          }
        }
      },
      immediate: true
    }
  },

  created () {
    if (this.order._id) {
      if (this.isNew) {
        this.saveCustomerOrder()
      }
      if (!this.skipDataLoad) {
        const url = `/orders/${this.order._id}.json`
        const update = () => {
          const request = this.ecomPassport.checkAuthorization()
            ? this.ecomPassport.requestApi(url)
            : store({ url })
          return request
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
              this.isLoaded = true
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
