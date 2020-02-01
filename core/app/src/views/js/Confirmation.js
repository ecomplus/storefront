import { mapGetters, mapMutations, mapActions } from 'vuex'
import ecomCart from '@ecomplus/shopping-cart'
import ecomPassport from '@ecomplus/passport-client'
import { upsertCart } from './../../lib/sync-cart-to-api'
import EcOrderInfo from './../../components/EcOrderInfo.vue'

export default {
  name: 'confirmation',

  components: {
    EcOrderInfo
  },

  data () {
    return {
      canUpsertCart: true
    }
  },

  computed: {
    ...mapGetters([
      'orders',
      'customer'
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
      'saveCustomer'
    ]),

    handleUpsertCart () {
      if (this.canUpsertCart) {
        this.canUpsertCart = false
        const { status } = this.order
        if (status && status !== 'cancelled') {
          ecomCart.data.completed = true
          if (this.orderId) {
            if (!ecomCart.data.orders) {
              ecomCart.data.orders = []
            }
            ecomCart.data.orders.push(this.orderId)
          }
          upsertCart().then(this.resetCart)
        }
      }
    }
  },

  created () {
    const { customer } = this
    if (!ecomPassport.checkAuthorization()) {
      if (customer.main_email && customer.doc_number) {
        ecomPassport.fetchLogin(customer.main_email, customer.doc_number).then(() => {
          this.saveCustomer({ ecomPassport })
          this.handleUpsertCart()
        })
      }
    }
  },

  mounted () {
    if (ecomPassport.checkAuthorization()) {
      this.handleUpsertCart()
    }
  }
}
