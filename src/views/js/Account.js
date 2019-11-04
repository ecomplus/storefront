import { mapMutations, mapActions } from 'vuex'
import EcAccount from './../../components/EcAccount.vue'

export default {
  name: 'account',

  components: {
    EcAccount
  },

  data () {
    return {
      ecomPassport: null
    }
  },

  computed: {
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
    ...mapMutations(['triggerLoading', 'setCustomer', 'setCustomerEmail', 'resetCustomer']),

    ...mapActions(['fetchCustomer', 'saveCustomer']),

    login (ecomPassport) {
      this.ecomPassport = ecomPassport
      this.triggerLoading(true)
      this.fetchCustomer({ ecomPassport })
        .finally(() => this.triggerLoading(false))
    }
  }
}
