import {
  i19add,
  i19addDiscountCoupon,
  i19campaignAppliedMsg,
  i19code,
  i19couponAppliedMsg,
  i19discountCoupon,
  i19errorMsg,
  i19hasCouponOrVoucherQn,
  i19invalidCouponMsg
} from '@ecomplus/i18n'

import { i18n } from '@ecomplus/utils'
import { modules } from '@ecomplus/client'
import ecomCart from '@ecomplus/shopping-cart'
import ecomPassport from '@ecomplus/passport-client'
import DismissableAlert from '../_internal/DismissableAlert.vue'

export default {
  name: 'DiscountApplier',

  components: {
    DismissableAlert
  },

  props: {
    amount: Object,
    couponCode: String,
    hasCouponInput: {
      type: Boolean,
      default: true
    },
    isFormAlwaysVisible: Boolean,
    isCouponApplied: Boolean,
    isAttentionWanted: Boolean,
    modulesPayload: Object,
    ecomCart: {
      type: Object,
      default () {
        return ecomCart
      }
    },
    ecomPassport: {
      type: Object,
      default () {
        return ecomPassport
      }
    }
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
    i19couponAppliedMsg: () => i18n(i19couponAppliedMsg),
    i19discountCoupon: () => i18n(i19discountCoupon),
    i19hasCouponOrVoucherQn: () => i18n(i19hasCouponOrVoucherQn),
    i19invalidCouponMsg: () => i18n(i19invalidCouponMsg),
    i19campaignAppliedMsg: () => i18n(i19campaignAppliedMsg),

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
            this.$emit('update:coupon-code', this.localCouponCode)
            this.alertText = this.i19couponAppliedMsg
          } else {
            this.alertText = this.i19campaignAppliedMsg
          }
          this.$emit('set-discount-rule', discountRule)
          this.alertVariant = 'info'
        } else {
          if (this.localCouponCode) {
            this.alertText = invalidCouponMsg || this.i19invalidCouponMsg
            this.alertVariant = 'warning'
          }
          this.$emit('set-discount-rule', {})
        }
      }
    },

    fetchDiscountOptions (data) {
      this.isLoading = true
      modules({
        url: '/apply_discount.json',
        method: 'POST',
        data: {
          ...this.modulesPayload,
          amount: this.amount,
          items: this.ecomCart.data.items,
          ...data
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
    },

    submitCoupon () {
      if (this.canAddCoupon) {
        const { localCouponCode } = this
        const data = {
          discount_coupon: localCouponCode
        }
        if (this.ecomPassport.checkLogin()) {
          const customer = this.ecomPassport.getCustomer()
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
        this.$nextTick(() => {
          this.$refs.input.focus()
        })
      }
    }
  },

  created () {
    if (this.couponCode && !this.isCouponApplied) {
      this.submitCoupon()
    } else if (this.amount && this.amount.total) {
      this.fetchDiscountOptions()
    }
  }
}
