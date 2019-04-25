'use strict'

import dictionary from './lib/dictionary'

// E-Com Plus Passport client to handle user login
/* global EcomPassport */
const {
  init,
  isLogged,
  customerName,
  loginPopup,
  logout
} = EcomPassport

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
    dictionary,

    update () {
      this.isLogged = isLogged()
      this.name = customerName()
    },

    toggle () {
      if (!this.isLogged) {
        this.showMenu = false
        // start login flow with passport
        // update data after login
        loginPopup(this.update)
      } else {
        this.showMenu = !this.showMenu
      }
    },

    logout () {
      // clear user session
      logout()
      this.update()
      // hide user menu again
      this.showMenu = false
    }
  },

  created () {
    init(this.storeId, this.lang)
    this.update()
  }
}
