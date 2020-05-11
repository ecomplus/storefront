import { i18n, formatDate, formatMoney } from '@ecomplus/utils'
import ecomPassport from '@ecomplus/passport-client'
import EcOrderInfo from './../EcOrderInfo.vue'

import {
  i19FinancialStatus,
  i19OrderStatus
} from '@ecomplus/i18n'

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
    i19OrderStatus: prop => i18n(i19OrderStatus)[prop]
  },

  created () {
    const update = () => this.ecomPassport.fetchOrdersList()
      .then(result => {
        this.orders = result
      })
    update()
    this.updateInterval = setInterval(update, 5000)
  },

  beforeDestroy () {
    clearInterval(this.updateInterval)
  }
}
