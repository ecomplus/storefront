import { i18n } from '@ecomplus/utils'
import EcomPassport from '@ecomplus/passport-client'
import InputDocNumber from './../_internal/InputDocNumber.vue'
import { FadeTransition, SlideYUpTransition } from 'vue2-transitions'

import {
  Continue,
  EnterYourDocNumber,
  EnterYourEmail,
  HelloAgain,
  IdentifyAccount,
  InvalidLoginInfo,
  LoginError,
  ManageYourHistory,
  NotifyAboutOrders,
  OauthOnPopup,
  OrProceedWith,
  SignInWith,
  WasAnErrorOnLogin,
  WeUseYourDataTo
} from './../../lib/i18n'

export default {
  name: 'EcIdentify',

  components: {
    InputDocNumber,
    FadeTransition,
    SlideYUpTransition
  },

  props: {
    mergeDictionary: {
      type: Object,
      default: () => {}
    },
    customerEmail: {
      type: String
    }
  },

  data () {
    return {
      ecomPassport: new EcomPassport(),
      email: this.customerEmail,
      docNumber: '',
      isCompany: false,
      oauthProviders: [],
      waitingPopup: false,
      waitingLogin: false,
      alertLoginFail: false
    }
  },

  computed: {
    dictionary () {
      return {
        Continue,
        EnterYourDocNumber,
        EnterYourEmail,
        HelloAgain,
        IdentifyAccount,
        InvalidLoginInfo,
        LoginError,
        ManageYourHistory,
        NotifyAboutOrders,
        OauthOnPopup,
        OrProceedWith,
        SignInWith,
        WasAnErrorOnLogin,
        WeUseYourDataTo,
        ...this.mergeDictionary
      }
    }
  },

  methods: {
    i18n (label) {
      return i18n(this.dictionary[label])
    },

    confirmAccount () {
      const { isLogged, isAuthorized, getCustomer } = this.ecomPassport
      return isLogged() && !isAuthorized() && getCustomer().main_email === this.email
    },

    submitLogin () {
      if (!this.waitingLogin) {
        this.waitingLogin = true
        this.alertLoginFail = false
        const { email, docNumber } = this
        const isAccountConfirm = this.confirmAccount()
        this.ecomPassport.fetchLogin(email, isAccountConfirm ? docNumber : null)
          .catch(err => {
            const { response } = err
            if (!response || response.status !== 403) {
              console.error(err)
              this.$bvToast.toast(this.i18n('WasAnErrorOnLogin'), {
                title: this.i18n('LoginError'),
                variant: 'warning',
                solid: true
              })
            } else if (!isAccountConfirm) {
              this.$emit('update:customerEmail', this.email)
            } else {
              this.alertLoginFail = true
            }
          })
          .finally(() => {
            this.waitingLogin = false
          })
      }
    },

    oauthPopup (link) {
      this.ecomPassport.popupOauthLink(link)
      this.waitingPopup = true
    }
  },

  watch: {
    docNumber () {
      if (this.alertLoginFail) {
        this.alertLoginFail = false
      }
    }
  },

  created () {
    this.ecomPassport.fetchOauthProviders()
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
        console.error(err)
      })
  },

  mounted () {
    this.$refs.inputEmail.focus()
    const { isLogged, isAuthorized, getCustomer } = this.ecomPassport
    const handleLogin = () => {
      if (isAuthorized()) {
        this.$emit('login', this.ecomPassport)
      } else if (isLogged()) {
        const customer = getCustomer()
        this.email = customer.main_email
        this.isCompany = customer.registry_type === 'j'
        setTimeout(() => {
          this.$refs.InputDoc.$el.focus()
        }, 400)
      }
    }
    EcomPassport.on('login', ({ sessionId, isAuthorized }) => {
      if (sessionId === this.ecomPassport.sessionId) {
        this.waitingPopup = false
        handleLogin()
      }
    })
    handleLogin()
  }
}
