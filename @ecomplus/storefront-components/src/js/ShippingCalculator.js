import {
  i19add$1ToEarn,
  i19calculateShipping,
  i19freeShipping,
  i19zipCode
} from '@ecomplus/i18n'

import {
  $ecomConfig,
  i18n,
  price as getPrice,
  formatMoney
} from '@ecomplus/utils'

import { modules } from '@ecomplus/client'
import sortApps from './helpers/sort-apps'
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
    },
    shippingAppsSort: {
      type: Array,
      default () {
        return window.ecomShippingApps || []
      }
    }
  },

  data () {
    return {
      localZipCode: null,
      localShippedItems: [],
      amountSubtotal: null,
      shippingServices: [],
      selectedService: null,
      hasPaidOption: false,
      freeFromValue: null,
      isScheduled: false,
      retryTimer: null,
      isWaiting: false,
      hasCalculated: false
    }
  },

  computed: {
    i19add$1ToEarn: () => i18n(i19add$1ToEarn),
    i19calculateShipping: () => i18n(i19calculateShipping),
    i19zipCode: () => i18n(i19zipCode),
    i19freeShipping: () => i18n(i19freeShipping).toLowerCase(),

    cleaveOptions () {
      return this.countryCode === 'BR'
        ? { blocks: [5, 3], delimiter: '-' }
        : { blocks: [30] }
    },

    freeFromPercentage () {
      return this.hasPaidOption && this.amountSubtotal < this.freeFromValue
        ? Math.round(this.amountSubtotal * 100 / this.freeFromValue)
        : null
    }
  },

  methods: {
    formatMoney,

    updateZipCode () {
      this.$emit('update:zip-code', this.localZipCode)
    },

    parseShippingOptions (shippingResult = [], isRetry = false) {
      this.shippingServices = []
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
            const freeShippingFromValue = response.free_shipping_from_value
            if (
              freeShippingFromValue &&
              (!this.freeFromValue || this.freeFromValue > freeShippingFromValue)
            ) {
              this.freeFromValue = freeShippingFromValue
            }
          }
        })
        if (!this.shippingServices.length) {
          if (!isRetry) {
            this.fetchShippingServices(true)
          } else {
            this.scheduleRetry()
          }
        } else {
          this.shippingServices = this.shippingServices.sort((a, b) => {
            const priceDiff = a.shipping_line.total_price - b.shipping_line.total_price
            return priceDiff < 0
              ? -1
              : priceDiff > 0
                ? 1
                : a.shipping_line.delivery_time && b.shipping_line.delivery_time &&
                  a.shipping_line.delivery_time.days < b.shipping_line.delivery_time.days
                  ? -1
                  : 1
          })
          this.setSelectedService(0)
          this.hasPaidOption = Boolean(this.shippingServices.find(service => {
            return service.shipping_line.total_price || service.shipping_line.price
          }))
          if (Array.isArray(this.shippingAppsSort) && this.shippingAppsSort.length) {
            this.shippingServices = sortApps(this.shippingServices, this.shippingAppsSort)
          }
        }
      }
    },

    scheduleRetry (timeout = 10000) {
      clearTimeout(this.retryTimer)
      this.retryTimer = setTimeout(() => {
        if (this.localZipCode && !this.shippingServices.length) {
          this.fetchShippingServices(true)
        }
      }, timeout)
    },

    fetchShippingServices (isRetry) {
      if (!this.isScheduled) {
        this.isScheduled = true
        setTimeout(() => {
          this.isScheduled = false
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
          if (this.localShippedItems.length) {
            data.items = this.localShippedItems
            data.subtotal = this.amountSubtotal
          }
          this.isWaiting = true
          modules({ url, method, storeId, data })
            .then(({ data }) => this.parseShippingOptions(data.result, isRetry))
            .catch(err => {
              if (!isRetry) {
                this.scheduleRetry(4000)
              }
              console.error(err)
            })
            .finally(() => {
              this.hasCalculated = true
              this.isWaiting = false
            })
        }, this.hasCalculated ? 150 : 50)
      }
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
    shippedItems: {
      handler () {
        this.localShippedItems = this.shippedItems.map(reduceItemBody)
        const { amountSubtotal } = this
        this.amountSubtotal = this.shippedItems.reduce((subtotal, item) => {
          return subtotal + getPrice(item) * item.quantity
        }, 0)
        if (
          this.hasCalculated &&
          (this.canSelectServices || amountSubtotal !== this.amountSubtotal ||
            (!this.shippingServices.length && !this.isWaiting))
        ) {
          this.fetchShippingServices()
        }
      },
      deep: true,
      immediate: true
    },

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
