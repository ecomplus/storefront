import { mapMutations, mapActions } from 'vuex'
import EcCheckout from './../../components/EcCheckout.vue'

export default {
  name: 'checkout',

  components: {
    EcCheckout
  },

  data () {
    return {
      updateInterval: null
    }
  },

  computed: {
    customerEmail: {
      get () {
        return this.$store.getters.customerEmail
      },
      set (email) {
        this.setCustomerEmail(email)
      }
    }
  },

  methods: {
    ...mapMutations([
      'triggerLoading',
      'selectShippingService',
      'setCustomerEmail'
    ]),

    ...mapActions([
      'fetchCartItems',
      'fetchCustomer'
    ]),

    login (ecomPassport) {
      this.fetchCustomer({ ecomPassport })
    }
  },

  created () {
    this.triggerLoading(true)
    const update = () => this.fetchCartItems({ removeOnError: true })
    update().then(() => this.triggerLoading(false))
    this.updateInterval = setInterval(update, 600000)
  },

  beforeDestroy () {
    clearInterval(this.updateInterval)
  }
}
