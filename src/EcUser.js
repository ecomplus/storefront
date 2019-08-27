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
      showPopover: false,
      waiting: false,
      isLogged: false,
      email: '',
      name: '',
      oauthProviders: [],
      showLoginForm: false,
      popupAlertCount: 0,
      loginErrorAlert: false,
      noProfileFound: false
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
          console.error(err)
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
      return promise
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
      const vm = this
      this.loginErrorAlert = false
      if (link) {
        vm.popupAlertCount = vm.popupAlertCountSecs
        vm.ecomPassport.popupOauthLink(link)
      } else {
        const promise = vm.setOauthProviders()
          .then(() => {
            const link = vm.oauthProviders
              .find(oauthProvider => oauthProvider.provider === provider)
            vm.oauthPopup(link, provider)
          })
          .catch(err => {
            vm.loginErrorAlert = true
            throw err
          })
        vm.waitPromise(promise)
      }
    },

    popupAlertChanged (countDown) {
      this.popupAlertCount = countDown
    },

    emailLoginSubmit (e) {
      const vm = this
      e.preventDefault()
      vm.showLoginForm = false
      const promise = vm.ecomPassport.fetchLogin(this.email)
        .catch(err => {
          const { response } = err
          if (response && response.status === 403) {
            vm.noProfileFound = true
          } else {
            setTimeout(() => {
              vm.loginErrorAlert = true
            }, 100)
            throw err
          }
        })
      vm.waitPromise(promise)
    },

    logout () {
      this.ecomPassport.logout()
    },

    resetErrors () {
      this.noProfileFound = this.loginErrorAlert = false
    },

    resetPopover () {
      if (this.showLoginForm) {
        this.showLoginForm = false
      } else {
        this.resetErrors()
      }
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
    window.addEventListener('scroll', () => {
      if (window.navFixed && vm.showPopover) {
        vm.showPopover = false
      }
    })
  },

  watch: {
    noProfileFound (newStatus) {
      if (newStatus === false) {
        this.email = ''
      }
      this.showLoginForm = !newStatus
    },

    showLoginForm () {
      this.loginErrorAlert = false
    }
  }
}
