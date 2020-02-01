import { i18n, formatDate, formatMoney } from '@ecomplus/utils'
import ecomPassport from '@ecomplus/passport-client'
import EcOrderInfo from './../EcOrderInfo.vue'

import {
  _OrderStatus
} from './../../lib/i18n'

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

  computed: {
    dictionary () {
      return {
        _OrderStatus,
        ...this.mergeDictionary
      }
    }
  },

  methods: {
    formatDate,
    formatMoney,

    i18n (label, prop) {
      return i18n(prop ? this.dictionary[label][prop] : this.dictionary[label])
    }
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
