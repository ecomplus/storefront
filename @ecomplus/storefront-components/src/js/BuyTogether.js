// import { i19buyTogetherWith } from '@ecomplus/i18n'
import { formatMoney, price as getPrice } from '@ecomplus/utils'
import { modules } from '@ecomplus/client'
import ecomCart from '@ecomplus/shopping-cart'
import APrices from './../APrices.vue'
import RecommendedItems from './../RecommendedItems.vue'

const storefront = (typeof window === 'object' && window.storefront) || {}
const getContextBody = () => (storefront.context && storefront.context.body) || {}
const sanitizeProductBody = body => {
  const product = Object.assign({}, body)
  delete product.body_html
  delete product.body_text
  delete product.specifications
  delete product.inventory_records
  delete product.price_change_records
  return product
}

export default {
  name: 'BuyTogether',

  components: {
    APrices,
    RecommendedItems
  },

  props: {
    baseProduct: {
      type: Object,
      default () {
        return getContextBody()
      }
    },
    ecomCart: {
      type: Object,
      default () {
        return ecomCart
      }
    }
  },

  data () {
    return {
      hasLoadedIds: false,
      hasLoadedItems: false,
      productQnts: {},
      recommendedItems: [],
      discount: 0
    }
  },

  computed: {
    i19buyTogether: () => 'Compre junto',
    i19buyTogetherWith: () => 'Compre junto com',

    productIds () {
      return Object.keys(this.productQnts)
    },

    items () {
      return [
        this.baseProduct,
        ...this.recommendedItems
      ]
    },

    subtotal () {
      return this.items.reduce((acc, item) => {
        return acc + (this.productQnts[item._id] || 1) * getPrice(item)
      }, 0)
    },

    canAddToCart () {
      return !this.items.find((item) => {
        return item.variations || item.customizations || item.kit_composition
      })
    }
  },

  methods: {
    formatMoney,

    buy () {
      const discountFactor = (this.subtotal - this.discount) / this.subtotal
      this.items.forEach((item) => {
        const cartItem = this.ecomCart.parseProduct({
          ...item,
          base_price: getPrice(item),
          price: getPrice(item) * discountFactor,
          price_effective_date: {}
        })
        cartItem.quantity = (this.productQnts[item._id] || 1)
        cartItem.keep_item_quantity = true
        this.ecomCart.addItem(cartItem)
        console.log({ cartItem })
      })
    }
  },

  created () {
    if (this.baseProduct && this.baseProduct._id) {
      const cartItem = ecomCart.parseProduct(sanitizeProductBody(this.baseProduct))
      const subtotal = getPrice(cartItem) * cartItem.quantity
      modules({
        url: '/apply_discount.json',
        method: 'POST',
        data: {
          amount: {
            subtotal,
            total: subtotal,
            discount: 0
          },
          items: [cartItem]
        }
      }).then(({ data }) => {
        for (let i = 0; i < data.result.length; i++) {
          const { validated, error, response } = data.result[i]
          if (validated && !error && response.buy_together) {
            const buyTogether = response.buy_together.sort((a, b) => {
              if (a.products && a.products.length) {
                if (!b.products || !b.products.length) {
                  return -1
                }
                if (
                  a.products.length <= b.products.length &&
                  a.discount.value >= b.discount.value
                ) {
                  return -1
                }
                return 0
              }
              return 1
            })
            if (buyTogether[0]) {
              const { products, discount } = buyTogether[0]
              this.productQnts = products || []
              this.$nextTick(() => {
                if (discount.type === 'fixed') {
                  this.discount = discount.value
                } else {
                  this.discount = this.subtotal * discount.value / 100
                }
              })
            }
          }
        }
      }).finally(() => {
        this.hasLoadedIds = true
      })
    }
  }
}
