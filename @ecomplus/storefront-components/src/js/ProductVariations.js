import {
  inStock as checkStock,
  specValueByText as getSpecValueByText,
  specTextValue as getSpecTextValue,
  variationsGrids as getVariationsGrids,
  gridTitle as getGridTitle
} from '@ecomplus/utils'

export default {
  name: 'ProductVariations',

  props: {
    product: {
      type: Object,
      required: true
    },
    selectedId: String,
    gridsData: {
      type: Array,
      default () {
        if (typeof window === 'object' && window.storefront && window.storefront.data) {
          return window.storefront.data.grids
        }
      }
    }
  },

  data () {
    return {
      selectedOptions: {},
      filteredGrids: getVariationsGrids(this.product, null, true)
    }
  },

  methods: {
    getColorOptionBg (optionText) {
      const rgbs = optionText.split(',').map(colorName => {
        return getSpecValueByText(this.product.variations, colorName.trim(), 'colors')
      })
      return rgbs.length > 1
        ? `background:linear-gradient(to right bottom, ${rgbs[0]} 50%, ${rgbs[1]} 50%)`
        : `background:${rgbs[0]}`
    },

    getSpecValue (optionText, grid) {
      const { variations } = this.product
      let values
      if (grid === 'colors') {
        const colorNames = optionText.split(',')
        if (colorNames.length > 1) {
          values = []
          colorNames.forEach(color => {
            values.push(getSpecValueByText(variations, color.trim(), grid))
          })
        }
      }
      return values || getSpecValueByText(variations, optionText, grid)
    },

    getGridTitle (grid) {
      return getGridTitle(grid, this.gridsData)
    },

    selectOption (optionText, grid, gridIndex) {
      const { product, selectedOptions, orderedGrids } = this
      this.$set(selectedOptions, grid, optionText)
      const filterGrids = {}
      for (let i = 0; i <= gridIndex; i++) {
        const grid = orderedGrids[i]
        if (selectedOptions[grid]) {
          filterGrids[grid] = selectedOptions[grid]
        }
      }
      const nextFilteredGrids = getVariationsGrids(product, filterGrids, true)
      for (let i = gridIndex + 1; i < orderedGrids.length; i++) {
        const grid = orderedGrids[i]
        this.filteredGrids[grid] = nextFilteredGrids[grid]
      }
      const variations = product.variations.slice(0)
      for (let i = 0; i < variations.length; i++) {
        const variation = variations[i]
        if (!checkStock(variation)) {
          variations.splice(i, 1)
        } else {
          const { specifications } = variation
          for (const grid in specifications) {
            if (selectedOptions[grid] !== getSpecTextValue(variation, grid)) {
              variations.splice(i, 1)
              i--
              break
            }
          }
        }
      }
      this.$emit('update:selected-id', variations.length ? variations[0]._id : null)
    }
  },

  computed: {
    variationsGrids () {
      return getVariationsGrids(this.product)
    },

    orderedGrids () {
      return Object.keys(this.variationsGrids)
    }
  }
}
