import {
  i19addresses,
  i19favorites,
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
    currentTab: {
      type: String,
      validator: function (value) {
        return ['orders', 'favorites', 'account'].includes(value)
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
      favoriteIds: []
    }
  },

  computed: {
    i19addresses: () => i18n(i19addresses),
    i19favorites: () => i18n(i19favorites),
    i19hello: () => i18n(i19hello),
    i19isNotYou: () => i18n(i19isNotYou),
    i19logout: () => i18n(i19logout),
    i19noFavoritesMsg: () => i18n({
      pt_br: 'Você ainda não tem itens favoritos',
      en_us: 'You have no favorite item yet'
    }),
    i19orders: () => i18n(i19orders),
    i19registration: () => i18n(i19registration),

    activeTab: {
      get () {
        return this.currentTab === 'orders' ? 1 : this.currentTab === 'favorites' ? 2 : 0
      },
      set (tabIndex) {
        this.$emit('update:current-tab', tabIndex === 1 ? 'orders' : tabIndex === 2 ? 'favorites' : 'account')
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
    this.favoriteIds = favorites
  }
}
