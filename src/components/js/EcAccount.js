import { i18n, nickname } from '@ecomplus/utils'
import EcomPassport from '@ecomplus/passport-client'
import EcAddresses from '../EcAddresses.vue'
import EcAccountForm from '../EcAccountForm.vue'
import EcIdentify from '../EcIdentify.vue'
import EcOrdersList from '../EcOrdersList.vue'

import {
  Addresses,
  Hello,
  IsNotYou,
  Logout,
  Orders,
  Registration
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
    mergeDictionary: {
      type: Object,
      default: () => {}
    },
    customer: {
      type: Object,
      default: () => ({})
    },
    ecomPassport: {
      type: Object,
      default: () => new EcomPassport()
    },
    showOrders: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      currentTab: this.showOrders ? 1 : 0
    }
  },

  computed: {
    dictionary () {
      return {
        Addresses,
        Hello,
        IsNotYou,
        Logout,
        Orders,
        Registration,
        ...this.mergeDictionary
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

    nickname () {
      return nickname(this.customer)
    }
  },

  methods: {
    i18n (label) {
      return i18n(this.dictionary[label])
    },

    login (ecomPassport) {
      if (ecomPassport.isAuthorized()) {
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
  },

  watch: {
    currentTab (tabIndex) {
      this.$emit('update:showOrders', tabIndex === 1)
    }
  }
}
