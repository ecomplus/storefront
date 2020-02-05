import { $ecomConfig, formatMoney, price, img } from '@ecomplus/utils'
import dictionary from './../../lib/dictionary'

export default {
  name: 'EcCartItem',

  props: {
    lang: {
      type: String,
      default: $ecomConfig.get('lang')
    },
    item: {
      type: Object,
      required: true
    },
    inputType: {
      type: String,
      default: 'select'
    },
    resetQnt: {
      type: Boolean
    }
  },

  data () {
    return {
      quantity: 1,
      skipSelect: false
    }
  },

  computed: {
    price () {
      return price(this.item)
    },

    img () {
      return img(this.item, null, 'small')
    }
  },

  methods: {
    dictionary,
    formatMoney,

    updateQnt () {
      this.quantity = this.item.quantity
      this.skipSelect = !Number.isInteger(this.item.quantity) ||
        this.item.quantity > 10
    }
  },

  created () {
    this.updateQnt()
  },

  watch: {
    quantity (qnt, oldQnt) {
      if (typeof qnt !== 'number' || isNaN(qnt)) {
        this.quantity = 0
      }
      if (this.quantity !== this.item.quantity) {
        this.$emit('increase', this.quantity - oldQnt)
        this.quantity = this.item.quantity
      }
      if (qnt > 10 && oldQnt <= 10) {
        this.skipSelect = true
        setTimeout(() => {
          this.$refs.input.focus()
        }, 300)
      }
    },

    resetQnt (reload) {
      if (reload) {
        this.updateQnt()
      }
    }
  }
}
