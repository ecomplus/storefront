import { i18n, price, formatMoney } from '@ecomplus/utils'
import { modules } from '@ecomplus/client'
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
      selectedGateway: -1
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

    paymentGateway () {
      return this.paymentGateways[this.selectedGateway] || {}
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
      if (listResult.length) {
        listResult.forEach(appResult => {
          const { validated, error, response } = appResult
          if (validated && !error) {
            response.payment_gateways.forEach(gateway => {
              this.paymentGateways.push({
                app_id: appResult.app_id,
                installment_option: this.installmentOption(gateway),
                ...gateway
              })
            })
          }
        })
      }
    },

    fetchPaymentGateways () {
      const url = '/list_payments.json'
      const method = 'POST'
      const items = this.cartItems || this.ecomCart.data.items
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
      const data = { items, amount }
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
