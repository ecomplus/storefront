import { _config, price } from '@ecomplus/utils'
import { modules } from '@ecomplus/client'
import CleaveInput from 'vue-cleave-component'
import dictionary from './../../lib/dictionary'

const { localStorage } = window
const zipStorageKey = 'ec-shipping-zip'

export default {
  name: 'EcShipping',

  components: {
    CleaveInput
  },

  props: {
    lang: {
      type: String,
      default: _config.get('lang')
    },
    countryCode: {
      type: String,
      default: _config.get('country_code')
    },
    storeId: {
      type: Number,
      default: _config.get('store_id')
    },
    zipInput: {
      type: Boolean,
      default: true
    },
    zipCode: {
      type: String
    },
    shippedItems: {
      type: Array,
      default: () => []
    },
    shippingResult: {
      type: Array,
      default: () => []
    },
    shippingData: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      zipCodeValue: this.zipCode,
      zipInputCleave: this.countryCode === 'BR'
        ? { blocks: [5, 3], delimiter: '-' }
        : { blocks: [30] },
      shippingServices: []
    }
  },

  methods: {
    dictionary,

    updateZipCode () {
      this.$emit('update:zipCode', this.zipCodeValue)
    },

    parseShippingOptions (shippingResult = []) {
      this.shippingServices = []
      shippingResult.forEach(appResult => {
        const { validated, error, response } = appResult
        if (validated && !error) {
          response.shipping_services.forEach(service => {
            this.shippingServices.push({
              _id: appResult._id,
              app_id: appResult.app_id,
              ...service
            })
          })
        }
      })
    },

    fetchShippingServices () {
      const { storeId } = this
      const url = '/calculate_shipping.json'
      const method = 'POST'
      const data = {
        ...this.shippingData,
        to: {
          zip: this.zipCodeValue,
          ...this.shippingData.to
        }
      }
      if (this.shippedItems.length) {
        data.items = this.shippedItems
        const itemsToSubtotal = (subtotal, item) => subtotal + price(item) * item.quantity
        data.subtotal = data.items.reduce(itemsToSubtotal, 0)
      }
      modules({ url, method, storeId, data })
        .then(({ data }) => this.parseShippingOptions(data.result))
    },

    submitZipCode (e) {
      this.updateZipCode()
      if (localStorage) {
        localStorage.setItem(zipStorageKey, this.zipCodeValue)
      }
      this.fetchShippingServices()
    }
  },

  created () {
    if (localStorage) {
      if (!this.zipCode) {
        const storedZip = localStorage.getItem(zipStorageKey)
        if (storedZip) {
          this.zipCodeValue = storedZip
          this.updateZipCode()
        }
      }
      if (!this.shippingResult.length) {
        if (this.zipCodeValue) {
          this.fetchShippingServices()
        }
      } else {
        this.parseShippingOptions(this.shippingResult)
      }
    }
  }
}
