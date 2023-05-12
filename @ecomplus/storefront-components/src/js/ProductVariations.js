import {
  i19select,
  i19selectVariation
} from '@ecomplus/i18n'

import {
  i18n,
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
    maxOptionsBtns: {
      type: Number,
      default: 6
    },
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
      filteredGrids: {}
    }
  },

  computed: {
    i19select: () => i18n(i19select),
    i19selectVariation: () => i18n(i19selectVariation),

    variationsGrids () {
      return getVariationsGrids(this.product)
    },

    orderedGrids () {
      return Object.keys(this.variationsGrids)
    },

    variationFromUrl () {
      if (typeof window === 'object') {
        const urlParams = new URLSearchParams(window.location.search)
        const variationId = urlParams.get('variation_id')
        if (variationId) {
          return variationId
        }
      }
      return null
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
      this.$emit('select-option', {
        gridId: grid,
        gridIndex,
        optionText
      })
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
        const options = nextFilteredGrids[grid]
        this.filteredGrids[grid] = options
        if (selectedOptions[grid] && !options.includes(selectedOptions[grid])) {
          this.$set(selectedOptions, grid, undefined)
        }
      }
      const variations = product.variations.slice(0)
      for (let i = 0; i < variations.length; i++) {
        const variation = variations[i]
        const { specifications } = variation
        for (const grid in specifications) {
          if (selectedOptions[grid] !== getSpecTextValue(variation, grid)) {
            variations.splice(i, 1)
            i--
            break
          }
        }
      }
      this.$emit('update:selected-id', variations.length ? variations[0]._id : null)
    }
  },

  watch: {
    'product.variations': {
      handler () {
        this.filteredGrids = getVariationsGrids(this.product, null, true)
      },
      deep: true,
      immediate: true
    }
  },

  mounted () {
    if (this.variationFromUrl && Array.isArray(this.product.variations)) {
      const selectedVariation = this.product.variations.find(variation => variation._id === this.variationFromUrl)
      if (selectedVariation) {
        const { specifications } = selectedVariation
        const specs = Object.keys(specifications)
        const nextSpec = (specIndex = 0) => {
          const spec = specs[specIndex]
          if (specs[specIndex] && specifications[spec] && specifications[spec].length === 1) {
            const specText = specifications[spec][0].text
            if (this.variationsGrids[spec].find(option => option === specText)) {
              this.$nextTick(() => {
                this.selectOption(specText, spec, this.orderedGrids.indexOf(spec))
                nextSpec(specIndex + 1)
              })
            }
          }
        }
        nextSpec()
      }
    }
  }
}
