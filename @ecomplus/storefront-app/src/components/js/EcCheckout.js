import {
  i18n,
  name,
  formatMoney,
  price,
  img
} from '@ecomplus/utils'

import ecomCart from '@ecomplus/shopping-cart'
import baseModulesRequestData from '../../lib/base-modules-request-data'
import DiscountApplier from '#components/DiscountApplier.vue'
import LoginBlock from '#components/LoginBlock.vue'
import ShippingCalculator from '#components/ShippingCalculator.vue'
import ShippingLine from '#components/ShippingLine.vue'
import PaymentMethods from '../PaymentMethods.vue'
import EcAccountForm from '../EcAccountForm.vue'
import EcAddresses from '../EcAddresses.vue'
import EcSummary from '../EcSummary.vue'

import {
  Bag,
  BackToCart,
  Buyer,
  ChangeShippingMethod,
  ContactPhone,
  Continue,
  Delivery,
  Discount,
  DocNumber,
  Freight,
  Logout,
  MyAccount,
  Payment,
  ProceedToPayment,
  RegisterToBuy,
  Summary
} from './../../lib/i18n'

export default {
  name: 'EcCheckout',

  components: {
    DiscountApplier,
    LoginBlock,
    ShippingLine,
    ShippingCalculator,
    PaymentMethods,
    EcAccountForm,
    EcAddresses,
    EcSummary
  },

  props: {
    mergeDictionary: {
      type: Object,
      default: () => {}
    },
    cartUrl: {
      type: String,
      default: '/app/#/cart'
    },
    amount: {
      type: Object,
      default: () => {}
    },
    customer: {
      type: Object,
      default: () => {}
    },
    shippingZipCode: {
      type: String
    },
    checkoutStep: {
      type: Number,
      default: 1
    },
    shippingService: {
      type: Object
    },
    paymentGateway: {
      type: Object
    },
    ecomCart: {
      type: Object,
      default: () => ecomCart
    },
    discountCoupon: String
  },

  data () {
    return {
      toCheckoutStep: this.checkoutStep,
      customerEmail: this.customer.main_email,
      isUserIdentified: Boolean(this.customer.main_email),
      editAccount: false,
      editShippingService: !this.shippingService,
      localZipCode: this.shippingZipCode
    }
  },

  computed: {
    modulesPayload: () => baseModulesRequestData,

    dictionary () {
      return {
        Bag,
        BackToCart,
        Buyer,
        ChangeShippingMethod,
        ContactPhone,
        Continue,
        Delivery,
        Discount,
        DocNumber,
        Freight,
        Logout,
        MyAccount,
        Payment,
        ProceedToPayment,
        RegisterToBuy,
        Summary,
        ...this.mergeDictionary
      }
    },

    cart () {
      return this.ecomCart.data
    },

    hasBuyerInfo () {
      const { customer } = this
      return this.customerEmail &&
        customer.name && customer.name.given_name && customer.name.family_name &&
        customer.birth_date && customer.birth_date.day &&
        customer.registry_type && customer.doc_number &&
        customer.phones && customer.phones.length
    },

    localCustomer: {
      get () {
        return this.customer
      },
      set (customer) {
        this.editAccount = false
        this.$emit('update:customer', customer)
      }
    },

    localDiscountCoupon: {
      get () {
        return this.discountCoupon
      },
      set (couponCode) {
        this.$emit('update:discountCoupon', couponCode)
      }
    },

    shownCheckoutStep () {
      if (!this.hasBuyerInfo || this.editAccount) {
        return 0
      } else {
        return this.toCheckoutStep
      }
    },

    shippingAddress () {
      const { addresses } = this.customer
      return addresses && addresses.find(addr => addr.default)
    },

    enabledCheckoutStep () {
      return !this.hasBuyerInfo ? 0
        : this.shippingAddress && this.shippingService ? 2 : 1
    },

    paymentsListKey () {
      let key = 'pay'
      if (this.localDiscountCoupon) {
        key += `-${this.localDiscountCoupon}`
      }
      ;['freight', 'subtotal'].forEach(amountField => {
        if (this.amount[amountField] > 0) {
          key += `-${this.amount[amountField]}`
        }
      })
      return key
    }
  },

  methods: {
    name,
    price,
    formatMoney,

    img (item) {
      return img(item, null, 'small')
    },

    i18n (label) {
      return i18n(this.dictionary[label])
    },

    login (ecomPassport) {
      if (ecomPassport.checkLogin()) {
        this.customerEmail = ecomPassport.getCustomer().main_email
        this.$emit('login', ecomPassport)
      }
    },

    autoMoveStep () {
      if ('activeElement' in document) {
        document.activeElement.blur()
      }
      this.toCheckoutStep = this.enabledCheckoutStep
    },

    updateZipCode () {
      if (this.shippingAddress) {
        this.localZipCode = this.shippingAddress.zip
      }
    },

    selectAddress (addressId) {
      this.$emit('addressSelected', addressId)
      this.updateZipCode()
    }
  },

  watch: {
    customerEmail (email) {
      if (email) {
        this.$emit('update:customer', { ...this.customer, main_email: email })
        this.isUserIdentified = true
      }
    },

    localZipCode () {
      this.editShippingService = true
    },

    toCheckoutStep (stepNumber) {
      this.$emit('update:checkoutStep', stepNumber)
      window.scroll({
        top: this.$el.offsetTop - 15,
        behavior: 'smooth'
      })
    },

    enabledCheckoutStep () {
      this.autoMoveStep()
    }
  },

  created () {
    this.autoMoveStep()
    this.updateZipCode()
  }
}
