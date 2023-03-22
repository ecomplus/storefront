// import { i19buyTogetherWith } from '@ecomplus/i18n'
import { formatMoney, price as getPrice, recommendedIds } from '@ecomplus/utils'
import { modules, graphs } from '@ecomplus/client'
import ecomCart from '@ecomplus/shopping-cart'
import EcomSearch from '@ecomplus/search-engine'
import APrices from './../APrices.vue'
import ProductCard from './../ProductCard.vue'

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
    ProductCard
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
    },
    rowClassName: {
      type: String,
      default: 'row no-gutters'
    },
    productCardProps: {
      type: Object,
      default () {
        return {
          isSmall: true
        }
      }
    },
  },

  data () {
    return {
      ecomSearch: new EcomSearch()
        .mergeFilter({
          range: {
            quantity: {
              gt: 0
            }
          }
        })
        .mergeFilter({
          term: {
            available: true
          }
        }),
      hasLoadedIds: false,
      hasLoadedItems: false,
      productQnts: {},
      recommendedItems: [],
      discount: 0,
      discountType: 'fixed',
      discountValue: 0,
      colClassName: 'col-12 col-md-4 col-lg-3 buy-together__item',
      pageNumber: 1
    }
  },

  computed: {
    i19buyTogether: () => 'Compre junto',
    i19buyTogetherWith: () => 'Compre junto com',

    items () {
      return [
        this.baseProduct,
        ...this.recommendedItems
      ]
    },

    productIds () {
      return Object.keys(this.productQnts)
    },

    relatedProducts () {
      const relatedProducts = this.baseProduct.related_products && this.baseProduct.related_products[0]
      return relatedProducts && relatedProducts.product_ids.length
        ? relatedProducts.product_ids
        : []
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
      })
    },

    calcDiscount () {
      if (this.discountType === 'fixed') {
        this.discount = this.discountValue
      } else {
        this.discount = this.subtotal * this.discountValue / 100
      }
    },

    setProductQnts (productsIds) {
      if (productsIds.length) {
        const productQnts = {}
        productsIds.slice(0, 3).forEach(id => {
          productQnts[id] = 1
        })
        this.productQnts = productQnts
      }
    },

    fetchItems () {
      delete this.ecomSearch.dsl.aggs
      this.ecomSearch.setPageNumber(this.pageNumber).fetch().then(() => {
        this.recommendedItems = this.recommendedItems.concat(this.ecomSearch.getItems())
      }).finally(() => {
        this.hasLoadedItems = true
      })
    }
  },

  watch: {
    subtotal: {
      handler (subtotal, oldSubtotal) {
        if (subtotal !== oldSubtotal) {
          this.calcDiscount()
        }
      },
      immediate: true
    },

    items: {
      handler (ids) {
        if (ids.length) {
          switch (ids.length) {
            case 4:
              this.colClassName = 'col-12 col-md-3 col-lg-3 buy-together__item'
              break;
            case 3:
              this.colClassName = 'col-12 col-md-4 col-lg-4 buy-together__item'
              break;
            case 2: 
              this.colClassName = 'col-12 col-md-6 col-lg-6 buy-together__item'
              break;
            default:
              break;
          }
        }
      }
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
              this.discountType = discount.type
              this.discountValue = discount.value
              this.$nextTick(() => {
                this.calcDiscount()
              })
            }
          }
        }
      }).finally(() => {
        this.hasLoadedIds = true
        this.$nextTick(() => {
          if (!this.productIds.length) {
            if (this.relatedProducts.length) {
              this.setProductQnts(this.relatedProducts)
              this.hasLoadedItems = true
              this.ecomSearch.setProductIds(this.productIds)
              this.fetchItems()
            } else {
              graphs({ url: `/products/${this.baseProduct._id}/related.json` }).then(({ data }) => {
                this.setProductQnts(recommendedIds(data))
                this.$nextTick(() => {
                  if (!this.productIds.length) {
                    this.hasLoadedItems = true
                  }
                  this.ecomSearch.setProductIds(this.productIds)
                  this.fetchItems()
                })
              })
            }
          }
          this.ecomSearch.setProductIds(this.productIds)
          this.fetchItems()
        })
      })
    }
  }
}
