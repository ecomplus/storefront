import {
  i19addToCart,
  i19close,
  i19next,
  i19previous,
  i19quantity,
  i19selectVariationMsg,
  i19item,
  i19minQuantity,
  i19maxQuantity
} from '@ecomplus/i18n'

import {
  i18n,
  name as getName,
  img as getImg
} from '@ecomplus/utils'

import ecomCart from '@ecomplus/shopping-cart'
import Glide from '@glidejs/glide'
import APicture from '../APicture.vue'
import ProductVariations from '../ProductVariations.vue'
import APrices from '../APrices.vue'
import ALink from '../ALink.vue'
import AAlert from '../AAlert.vue'

export default {
  name: 'ProductKitVariations',

  components: {
    ALink,
    AAlert,
    APicture,
    APrices,
    ProductVariations
  },

  props: {
    items: {
      type: Array,
      required: true
    },
    min: {
      type: Number,
      default: 1
    },
    max: Number,
    maxOptionsBtns: {
      type: Number,
      default: 10
    },
    slug: String,
    buyText: String,
    kitProductId: String,
    kitName: String,
    kitPrice: Number,
    canAddToCart: {
      type: Boolean,
      default: true
    },
    hasBuyButton: {
      type: Boolean,
      default: true
    },
    glideOptions: {
      type: Object,
      default () {
        return {
          type: 'slider',
          autoplay: false,
          rewind: false
        }
      }
    },
    isSSR: Boolean
  },

  data () {
    return {
      glide: null,
      activeIndex: 0,
      selectedVariationId: null,
      variationKit: [],
      alertVariant: 'warning'
    }
  },

  computed: {
    i19addToCart: () => i18n(i19addToCart),
    i19close: () => i18n(i19close),
    i19next: () => i18n(i19next),
    i19previous: () => i18n(i19previous),
    i19selectVariationMsg: () => i18n(i19selectVariationMsg),
    i19quantity: () => i18n(i19quantity),
    i19item: () => i18n(i19item),
    i19minQuantity: () => i18n(i19minQuantity),
    i19maxQuantity: () => i18n(i19maxQuantity),

    localItems () {
      const products = []
      for (let index = 0; index < this.items.length; index++) {
        if (this.items && this.items.length === this.min) {
          products.push(this.items[index])
        } else {
          for (let i = 0; i < this.min; i++) {
            products.push(this.items[index])
          }
        }
      }
      return products
    }

  },

  methods: {
    getImg,
    getName,

    moveSlider (index) {
      this.activeIndex = index
      if (this.glide) {
        this.glide.go('=' + index)
      }
    },

    removeItemFromKit (index) {
      this.variationKit.splice(index, 1)
      this.selectedVariationId = null
    },

    buy () {
      this.alertVariant = 'warning'
      if (this.variationKit.length === this.min) {
        if (this.max === undefined || this.variationKit.length <= this.max) {
          const items = []
          const composition = []
          this.variationKit.forEach(variationId => {
            const product = this.items.find(item => {
              const variation = item.variations.find(variation => variation._id === variationId)
              if (variation) {
                items.push({
                  ...item,
                  ...variation,
                  variation_id: variation._id
                })
                return item
              }
            })
            if (product) {
              composition.push({
                _id: product.product_id,
                variation_id: variationId,
                quantity: 1
              })
            }
          })

          items.forEach(item => {
            const newItem = { ...item, quantity: 1 }
            delete newItem.customizations
            if (this.kitProductId) {
              newItem.kit_product = {
                _id: this.kitProductId,
                name: this.kitName,
                pack_quantity: this.min,
                price: this.kitPrice,
                composition
              }
            }
            if (this.slug) {
              newItem.slug = this.slug
            }
            if (this.canAddToCart) {
              ecomCart.addItem(newItem)
            }
          })
          this.$emit('buy', { items })
        }
      }
    }
  },

  watch: {
    activeIndex (index, oldIndex) {
      if (index < this.localItems.length && index > -1) {
        this.moveSlider(index)
      } else {
        this.moveSlider(oldIndex)
      }
      this.selectedVariationId = null
    },

    selectedVariationId (current) {
      if (current && this.activeIndex >= 0 && (this.variationKit.length < this.min || this.variationKit[this.activeIndex])) {
        this.variationKit[this.activeIndex] = current
      }
    }
  },

  mounted () {
    const glide = new Glide(this.$refs.glide, this.glideOptions)
    glide.on('run', () => {
      this.moveSlider(glide.index)
    })
    glide.mount()
    this.glide = glide
  },

  beforeDestroy () {
    if (this.glide) {
      this.glide.destroy()
    }
  }
}
