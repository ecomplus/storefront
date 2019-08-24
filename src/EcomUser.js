import dictionary from './lib/dictionary'

export default {
  name: 'EcomUser',

  props: {
    lang: {
      type: String,
      default: 'pt_br'
    },
    storeId: {
      type: Number,
      required: true
    },
    menuRightAlignment: {
      type: Boolean,
      default: true
    },
    getGreetingsMsg: {
      type: Function
    },
    // storefront app absolute links
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
      name: '',
      showMenu: false
    }
  },

  computed: {
    greetings () {
      if (typeof this.getGreetingsMsg === 'function') {
        // prop function to generate greetings message by customer name
        return this.getGreetingsMsg(this.name)
      } else {
        // default message
        return `${dictionary('hello', this.lang)} ${this.name}`
      }
    }
  },

  methods: {
    dictionary
  },

  created () {
  }
}
