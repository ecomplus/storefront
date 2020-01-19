import {
  specValueByText as getSpecValueByText,
  variationsGrids as getVariationsGrids,
  gridTitle as getGridTitle
} from '@ecomplus/utils'

const { storefront } = window
const grids = (storefront && storefront.data && storefront.data.grids) || []

export default {
  name: 'EcVariations',

  props: {
    product: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      selectedOptions: {}
    }
  },

  methods: {
    getSpecValue (optionText, grid) {
      return getSpecValueByText(this.product.variations, optionText, grid)
    },

    getGridTitle (grid) {
      return getGridTitle(grid, grids)
    },

    selectOption (optionText, grid) {
      this.$set(this.selectedOptions, grid, optionText)
    }
  },

  computed: {
    variationsGrids () {
      return getVariationsGrids(this.product)
    }
  }
}
