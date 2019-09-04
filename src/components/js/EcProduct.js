import { _config, inStock } from '@ecomplus/utils'
import { store } from '@ecomplus/client'
import EcPrices from './../EcPrices.vue'
import EcGallery from './../EcGallery.vue'
import dictionary from './../../lib/dictionary'
import { FadeTransition } from 'vue2-transitions'

const { _context } = window
const getContextId = () => _context && _context.body && _context.body._id

export default {
  name: 'EcProduct',

  components: {
    EcPrices,
    EcGallery,
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
    }
  },

  methods: {
    dictionary,
    inStock
  },

  created () {
    const vm = this
    if (vm.product) {
      vm.body = vm.product
    } else {
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
            solid: true
          })
        })
    }
  }
}
