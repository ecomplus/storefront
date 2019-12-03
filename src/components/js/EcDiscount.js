import { i18n } from '@ecomplus/utils'
import { modules } from '@ecomplus/client'
import baseModulesRequestData from './../../lib/base-modules-request-data'

import {
  i19add,
  i19addDiscountCoupon,
  i19code,
  // i19couponAppliedMsg,
  i19discountCoupon,
  i19errorMsg,
  i19hasCouponOrVoucherQn
  // i19invalidCouponMsg
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
      isLoading: false,
      alertText: null,
      alertVariant: null
    }
  },

  computed: {
    i19add: () => i18n(i19add),
    i19addDiscountCoupon: () => i18n(i19addDiscountCoupon),
    i19code: () => i18n(i19code),
    i19couponAppliedMsg: () => 'Cupom de desconto aplicado com sucesso.',
    i19discountCoupon: () => i18n(i19discountCoupon),
    i19hasCouponOrVoucherQn: () => i18n(i19hasCouponOrVoucherQn),
    i19invalidCouponMsg: () => 'O cupom de desconto inserido é inválido.'
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
            this.alertText = this.i19couponAppliedMsg
            this.alertVariant = 'info'
          } else {
            this.alertText = data.invalid_coupon_message || this.i19invalidCouponMsg
            this.alertVariant = 'warning'
          }
        })
        .catch(err => {
          this.alertText = null
          console.error(err)
          this.$bvToast.toast(this.i19discountCoupon, {
            title: i18n(i19errorMsg),
            variant: 'warning',
            solid: true
          })
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
