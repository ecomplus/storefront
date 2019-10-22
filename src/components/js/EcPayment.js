import { i18n, price, formatMoney } from '@ecomplus/utils'
import { modules } from '@ecomplus/client'
import loadPaymentClient from './../../lib/load-payment-client'
import EcomCart from '@ecomplus/shopping-cart'
import EcCreditCard from './../EcCreditCard.vue'
import { FadeTransition, SlideYUpTransition } from 'vue2-transitions'

import {
  ChangePaymentMethod,
  Checkout,
  GenerateBillet,
  InterestFree,
  OfDiscount,
  OnFreight,
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
      default: () => new EcomCart()
    },
    amount: {
      type: Object,
      required: true
    },
    cartItems: {
      type: Array
    },
    customer: {
      type: Object
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
              window[transactionPromise].then(this.checkout)
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

    parsePaymentOptions (listResult = []) {
      this.paymentGateways = []
      this.loadedClients = {}
      if (listResult.length) {
        listResult.forEach(appResult => {
          const { validated, error, response } = appResult
          if (validated && !error) {
            response.payment_gateways.forEach(gateway => {
              const paymentGateway = {
                app_id: appResult.app_id,
                installment_option: this.installmentOption(gateway),
                ...gateway
              }
              this.paymentGateways.push(paymentGateway)
              const jsClient = paymentGateway.js_client
              if (jsClient) {
                const gatewayIndex = this.paymentGateways.length - 1
                this.loadedClients[gatewayIndex] = loadPaymentClient(jsClient, true)
              }
            })
          }
        })
      }
    },

    fetchPaymentGateways () {
      const url = '/list_payments.json'
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
        domain: window.location.hostname
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
      this.waiting = true
      modules({ url, method, data })
        .then(({ data }) => this.parsePaymentOptions(data.result))
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
    selectedGateway () {
      this.$emit('gatewaySelected', this.paymentGateway)
    }
  },

  created () {
    this.fetchPaymentGateways()
  }
}
