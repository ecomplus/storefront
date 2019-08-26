import { _config } from '@ecomplus/utils'
import dictionary from './lib/dictionary'
import EcomPassport from '@ecomplus/passport-client'
import { SlideYUpTransition } from 'vue2-transitions'

export default {
  name: 'StUser',

  components: {
    SlideYUpTransition
  },

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
    },
    popupAlertCountSecs: {
      type: Number,
      default: 3
    }
  },

  data () {
    return {
      waiting: false,
      isLogged: false,
      email: '',
      name: '',
      oauthProviders: [],
      showLoginForm: false,
      popupAlertCount: 0
    }
  },

  computed: {
    greetings () {
      if (typeof this.getGreetingsMsg === 'function') {
        return this.getGreetingsMsg(this.name)
      } else {
        return `${dictionary('hello', this.lang)} ${this.name || dictionary('visitor', this.lang)}`
      }
    }
  },

  methods: {
    dictionary,

    update () {
      const { isLogged, getCustomerName } = this.ecomPassport
      this.name = getCustomerName()
      this.isLogged = isLogged()
      this.email = ''
      this.popupAlertCount = 0
    },

    waitPromise (promise) {
      const vm = this
      vm.waiting = true
      promise
        .catch(err => {
          vm.$emit('error', err)
        })
        .finally(() => {
          vm.waiting = false
        })
    },

    setOauthProviders () {
      const vm = this
      const promise = vm.ecomPassport.fetchOauthProviders()
        .then(({ host, baseUri, oauthPath, providers }) => {
          const oauthProviders = []
          for (const provider in providers) {
            if (providers[provider]) {
              const { faIcon, providerName } = providers[provider]
              oauthProviders.push({
                link: host + baseUri + provider + oauthPath,
                faIcon,
                provider,
                providerName
              })
            }
          }
          vm.oauthProviders = oauthProviders
        })
        .catch(err => {
          vm.presetOauthProviders()
          throw err
        })
      vm.waitPromise(promise)
    },

    presetOauthProviders () {
      this.oauthProviders = [
        {
          faIcon: 'fa-facebook-f',
          providerName: 'Facebook',
          provider: 'facebook'
        },
        {
          faIcon: 'fa-google',
          providerName: 'Google',
          provider: 'google'
        },
        {
          faIcon: 'fa-windows',
          providerName: 'Windows',
          provider: 'windowslive'
        }
      ]
    },

    oauthPopup (link, provider) {
      if (link) {
        this.popupAlertCount = this.popupAlertCountSecs
        this.ecomPassport.popupOauthLink(link)
      } else {
      }
    },

    popupAlertChanged (countDown) {
      this.popupAlertCount = countDown
    },

    emailLoginSubmit (e) {
      e.preventDefault()
      this.waitPromise(this.ecomPassport.fetchLogin(this.email))
      this.showLoginForm = false
    },

    logout () {
      this.ecomPassport.logout()
    }
  },

  mounted () {
    const vm = this
    ;['login', 'logout'].forEach(ev => {
      EcomPassport.on(ev, ({ sessionId }) => {
        if (sessionId === vm.ecomPassport.sessionId) {
          vm.update()
          vm.$emit(ev, vm.ecomPassport)
        }
      })
    })
    vm.update()
    vm.setOauthProviders()
  }
}
