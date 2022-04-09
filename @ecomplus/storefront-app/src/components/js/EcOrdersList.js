import {
  i19FinancialStatus,
  i19FulfillmentStatus,
  i19OrderStatus
} from '@ecomplus/i18n'

import { i18n, formatDate, formatMoney } from '@ecomplus/utils'
import ecomPassport from '@ecomplus/passport-client'
import EcOrderInfo from './../EcOrderInfo.vue'
import APagination from './../APagination.vue'

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
    }
  },

  data () {
    return {
      updateInterval: null,
      orders: [],
      ordersLength: 0,
      startIndex: 0,
      currentPage: 1,
      pageSize: 10
    }
  },

  computed: {
    page: {
      get: function () {
        return this.currentPage
      },
      set: function (page) {
        this.currentPage = page
        const from = Math.floor((page - 1) * this.pageSize)
        this.updateOrders(from)
      }
    }
  },

  methods: {
    formatDate,
    formatMoney,
    i19FinancialStatus: prop => i18n(i19FinancialStatus)[prop],
    i19FulfillmentStatus: prop => i18n(i19FulfillmentStatus)[prop],
    i19OrderStatus: prop => i18n(i19OrderStatus)[prop],

    updateOrders (from = this.startIndex) {
      return this.ecomPassport.fetchOrdersList(from)
        .then(result => {
          this.orders = result
        })
        .catch(console.error)
        .finally(this.startIndex = from)
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
          this.ordersLength = result.length
        })
        .catch(this.updateOrders)
        .finally(startInterval)
    } else {
      this.updateOrders()
      startInterval()
    }
  },

  beforeDestroy () {
    clearInterval(this.updateInterval)
  }
}
