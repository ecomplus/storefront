import { _config, inStock } from '@ecomplus/utils'
import { store } from '@ecomplus/client'
import EcPrices from './../EcPrices.vue'
import EcGallery from './../EcGallery.vue'
import EcShipping from './../EcShipping.vue'
import dictionary from './../../lib/dictionary'
import { FadeTransition } from 'vue2-transitions'

const { _context, storefront } = window
const getContextId = () => _context && _context.body && _context.body._id

export default {
  name: 'EcProduct',

  components: {
    EcPrices,
    EcGallery,
    EcShipping,
    FadeTransition
  },

  props: {
    lang: {
      type: String,
      default: _config.get('lang')
    },
    storeId: {
      type: Number,
      default: _config.get('store_id')
    },
    productId: {
      type: String,
      default: getContextId()
    },
    product: {
      type: Object
    },
    buyText: {
      type: String
    }
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

    fetchProduct () {
      const vm = this
      const { storeId } = vm
      store({ url: `/products/${vm.productId}.json`, storeId })
        .then(({ data }) => {
          vm.body = data
          if (getContextId() === vm.productId) {
            _context.body = data
          }
        })
        .catch(err => {
          console.error(err)
          const errorMsg = vm.lang === 'pt_br'
            ? 'Não foi possível carregar informações do produto, por favor verifique sua conexão'
            : 'Unable to load product information, please check your internet connection'
          vm.$bvToast.toast(errorMsg, {
            title: 'Offline',
            variant: 'danger',
            noAutoHide: true,
            solid: true
          })
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
