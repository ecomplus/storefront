import { mapGetters, mapMutations, mapActions } from 'vuex'
import EcCheckout from './../../components/EcCheckout.vue'

export default {
  name: 'checkout',

  components: {
    EcCheckout
  },

  data () {
    return {
      updateInterval: null,
      ecomPassport: null,
      checkoutStep: 0
    }
  },

  computed: {
    ...mapGetters([
      'amount',
      'shippingZipCode',
      'selectedAddress'
    ]),

    customer: {
      get () {
        return this.$store.getters.customer
      },
      set (customer) {
        this.setCustomer(customer)
        if (customer._id) {
          const { ecomPassport } = this
          if (ecomPassport && ecomPassport.isAuthorized()) {
            this.saveCustomer({ ecomPassport })
          }
        }
      }
    }
  },

  methods: {
    ...mapMutations([
      'triggerLoading',
      'setFluidPage',
      'selectShippingService',
      'setCustomer',
      'setCustomerEmail',
      'selectAddress'
    ]),

    ...mapActions([
      'fetchCartItems',
      'fetchCustomer',
      'saveCustomer'
    ]),

    login (ecomPassport) {
      this.ecomPassport = ecomPassport
      this.triggerLoading(true)
      this.fetchCustomer({ ecomPassport })
        .finally(() => this.triggerLoading(false))
    },

    checkout (data) {
      console.log(data)
    }
  },

  watch: {
    checkoutStep (stepNumber, lastStep) {
      if (stepNumber && !lastStep) {
        this.setFluidPage(true)
      }
    }
  },

  created () {
    const update = () => this.fetchCartItems({ removeOnError: true })
    this.updateInterval = setInterval(update, 600000)
    this.triggerLoading(true)
    update().finally(() => this.triggerLoading(false))
  },

  destroyed () {
    this.setFluidPage(false)
    clearInterval(this.updateInterval)
  }
}
