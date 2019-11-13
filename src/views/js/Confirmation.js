import { mapGetters, mapMutations } from 'vuex'
import EcOrderInfo from './../../components/EcOrderInfo.vue'

export default {
  name: 'confirmation',

  components: {
    EcOrderInfo
  },

  computed: {
    ...mapGetters([
      'orders'
    ]),

    orderId () {
      return this.$route.params.id
    },

    order: {
      get () {
        return this.orders.find(({ _id }) => _id === this.orderId) || { _id: this.orderId }
      },
      set (order) {
        if (order && order._id === this.orderId) {
          const orderIndex = this.orders.findIndex(({ _id }) => _id === order._id)
          if (orderIndex > -1) {
            this.updateOrder(orderIndex, order)
          } else {
            this.addOrder(order)
          }
        }
      }
    }
  },

  methods: {
    ...mapMutations([
      'addOrder',
      'updateOrder'
    ])
  }
}
