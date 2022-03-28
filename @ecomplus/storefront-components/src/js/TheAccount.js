import {
  i19addresses,
  i19favorites,
  i19hello,
  i19isNotYou,
  i19logout,
  i19noSavedFavoritesMsg,
  i19orders,
  i19registration,
  i19subscriptions
} from '@ecomplus/i18n'

import {
  i18n,
  nickname as getNickname
} from '@ecomplus/utils'

import ecomPassport from '@ecomplus/passport-client'
import LoginBlock from '../LoginBlock.vue'
import RecommendedItems from '../RecommendedItems.vue'
import EcOrdersList from '../../../storefront-app/src/components/EcOrdersList.vue'

export default {
  name: 'TheAccount',

  components: {
    LoginBlock,
    RecommendedItems,
    EcOrdersList
  },

  props: {
    customer: {
      type: Object,
      default () {
        return {}
      }
    },
    currentTab: {
      type: String,
      validator: function (value) {
        return ['orders', 'favorites', 'subscriptions', 'account'].includes(value)
      }
    },
    ecomPassport: {
      type: Object,
      default () {
        return ecomPassport
      }
    }
  },

  data () {
    return {
      favoriteIds: [],
      navTabs: [i19registration, i19orders, i19favorites]
    }
  },

  computed: {
    i19addresses: () => i18n(i19addresses),
    i19favorites: () => i18n(i19favorites),
    i19hello: () => i18n(i19hello),
    i19isNotYou: () => i18n(i19isNotYou),
    i19logout: () => i18n(i19logout),
    i19noSavedFavoritesMsg: () => i18n(i19noSavedFavoritesMsg),
    i19orders: () => i18n(i19orders),
    i19subscriptions: () => i18n(i19subscriptions),
    i19registration: () => i18n(i19registration),

    activeTab: {
      get () {
        switch (this.currentTab) {
          case 'orders':
            return 1
          case 'favorites':
            return 2
          case 'subscriptions':
            return 3
          default:
            return 0
        }
      },
      set (tabIndex) {
        switch (tabIndex) {
          case 1:
            this.$emit('update:current-tab', 'orders')
            break
          case 2:
            this.$emit('update:current-tab', 'favorites')
            break
          case 3:
            this.$emit('update:current-tab', 'subscriptions')
            break
          default:
            this.$emit('update:current-tab', 'account')
        }
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
  },

  created () {
    const { favorites } = this.ecomPassport.getCustomer()
    this.favoriteIds = favorites || []

    if (this.ecomPassport.checkAuthorization()) {
      this.ecomPassport.requestApi('/orders.json?transactions.type=recurrence&limit=1&fields=_id')
        .then(({ data }) => {
          const { result } = data
          if (result.length) {
            this.navTabs.push(i19subscriptions)
          }
        })
        .catch(console.error)
    }
  }
}
