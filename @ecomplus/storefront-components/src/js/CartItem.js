import {
  i19freebie,
  i19outOfStock,
  i19quantity,
  i19remove
} from '@ecomplus/i18n'

import {
  i18n,
  img as getImg,
  price as getPrice,
  formatMoney
} from '@ecomplus/utils'

import ecomCart from '@ecomplus/shopping-cart'
import ALink from '../ALink.vue'
import APicture from '../APicture.vue'

export default {
  name: 'CartItem',

  components: {
    ALink,
    APicture
  },

  props: {
    item: {
      type: Object,
      required: true
    },
    nameMaxLength: {
      type: Number,
      default: 35
    },
    inputType: {
      type: String,
      default: 'select'
    },
    canUpdateCart: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      quantity: 0,
      canInputSelect: false
    }
  },

  computed: {
    i19freebie: () => i18n(i19freebie),
    i19outOfStock: () => i18n(i19outOfStock),
    i19quantity: () => i18n(i19quantity),
    i19remove: () => i18n(i19remove),

    itemId () {
      return this.item._id
    },

    price () {
      return this.item.final_price || getPrice(this.item)
    },

    img () {
      return getImg(this.item, null, 'small')
    },

    name () {
      return this.formatName(this.item.name)
    },

    isFreebie () {
      return Array.isArray(this.item.flags)
        ? this.item.flags.includes('freebie')
        : false
    },

    isIntegerQnt () {
      return Number.isInteger(this.maxQuantity) && Number.isInteger(this.quantity)
    },

    minQuantity () {
      const minQuantity = this.item.min_quantity
      return typeof minQuantity === 'number' && minQuantity >= 0
        ? minQuantity
        : 1
    },

    maxQuantity () {
      const maxQuantity = this.item.max_quantity
      return typeof maxQuantity === 'number' && maxQuantity >= 0
        ? maxQuantity
        : 9999999
    }
  },

  methods: {
    formatMoney,

    formatName (name) {
      if (name) {
        if (name.length <= this.nameMaxLength) {
          return name
        } else {
          return `${name.substr(0, this.nameMaxLength)}...`
        }
      }
    },

    updateInputType () {
      this.canInputSelect = this.isIntegerQnt && this.quantity > 0 && this.quantity <= 10
    },

    remove () {
      this.$emit('remove')
      if (this.itemId && this.canUpdateCart) {
        this.quantity = 0
        this.canInputSelect = false
        this.$nextTick(() => {
          ecomCart.removeItem(this.itemId)
          this.$destroy()
        })
      }
    }
  },

  watch: {
    'item.quantity': {
      handler (qnt) {
        this.quantity = qnt || 0
      },
      immediate: true
    },

    quantity (qnt, oldQnt) {
      if (typeof qnt !== 'number' || isNaN(qnt)) {
        qnt = 0
      }
      if (qnt !== this.item.quantity) {
        const quantityToAdd = qnt - oldQnt
        this.$emit('increase', {
          quantityToAdd,
          newQuantity: qnt
        })
        if (this.itemId && this.canUpdateCart) {
          const item = ecomCart.increaseItemQnt(this.itemId, quantityToAdd)
          if (this.isFreebie) {
            item.flags = item.flags.filter(flag => !flag.startsWith('freebie'))
          }
        }
      }
      if (qnt > 10 && oldQnt <= 10) {
        this.$nextTick(() => {
          if (this.$refs.input) {
            this.$refs.input.focus()
          }
        })
      }
      if (this.minQuantity <= this.maxQuantity) {
        if (qnt < this.minQuantity) {
          this.quantity = this.minQuantity
        } else if (qnt > this.maxQuantity) {
          this.quantity = this.maxQuantity
        }
      }
    }
  },

  created () {
    this.updateInputType()
  }
}
