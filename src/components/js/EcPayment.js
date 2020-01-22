import { i18n, price, formatMoney } from '@ecomplus/utils'
import { modules } from '@ecomplus/client'
import ecomCart from '@ecomplus/shopping-cart'
import loadPaymentClient from './../../lib/load-payment-client'
import { sortApps } from './../../lib/utils'
import EcCreditCard from './../EcCreditCard.vue'
import { FadeTransition, SlideYUpTransition } from 'vue2-transitions'

import {
  ChangePaymentMethod,
  Checkout,
  GenerateBillet,
  InterestFree,
  OfDiscount,
  OnFreight,
  PaymentError,
  PaymentErrorMsg,
  Total,
  UpTo
} from './../../lib/i18n'

export default {
  name: 'EcPayment',

  components: {
    EcCreditCard,
    FadeTransition,
    SlideYUpTransition
  },

  props: {
    mergeDictionary: {
      type: Object,
      default: () => {}
    },
    ecomCart: {
      type: Object,
      default: () => ecomCart
    },
    amount: {
      type: Object,
      required: true
    },
    cartItems: Array,
    customer: Object,
    appsSort: {
      type: Array,
      default: () => window.ecomPaymentApps || []
    }
  },

  data () {
    return {
      waiting: false,
      paymentGateways: [],
      selectedGateway: -1,
      loadedClients: {}
    }
  },

  computed: {
    dictionary () {
      return {
        ChangePaymentMethod,
        Checkout,
        GenerateBillet,
        InterestFree,
        OfDiscount,
        OnFreight,
        PaymentError,
        PaymentErrorMsg,
        Total,
        UpTo,
        ...this.mergeDictionary
      }
    },

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
                  this.$bvToast.toast(this.i18n('PaymentErrorMsg'), {
                    title: this.i18n('PaymentError'),
                    variant: 'warning',
                    solid: true
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

    isCompany () {
      return this.customer && this.customer.registry_type !== 'p'
    },

    customerName () {
      return this.customer && this.customer.name && this.customer.name.given_name
    }
  },

  methods: {
    formatMoney,

    i18n (label) {
      return i18n(this.dictionary[label])
    },

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
          .reduce((subtotal, item) => subtotal + price(item) * item.quantity, 0)
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
      this.waiting = true
      modules({ url, method, data })
        .then(({ data }) => {
          this.parsePaymentOptions(data.result, Boolean(appId && this.selectedGateway >= 0))
        })
        .finally(() => {
          this.waiting = false
        })
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
        this.$emit('gatewaySelected', paymentGateway)
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
