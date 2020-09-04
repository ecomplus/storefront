import { i18n, inStock } from '@ecomplus/utils'
import AAlert from '../AAlert.vue'

export default {
  name: 'QuantitySelector',

  components: {
    AAlert
  },

  data () {
    return {
      selectedQuantities: {},
      isMax: false,
      isMin: false
    }
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
    title: String,
    buyButton: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    selectedQuantity () {
      let total = 0
      const { selectedQuantities } = this
      Object.keys(selectedQuantities).forEach(key => {
        if (selectedQuantities[key]) {
          total += selectedQuantities[key]
        }
      })
      return total
    },

    quantityRemaining () {
      return this.max
        ? this.max - this.selectedQuantity
        : 9999999
    },

    i19MaximumQuantity () {
      return i18n({
        pt_br: 'Quantidade Máxima',
        en_eu: 'Maximum Quantity'
      })
    },

    i19MinimumQuantity () {
      return i18n({
        pt_br: 'Quantidade mínima',
        en_eu: 'Minimum Quantity'
      })
    },

    i19BuyKit () {
      return i18n({
        pt_br: 'Comprar Kit',
        en_eu: 'Buy Kit'
      })
    }
  },

  methods: {
    isInStock (item) {
      return inStock(item)
    },

    change () {
      if (this.quantityRemaining <= 0) {
        this.isMax = true
        setTimeout(() => {
          this.isMax = false
        }, 6000)
        return
      }

      this.$emit('addToKit', this.selectedQuantities)
    },

    buyKit () {
      if (this.selectedQuantity <= this.min) {
        this.isMin = true
        setTimeout(() => {
          this.isMin = false
        }, 6000)
        return
      }

      this.$emit('buyKit', this.selectedQuantities)
    }
  }
}
