import {
  i18n,
  formatDate,
  formatMoney
} from '@ecomplus/utils'
import ecomPassport from '@ecomplus/passport-client'
import Pagination from './../Pagination.vue'

import {
  i19FinancialStatus,
  i19OrderStatus
} from '@ecomplus/i18n'

export default {
  name: 'OrdersList',

  components: { Pagination },

  props: {
    ecomPassport: {
      type: Object,
      default () {
        return ecomPassport
      }
    }
  },

  data () {
    return {
      numberPage: 0,
      itemPerPage: 2,
      updateInterval: null,
      orders: []
    }
  },

  computed: {
    startPage: {
      get () {
        return this.numberPage
      },
      set (value) {
        this.numberPage = value
      }
    }
  },

  methods: {
    formatDate,
    formatMoney,
    i19FinancialStatus: prop => i18n(i19FinancialStatus)[prop],
    i19OrderStatus: prop => i18n(i19OrderStatus)[prop]
  },

  created () {
    const update = () => this.ecomPassport.fetchOrdersList(this.startPage, this.itemPerPage)
      .then(result => {
        this.orders = result
      })
      .catch(console.error)
    if (this.ecomPassport.checkAuthorization()) {
      this.ecomPassport.requestApi('/orders.json')
        .then(({ data }) => {
          const { result } = data
          this.ecomPassport.setCustomer({ orders: result })
          this.orders = result
        })
        .catch(update)
    } else {
      update()
    }
    console.log(this.ecomPassport)
    this.updateInterval = setInterval(update, 5000)
  },

  beforeDestroy () {
    clearInterval(this.updateInterval)
  }
}
