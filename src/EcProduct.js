import { _config } from '@ecomplus/utils'
import { store } from '@ecomplus/client'
import EcGallery from './components/EcGallery.vue'
import dictionary from './lib/dictionary'

const { _context } = window

export default {
  name: 'EcProduct',

  components: {
    EcGallery
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
    dictionary
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
