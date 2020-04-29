import {
  i19changePaymentMethod,
  i19checkout,
  i19generateBillet,
  i19interestFree,
  i19ofDiscount,
  i19onFreight,
  i19paymentError,
  i19paymentErrorMsg,
  i19total,
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
    appsSort: {
      type: Array,
      default () {
        return window.ecomPaymentApps || []
      }
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
      paymentGateways: [],
      selectedGateway: -1,
      loadedClients: {}
    }
  },

  computed: {
    i19changePaymentMethod: () => i18n(i19changePaymentMethod),
    i19checkout: () => i18n(i19checkout),
    i19generateBillet: () => i18n(i19generateBillet),
    i19interestFree: () => i18n(i19interestFree),
    i19ofDiscount: () => i18n(i19ofDiscount),
    i19onFreight: () => i18n(i19onFreight),
    i19total: () => i18n(i19total),
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

    parsePaymentOptions (listResult = [], isUpdatingSelected) {
      if (!isUpdatingSelected) {
        this.paymentGateways = []
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
              const jsClient = paymentGateway.js_client
              if (jsClient) {
                const gatewayIndex = isUpdatingSelected
                  ? this.selectedGateway
                  : this.paymentGateways.length
                this.loadedClients[gatewayIndex] = loadPaymentClient(jsClient, true)
              }
              if (!isUpdatingSelected) {
                this.paymentGateways.push(paymentGateway)
              } else {
                this.paymentGateways[this.selectedGateway] = paymentGateway
                isUpdatingSelected = false
              }
            })
          }
        })
      }
    },

    fetchPaymentGateways (appId) {
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
        can_fetch_when_selected: true
      }
      if (this.customer) {
        data.customer = {}
        for (const prop in this.customer) {
          const val = this.customer[prop]
          if (val && (typeof val !== 'object' || Object.keys(val).length)) {
            data.customer[prop] = val
          }
        }
      }
      if (appId) {
        url += `?app_id=${appId}`
        if (this.paymentGateway.payment_method) {
          data.payment_method = this.paymentGateway.payment_method
        }
      }
      this.isWaiting = true
      modules({ url, method, data })
        .then(({ data }) => {
          this.parsePaymentOptions(data.result, Boolean(appId && this.selectedGateway >= 0))
        })
        .finally(() => {
          this.isWaiting = false
        })
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
      handler () {
        const { paymentGateway } = this
        this.$emit('select-gateway', paymentGateway)
        if (paymentGateway.fetch_when_selected) {
          this.fetchPaymentGateways(paymentGateway.app_id)
        }
      },
      immediate: true
    }
  },

  created () {
    setTimeout(() => {
      this.fetchPaymentGateways()
    }, 50)
  }
}
