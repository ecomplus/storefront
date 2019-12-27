import { $ecomConfig, name, inStock, onPromotion, price } from '@ecomplus/utils'
import { store } from '@ecomplus/client'
import ecomCart from '@ecomplus/shopping-cart'
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
    canAddToCart: {
      type: Boolean,
      default: true
    },
    isLoaded: Boolean
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

    setBody (data) {
      this.body = Object.assign({}, data)
      delete this.body.body_html
      delete this.body.body_text
    },

    fetchItem () {
      if (this.productId) {
        this.isLoading = true
        const { storeId, productId } = this
        store({ url: `/products/${productId}.json`, storeId })
          .then(({ data }) => {
            this.$emit('update:product', data)
            this.setBody(data)
            this.$emit('update:is-loaded', true)
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
    },

    buy () {
      const product = this.body
      this.$emit('buy', { product })
      if (this.canAddToCart) {
        const { variations, slug } = product
        if (variations && variations.length) {
          window.location = `/${slug}`
        } else {
          ecomCart.addProduct(product)
        }
      }
    }
  },

  created () {
    if (this.product) {
      this.setBody(this.product)
      if (this.product.available === undefined) {
        this.body.available = true
      }
      if (this.product.visible === undefined) {
        this.body.visible = true
      }
    }
    if (!this.isLoaded) {
      this.fetchItem()
    }
  }
}
