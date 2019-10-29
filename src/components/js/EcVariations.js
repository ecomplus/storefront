import { _config, specTextValue, specValueByText, variationsGrids, specValues, inStock, gridTitle } from '@ecomplus/utils'

export default {
  name: 'EcVariations',

  props: {
    lang: {
      type: String,
      default: _config.get('lang')
    },
    product: {
      type: Object,
      required: true
    },
    literal: {
      type: Boolean
    }
  },

  data () {
    return {
      body: {}
    }
  },

  methods: {
    variationsGrids,
    inStock,
    specValues,
    specValueByText,
    specTextValue,
    gridTitle
  },

  computed: {

    options () {
      return variationsGrids(this.product)
    },

    variations () {
      const { variations } = this.product
      return variations
    },

    grids () {
      return window._data.grids
    },

    quantityVariations () {
      const { variations } = this.product
      return variations.length
    }
  },

  created () {
  }
}
