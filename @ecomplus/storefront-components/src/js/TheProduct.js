import {
  i19buy,
  i19close,
  i19discountOf,
  i19inStock,
  i19loadProductErrorMsg,
  i19only,
  i19outOfStock,
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

import { store } from '@ecomplus/client'
import ecomCart from '@ecomplus/shopping-cart'
import DismissableAlert from '../_internal/DismissableAlert.vue'
import APrices from '../APrices.vue'
import ProductVariations from '../ProductVariations.vue'
import ProductGallery from '../ProductGallery.vue'
import ShippingCalculator from '../ShippingCalculator.vue'

const { storefront } = window
const getContextBody = () => storefront
  ? storefront.context && storefront.context.body
  : {}
const getContextId = () => getContextBody()._id

export default {
  name: 'TheProduct',

  components: {
    DismissableAlert,
    APrices,
    ProductVariations,
    ProductGallery,
    ShippingCalculator
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
      selectedVariationId: null,
      currentGalleyImg: 1,
      hasClickedBuy: false
    }
  },

  computed: {
    i19close: () => i18n(i19close),
    i19discountOf: () => i18n(i19discountOf),
    i19inStock: () => i18n(i19inStock),
    i19only: () => i18n(i19only),
    i19outOfStock: () => i18n(i19outOfStock),
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
                this.$bvToast.toast(i18n(i19loadProductErrorMsg), {
                  title: 'Offline',
                  variant: 'danger',
                  noAutoHide: true,
                  solid: true
                })
              }
            }
          }
        })
    },

    buy () {
      this.hasClickedBuy = true
      const product = Object.assign({}, this.body)
      delete product.body_html
      delete product.body_text
      delete product.specifications
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
