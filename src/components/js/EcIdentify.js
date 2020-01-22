import { i18n } from '@ecomplus/utils'
import ecomPassport from '@ecomplus/passport-client'
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
    },
    acceptGuest: {
      type: Boolean,
      default: true
    },
    ecomPassport: {
      type: Object,
      default: () => ecomPassport
    }
  },

  data () {
    return {
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
      const { checkLogin, checkAuthorization, getCustomer } = this.ecomPassport
      return checkLogin() && !checkAuthorization() && getCustomer().main_email === this.email
    },

    submitLogin () {
      if (!this.waitingLogin) {
        this.waitingLogin = true
        this.alertLoginFail = false
        const { email, docNumber } = this
        const isAccountConfirm = this.confirmAccount()
        const emitUpdate = () => this.$emit('update', { email, docNumber })
        this.ecomPassport.fetchLogin(email, isAccountConfirm ? docNumber : null)
          .then(() => {
            if (isAccountConfirm) {
              emitUpdate()
            }
          })
          .catch(err => {
            const { response } = err
            if (!response || response.status !== 403) {
              console.error(err)
              this.$bvToast.toast(this.i18n('WasAnErrorOnLogin'), {
                title: this.i18n('LoginError'),
                variant: 'warning',
                solid: true
              })
            } else if (!isAccountConfirm && this.acceptGuest) {
              this.$emit('update:customerEmail', email)
              emitUpdate()
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
      setTimeout(() => {
        this.waitingPopup = false
      }, 7500)
    },

    unsetLoginAlert () {
      if (this.alertLoginFail) {
        this.alertLoginFail = false
      }
    }
  },

  watch: {
    email () {
      this.unsetLoginAlert()
    },

    docNumber () {
      this.unsetLoginAlert()
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
    const { checkLogin, checkAuthorization, getCustomer } = this.ecomPassport
    const handleLogin = () => {
      if (checkAuthorization()) {
        this.$emit('login', this.ecomPassport)
      } else if (checkLogin()) {
        const customer = getCustomer()
        this.email = customer.main_email
        this.isCompany = customer.registry_type === 'j'
        setTimeout(() => {
          this.$refs.InputDoc.$el.focus()
        }, 400)
      }
    }
    ecomPassport.on('login', () => {
      this.waitingPopup = false
      handleLogin()
    })
    handleLogin()
  }
}
