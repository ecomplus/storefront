import { mapGetters, mapMutations, mapActions } from 'vuex'
import EcOrderInfo from './../../components/EcOrderInfo.vue'
import ecomPassport from '@ecomplus/passport-client'

export default {
  name: 'confirmation',

  components: {
    EcOrderInfo
  },

  props: {
    ecomPassport: {
      type: Object,
      default: () => ecomPassport
    },
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
    ]),
    ...mapActions([
      'saveCustomer',
    ]),
  },

  created () {
    const { ecomPassport } = this
    if (!this.ecomPassport.checkAuthorization()) {
      const { main_email, doc_number } = this.$store.getters.customer
      if (main_email && doc_number) {
        ecomPassport.fetchLogin(main_email, doc_number).then(()=> {
          this.saveCustomer( { ecomPassport })
        })
      }
    }
  },

  mounted () {
    const { status } = this.order
    if (status && status !== 'cancelled') {
      this.resetCart()
    }
  }
}
