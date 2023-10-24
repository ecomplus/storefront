import {
  i19addToCart,
  i19close,
  i19fullscreen,
  i19openGallery,
  i19next,
  i19previous,
  i19share,
  i19video,
  i19selectVariationMsg
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
  name: 'KitVariationSelector',

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
    }
  },

  computed: {
    i19addToCart: () => i18n(i19addToCart),
    i19close: () => i18n(i19close),
    i19fullscreen: () => i18n(i19fullscreen),
    i19next: () => i18n(i19next),
    i19previous: () => i18n(i19previous),
    i19openGallery: () => i18n(i19openGallery),
    i19share: () => i18n(i19share),
    i19video: () => i18n(i19video),
    i19selectVariationMsg: () => i18n(i19selectVariationMsg),

    localItems () {
      const products = []
      for (let index = 0; index < this.min; index++) {
        if (this.items && this.items.length === this.min) {
          products.push(this.items[index])
        } else {
          products.push(this.items[0])
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
      delete this.variationKit[index]
    },

    buy () {
      this.alertVariant = 'warning'
      if (this.variationKit.length === this.min) {
        if (this.max === undefined || this.variationKit.length <= this.max) {
          const items = []
          const composition = []
          this.variationKit.forEach(variationId => {
            const product = this.items.find(item => {
              return item.variations.some(variation => variation._id === variationId)
            })
            if (product) {
              composition.push({
                _id: product.product_id,
                variation_id: variationId,
                quantity: 1
              })
            }
          })

          const itemsToBuy = []
          this.localItems.forEach(item => {
            
          })

          this.localItems.forEach(item => {
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
            items.push(newItem)
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
      if (index < this.max && index > -1) {
        this.moveSlider(index)
      } else {
        this.moveSlider(oldIndex)
      }
    },

    selectedVariationId (current) {
      if (current && this.activeIndex >= 0 && this.variationKit.length <= this.min) {
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
    if (this.pswp) {
      this.pswp.destroy()
    }
  }
}
