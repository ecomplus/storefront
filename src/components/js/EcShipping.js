import { _config, price, formatMoney } from '@ecomplus/utils'
import { modules } from '@ecomplus/client'
import { SlideYUpTransition } from 'vue2-transitions'
import CleaveInput from 'vue-cleave-component'
import dictionary from './../../lib/dictionary'

const { localStorage } = window
const zipStorageKey = 'ec-shipping-zip'

export default {
  name: 'EcShipping',

  components: {
    SlideYUpTransition,
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
    selectServices: {
      type: Boolean
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
      shippingServices: [],
      selectedService: 0,
      waiting: false
    }
  },

  methods: {
    dictionary,
    formatMoney,

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
      this.waiting = true
      modules({ url, method, storeId, data })
        .then(({ data }) => this.parseShippingOptions(data.result))
        .finally(() => {
          this.waiting = false
        })
    },

    submitZipCode (e) {
      this.updateZipCode()
      if (localStorage) {
        localStorage.setItem(zipStorageKey, this.zipCodeValue)
      }
      this.fetchShippingServices()
    },

    serviceDeadline (service) {
      const shipping = service.shipping_line
      let days = shipping.posting_deadline ? shipping.posting_deadline.days : 0
      if (shipping.delivery_time) {
        days += shipping.delivery_time.days
      }
      return days
    },

    serviceIsWorkingDays (service) {
      const shipping = service.shipping_line
      return (shipping.posting_deadline && shipping.posting_deadline.working_days) ||
        (shipping.delivery_time && shipping.delivery_time.working_days)
    },

    setSelectedService (i) {
      if (this.selectServices) {
        this.$emit('serviceSelected', this.shippingServices[i])
        this.selectedService = i
      }
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
