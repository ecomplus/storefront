import { _config, inStock, onPromotion, formatMoney } from '@ecomplus/utils'
import { store } from '@ecomplus/client'
import EcGallery from './../EcGallery.vue'
import dictionary from './../../lib/dictionary'
import { FadeTransition } from 'vue2-transitions'

const { _context } = window

export default {
  name: 'EcProduct',

  components: {
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
      default: _context && _context.body && _context.body._id
    },
    product: {
      type: Object
    }
  },

  data () {
    return {
      body: {}
    }
  },

  methods: {
    dictionary,
    inStock,
    onPromotion,
    formatMoney
  },

  created () {
    const vm = this
    if (vm.product) {
      vm.body = vm.product
    } else {
      store({ url: `/products/${vm.productId}.json` }).then(({ data }) => {
        vm.body = data
      })
    }
  }
}
