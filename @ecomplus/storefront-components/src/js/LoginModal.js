import {
  i19close,
  i19continueLoginOnPopup,
  i19email,
  i19guestCheckoutMsg,
  i19hello,
  i19loginErrorMsg,
  i19login,
  i19logout,
  i19myAccount,
  i19myOrders,
  i19noProfileFoundWithEmail,
  i19signInWith,
  i19signInWithAnotherEmail,
  i19signUpWith,
  i19visitor
} from '@ecomplus/i18n'

import { i18n } from '@ecomplus/utils'
import ecomPassport from '@ecomplus/passport-client'
import ALink from '../ALink.vue'
import AAlert from '../AAlert.vue'
import ABackdrop from '../ABackdrop.vue'

export default {
  name: 'LoginModal',

  components: {
    ALink,
    AAlert,
    ABackdrop
  },

  props: {
    isVisible: {
      type: Boolean,
      default: true
    },
    getGreetingsMsg: Function,
    accountUrl: {
      type: String,
      default: '/app/#/account/'
    },
    ordersUrl: {
      type: String,
      default: '/app/#/account/orders'
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
      isLoading: false,
      isWaitingPopup: false,
      isLogged: false,
      email: '',
      name: '',
      oauthProviders: [],
      isLoginForm: false,
      hasLoginError: false,
      hasNoProfileFound: false
    }
  },

  computed: {
    i19close: () => i18n(i19close),
    i19continueLoginOnPopup: () => i18n(i19continueLoginOnPopup),
    i19email: () => i18n(i19email),
    i19guestCheckoutMsg: () => i18n(i19guestCheckoutMsg),
    i19loginErrorMsg: () => i18n(i19loginErrorMsg),
    i19login: () => i18n(i19login),
    i19logout: () => i18n(i19logout),
    i19myAccount: () => i18n(i19myAccount),
    i19myOrders: () => i18n(i19myOrders),
    i19noProfileFoundWithEmail: () => i18n(i19noProfileFoundWithEmail),
    i19signInWith: () => i18n(i19signInWith),
    i19signInWithAnotherEmail: () => i18n(i19signInWithAnotherEmail),
    i19signUpWith: () => i18n(i19signUpWith),

    greetings () {
      if (typeof this.getGreetingsMsg === 'function') {
        return this.getGreetingsMsg(this.name)
      } else {
        return `${i18n(i19hello)} ${this.name || i18n(i19visitor)}`
      }
    }
  },

  methods: {
    hide () {
      this.$emit('update:is-visible', false)
    },

    update () {
      const { checkLogin, getCustomerName } = this.ecomPassport
      this.name = getCustomerName()
      this.isLogged = checkLogin()
      this.email = ''
      this.isWaitingPopup = false
    },

    waitPromise (promise) {
      this.isLoading = true
      promise
        .catch(console.error)
        .finally(() => {
          this.isLoading = false
        })
    },

    setOauthProviders () {
      const promise = this.ecomPassport.fetchOauthProviders()
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
          this.oauthProviders = oauthProviders
        })
        .catch(err => {
          this.presetOauthProviders()
          throw err
        })
      this.waitPromise(promise)
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

    openOauthPopup (link, provider) {
      this.hasLoginError = false
      if (link) {
        this.ecomPassport.popupOauthLink(link)
        this.isWaitingPopup = true
      } else {
        const promise = this.setOauthProviders()
          .then(() => {
            const link = this.oauthProviders
              .find(oauthProvider => oauthProvider.provider === provider)
            this.openOauthPopup(link, provider)
          })
          .catch(err => {
            this.hasLoginError = true
            throw err
          })
        this.waitPromise(promise)
      }
    },

    submitEmail () {
      this.isLoginForm = false
      const promise = this.ecomPassport.fetchLogin(this.email)
        .catch(err => {
          const { response } = err
          if (response && response.status === 403) {
            this.hasNoProfileFound = true
          } else {
            setTimeout(() => {
              this.hasLoginError = true
            }, 100)
            throw err
          }
        })
      this.waitPromise(promise)
    },

    logout () {
      this.ecomPassport.logout()
    }
  },

  watch: {
    hasNoProfileFound (newStatus) {
      if (newStatus === false) {
        this.email = ''
      }
      this.isLoginForm = !newStatus
    },

    isLoginForm (isLoginForm) {
      this.hasLoginError = false
      if (isLoginForm) {
        this.isWaitingPopup = false
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.input.focus()
          }, 200)
        })
      }
    }
  },

  mounted () {
    ;['login', 'logout'].forEach(ev => {
      this.ecomPassport.on(ev, payload => {
        this.update()
        this.$emit(ev, payload)
      })
    })
    this.update()
    this.setOauthProviders()
  }
}
