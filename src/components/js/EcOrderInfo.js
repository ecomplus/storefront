import { i18n } from '@ecomplus/utils'
import { store } from '@ecomplus/client'
import EcomPassport from '@ecomplus/passport-client'
import EcSummary from './../EcSummary.vue'
import { SlideYUpTransition } from 'vue2-transitions'

import {
  CodeCopied,
  CopyCode,
  CopyErrorMsg,
  DoPaymentMsg,
  MyOrders,
  OrderConfirmationMsg,
  OrderNumber,
  PrintBillet,
  RedirectToPayment,
  TicketCode,
  _FinancialStatus,
  _OrderStatus
} from './../../lib/i18n'

export default {
  name: 'EcOrderInfo',

  components: {
    EcSummary,
    SlideYUpTransition
  },

  props: {
    mergeDictionary: {
      type: Object,
      default: () => {}
    },
    ecomPassport: {
      type: Object,
      default: () => new EcomPassport()
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
      loaded: this.skipDataLoad,
      updateInterval: null,
      orderBody: this.order
    }
  },

  computed: {
    dictionary () {
      return {
        CodeCopied,
        CopyCode,
        CopyErrorMsg,
        DoPaymentMsg,
        MyOrders,
        OrderConfirmationMsg,
        OrderNumber,
        PrintBillet,
        RedirectToPayment,
        TicketCode,
        _FinancialStatus,
        _OrderStatus,
        ...this.mergeDictionary
      }
    },

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

    shippingAddress () {
    },

    financialStatus () {
      return ''
    },

    transaction () {
      const { transactions } = this.localOrder
      return transactions && transactions.length
        ? transactions[0]
        : {}
    }
  },

  methods: {
    i18n (label, prop) {
      return i18n(prop ? this.dictionary[label][prop] : this.dictionary[label])
    },

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
      if (!this.skipCustomerUpdate && localOrder.number && ecomPassport && ecomPassport.isAuthorized()) {
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
    }
  },

  created () {
    if (this.order._id) {
      if (this.isNew) {
        this.saveCustomerOrder()
      }
      if (!this.skipDataLoad) {
        const update = () => {
          store({ url: `/orders/${this.order._id}.json` })
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
        this.updateInterval = setInterval(update, 9000)
        setTimeout(() => {
          update()
          this.loaded = true
        }, this.isNew ? 1000 : 3000)
      }
    }
  },

  beforeDestroy () {
    clearInterval(this.updateInterval)
  }
}
