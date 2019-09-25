import { _config, i18n } from '@ecomplus/utils'
import EcomPassport from '@ecomplus/passport-client'
import { FadeTransition, SlideYUpTransition } from 'vue2-transitions'

import {
  Continue,
  EnterYourEmail,
  IdentifyAccount,
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
    FadeTransition,
    SlideYUpTransition
  },

  props: {
    lang: {
      type: String
    },
    storeId: {
      type: Number,
      default: _config.get('store_id')
    },
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
      ecomPassport: new EcomPassport(this.storeId, this.lang),
      email: this.customerEmail,
      oauthProviders: [],
      waitingPopup: false,
      waitingLogin: false
    }
  },

  computed: {
    dictionary () {
      return {
        Continue,
        EnterYourEmail,
        IdentifyAccount,
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
      return i18n(this.dictionary[label], this.lang)
    },

    updateEmail () {
      this.$emit('update:customerEmail', this.email)
    },

    submitEmail () {
      if (!this.waitingLogin) {
        this.waitingLogin = true
        this.ecomPassport.fetchLogin(this.email)
          .then(this.updateEmail)
          .catch(err => {
            const { response } = err
            if (!response || response.status !== 403) {
              console.error(err)
              this.$bvToast.toast(this.i18n('WasAnErrorOnLogin'), {
                title: this.i18n('LoginError'),
                variant: 'warning',
                solid: true
              })
            } else {
              this.updateEmail()
            }
          })
          .finally(() => {
            this.waitingLogin = false
          })
      }
    },

    setOauthProviders () {
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

    oauthPopup (link) {
      this.ecomPassport.popupOauthLink(link)
      this.waitingPopup = true
    }
  },

  created () {
    this.setOauthProviders()
    EcomPassport.on('login', ({ sessionId }) => {
      if (sessionId === this.ecomPassport.sessionId) {
        this.waitingPopup = false
        this.$emit('login', this.ecomPassport)
      }
    })
    if (this.ecomPassport.isLogged()) {
      this.$emit('login', this.ecomPassport)
    }
  },

  mounted () {
    this.$refs.input.focus()
  }
}
