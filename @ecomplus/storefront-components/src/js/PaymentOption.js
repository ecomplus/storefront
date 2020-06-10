import {
  i19atSight,
  i19interestFree,
  i19of,
  i19ofDiscount,
  i19onFreight
} from '@ecomplus/i18n'

import {
  i18n,
  formatMoney
} from '@ecomplus/utils'

export default {
  name: 'PaymentOption',

  props: {
    paymentGateway: {
      type: Object,
      required: true
    },
    installmentsOption: Object,
    price: Number
  },

  computed: {
    i19atSight: () => i18n(i19atSight),
    i19interestFree: () => i18n(i19interestFree),
    i19of: () => i18n(i19of),
    i19ofDiscount: () => i18n(i19ofDiscount),
    i19onFreight: () => i18n(i19onFreight),

    discount () {
      if (this.paymentGateway.discount && this.paymentGateway.discount.value > 0) {
        return this.paymentGateway.discount
      }
    },

    installmentOptions () {
      if (
        this.paymentGateway.installment_options &&
        this.paymentGateway.installment_options.length
      ) {
        return this.paymentGateway.installment_options.concat().sort((a, b) => {
          return a.number - b.number
        })
      } else if (
        this.price &&
        this.installmentsOption &&
        this.paymentGateway.payment_method.code === 'credit_card'
      ) {
        const installmentOptions = []
        for (let number = 2; number <= this.installmentsOption.max_number; number++) {
          const tax = this.installmentsOption.monthly_interest > 0
          const minInstallment = this.installmentsOption.min_installment || 5
          let value
          if (!tax) {
            value = this.price / number
          } else {
            const interest = this.installmentsOption.monthly_interest / 100
            value = this.price * interest / (1 - Math.pow(1 + interest, -number))
          }
          if (value >= minInstallment) {
            installmentOptions.push({
              number,
              value,
              tax
            })
          }
        }
        return installmentOptions
      }
    },

    priceWithDiscount () {
      if (this.price && this.discount && this.discount.apply_at !== 'freight') {
        if (this.discount.type === 'percentage') {
          return this.price * (100 - this.discount.value) / 100
        } else {
          return Math.min(this.price - this.discount.value, 0)
        }
      }
      return this.price
    }
  },

  methods: {
    formatMoney
  }
}
