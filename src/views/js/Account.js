import EcomPassport from '@ecomplus/passport-client'
import { mapMutations, mapActions } from 'vuex'
import EcAccount from './../../components/EcAccount.vue'

export default {
  name: 'account',

  components: {
    EcAccount
  },

  data () {
    return {
      ecomPassport: new EcomPassport()
    }
  },

  computed: {
    customer: {
      get () {
        return this.$store.getters.customer
      },
      set (customer) {
        this.setCustomer(customer)
        const { ecomPassport } = this
        if (ecomPassport && ecomPassport.isAuthorized()) {
          this.triggerLoading(true)
          this.saveCustomer({ ecomPassport })
            .finally(() => this.triggerLoading(false))
        }
      }
    },

    showOrders: {
      get () {
        return this.$route.params.tab === 'orders'
      },
      set (showOrders) {
        this.$router.push({
          name: 'account',
          params: {
            tab: showOrders ? 'orders' : null
          }
        })
      }
    }
  },

  methods: {
    ...mapMutations([
      'triggerLoading',
      'setCustomer',
      'resetAccount'
    ]),

    ...mapActions([
      'fetchCustomer',
      'saveCustomer'
    ]),

    login (ecomPassport) {
      this.ecomPassport = ecomPassport
      this.triggerLoading(true)
      this.fetchCustomer({ ecomPassport })
        .finally(() => this.triggerLoading(false))
    },

    viewOrder ({ _id, number }) {
      if (number) {
        this.$router.push({
          name: 'order',
          params: { number, id: _id }
        })
      }
    }
  }
}
