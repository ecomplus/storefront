
import EcomPassport from '@ecomplus/passport-client'
import { i18n, formatDate, formatMoney } from '@ecomplus/utils'
import EcOrderStep from '../EcOrderStep.vue'
import EcOrderInfo from '../EcOrderInfo.vue'
import EcOrderSummary from '../EcOrderSummary.vue'
export default {
  name: 'OrdersList',

  components: {
    EcOrderStep,
    EcOrderInfo,
    EcOrderSummary
  },

  props: {
    ecomPassport: {
      type: Object,
      default: () => new EcomPassport()
    }
  },

  data () {
    return {
      ordersList: [],
      order: {}
    }
  },

  computed: {
    getOrderId () {
      const { number } = this.$route.params
      const result = this.ordersList.find(order => order.number === Number(number))
      return result._id
    }
  },

  methods: {
    formatDate,
    formatMoney,

    i18n (label, prop) {
      return i18n(prop ? this.dictionary[label][prop] : this.dictionary[label])
    },

    fetchOrdersList () {
      return this.ecomPassport.fetchOrdersList()
        .then(result => {
          this.ordersList = result
        })
    },

    fetchOrder (orderId) {
      this.ecomPassport.requestApi(`/orders/${orderId}.json`)
        .then(({ data }) => {
          this.order = data
        })
    },

    fetchSingleOrder () {
      if (this.$route.params.number) {
        this.fetchOrder(this.getOrderId)
      }
    }
  },

  mounted () {
    this.fetchOrdersList().then(() => this.fetchSingleOrder())
  },

  watch: {
    '$route.params.number': function () {
      this.fetchSingleOrder()
    }
  }
}
