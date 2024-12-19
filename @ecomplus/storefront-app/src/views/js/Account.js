import ecomPassport from '@ecomplus/passport-client'
import { mapMutations, mapActions } from 'vuex'
import TheAccount from '#components/TheAccount.vue'
import AccountForm from '#components/AccountForm.vue'
import AccountAddresses from '#components/AccountAddresses.vue'
import AccountPoints from '#components/AccountPoints.vue'
import EcOrdersList from '../../components/EcOrdersList.vue'

export default {
  name: 'account',

  components: {
    TheAccount,
    AccountForm,
    AccountAddresses,
    AccountPoints,
    EcOrdersList
  },

  data () {
    return {
      isMounted: false,
      ecomPassport
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
        if (ecomPassport && ecomPassport.checkAuthorization() && this.isMounted) {
          this.triggerLoading(true)
          this.saveCustomer({ ecomPassport })
            .finally(() => this.triggerLoading(false))
        }
      }
    },

    currentTab: {
      get () {
        return this.$route.params.tab
      },
      set (tab) {
        if (tab !== this.$route.params.tab) {
          this.$router.push({
            name: 'account',
            params: {
              tab
            }
          })
        }
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
  },

  created () {
    const isExternalAuth = Boolean(window.$firebaseConfig && window.$firebaseConfig.authDomain)
    if (isExternalAuth && !this.ecomPassport.checkAuthorization()) {
      setTimeout(() => {
        if (this.ecomPassport.checkAuthorization()) return
        window.location.href = '/app/account'
      }, 1000)
    }
  },

  mounted () {
    this.isMounted = true
  }
}
