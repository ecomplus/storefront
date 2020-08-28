import { i18n } from '@ecomplus/utils'
import AAlert from '../AAlert.vue'

export default {
  name: 'QuantitySelector',

  components: {
    AAlert
  },

  data () {
    return {
      itemsSelected: [],
      isMax: false
    }
  },

  props: {
    items: Array,
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 10
    },
    title: String
  },

  computed: {
    selectedQuantity () {
      return this.itemsSelected.map(item => parseInt(item.quantity, 10))
    },
    quantityRemaining () {
      const total = this.selectedQuantity.reduce((a, b) => a + b, 0)
      return this.max - total
    },
    i19MaximumQuantity () {
      return i18n({
        pt_br: 'Quantidade Máxima',
        en_eu: 'Maximum Quantity'
      })
    }
  },

  methods: {
    loadItems () {
      this.itemsSelected = this.items.map(item => ({ productId: item._id, quantity: (this.min || 0), name: item.name }))
    },

    click () {
      if (this.quantityRemaining <= 0) {
        this.isMax = true
      }

      setTimeout(() => {
        this.isMax = false
      }, 6000)
    }
  },

  created () {
    this.loadItems()
  }
}
