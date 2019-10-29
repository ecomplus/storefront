import { i18n, nickname } from '@ecomplus/utils'
import EcomPassport from '@ecomplus/passport-client'
import EcAddresses from '../EcAddresses.vue'
import EcAccountForm from '../EcAccountForm.vue'
import EcIdentify from '../EcIdentify.vue'
import EcOrdersList from '../EcOrdersList.vue'
import {
  Addresses,
  Registration,
  Orders,
  HelloAgain,
  IsNotYou,
  Logout
} from './../../lib/i18n'

export default {
  name: 'EcAccount',

  components: {
    EcIdentify,
    EcAddresses,
    EcAccountForm,
    EcOrdersList
  },

  props: {
    customer: {
      type: Object,
      default: () => { }
    },
    ecomPassport: {
      type: Object,
      default: () => new EcomPassport()
    }
  },

  computed: {
    dictionary () {
      return {
        Addresses,
        Registration,
        Orders,
        HelloAgain,
        IsNotYou,
        Logout
      }
    },
    localCustomer: {
      get () {
        return this.customer
      },
      set (customer) {
        this.$emit('update:customer', customer)
      }
    },
    customerEmail () {
      return this.localCustomer.main_email
    },
    nickname () {
      return nickname(this.localCustomer)
    }
  },

  methods: {
    i18n (label) {
      return i18n(this.dictionary[label])
    },

    login (ecomPassport) {
      if (ecomPassport.isLogged()) {
        this.localCustomer = ecomPassport.getCustomer()
        this.$emit('login', ecomPassport)
      }
    },

    logout () {
      if (this.ecomPassport.isLogged()) {
        this.ecomPassport.logout()
        this.$emit('logout')
      }
    }
  }
}
