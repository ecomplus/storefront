import {
  i18n,
  name as getName,
  inStock as checkInStock,
  onPromotion as checkOnPromotion,
  price as getPrice
} from '@ecomplus/utils'

import {
  i19buy,
  i19outOfStock,
  i19unavailable,
  i19connectionErrorProductMsg
} from '@ecomplus/i18n'

import { store } from '@ecomplus/client'
import ecomCart from '@ecomplus/shopping-cart'
import APicture from '../APicture.vue'
import APrices from '../APrices.vue'

export default {
  name: 'ProductCard',

  components: {
    APicture,
    APrices
  },

  props: {
    productId: String,
    product: Object,
    isSmall: Boolean,
    headingTag: {
      type: String,
      default: 'h3'
    },
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
    i19outOfStock: () => i18n(i19outOfStock),
    i19unavailable: () => i18n(i19unavailable),

    name () {
      return getName(this.body)
    },

    strBuy () {
      return this.buyText || i18n(i19buy)
    },

    isInStock () {
      return checkInStock(this.body)
    },

    isActive () {
      return this.body.available && this.body.visible && this.isInStock
    },

    discount () {
      const { body } = this
      return checkOnPromotion(body)
        ? Math.round(((body.base_price - getPrice(body)) * 100) / body.base_price)
        : 0
    }
  },

  methods: {
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
              this.error = i18n(i19connectionErrorProductMsg)
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
