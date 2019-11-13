import { i18n } from '@ecomplus/utils'
import { store } from '@ecomplus/client'
import EcomPassport from '@ecomplus/passport-client'
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
      }
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
    }
  },

  created () {
    if (this.order._id && !this.skipDataLoad) {
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
  },

  beforeDestroy () {
    clearInterval(this.updateInterval)
  }
}
