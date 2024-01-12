import {
  i19active,
  i19inactive,
  i19FinancialStatus,
  i19FulfillmentStatus,
  i19OrderStatus
} from '@ecomplus/i18n'

import { i18n, formatDate, formatMoney } from '@ecomplus/utils'
import ecomPassport from '@ecomplus/passport-client'
import APagination from '#components/APagination.vue'
import EcOrderInfo from './../EcOrderInfo.vue'

export default {
  name: 'EcOrdersList',

  components: {
    EcOrderInfo,
    APagination
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
    },
    isSubscriptions: Boolean
  },

  data () {
    return {
      updateInterval: null,
      orders: [],
      totalOrders: 0,
      currentPage: 1,
      pageSize: 10
    }
  },

  computed: {
    i19active: () => i18n(i19active),
    i19inactive: () => i18n(i19inactive)
  },

  methods: {
    formatDate,
    formatMoney,
    i19FinancialStatus: prop => i18n(i19FinancialStatus)[prop],
    i19FulfillmentStatus: prop => i18n(i19FulfillmentStatus)[prop],
    i19OrderStatus: prop => i18n(i19OrderStatus)[prop],

    updateOrders () {
      return this.ecomPassport.fetchOrdersList((this.currentPage - 1) * this.pageSize)
        .then(result => {
          this.orders = result
        })
        .catch(console.error)
    }
  },

  created () {
    const startInterval = () => {
      this.updateInterval = setInterval(this.updateOrders, 7000)
    }
    if (this.ecomPassport.checkAuthorization()) {
      this.ecomPassport.requestApi(`/orders.json?${this.ordersListParams}`)
        .then(({ data }) => {
          const { result } = data
          this.ecomPassport.setCustomer({ orders: result })
          this.updateOrders()
          this.totalOrders = result.length
        })
        .catch(this.updateOrders)
        .finally(startInterval)
    } else {
      this.updateOrders()
      startInterval()
    }
  },

  watch: {
    currentPage () {
      this.updateOrders()
    }
  },

  beforeDestroy () {
    clearInterval(this.updateInterval)
  }
}
