import {
  $ecomConfig,
  name,
  inStock,
  onPromotion,
  price,
  variationsGrids,
  specValueByText
} from '@ecomplus/utils'

import { store } from '@ecomplus/client'
import ecomCart from '@ecomplus/shopping-cart'
import EcPrices from './../EcPrices.vue'
import EcVariations from './../EcVariations.vue'
import EcGallery from './../EcGallery.vue'
import EcShipping from './../EcShipping.vue'
import dictionary from './../../lib/dictionary'

const { storefront } = window
const getContextBody = () => storefront
  ? storefront.context && storefront.context.body
  : {}
const getContextId = () => getContextBody()._id

export default {
  name: 'EcProduct',

  components: {
    EcPrices,
    EcGallery,
    EcVariations,
    EcShipping
  },

  props: {
    lang: {
      type: String,
      default: $ecomConfig.get('lang')
    },
    storeId: {
      type: Number,
      default: $ecomConfig.get('store_id')
    },
    productId: {
      type: String,
      default: getContextId()
    },
    product: Object,
    buyText: String,
    canAddToCart: {
      type: Boolean,
      default: true
    },
    prerenderedHTML: String
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
    selectedVariation () {
      return this.selectedVariationId
        ? this.body.variations.find(({ _id }) => _id === this.selectedVariationId)
        : {}
    },

    name () {
      return this.selectedVariation.name || name(this.body)
    },

    strBuy () {
      return this.buyText || this.dictionary('buy')
    },

    discount () {
      const { body } = this
      return onPromotion(body)
        ? Math.round(((body.base_price - price(body)) * 100) / body.base_price)
        : 0
    },

    hasVariations () {
      return this.body.variations && this.body.variations.length
    },

    photoswipeImages () {
      const { name, pictures } = this.body
      const psImages = []
      if (pictures) {
        pictures.forEach(({ zoom }) => {
          if (zoom && zoom.size) {
            const sizes = zoom.size.split('x')
            if (sizes.length === 2) {
              psImages.push({
                src: zoom.url,
                title: name,
                w: parseInt(sizes[0], 10),
                h: parseInt(sizes[1], 10)
              })
            }
          }
        })
      }
      return psImages
    }
  },

  methods: {
    dictionary,
    inStock,
    variationsGrids,
    specValueByText,

    fetchProduct (isRetry = false) {
      const vm = this
      const { storeId } = vm
      store({
        url: `/products/${vm.productId}.json`,
        storeId,
        axiosConfig: {
          timeout: isRetry ? 2500 : 6000
        }
      })
        .then(({ data }) => {
          vm.body = data
          if (getContextId() === vm.productId) {
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
              this.body = getContextBody()
              if (!this.body.name || !this.body.price || !this.body.pictures) {
                const errorMsg = vm.lang === 'pt_br'
                  ? 'Não foi possível carregar informações do produto, por favor verifique sua conexão'
                  : 'Unable to load product information, please check your internet connection'
                vm.$bvToast.toast(errorMsg, {
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

    openPhotoswipe ({ index }) {
      if (storefront && typeof storefront.photoswipe === 'function') {
        storefront.photoswipe(this.photoswipeImages, index)
      }
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

  created () {
    if (this.product) {
      this.body = this.product
    } else {
      this.fetchProduct()
    }
  },

  watch: {
    selectedVariationId (id) {
      if (id) {
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
  }
}
