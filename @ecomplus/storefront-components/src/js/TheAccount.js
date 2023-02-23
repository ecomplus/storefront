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
    currentTab: {
      type: String,
      validator: function (value) {
        return ['orders', 'favorites', 'subscriptions', 'points', 'account'].includes(value)
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
      navTabs: []
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
        return this.currentTab || 'account'
      },
      set (tab) {
        this.$emit('update:current-tab', tab)
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
    hasTab (tabValue) {
      return this.navTabs.some(tab => tab.value === tabValue)
    },

    insertSubscriptionTab () {
      const hasSubscriptions = this.hasTab('subscriptions')
      if (this.ecomPassport.checkAuthorization() && !hasSubscriptions) {
        this.ecomPassport.requestApi('/orders.json?transactions.type=recurrence&limit=1&fields=_id')
          .then(({ data }) => {
            const { result } = data
            if (result.length) {
              this.navTabs.push({
                label: this.i19subscriptions,
                value: 'subscriptions'
              })
            }
          })
          .catch(console.error)
      }
    },

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

  watch: {
    customer: {
      handler (customer) {
        const hasPoints = this.hasTab('points')
        if (Array.isArray(customer.loyalty_points_entries) && customer.loyalty_points_entries.length && !hasPoints) {
          this.navTabs.push({
            label: 'Cashback',
            value: 'points'
          })
        }
      },
      immediate: true,
      deep: true
    }
  },

  created () {
    this.navTabs = [
      {
        label: this.i19registration,
        value: 'account'
      },
      {
        label: this.i19orders,
        value: 'orders'
      },
      {
        label: this.i19favorites,
        value: 'favorites'
      }
    ]
    const { favorites } = this.ecomPassport.getCustomer()
    this.favoriteIds = favorites || []
    this.insertSubscriptionTab()
    this.ecomPassport.on('login', this.insertSubscriptionTab)
    this.$once('hook:beforeDestroy', () => {
      this.ecomPassport.off('login', this.insertSubscriptionTab)
    })
  }
}
