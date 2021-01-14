import {
  i19buyKit,
  i19maxQuantity,
  i19minQuantity
} from '@ecomplus/i18n'

import { i18n } from '@ecomplus/utils'

import ecomCart from '@ecomplus/shopping-cart'
import ALink from '../ALink.vue'
import AAlert from '../AAlert.vue'

export default {
  name: 'QuantitySelector',

  components: {
    ALink,
    AAlert
  },

  props: {
    items: {
      type: Array,
      required: true
    },
    min: {
      type: Number,
      default: 1
    },
    max: Number,
    slug: String,
    buyText: String,
    kitProductId: String,
    kitName: String,
    kitPrice: Number,
    canAddToCart: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      selectedQnts: this.items.reduce((selectedQnts, item) => {
        selectedQnts[item._id] = item.quantity || 0
        return selectedQnts
      }, {}),
      hasMinAlert: false,
      hasMaxAlert: false,
      alertVariant: 'warning'
    }
  },

  computed: {
    i19maxQuantity: () => i18n(i19maxQuantity),
    i19minQuantity: () => i18n(i19minQuantity),

    totalQuantity () {
      let total = 0
      const { selectedQnts } = this
      Object.keys(selectedQnts).forEach(key => {
        if (selectedQnts[key]) {
          total += selectedQnts[key]
        }
      })
      if (total >= this.min && this.hasMinAlert) {
        this.hasMinAlert = false
      } else if (total <= this.max && this.hasMaxAlert) {
        this.hasMaxAlert = false
      }
      return total
    },

    remainingQuantity () {
      return this.max
        ? this.max - this.totalQuantity
        : 9999999
    },

    strBuy () {
      return this.buyText || i18n(i19buyKit)
    }
  },

  methods: {
    checkInStock (item) {
      const maxQuantity = item.max_quantity
      return typeof maxQuantity === 'number' && maxQuantity >= 0
        ? maxQuantity
        : 9999999
    },

    changeQnt (item, qntDiff, ev) {
      const { selectedQnts, remainingQuantity } = this
      const lastQnt = selectedQnts[item._id]
      let newQnt
      if (qntDiff) {
        newQnt = selectedQnts[item._id] + qntDiff
      } else if (ev) {
        selectedQnts[item._id] = ev.target.value.replace(/\D/g, '')
        newQnt = parseInt(selectedQnts[item._id], 10)
      }
      if (newQnt > 0) {
        if (item.min_quantity > newQnt) {
          newQnt = item.min_quantity
        } else {
          const itemMaxQnt = item.max_quantity !== undefined ? item.max_quantity : 9999999
          const maxQnt = Math.min(itemMaxQnt, lastQnt + remainingQuantity)
          if (maxQnt < newQnt) {
            this.alertVariant = 'info'
            this.hasMaxAlert = true
            newQnt = maxQnt
          }
        }
        selectedQnts[item._id] = newQnt
      } else {
        selectedQnts[item._id] = 0
      }
      this.$emit('set-quantity', {
        item,
        quantity: selectedQnts[item._id]
      })
    },

    buy () {
      this.alertVariant = 'warning'
      if (this.totalQuantity >= this.min) {
        if (this.max === undefined || this.totalQuantity <= this.max) {
          const items = []
          const composition = this.items.map(item => ({
            _id: item.product_id,
            variation_id: item.variation_id,
            quantity: this.selectedQnts[item._id]
          }))
          this.items.forEach(item => {
            const quantity = this.selectedQnts[item._id]
            if (quantity > 0) {
              const newItem = { ...item, quantity }
              delete newItem.customizations
              if (this.kitProductId) {
                newItem.kit_product = {
                  _id: this.kitProductId,
                  name: this.kitName,
                  pack_quantity: this.totalQuantity,
                  price: this.kitPrice,
                  composition
                }
              }
              if (this.slug) {
                newItem.slug = this.slug
              }
              items.push(newItem)
              if (this.canAddToCart) {
                ecomCart.addItem(newItem)
              }
            }
          })
          this.$emit('buy', { items })
        } else {
          this.hasMaxAlert = true
        }
      } else {
        this.hasMinAlert = true
      }
    }
  },

  created () {
    if (this.max < this.items.length) {
      this.items.forEach(item => this.changeQnt(item))
    }
  }
}
