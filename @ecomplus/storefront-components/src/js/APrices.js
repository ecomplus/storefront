import {
  i19asOf,
  i19discountOf,
  i19from,
  i19interestFree,
  i19of,
  i19to,
  i19upTo,
  i19youEarn
} from '@ecomplus/i18n'

import {
  i18n,
  price as getPrice,
  onPromotion as checkOnPromotion,
  formatMoney
} from '@ecomplus/utils'

import waitStorefrontInfo from './helpers/wait-storefront-info'

const getPriceWithDiscount = (price, discount) => {
  const { type, value } = discount
  let priceWithDiscount
  if (value) {
    if (type === 'percentage') {
      priceWithDiscount = price * (100 - value) / 100
    } else {
      priceWithDiscount = price - value
    }
    return priceWithDiscount > 0 ? priceWithDiscount : 0
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
    isAmountTotal: Boolean,
    installmentsOption: Object,
    discountOption: Object,
    discountText: {
      type: [String, Boolean],
      default: ''
    },
    canShowPriceOptions: {
      type: Boolean,
      default: true
    },
    canShowDiscountTag: {
      type: Boolean,
      default: false
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
        value: 0,
        min_amount: 0
      },
      discountLabel: this.discountText,
      pointsProgramName: null,
      pointsMinPrice: 0,
      earnPointsFactor: 0
    }
  },

  computed: {
    i19asOf: () => i18n(i19asOf),
    i19discountOf: () => i18n(i19discountOf),
    i19from: () => i18n(i19from),
    i19interestFree: () => i18n(i19interestFree),
    i19of: () => i18n(i19of),
    i19to: () => i18n(i19to),
    i19upTo: () => i18n(i19upTo),
    i19youEarn: () => i18n(i19youEarn),

    price () {
      const price = getPrice(this.product)
      if (
        this.extraDiscount.value &&
        (!this.extraDiscount.min_amount || price > this.extraDiscount.min_amount)
      ) {
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

    hasVariedPrices () {
      const { variations } = this.product
      if (variations) {
        const productPrice = getPrice(this.product)
        for (let i = 0; i < variations.length; i++) {
          const price = getPrice({
            ...this.product,
            ...variations[i]
          })
          if (price > productPrice) {
            return true
          }
        }
      }
      return false
    },

    priceWithDiscount () {
      return this.canShowPriceOptions && getPriceWithDiscount(this.price, this.discount)
    },

    discountTagValue () {
      const { product } = this
      const priceValue = this.price || getPrice(product)
      return checkOnPromotion(product) || this.extraDiscount.value > 0
        ? Math.round(((product.base_price - priceValue) * 100) / product.base_price)
        : 0
    },

    installmentValue () {
      if (this.canShowPriceOptions && this.installmentsNumber >= 2) {
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
      if (
        discount &&
        (!discount.min_amount || discount.min_amount <= this.price) &&
        (!this.isAmountTotal || discount.apply_at === 'total')
      ) {
        this.discount = discount
        if (!this.discountText && this.discountText !== false && discount.label) {
          this.discountLabel = `via ${discount.label}`
        }
      }
    }
  },

  watch: {
    price: {
      handler (price) {
        this.$emit('fix-price', price)
      },
      immediate: true
    }
  },

  created () {
    if (this.canShowPriceOptions) {
      if (this.discountOption) {
        this.updateDiscount(this.discountOption)
      } else {
        waitStorefrontInfo('apply_discount')
          .then(discountCampaign => {
            if (discountCampaign.available_extra_discount) {
              this.extraDiscount = discountCampaign.available_extra_discount
            }
          })
      }
      if (this.installmentsOption) {
        this.updateInstallments(this.installmentsOption)
      } else {
        waitStorefrontInfo('list_payments')
          .then(paymentInfo => {
            this.updateInstallments(paymentInfo.installments_option)
            this.updateDiscount(paymentInfo.discount_option)
            const pointsPrograms = paymentInfo.loyalty_points_programs
            if (this.isLiteral && pointsPrograms) {
              this.$nextTick(() => {
                for (const programId in pointsPrograms) {
                  const pointsProgram = pointsPrograms[programId]
                  if (pointsProgram && pointsProgram.earn_percentage > 0) {
                    this.pointsMinPrice = pointsProgram.min_subtotal_to_earn
                    this.pointsProgramName = pointsProgram.name
                    this.earnPointsFactor = pointsProgram.earn_percentage / 100
                    break
                  }
                }
              })
            }
          })
      }
    }
  }
}
