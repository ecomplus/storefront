import {
  i19FinancialStatus,
  i19FulfillmentStatus,
  i19OrderStatus
} from '@ecomplus/i18n'

import { i18n, formatDate, formatMoney } from '@ecomplus/utils'
import ecomPassport from '@ecomplus/passport-client'
import EcOrderInfo from './../EcOrderInfo.vue'

export default {
  name: 'EcOrdersList',

  components: {
    EcOrderInfo
  },

  props: {
    mergeDictionary: {
      type: Object,
      default: () => {}
    },
    ecomPassport: {
      type: Object,
      default: () => ecomPassport
    },
    ordersListParams: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      updateInterval: null,
      orders: []
    }
  },

  methods: {
    formatDate,
    formatMoney,
    i19FinancialStatus: prop => i18n(i19FinancialStatus)[prop],
    i19FulfillmentStatus: prop => i18n(i19FulfillmentStatus)[prop],
    i19OrderStatus: prop => i18n(i19OrderStatus)[prop]
  },

  created () {
    const update = () => this.ecomPassport.fetchOrdersList()
      .then(result => {
        this.orders = result
      })
      .catch(console.error)
    const startInterval = () => {
      this.updateInterval = setInterval(update, 7000)
    }
    if (this.ecomPassport.checkAuthorization()) {
      this.ecomPassport.requestApi(`/orders.json?${this.ordersListParams}`)
        .then(({ data }) => {
          const { result } = data
          this.ecomPassport.setCustomer({ orders: result })
          this.orders = result.sort((a, b) => a.number > b.number ? -1 : 1).slice(0, 10)
        })
        .catch(update)
        .finally(startInterval)
    } else {
      update()
      startInterval()
    }
  },

  beforeDestroy () {
    clearInterval(this.updateInterval)
  }
}
