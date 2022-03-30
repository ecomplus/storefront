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
    pageLimit: {
      type: Number,
      default: 5
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
      pages: [],
      items: [],
      currentPage: null
    }
  },

  computed: {
    links () {
      const first = [1, '...']
      const last = ['...', this.pages.length]
      let range = []

      if (this.currentPage <= this.pageLimit) {
        range = this.range(1, this.pageLimit + 1)
        return (this.currentPage + range.length) <= this.pages.length ? range.concat(last) : range
      } else if (this.currentPage > (this.pages.length - this.pageLimit)) {
        range = this.range(this.pages.length - (this.pageLimit), this.pages.length)
        return (this.currentPage - range.length) >= 1 ? first.concat(range) : range
      } else {
        range = this.range(this.currentPage - Math.ceil(this.pageLimit / 2), this.currentPage + Math.ceil(this.pageLimit / 2))
        return first.concat(range).concat(last)
      }
    }
  },

  methods: {
    formatDate,
    formatMoney,
    i19FinancialStatus: prop => i18n(i19FinancialStatus)[prop],
    i19FulfillmentStatus: prop => i18n(i19FulfillmentStatus)[prop],
    i19OrderStatus: prop => i18n(i19OrderStatus)[prop],

    range (start, end) {
      const pages = []

      for (let i = start - 1; i < end; i++) {
        if (this.pages[i]) {
          pages.push(i + 1)
        }
      }

      return pages
    }
  },

  created () {
    const update = () => this.ecomPassport.fetchOrdersList()
      .then(result => {
        this.items = result
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
          this.items = result.sort((a, b) => a.number > b.number ? -1 : 1)

          for (let i = 0; i < this.items.length; i += 10) {
            this.pages.push(this.items.slice(i, i + 10))
          }

          this.currentPage = this.pages.length ? 1 : 0
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
  },

  watch: {
    currentPage () {
      if (this.currentPage > 0 && this.currentPage <= this.pages.length) {
        this.orders = this.pages[this.currentPage - 1]
      }
    }
  }
}
