import {
  i19calculateShipping,
  i19zipCode
} from '@ecomplus/i18n'

import {
  $ecomConfig,
  i18n,
  price as getPrice,
  formatMoney
} from '@ecomplus/utils'

import { modules } from '@ecomplus/client'
import CleaveInput from 'vue-cleave-component'
import ShippingLine from '../ShippingLine.vue'

const localStorage = typeof window === 'object' && window.localStorage
const zipStorageKey = 'shipping-to-zip'

const reduceItemBody = itemOrProduct => {
  const shippedItem = {}
  ;[
    'product_id',
    'variation_id',
    'sku',
    'name',
    'quantity',
    'currency_id',
    'currency_symbol',
    'price',
    'final_price',
    'dimensions',
    'weight'
  ].forEach(field => {
    if (itemOrProduct[field] !== undefined) {
      shippedItem[field] = itemOrProduct[field]
    }
  })
  return shippedItem
}

export default {
  name: 'ShippingCalculator',

  components: {
    CleaveInput,
    ShippingLine
  },

  props: {
    zipCode: String,
    canSelectServices: Boolean,
    canInputZip: {
      type: Boolean,
      default: true
    },
    countryCode: {
      type: String,
      default: $ecomConfig.get('country_code')
    },
    shippedItems: {
      type: Array,
      default () {
        return []
      }
    },
    shippingResult: {
      type: Array,
      default () {
        return []
      }
    },
    shippingData: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      localZipCode: null,
      shippingServices: [],
      selectedService: null,
      isWaiting: false
    }
  },

  computed: {
    i19calculateShipping: () => i18n(i19calculateShipping),
    i19zipCode: () => i18n(i19zipCode),

    cleaveOptions () {
      return this.countryCode === 'BR'
        ? { blocks: [5, 3], delimiter: '-' }
        : { blocks: [30] }
    }
  },

  methods: {
    formatMoney,

    updateZipCode () {
      this.$emit('update:zip-code', this.localZipCode)
    },

    parseShippingOptions (shippingResult = [], isRetry) {
      this.shippingServices = []
      let canRetry
      if (shippingResult.length) {
        shippingResult.forEach(appResult => {
          const { validated, error, response } = appResult
          if (validated && !error) {
            response.shipping_services.forEach(service => {
              this.shippingServices.push({
                app_id: appResult.app_id,
                ...service
              })
            })
          } else if (isRetry !== true && (!response || !response.error)) {
            canRetry = true
          }
        })
        if (!this.shippingServices.length) {
          if (canRetry) {
            this.fetchShippingServices(true)
          }
        } else {
          this.setSelectedService(0)
        }
      }
    },

    fetchShippingServices (isRetry) {
      const { storeId } = this
      const url = '/calculate_shipping.json'
      const method = 'POST'
      const data = {
        ...this.shippingData,
        to: {
          zip: this.localZipCode,
          ...this.shippingData.to
        }
      }
      if (this.shippedItems.length) {
        data.items = this.shippedItems.map(reduceItemBody)
        const itemsToSubtotal = (subtotal, item) => subtotal + getPrice(item) * item.quantity
        data.subtotal = data.items.reduce(itemsToSubtotal, 0)
      }
      this.isWaiting = true
      modules({ url, method, storeId, data })
        .then(({ data }) => this.parseShippingOptions(data.result, isRetry))
        .catch(console.error)
        .finally(() => {
          this.isWaiting = false
        })
    },

    submitZipCode () {
      this.updateZipCode()
      if (localStorage) {
        localStorage.setItem(zipStorageKey, this.localZipCode)
      }
      this.fetchShippingServices()
    },

    setSelectedService (i) {
      if (this.canSelectServices) {
        this.$emit('select-service', this.shippingServices[i])
        this.selectedService = i
      }
    }
  },

  watch: {
    localZipCode (zipCode) {
      if (this.countryCode === 'BR' && zipCode.replace(/\D/g, '').length === 8) {
        this.submitZipCode()
      }
    },

    zipCode: {
      handler (zipCode) {
        if (zipCode) {
          this.localZipCode = zipCode
        }
      },
      immediate: true
    },

    shippingResult: {
      handler (result) {
        if (result.length) {
          this.parseShippingOptions(result)
        }
      },
      immediate: true
    }
  },

  created () {
    if (!this.zipCode && localStorage) {
      const storedZip = localStorage.getItem(zipStorageKey)
      if (storedZip) {
        this.localZipCode = storedZip
      }
    }
  }
}
