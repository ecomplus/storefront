import {
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
import VLink from '../_internal/VLink.vue'
import APicture from '../APicture.vue'

export default {
  name: 'CartItem',

  components: {
    VLink,
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
    i19quantity: () => i18n(i19quantity),
    i19remove: () => i18n(i19remove),

    itemId () {
      return this.item._id
    },

    price () {
      return getPrice(this.item)
    },

    img () {
      return getImg(this.item, null, 'small')
    },

    name () {
      const { name } = this.item
      if (name) {
        if (name.length <= this.nameMaxLength) {
          return name
        } else {
          return `${name.substr(0, this.nameMaxLength)}...`
        }
      }
    }
  },

  methods: {
    formatMoney,

    updateInputType () {
      this.canInputSelect = Number.isInteger(this.quantity) &&
        this.quantity > 0 && this.quantity <= 10
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
          ecomCart.increaseItemQnt(this.itemId, quantityToAdd)
        }
      }
      if (qnt > 10 && oldQnt <= 10) {
        this.$nextTick(() => {
          this.$refs.input.focus()
        })
      }
    }
  },

  created () {
    this.updateInputType()
  }
}
