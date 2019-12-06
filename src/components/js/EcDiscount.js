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
    amount: Object,
    couponCode: String,
    hasCouponInput: {
      type: Boolean,
      default: true
    },
    isFormAlwaysVisible: Boolean,
    isCouponApplied: Boolean,
    isAttentionWanted: Boolean
  },

  data () {
    return {
      alertText: null,
      alertVariant: null,
      isFormVisible: this.isFormAlwaysVisible || this.couponCode,
      isLoading: false,
      localCouponCode: this.couponCode
    }
  },

  computed: {
    i19add: () => i18n(i19add),
    i19addDiscountCoupon: () => i18n(i19addDiscountCoupon),
    i19code: () => i18n(i19code),
    i19couponAppliedMsg: () => 'Cupom de desconto aplicado com sucesso.',
    i19discountCoupon: () => i18n(i19discountCoupon),
    i19hasCouponOrVoucherQn: () => i18n(i19hasCouponOrVoucherQn),
    i19invalidCouponMsg: () => 'O cupom de desconto inserido é inválido.',

    canAddCoupon () {
      return this.couponCode !== this.localCouponCode || !this.isCouponApplied
    }
  },

  methods: {
    parseDiscountOptions (listResult = []) {
      if (listResult.length) {
        let discountRule, extraDiscountValue, invalidCouponMsg
        listResult.forEach(appResult => {
          const { validated, error, response } = appResult
          if (validated && !error) {
            const appDiscountRule = response.discount_rule
            if (appDiscountRule) {
              const discountRuleValue = appDiscountRule.extra_discount.value
              if (!(extraDiscountValue > discountRuleValue)) {
                extraDiscountValue = discountRuleValue
                discountRule = {
                  app_id: appResult.app_id,
                  ...appDiscountRule
                }
              }
            } else if (response.invalid_coupon_message) {
              invalidCouponMsg = response.invalid_coupon_message
            }
          }
        })
        if (extraDiscountValue) {
          this.$emit('update:couponCode', this.localCouponCode)
          this.$emit('setDiscountRule', discountRule)
          this.alertText = this.i19couponAppliedMsg
          this.alertVariant = 'info'
        } else {
          this.alertText = invalidCouponMsg || this.i19invalidCouponMsg
          this.alertVariant = 'warning'
        }
      }
    },

    submitCoupon () {
      if (this.canAddCoupon) {
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
          .then(({ data }) => this.parseDiscountOptions(data.result))
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
    }
  },

  watch: {
    couponCode (couponCode) {
      if (couponCode !== this.couponCode) {
        this.localCouponCode = couponCode
        if (couponCode && !this.isFormVisible) {
          this.isFormVisible = true
        }
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
