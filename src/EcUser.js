import { _config } from '@ecomplus/utils'
import dictionary from './lib/dictionary'
import EcomPassport from '@ecomplus/passport-client'

export default {
  name: 'StUser',

  props: {
    lang: {
      type: String,
      default: _config.get('lang')
    },
    storeId: {
      type: Number,
      default: _config.get('store_id')
    },
    ecomPassport: {
      type: Object,
      default: () => new EcomPassport()
    },
    popoverPlacement: {
      type: String,
      default: 'bottomleft'
    },
    getGreetingsMsg: {
      type: Function
    },
    accountUrl: {
      type: String,
      default: '/app/#/account/'
    },
    ordersUrl: {
      type: String,
      default: '/app/#/account/orders'
    }
  },

  data () {
    return {
      isLogged: false,
      name: ''
    }
  },

  computed: {
    greetings () {
      if (typeof this.getGreetingsMsg === 'function') {
        return this.getGreetingsMsg(this.name)
      } else {
        return `${dictionary('hello', this.lang)} ${this.name}`
      }
    }
  },

  methods: {
    dictionary,

    update () {
      const { isLogged, getCustomerName } = this.ecomPassport
      this.name = getCustomerName()
      this.isLogged = isLogged()
    }
  },

  mounted () {
    EcomPassport.on('login', this.update)
    EcomPassport.on('logout', this.update)
    this.ecomPassport.fetchOauthProviders().then(data => window.alert(JSON.stringify(data)))
  }
}
