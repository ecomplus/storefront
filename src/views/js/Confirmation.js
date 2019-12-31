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
          const orders = this.orders.concat()
          const stateOrder = orders.find(({ _id }) => _id === order._id)
          if (stateOrder) {
            Object.assign(stateOrder, order)
          } else {
            orders.push(order)
          }
          this.setOrders(orders)
        }
      }
    }
  },

  methods: {
    ...mapMutations([
      'addOrder',
      'setOrders',
      'resetCart'
    ])
  },

  mounted () {
    const { status } = this.order
    if (status && status !== 'cancelled') {
      this.resetCart()
    }
  }
}
