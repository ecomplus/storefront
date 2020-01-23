import { i18n } from '@ecomplus/utils'
import { modules } from '@ecomplus/client'
import ecomPassportClient from '@ecomplus/passport-client'
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
    i19campaignAppliedMsg: () => 'Campanha de desconto aplicada com sucesso.',

    canAddCoupon () {
      return !this.couponCode || !this.isCouponApplied ||
        this.couponCode !== this.localCouponCode
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
          if (this.localCouponCode) {
            this.$emit('update:couponCode', this.localCouponCode)
            this.alertText = this.i19couponAppliedMsg
          } else {
            this.alertText = this.i19campaignAppliedMsg
          }
          this.$emit('setDiscountRule', discountRule)
          this.alertVariant = 'info'
        } else if (this.localCouponCode) {
          this.alertText = invalidCouponMsg || this.i19invalidCouponMsg
          this.alertVariant = 'warning'
        }
      }
    },

    fetchDiscountOptions (data) {
      this.isLoading = true
      modules({
        url: '/apply_discount.json',
        method: 'POST',
        data
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
    },

    submitCoupon () {
      if (this.canAddCoupon) {
        const { amount, localCouponCode } = this
        const data = {
          discount_coupon: localCouponCode,
          amount,
          ...baseModulesRequestData
        }
        if (ecomPassportClient.checkLogin()) {
          const customer = ecomPassportClient.getCustomer()
          data.customer = {
            _id: customer._id
          }
          if (customer.display_name) {
            data.customer.display_name = customer.display_name
          }
        }
        this.fetchDiscountOptions(data)
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
  },

  created () {
    const { utm } = baseModulesRequestData
    if (this.couponCode && !this.isCouponApplied) {
      this.submitCoupon()
    } else if (utm && Object.keys(utm).length && this.amount) {
      this.fetchDiscountOptions({
        amount: this.amount,
        ...baseModulesRequestData
      })
    }
  }
}
