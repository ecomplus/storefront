import { i18n } from '@ecomplus/utils'
import { modules } from '@ecomplus/client'
import baseModulesRequestData from './../../lib/base-modules-request-data'

import {
  i19add,
  i19addDiscountCoupon,
  i19code,
  i19discountCoupon,
  i19hasCouponOrVoucherQn
} from '@ecomplus/i18n'

export default {
  name: 'EcDiscount',

  props: {
    hasCouponInput: {
      type: Boolean,
      default: true
    },
    couponCode: {
      type: String
    },
    amount: {
      type: Object
    },
    isFormAlwaysVisible: {
      type: Boolean
    },
    isAttentionWanted: {
      type: Boolean
    }
  },

  data () {
    return {
      isFormVisible: this.isFormAlwaysVisible || this.couponCode,
      localCouponCode: this.couponCode,
      isLoading: false
    }
  },

  computed: {
    i19add: () => i18n(i19add),
    i19addDiscountCoupon: () => i18n(i19addDiscountCoupon),
    i19code: () => i18n(i19code),
    i19discountCoupon: () => i18n(i19discountCoupon),
    i19hasCouponOrVoucherQn: () => i18n(i19hasCouponOrVoucherQn)
  },

  methods: {
    submitCoupon () {
      this.isLoading = true
      const { amount, localCouponCode } = this
      modules({
        url: '/apply_discount.json',
        method: 'POST',
        data: {
          discount_coupon: localCouponCode,
          amount,
          ...baseModulesRequestData
        }
      })
        .then(({ data }) => {
          const discountRule = data.discount_rule
          if (discountRule) {
            this.$emit('update:couponCode', localCouponCode)
            this.$emit('update:amount', {
              ...amount,
              discount: discountRule.extra_discount.value
            })
          }
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  },

  watch: {
    couponCode (couponCode) {
      if (couponCode !== this.couponCode) {
        this.localCouponCode = couponCode
      }
    },

    isFormAlwaysVisible (isFormVisible) {
      if (isFormVisible) {
        this.isFormVisible = true
      }
    },

    isFormVisible (isFormVisible) {
      if (isFormVisible) {
        setTimeout(() => {
          this.$refs.input.focus()
        }, 200)
      }
    }
  }
}
