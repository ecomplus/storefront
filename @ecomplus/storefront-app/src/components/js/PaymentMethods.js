import {
  i19anyPaymentMethodMsg,
  i19changePaymentMethod,
  i19checkout,
  i19generateBillet,
  i19interestFree,
  i19ofDiscount,
  i19onFreight,
  i19paymentError,
  i19paymentErrorMsg,
  i19recurrent,
  i19total,
  i19tryAgain,
  i19upTo
} from '@ecomplus/i18n'

import {
  i18n,
  price as getPrice,
  formatMoney
} from '@ecomplus/utils'

import { modules } from '@ecomplus/client'
import ecomCart from '@ecomplus/shopping-cart'
import loadPaymentClient from '../../lib/load-payment-client'
import { sortApps } from '../../lib/utils'
import CreditCardForm from '../CreditCardForm.vue'

export default {
  name: 'PaymentMethods',

  components: {
    CreditCardForm
  },

  props: {
    amount: {
      type: Object,
      required: true
    },
    cartItems: Array,
    customer: Object,
    paymentGateways: {
      type: Array,
      default () {
        return window.ecomPaymentGateways || []
      }
    },
    defaultAppId: {
      type: Number,
      default () {
        return window.ecomDefaultPaymentApp
      }
    },
    appsSort: {
      type: Array,
      default () {
        return window.ecomPaymentApps || []
      }
    },
    canUpdateGateways: {
      type: Boolean,
      default: !(window.ecomPaymentGateways && window.ecomPaymentGateways.length)
    },
    ecomCart: {
      type: Object,
      default () {
        return ecomCart
      }
    }
  },

  data () {
    return {
      isWaiting: false,
      fetching: null,
      processingAppId: undefined,
      hasLoaded: false,
      selectedGateway: -1,
      loadedClients: {}
    }
  },

  computed: {
    i19anyPaymentMethodMsg: () => i18n(i19anyPaymentMethodMsg),
    i19changePaymentMethod: () => i18n(i19changePaymentMethod),
    i19checkout: () => i18n(i19checkout),
    i19generateBillet: () => i18n(i19generateBillet),
    i19interestFree: () => i18n(i19interestFree),
    i19ofDiscount: () => i18n(i19ofDiscount),
    i19onFreight: () => i18n(i19onFreight),
    i19recurrent: () => i18n(i19recurrent),
    i19total: () => i18n(i19total),
    i19tryAgain: () => i18n(i19tryAgain),
    i19upTo: () => i18n(i19upTo),

    items () {
      return this.cartItems || this.ecomCart.data.items
    },

    paymentGateway () {
      return this.paymentGateways[this.selectedGateway] || {}
    },

    jsClient () {
      return this.paymentGateway.js_client
    },

    jsClientLoad () {
      const { amount, customer, items, loadedClients, selectedGateway } = this
      if (amount.total) {
        return loadedClients[selectedGateway].then(runOnloadExpression => {
          if (this.$refs.gatewayContainer) {
            this.$refs.gatewayContainer.innerHTML = this.jsClient.container_html
          }
          const payload = runOnloadExpression({ amount, customer, items })
          const transactionPromise = this.jsClient.transaction_promise
          if (transactionPromise && selectedGateway === this.selectedGateway) {
            try {
              window[transactionPromise]
                .then(this.checkout)
                .catch(err => {
                  console.error(err)
                  this.$toast({
                    title: i18n(i19paymentError),
                    body: i18n(i19paymentErrorMsg),
                    variant: 'danger'
                  })
                })
            } catch (err) {
              console.error(err)
            }
          }
          return payload
        })
      } else {
        return Promise.resolve()
      }
    },

    canShowGatewayIcon () {
      return this.selectedGateway === -1 || !this.jsClient || !this.jsClient.container_html
    },

    shouldUseCardForm () {
      switch (this.paymentGateway.payment_method.code) {
        case 'credit_card':
          return true
        case 'debit_card':
        case 'balance_on_intermediary':
          return Boolean(this.jsClient)
      }
      return false
    },

    isCompany () {
      return this.customer && this.customer.registry_type !== 'p'
    },

    customerName () {
      return this.customer && this.customer.name && this.customer.name.given_name
    }
  },

  methods: {
    formatMoney,

    gatewayIcon (gateway) {
      switch (gateway.payment_method.code) {
        case 'credit_card':
          return 'credit-card'
        case 'banking_billet':
          return 'barcode'
      }
      return 'money-check'
    },

    installmentOption (gateway) {
      let bestOption
      if (gateway.installment_options) {
        gateway.installment_options.forEach(option => {
          if (
            !bestOption ||
            (!option.tax && bestOption.tax) ||
            (option.tax === bestOption.tax && option.number > bestOption.number)
          ) {
            bestOption = option
          }
        })
      }
      return bestOption
    },

    setupGatewayClient (paymentGateway, gatewayIndex) {
      const jsClient = paymentGateway.js_client
      if (jsClient) {
        this.loadedClients[gatewayIndex] = loadPaymentClient(jsClient, true)
      }
    },

    postHandleGateways () {
      this.paymentGateways.forEach(this.setupGatewayClient)
      if (!this.hasLoaded && this.paymentGateways.length) {
        this.hasLoaded = true
        if (this.defaultAppId && this.selectedGateway === -1) {
          this.selectedGateway = this.paymentGateways.findIndex(gateway => {
            return gateway.app_id === this.defaultAppId
          })
        }
      }
    },

    parsePaymentOptions (listResult = [], isUpdatingSelected) {
      let { paymentGateways } = this
      if (!isUpdatingSelected) {
        paymentGateways = []
        this.loadedClients = {}
      }
      if (listResult.length) {
        if (Array.isArray(this.appsSort) && this.appsSort.length) {
          sortApps(listResult, this.appsSort)
        }
        listResult.forEach(appResult => {
          const { validated, error, response } = appResult
          if (validated && !error) {
            response.payment_gateways.forEach(gateway => {
              const paymentGateway = {
                app_id: appResult.app_id,
                installment_option: this.installmentOption(gateway),
                ...gateway
              }
              if (!isUpdatingSelected) {
                paymentGateways.push(paymentGateway)
              } else {
                this.setupGatewayClient(paymentGateway, this.selectedGateway)
                paymentGateways[this.selectedGateway] = paymentGateway
                isUpdatingSelected = false
              }
            })
          }
        })
      }
      this.$emit('update:payment-gateways', paymentGateways)
    },

    fetchPaymentGateways (appId = null, isRetry = false) {
      let url = '/list_payments.json'
      const method = 'POST'
      const { items } = this
      const amount = this.amount ? { ...this.amount } : {}
      if (typeof amount.subtotal !== 'number') {
        amount.total = amount.subtotal = items
          .reduce((subtotal, item) => subtotal + getPrice(item) * item.quantity, 0)
        if (amount.freight) {
          amount.total += amount.freight
        }
        if (amount.discount) {
          amount.total -= amount.discount
        }
      }
      const data = {
        items,
        amount,
        domain: window.location.hostname,
        can_fetch_when_selected: true,
        currency_id: items[0].currency_id || window.$ecomConfig.get('currency'),
        currency_symbol: items[0].currency_symbol || window.$ecomConfig.get('currency_symbol')
      }
      if (!isRetry && this.customer) {
        data.customer = {}
        for (const prop in this.customer) {
          const val = this.customer[prop]
          if (val && (typeof val !== 'object' || Object.keys(val).length)) {
            data.customer[prop] = val
          }
        }
      }
      if (appId > 0) {
        url += `?app_id=${appId}`
        if (this.paymentGateway.payment_method) {
          data.payment_method = this.paymentGateway.payment_method
        }
      }
      if (!this.isWaiting || this.processingAppId !== appId) {
        this.isWaiting = true
        this.processingAppId = appId
        setTimeout(() => {
          this.fetching = modules({ url, method, data })
            .then(({ data }) => {
              this.parsePaymentOptions(data.result, Boolean(appId && this.selectedGateway >= 0))
            })
            .catch(err => {
              console.error(err)
              if (!isRetry) {
                setTimeout(() => {
                  this.fetchPaymentGateways(appId, true)
                }, err.response && err.response.status === 400 ? 50 : 500)
              }
            })
            .finally(() => {
              this.isWaiting = false
            })
        }, appId ? 5 : 50)
      }
    },

    handleCheckout () {
      if (!this.jsClient || !this.jsClient.transaction_promise || !this.jsClientLoad.toString()) {
        this.checkout()
      }
    },

    checkout (transaction) {
      this.$emit('checkout', {
        ...this.paymentGateway,
        ...transaction
      })
    }
  },

  watch: {
    selectedGateway: {
      handler (gatewayIndex) {
        const { paymentGateway, loadedClients } = this
        const proceed = () => {
          this.$emit('select-gateway', paymentGateway)
          if (paymentGateway.fetch_when_selected) {
            this.fetchPaymentGateways(paymentGateway.app_id)
          }
        }
        if (loadedClients[gatewayIndex]) {
          loadedClients[gatewayIndex].then(proceed)
        } else {
          proceed()
        }
      },
      immediate: true
    },

    paymentGateways: {
      handler (paymentGateways) {
        if (paymentGateways.length) {
          this.postHandleGateways()
        }
      },
      immediate: true
    },

    'amount.total' (total, oldTotal) {
      if (
        ((total && !oldTotal) || Math.abs(total - oldTotal) > 0.1) &&
        this.selectedGateway === -1 &&
        this.canUpdateGateways
      ) {
        if (!this.isWaiting) {
          this.fetchPaymentGateways()
        } else {
          this.fetching.then(this.fetchPaymentGateways)
        }
      }
    }
  },

  created () {
    if (!this.paymentGateways.length) {
      this.fetchPaymentGateways()
    }
  }
}
