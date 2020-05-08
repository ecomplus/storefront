import {
  i19asOf,
  i19from,
  i19interestFree,
  i19of,
  i19to,
  i19upTo
} from '@ecomplus/i18n'

import {
  i18n,
  price as getPrice,
  onPromotion as checkOnPromotion,
  formatMoney
} from '@ecomplus/utils'

const getPriceWithDiscount = (price, discount) => {
  const { type, value } = discount
  if (value) {
    if (type === 'percentage') {
      return price * (100 - value) / 100
    } else {
      return price - value
    }
  }
}

export default {
  name: 'APrices',

  props: {
    product: {
      type: Object,
      required: true
    },
    isLiteral: Boolean,
    isBig: Boolean,
    installmentsOption: Object,
    discountOption: Object,
    discountText: {
      type: [String, Boolean],
      default: ''
    }
  },

  data () {
    return {
      installmentsNumber: 0,
      monthlyInterest: 0,
      discount: {
        type: null,
        value: 0
      },
      extraDiscount: {
        type: null,
        value: 0
      },
      discountLabel: this.discountText
    }
  },

  computed: {
    i19asOf: () => i18n(i19asOf),
    i19from: () => i18n(i19from),
    i19interestFree: () => i18n(i19interestFree),
    i19of: () => i18n(i19of),
    i19to: () => i18n(i19to),
    i19upTo: () => i18n(i19upTo),

    price () {
      const price = getPrice(this.product)
      if (this.extraDiscount.value) {
        return getPriceWithDiscount(price, this.extraDiscount)
      }
      return price
    },

    comparePrice () {
      if (checkOnPromotion(this.product)) {
        return this.product.base_price
      } else if (this.extraDiscount.value) {
        return getPrice(this.product)
      }
    },

    priceWithDiscount () {
      return getPriceWithDiscount(this.price, this.discount)
    },

    installmentValue () {
      if (this.installmentsNumber >= 2) {
        if (!this.monthlyInterest) {
          return this.price / this.installmentsNumber
        } else {
          const interest = this.monthlyInterest / 100
          return this.price * interest /
            (1 - Math.pow(1 + interest, -this.installmentsNumber))
        }
      }
      return 0
    }
  },

  methods: {
    formatMoney,

    updateInstallments (installments) {
      if (installments) {
        this.monthlyInterest = installments.monthly_interest
        const minInstallment = installments.min_installment || 5
        const installmentsNumber = parseInt(this.price / minInstallment, 10)
        this.installmentsNumber = Math.min(installmentsNumber, installments.max_number)
      }
    },

    updateDiscount (discount) {
      if (discount && (!discount.min_amount || discount.min_amount <= this.price)) {
        this.discount = discount
        if (!this.discountText && this.discountText !== false && discount.label) {
          this.discountLabel = `via ${discount.label}`
        }
      }
    }
  },

  created () {
    if (!this.installmentsOption && !this.discountOption) {
      const storefront = typeof window === 'object' && window.storefront
      if (storefront) {
        const getPaymentInfo = () => {
          const paymentInfo = storefront.info && storefront.info.list_payments
          if (paymentInfo) {
            this.updateInstallments(paymentInfo.installments_option)
            this.updateDiscount(paymentInfo.discount_option)
            return Object.keys(paymentInfo).length > 0
          }
          return false
        }
        if (!getPaymentInfo()) {
          storefront.on('info:list_payments', getPaymentInfo)
        }
        const getExtraDiscount = () => {
          const discountCampaign = storefront.info && storefront.info.apply_discount
          if (discountCampaign) {
            const discount = discountCampaign.available_extra_discount
            if (discount) {
              this.extraDiscount = discount
            }
            return Object.keys(discountCampaign).length > 0
          }
          return false
        }
        if (!getExtraDiscount()) {
          storefront.on('info:apply_discount', getExtraDiscount)
        }
      }
    } else {
      this.updateInstallments(this.installmentsOption)
      this.updateDiscount(this.discountOption)
    }
  }
}
