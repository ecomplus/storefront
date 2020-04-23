import ecomPassport from '@ecomplus/passport-client'
import { mapMutations, mapActions } from 'vuex'
import TheAccount from '#components/TheAccount.vue'
import EcAccountForm from '../../components/EcAccountForm.vue'
import EcAddresses from '../../components/EcAddresses.vue'
import EcOrdersList from '../../components/EcOrdersList.vue'

export default {
  name: 'account',

  components: {
    TheAccount,
    EcAccountForm,
    EcAddresses,
    EcOrdersList
  },

  data () {
    return {
      ecomPassport: ecomPassport
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
        if (ecomPassport && ecomPassport.checkAuthorization()) {
          this.triggerLoading(true)
          this.saveCustomer({ ecomPassport })
            .finally(() => this.triggerLoading(false))
        }
      }
    },

    isOrdersList: {
      get () {
        return this.$route.params.tab === 'orders'
      },
      set (isShowOrders) {
        this.$router.push({
          name: 'account',
          params: {
            tab: isShowOrders ? 'orders' : null
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
