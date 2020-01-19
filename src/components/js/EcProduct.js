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
    prerenderedHTML: String
  },

  data () {
    return {
      body: {}
    }
  },

  computed: {
    strBuy () {
      return this.buyText || this.dictionary('buy')
    },

    discount () {
      const { body } = this
      return onPromotion(body)
        ? Math.round(((body.base_price - price(body)) * 100) / body.base_price)
        : 0
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
    name,
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
