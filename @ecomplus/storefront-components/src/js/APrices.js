import {
  i19from,
  i19interestFree,
  i19to
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
      interestFreeInstallments: 0,
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
    i19from: () => i18n(i19from),
    i19interestFree: () => i18n(i19interestFree),
    i19to: () => i18n(i19to),

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
    }
  },

  methods: {
    formatMoney,

    updateInstallments (installments) {
      if (installments && !installments.monthly_interest) {
        const minInstallment = installments.min_installment || 5
        const installmentsNumber = parseInt(this.price / minInstallment, 10)
        this.interestFreeInstallments = Math.min(installmentsNumber, installments.max_number)
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
      const { storefront } = window
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
