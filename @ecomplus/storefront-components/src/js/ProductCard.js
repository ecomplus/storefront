import {
  i19buy,
  i19connectionErrorProductMsg,
  i19outOfStock,
  i19unavailable
} from '@ecomplus/i18n'

import {
  i18n,
  name as getName,
  inStock as checkInStock,
  onPromotion as checkOnPromotion,
  price as getPrice
} from '@ecomplus/utils'

import Vue from 'vue'
import { store } from '@ecomplus/client'
import ecomCart from '@ecomplus/shopping-cart'
import ALink from '../ALink.vue'
import APicture from '../APicture.vue'
import APrices from '../APrices.vue'

const getExternalHtml = (varName, product) => {
  if (typeof window === 'object') {
    varName = `productCard${varName}Html`
    const html = typeof window[varName] === 'function'
      ? window[varName](product)
      : window[varName]
    if (typeof html === 'string') {
      return html
    }
  }
  return undefined
}

export default {
  name: 'ProductCard',

  components: {
    ALink,
    APicture,
    APrices
  },

  props: {
    product: Object,
    productId: String,
    isSmall: Boolean,
    headingTag: {
      type: String,
      default: 'h3'
    },
    buyText: String,
    transitionClass: {
      type: String,
      default: 'animated fadeIn'
    },
    canAddToCart: {
      type: Boolean,
      default: true
    },
    isLoaded: Boolean,
    installmentsOption: Object,
    discountOption: Object
  },

  data () {
    return {
      body: {},
      isLoading: false,
      isWaitingBuy: false,
      isHovered: false,
      error: ''
    }
  },

  computed: {
    i19outOfStock: () => i18n(i19outOfStock),
    i19unavailable: () => i18n(i19unavailable),

    ratingHtml () {
      return getExternalHtml('Rating', this.body)
    },

    buyHtml () {
      return getExternalHtml('Buy', this.body)
    },

    footerHtml () {
      return getExternalHtml('Footer', this.body)
    },

    name () {
      return getName(this.body)
    },

    strBuy () {
      return this.buyText ||
        (typeof window === 'object' && window.productCardBuyText) ||
        i18n(i19buy)
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
      delete this.body.inventory_records
      delete this.body.price_change_records
    },

    fetchItem () {
      if (this.productId) {
        this.isLoading = true
        store({ url: `/products/${this.productId}.json` })
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
        this.isWaitingBuy = true
        store({ url: `/products/${product._id}.json` })
          .then(({ data }) => {
            const selectFields = ['variations', 'customizations', 'kit_composition']
            for (let i = 0; i < selectFields.length; i++) {
              const selectOptions = data[selectFields[i]]
              if (selectOptions && selectOptions.length) {
                return import('../ProductQuickview.vue')
                  .then(quickview => {
                    new Vue({
                      render: h => h(quickview.default, {
                        props: {
                          product: data
                        }
                      })
                    }).$mount(this.$refs.quickview)
                  })
              }
            }
            const { quantity, price } = data
            ecomCart.addProduct({ ...product, quantity, price })
          })
          .catch(err => {
            console.error(err)
            window.location = `/${product.slug}`
          })
          .finally(() => {
            this.isWaitingBuy = false
          })
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
