import {
  i19addresses,
  i19hello,
  i19isNotYou,
  i19logout,
  i19orders,
  i19registration
} from '@ecomplus/i18n'

import {
  i18n,
  nickname as getNickname
} from '@ecomplus/utils'

import ecomPassport from '@ecomplus/passport-client'
import LoginBlock from '../LoginBlock.vue'
import RecommendedItems from '../RecommendedItems.vue'

export default {
  name: 'TheAccount',

  components: {
    LoginBlock,
    RecommendedItems
  },

  props: {
    customer: {
      type: Object,
      default () {
        return {}
      }
    },
    currentTab: String,
    ecomPassport: {
      type: Object,
      default () {
        return ecomPassport
      }
    }
  },

  computed: {
    i19addresses: () => i18n(i19addresses),
    i19hello: () => i18n(i19hello),
    i19isNotYou: () => i18n(i19isNotYou),
    i19logout: () => i18n(i19logout),
    i19orders: () => i18n(i19orders),
    i19registration: () => i18n(i19registration),
    i19favorites: () => i18n({
      pt_br: 'Favoritos',
      en_us: 'Favorites'
    }),

    activeTab: {
      get () {
        if (this.currentTab === 'orders') {
          return 1
        } else if (this.currentTab === 'favorites') {
          return 2
        } else {
          return 0
        }
      },
      set (tabIndex) {
        this.$emit('update:active-tab', tabIndex === 1 ? 'orders' : tabIndex === 2 ? 'favorites' : null)
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
      return getNickname(this.customer)
    }
  },

  methods: {
    login (ecomPassport) {
      if (ecomPassport.checkAuthorization()) {
        this.localCustomer = ecomPassport.getCustomer()
        this.$emit('login', ecomPassport)
      }
    },

    logout () {
      if (this.ecomPassport.checkLogin()) {
        this.ecomPassport.logout()
        this.$emit('logout')
      }
    }
  }
}
