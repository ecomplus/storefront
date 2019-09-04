import { _config, price, onPromotion, formatMoney } from '@ecomplus/utils'
import dictionary from './../../lib/dictionary'
import { SlideYUpTransition } from 'vue2-transitions'

const { storefront, _info } = window

export default {
  name: 'EcPrices',

  components: {
    SlideYUpTransition
  },

  props: {
    lang: {
      type: String,
      default: _config.get('lang')
    },
    storeId: {
      type: Number,
      default: _config.get('store_id')
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
      priceWithDiscount: false,
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
        const { type, value } = discount
        if (value) {
          if (type === 'percentage') {
            this.priceWithDiscount = this.price * (100 - value) / 100
          } else {
            this.priceWithDiscount = this.price - value
          }
          if (!this.discountText && this.discountText !== false && discount.label) {
            this.discountLabel = `via ${discount.label}`
          }
        }
      }
    }
  },

  computed: {
    price () {
      return price(this.product)
    }
  },

  created () {
    if (!this.installmentsOption && !this.discountOption) {
      if (storefront) {
        storefront.on('info:list_payments', () => {
          const paymentInfo = _info && _info.list_payments
          if (paymentInfo) {
            this.updateInstallments(paymentInfo.installments_option)
            this.updateDiscount(paymentInfo.discount_option)
          }
        })
      }
    } else {
      this.updateInstallments(this.installmentsOption)
      this.updateDiscount(this.discountOption)
    }
  }
}
