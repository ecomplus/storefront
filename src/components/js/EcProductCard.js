import { $ecomConfig, name, inStock, onPromotion, price } from '@ecomplus/utils'
import { store } from '@ecomplus/client'
import dictionary from '@ecomplus/widget-product/src/lib/dictionary'
import EcImage from '@ecomplus/widget-product/src/components/EcImage.vue'
import EcPrices from '@ecomplus/widget-product/src/components/EcPrices.vue'

export default {
  name: 'EcProductCard',

  components: {
    EcImage,
    EcPrices
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
    productId: String,
    product: Object,
    buyText: String,
    isLoadDisabled: Boolean
  },

  data () {
    return {
      body: {},
      isLoading: false,
      error: ''
    }
  },

  computed: {
    strBuy () {
      return this.buyText || this.dictionary('buy')
    },

    isActive () {
      const { body } = this
      return body.available && body.visible && inStock(body)
    },

    discount () {
      const { body } = this
      return onPromotion(body)
        ? Math.round(((body.base_price - price(body)) * 100) / body.base_price)
        : 0
    }
  },

  methods: {
    dictionary,
    name,
    inStock,

    fetchItem () {
      if (this.productId) {
        this.isLoading = true
        const { storeId, productId } = this
        store({ url: `/products/${productId}.json`, storeId })
          .then(({ data }) => {
            this.body = data
            delete this.body.body_html
            delete this.body.body_text
          })
          .catch(err => {
            console.error(err)
            if (!this.body.name || !this.body.slug || !this.body.pictures) {
              this.error = this.lang === 'pt_br'
                ? 'Erro de conexão, clique no produto para tentar novamente'
                : 'Connection error, click product to try again'
            }
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    }
  },

  created () {
    if (this.product) {
      this.body = this.product
    }
    if (!this.isLoadDisabled) {
      this.fetchItem()
    }
  }
}
