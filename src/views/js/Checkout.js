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
    },

    discountCoupon: {
      get () {
        return this.$store.getters.discountCoupon
      },
      set (couponCode) {
        this.setDiscountCoupon(couponCode)
      }
    },

    shippingService: {
      get () {
        return this.$store.getters.shippingService
      },
      set (service) {
        this.selectShippingService(service)
      }
    },

    paymentGateway: {
      get () {
        return this.$store.getters.paymentGateway
      },
      set (gateway) {
        this.selectPaymentGateway(gateway)
      }
    }
  },

  methods: {
    ...mapMutations([
      'triggerLoading',
      'setFluidPage',
      'setDiscountCoupon',
      'setDiscountRule',
      'selectShippingService',
      'selectPaymentGateway',
      'setCustomer',
      'selectAddress',
      'addOrder'
    ]),

    ...mapActions([
      'fetchCartItems',
      'fetchCustomer',
      'saveCustomer',
      'sendCheckout'
    ]),

    login (ecomPassport) {
      this.ecomPassport = ecomPassport
      this.triggerLoading(true)
      this.fetchCustomer({ ecomPassport })
        .finally(() => this.triggerLoading(false))
    },

    checkout (transaction) {
      const { customer } = this
      this.triggerLoading(true)
      this.sendCheckout({ customer, transaction })
        .then(order => {
          this.addOrder(order)
          this.$router.push({
            name: 'confirmation',
            params: {
              id: order._id
            }
          })
        })
        .finally(() => this.triggerLoading(false))
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
