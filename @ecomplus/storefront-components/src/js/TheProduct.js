import {
  i19buy,
  i19close,
  i19discountOf,
  i19inStock,
  i19loadProductErrorMsg,
  i19only,
  i19outOfStock,
  i19paymentOptions,
  i19retry,
  i19selectVariation,
  i19unavailable
} from '@ecomplus/i18n'

import {
  i18n,
  name as getName,
  inStock as checkInStock,
  onPromotion as checkOnPromotion,
  price as getPrice,
  variationsGrids as getVariationsGrids,
  specValueByText as getSpecValueByText
} from '@ecomplus/utils'

import { store, modules } from '@ecomplus/client'
import ecomCart from '@ecomplus/shopping-cart'
import AAlert from '../AAlert.vue'
import APrices from '../APrices.vue'
import ProductVariations from '../ProductVariations.vue'
import ProductGallery from '../ProductGallery.vue'
import ShippingCalculator from '../ShippingCalculator.vue'
import PaymentOption from '../PaymentOption.vue'

const storefront = typeof window === 'object' && window.storefront
const getContextBody = () => storefront
  ? storefront.context && storefront.context.body
  : {}
const getContextId = () => getContextBody()._id

const sanitizeProductBody = body => {
  const product = Object.assign({}, body)
  delete product.body_html
  delete product.body_text
  delete product.specifications
  return product
}

export default {
  name: 'TheProduct',

  components: {
    AAlert,
    APrices,
    ProductVariations,
    ProductGallery,
    ShippingCalculator,
    PaymentOption
  },

  props: {
    productId: {
      type: String,
      default () {
        return getContextId()
      }
    },
    product: Object,
    headingTag: {
      type: String,
      default: 'h1'
    },
    buyText: String,
    canAddToCart: {
      type: Boolean,
      default: true
    },
    lowQuantityToWarn: {
      type: Number,
      default: 12
    }
  },

  data () {
    return {
      body: {},
      fixedPrice: null,
      selectedVariationId: null,
      currentGalleyImg: 1,
      hasClickedBuy: false,
      hasLoadError: false,
      paymentGateways: []
    }
  },

  computed: {
    i19close: () => i18n(i19close),
    i19discountOf: () => i18n(i19discountOf),
    i19inStock: () => i18n(i19inStock),
    i19loadProductErrorMsg: () => i18n(i19loadProductErrorMsg),
    i19only: () => i18n(i19only),
    i19outOfStock: () => i18n(i19outOfStock),
    i19paymentOptions: () => i18n(i19paymentOptions),
    i19retry: () => i18n(i19retry),
    i19selectVariation: () => i18n(i19selectVariation),
    i19unavailable: () => i18n(i19unavailable),

    selectedVariation () {
      return this.selectedVariationId
        ? this.body.variations.find(({ _id }) => _id === this.selectedVariationId)
        : {}
    },

    name () {
      return this.selectedVariation.name || getName(this.body)
    },

    isInStock () {
      return checkInStock(this.body)
    },

    productQuantity () {
      if (this.selectedVariation.quantity) {
        return this.selectedVariation.quantity
      } else if (this.body.quantity) {
        return this.body.quantity
      }
    },

    isLowQuantity () {
      return this.productQuantity > 0 && this.lowQuantityToWarn > 0 &&
        this.productQuantity <= this.lowQuantityToWarn
    },

    strBuy () {
      return this.buyText || i18n(i19buy)
    },

    discount () {
      const { body } = this
      return checkOnPromotion(body)
        ? Math.round(((body.base_price - getPrice(body)) * 100) / body.base_price)
        : 0
    },

    hasVariations () {
      return this.body.variations && this.body.variations.length
    }
  },

  methods: {
    getVariationsGrids,
    getSpecValueByText,

    setBody (data) {
      this.body = data
      this.$emit('update:product', data)
    },

    fetchProduct (isRetry = false) {
      const { storeId, productId } = this
      store({
        url: `/products/${productId}.json`,
        storeId,
        axiosConfig: {
          timeout: isRetry ? 2500 : 6000
        }
      })
        .then(({ data }) => {
          this.setBody(data)
          if (getContextId() === productId) {
            storefront.context.body = data
          }
          this.hasLoadError = false
        })
        .catch(err => {
          console.error(err)
          const { response } = err
          if (!response || !(response.status >= 400 && response.status < 500)) {
            if (!isRetry) {
              this.fetchProduct(true)
            } else {
              this.setBody(getContextBody())
              if (!this.body.name || !this.body.price || !this.body.pictures) {
                this.hasLoadError = true
              }
            }
          }
        })
    },

    buy () {
      this.hasClickedBuy = true
      const product = sanitizeProductBody(this.body)
      let variationId
      if (this.hasVariations) {
        if (this.selectedVariationId) {
          variationId = this.selectedVariationId
        } else {
          return
        }
      }
      this.$emit('buy', { product, variationId })
      if (this.canAddToCart) {
        ecomCart.addProduct(product, variationId)
      }
    }
  },

  watch: {
    selectedVariationId (variationId) {
      if (variationId) {
        if (this.hasClickedBuy) {
          this.hasClickedBuy = false
        }
        if (this.selectedVariation.picture_id) {
          const pictureIndex = this.body.pictures.findIndex(({ _id }) => {
            return _id === this.selectedVariation.picture_id
          })
          this.currentGalleyImg = pictureIndex + 1
        }
      }
    },

    fixedPrice (price) {
      if (price > 0) {
        const fetchPaymentOptions = () => {
          modules({
            url: '/list_payments.json',
            method: 'POST',
            data: {
              amount: {
                total: price
              },
              items: [{
                ...sanitizeProductBody(this.body),
                product_id: this.body._id
              }]
            }
          })
            .then(({ data }) => {
              this.paymentGateways = data.result
                .reduce((paymentGateways, { validated, response }) => {
                  return validated
                    ? paymentGateways.concat(response.payment_gateways)
                    : paymentGateways
                }, []).sort((a, b) => {
                  return a.discount && !b.discount ? -1 : 1
                })
            })
            .catch(console.error)
        }
        if (typeof window.requestIdleCallback === 'function') {
          window.requestIdleCallback(fetchPaymentOptions)
        } else {
          setTimeout(fetchPaymentOptions, 500)
        }
      }
    }
  },

  created () {
    if (this.product) {
      this.body = this.product
    } else {
      this.fetchProduct()
    }
  }
}
