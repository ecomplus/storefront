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

export default {
  name: 'TheAccount',

  components: {
    LoginBlock
  },

  props: {
    customer: {
      type: Object,
      default () {
        return {}
      }
    },
    isOrdersList: Boolean,
    isFavoritesList: Boolean,
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
        if (this.isOrdersList) {
          return 1
        } else if (this.isFavoritesList) {
          return 2
        } else {
          return 0
        }
      },
      set (tabIndex) {
        this.$emit('update:is-orders-list', tabIndex === 1)
        this.$emit('update:is-favorites-list', tabIndex === 2)
        console.log(tabIndex)
        console.log(this.isFavoritesList)
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
