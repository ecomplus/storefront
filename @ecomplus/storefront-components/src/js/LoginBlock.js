import {
  i19continue,
  i19enterYourDocNumberMsg,
  i19enterYourEmailMsg,
  i19helloAgain,
  i19identifyYourAccount,
  i19invalidLoginInfoMsg,
  i19loginErrorMsg,
  i19manageYourPurchaseHistory,
  i19notifyAboutOrders,
  i19oauthOnPopup,
  i19orProceedWith,
  i19signInWith,
  i19weUseYourDataToMsg
} from '@ecomplus/i18n'

import { i18n } from '@ecomplus/utils'
import ecomPassport from '@ecomplus/passport-client'
import AAlert from '../AAlert.vue'
import InputDocNumber from '../InputDocNumber.vue'

export default {
  name: 'LoginBlock',

  components: {
    AAlert,
    InputDocNumber
  },

  props: {
    customerEmail: String,
    canAcceptGuest: {
      type: Boolean,
      default: true
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
      email: this.customerEmail,
      docNumber: '',
      isCompany: false,
      oauthProviders: [],
      isWaitingPopup: false,
      isWaitingLogin: false,
      failAlertText: null
    }
  },

  computed: {
    i19continue: () => i18n(i19continue),
    i19enterYourDocNumberMsg: () => i18n(i19enterYourDocNumberMsg),
    i19enterYourEmailMsg: () => i18n(i19enterYourEmailMsg),
    i19helloAgain: () => i18n(i19helloAgain),
    i19identifyYourAccount: () => i18n(i19identifyYourAccount),
    i19manageYourPurchaseHistory: () => i18n(i19manageYourPurchaseHistory),
    i19notifyAboutOrders: () => i18n(i19notifyAboutOrders),
    i19oauthOnPopup: () => i18n(i19oauthOnPopup),
    i19orProceedWith: () => i18n(i19orProceedWith),
    i19signInWith: () => i18n(i19signInWith),
    i19weUseYourDataToMsg: () => i18n(i19weUseYourDataToMsg)
  },

  methods: {
    confirmAccount () {
      const { checkLogin, checkAuthorization, getCustomer } = this.ecomPassport
      const isIdentified = checkLogin() && !checkAuthorization() &&
        getCustomer().main_email === this.email
      if (isIdentified) {
        this.$nextTick(() => {
          this.$refs.InputDoc.$el.focus()
        })
      }
      return isIdentified
    },

    submitLogin () {
      if (!this.isWaitingLogin) {
        this.isWaitingLogin = true
        this.failAlertText = null
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
              this.failAlertText = i18n(i19loginErrorMsg)
            } else if (!isAccountConfirm && this.canAcceptGuest) {
              this.$emit('update:customer-email', email)
              emitUpdate()
            } else {
              this.failAlertText = i18n(i19invalidLoginInfoMsg)
            }
          })
          .finally(() => {
            this.isWaitingLogin = false
          })
      }
    },

    oauthPopup (link) {
      this.ecomPassport.popupOauthLink(link)
      this.isWaitingPopup = true
      setTimeout(() => {
        this.isWaitingPopup = false
      }, 7500)
    }
  },

  watch: {
    email () {
      this.failAlertText = null
    },

    docNumber () {
      this.failAlertText = null
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
      }
    }
    ecomPassport.on('login', () => {
      this.isWaitingPopup = false
      handleLogin()
    })
    handleLogin()
  }
}
