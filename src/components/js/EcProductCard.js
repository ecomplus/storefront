import { _config, name, inStock } from '@ecomplus/utils'
import EcomSearch from '@ecomplus/search-engine'
import dictionary from '@ecomplus/widget-product/src/lib/dictionary'
import EcImage from '@ecomplus/widget-product/src/components/EcImage.vue'
import EcPrices from '@ecomplus/widget-product/src/components/EcPrices.vue'
import { FadeTransition } from 'vue2-transitions'

export default {
  name: 'EcProductCard',

  components: {
    EcImage,
    EcPrices,
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
      type: String
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
      body: {},
      error: ''
    }
  },

  computed: {
    strBuy () {
      return this.buyText || this.dictionary('buy')
    }
  },

  methods: {
    dictionary,
    name,
    inStock,

    fetchItem () {
      if (this.productId) {
        const { storeId } = this
        const search = new EcomSearch(storeId)
        search.setProductIds([this.productId]).fetch()
          .then(() => {
            const items = search.getItems()
            if (Array.isArray(items) && items.length) {
              this.body = items[0]
            }
          })
          .catch(err => {
            console.error(err)
            this.error = this.lang === 'pt_br'
              ? 'Erro de conexão, clique no produto para tentar novamente'
              : 'Connection error, click product to try again'
          })
      }
    }
  },

  created () {
    if (this.product) {
      this.body = this.product
    } else {
      this.fetchItem()
    }
  }
}
