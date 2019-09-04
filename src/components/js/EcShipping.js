import { _config } from '@ecomplus/utils'
import dictionary from './../../lib/dictionary'

const { localStorage } = window
const zipStorageKey = 'ec-shipping-zip'
const servicesStorageKey = 'ec-shipping-services'

export default {
  name: 'EcShipping',

  props: {
    lang: {
      type: String,
      default: _config.get('lang')
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
    shippingOptions: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      zipCodeValue: this.zipCode,
      shippingServices: this.shippingOptions
    }
  },

  methods: {
    dictionary,

    updateZipCode () {
      this.$emit('update:zipCode', this.zipCodeValue)
    },

    fetchShippingServices () {
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
      if (!this.shippingOptions.length) {
        const storedServicesJson = localStorage.getItem(servicesStorageKey)
        if (storedServicesJson) {
          let storedServices
          try {
            storedServices = JSON.parse(storedServicesJson)
          } catch (err) {
          } finally {
            if (Array.isArray(storedServices) && storedServices.length) {
              this.shippingServices = storedServices
            } else {
              this.fetchShippingServices()
            }
          }
        } else {
          this.fetchShippingServices()
        }
      }
    }
  }
}
