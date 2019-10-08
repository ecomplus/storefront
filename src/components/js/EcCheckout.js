import { i18n, name, formatMoney, price, img } from '@ecomplus/utils'
import EcomCart from '@ecomplus/shopping-cart'
import EcIdentify from './../EcIdentify.vue'
import EcAccountForm from './../EcAccountForm.vue'
import EcAddresses from './../EcAddresses.vue'
import EcPayment from './../EcPayment.vue'
import EcCartItem from '@ecomplus/widget-minicart/src/components/EcCartItem.vue'
import EcShipping from '@ecomplus/widget-product/src/components/EcShipping.vue'
import EcShippingLine from '@ecomplus/widget-product/src/components/EcShippingLine.vue'
import EcPrices from '@ecomplus/widget-product/src/components/EcPrices.vue'
import { FadeTransition, SlideYUpTransition, SlideXRightTransition } from 'vue2-transitions'

import {
  Bag,
  BackToCart,
  ChangeShippingMethod,
  Continue,
  Delivery,
  Discount,
  Freight,
  Payment,
  RegisterToBuy,
  Summary
} from './../../lib/i18n'

export default {
  name: 'EcCheckout',

  components: {
    EcIdentify,
    EcAccountForm,
    EcAddresses,
    EcPayment,
    EcCartItem,
    EcShipping,
    EcShippingLine,
    EcPrices,
    FadeTransition,
    SlideYUpTransition,
    SlideXRightTransition
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
      default: () => new EcomCart()
    }
  },

  data () {
    return {
      toCheckoutStep: this.checkoutStep,
      customerEmail: this.customer.main_email,
      isUserIdentified: false,
      editShippingService: !this.shippingService,
      localZipCode: this.shippingZipCode
    }
  },

  computed: {
    dictionary () {
      return {
        Bag,
        BackToCart,
        ChangeShippingMethod,
        Continue,
        Delivery,
        Discount,
        Freight,
        Payment,
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
        this.$emit('update:customer', customer)
      }
    },

    shownCheckoutStep () {
      if (!this.hasBuyerInfo) {
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
      if (ecomPassport.isLogged()) {
        this.customerEmail = ecomPassport.getCustomer().main_email
        this.$emit('login', ecomPassport)
      }
    },

    autoMoveStep () {
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

    toCheckoutStep (stepNumber) {
      this.$emit('update:checkoutStep', stepNumber)
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
