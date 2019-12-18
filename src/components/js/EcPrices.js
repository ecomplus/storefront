import { _config, price, onPromotion, formatMoney } from '@ecomplus/utils'
import dictionary from './../../lib/dictionary'

const { _events, _info } = window

export default {
  name: 'EcPrices',

  props: {
    lang: {
      type: String,
      default: _config.get('lang')
    },
    product: {
      type: Object,
      required: true
    },
    literal: {
      type: Boolean
    },
    big: {
      type: Boolean
    },
    installmentsOption: {
      type: Object
    },
    discountOption: {
      type: Object
    },
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
      discountLabel: this.discountText
    }
  },

  methods: {
    dictionary,
    onPromotion,
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

  computed: {
    price () {
      return price(this.product)
    },

    priceWithDiscount () {
      const { type, value } = this.discount
      if (value) {
        if (type === 'percentage') {
          return this.price * (100 - value) / 100
        } else {
          return this.price - value
        }
      }
    }
  },

  created () {
    if (!this.installmentsOption && !this.discountOption) {
      if (_events) {
        const getPaymentInfo = () => {
          const paymentInfo = _info && _info.list_payments
          if (paymentInfo) {
            this.updateInstallments(paymentInfo.installments_option)
            this.updateDiscount(paymentInfo.discount_option)
            return Object.keys(paymentInfo).length > 0
          }
          return false
        }
        if (!getPaymentInfo()) {
          _events.on('info:list_payments', getPaymentInfo)
        }
      }
    } else {
      this.updateInstallments(this.installmentsOption)
      this.updateDiscount(this.discountOption)
    }
  }
}
