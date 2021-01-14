import {
  i19buy,
  i19close,
  i19days,
  i19discountOf,
  i19freeShippingFrom,
  i19loadProductErrorMsg,
  i19only,
  i19outOfStock,
  i19paymentOptions,
  i19perUnit,
  i19productionDeadline,
  i19retry,
  i19selectVariationMsg,
  i19unavailable,
  i19units,
  i19unitsInStock,
  i19workingDays
} from '@ecomplus/i18n'

import {
  i18n,
  randomObjectId as genRandomObjectId,
  name as getName,
  inStock as checkInStock,
  onPromotion as checkOnPromotion,
  price as getPrice,
  variationsGrids as getVariationsGrids,
  specTextValue as getSpecTextValue,
  specValueByText as getSpecValueByText,
  formatMoney
} from '@ecomplus/utils'

import { store, modules } from '@ecomplus/client'
import EcomSearch from '@ecomplus/search-engine'
import ecomCart from '@ecomplus/shopping-cart'
import sortApps from './helpers/sort-apps'
import addIdleCallback from './helpers/add-idle-callback'
import { Portal } from '@linusborg/vue-simple-portal'
import ALink from '../ALink.vue'
import AAlert from '../AAlert.vue'
import APrices from '../APrices.vue'
import AShare from '../AShare.vue'
import ProductVariations from '../ProductVariations.vue'
import ProductGallery from '../ProductGallery.vue'
import QuantitySelector from '../QuantitySelector.vue'
import ShippingCalculator from '../ShippingCalculator.vue'
import PaymentOption from '../PaymentOption.vue'

const storefront = (typeof window === 'object' && window.storefront) || {}
const getContextBody = () => (storefront.context && storefront.context.body) || {}
const getContextId = () => getContextBody()._id

const sanitizeProductBody = body => {
  const product = Object.assign({}, body)
  delete product.body_html
  delete product.body_text
  delete product.specifications
  delete product.inventory_records
  delete product.price_change_records
  return product
}

export default {
  name: 'TheProduct',

  components: {
    Portal,
    ALink,
    AAlert,
    APrices,
    AShare,
    ProductVariations,
    ProductGallery,
    QuantitySelector,
    ShippingCalculator,
    PaymentOption
  },

  props: {
    productId: {
      type: String,
      default () {
        return getContextId()
      }
    },
    product: Object,
    headingTag: {
      type: String,
      default: 'h1'
    },
    buyText: String,
    canAddToCart: {
      type: Boolean,
      default: true
    },
    lowQuantityToWarn: {
      type: Number,
      default: 12
    },
    isQuickview: Boolean,
    paymentAppsSort: {
      type: Array,
      default () {
        return window.ecomPaymentApps || []
      }
    },
    isSSR: Boolean
  },

  data () {
    return {
      body: {},
      fixedPrice: null,
      selectedVariationId: null,
      currentGalleyImg: 1,
      isOnCart: false,
      hasClickedBuy: false,
      hasLoadError: false,
      paymentOptions: [],
      customizations: [],
      kitItems: []
    }
  },

  computed: {
    i19close: () => i18n(i19close),
    i19days: () => i18n(i19days),
    i19discountOf: () => i18n(i19discountOf),
    i19freeShippingFrom: () => i18n(i19freeShippingFrom),
    i19loadProductErrorMsg: () => i18n(i19loadProductErrorMsg),
    i19only: () => i18n(i19only),
    i19outOfStock: () => i18n(i19outOfStock),
    i19paymentOptions: () => i18n(i19paymentOptions),
    i19perUnit: () => i18n(i19perUnit),
    i19productionDeadline: () => i18n(i19productionDeadline),
    i19retry: () => i18n(i19retry),
    i19selectVariationMsg: () => i18n(i19selectVariationMsg),
    i19unavailable: () => i18n(i19unavailable),
    i19units: () => i18n(i19units).toLowerCase(),
    i19unitsInStock: () => i18n(i19unitsInStock),
    i19workingDays: () => i18n(i19workingDays),

    selectedVariation () {
      return this.selectedVariationId
        ? this.body.variations.find(({ _id }) => _id === this.selectedVariationId)
        : {}
    },

    name () {
      return this.selectedVariation.name || getName(this.body)
    },

    isInStock () {
      return checkInStock(this.body)
    },

    productQuantity () {
      if (this.selectedVariation.quantity) {
        return this.selectedVariation.quantity
      } else if (this.body.quantity) {
        return this.body.quantity
      }
    },

    isLowQuantity () {
      return this.productQuantity > 0 && this.lowQuantityToWarn > 0 &&
        this.productQuantity <= this.lowQuantityToWarn
    },

    strBuy () {
      return this.buyText || i18n(i19buy)
    },

    discount () {
      const { body } = this
      return checkOnPromotion(body)
        ? Math.round(((body.base_price - getPrice(body)) * 100) / body.base_price)
        : 0
    },

    finalPrices () {
      const prices = {}
      ;['price', 'base_price'].forEach(field => {
        let price = this.selectedVariation[field] || this.body[field]
        if (price !== undefined) {
          this.customizations.forEach(customization => {
            if (customization.add_to_price) {
              price += this.getAdditionalPrice(customization.add_to_price)
            }
          })
        }
        prices[field] = price
      })
      return prices
    },

    hasVariations () {
      return this.body.variations && this.body.variations.length
    },

    isKit () {
      return this.body.kit_composition && this.body.kit_composition.length
    }
  },

  methods: {
    getVariationsGrids,
    getSpecValueByText,

    setBody (data) {
      this.body = {
        ...data,
        body_html: '',
        body_text: '',
        inventory_records: []
      }
      this.$emit('update:product', data)
    },

    fetchProduct (isRetry = false) {
      const { productId } = this
      store({
        url: `/products/${productId}.json`,
        axiosConfig: {
          timeout: isRetry ? 2500 : 6000
        }
      })
        .then(({ data }) => {
          this.setBody(data)
          if (getContextId() === productId) {
            storefront.context.body = this.body
          }
          this.hasLoadError = false
        })
        .catch(err => {
          console.error(err)
          const { response } = err
          if (!response || !(response.status >= 400 && response.status < 500)) {
            if (!isRetry) {
              this.fetchProduct(true)
            } else {
              this.setBody(getContextBody())
              if (!this.body.name || !this.body.price || !this.body.pictures) {
                this.hasLoadError = true
              }
            }
          }
        })
    },

    getAdditionalPrice ({ type, addition }) {
      return type === 'fixed'
        ? addition
        : getPrice(this.body) * addition / 100
    },

    formatAdditionalPrice (addToPrice) {
      if (addToPrice && addToPrice.addition) {
        return formatMoney(this.getAdditionalPrice(addToPrice))
      }
      return ''
    },

    setCustomizationOption (customization, text) {
      const index = this.customizations.findIndex(({ _id }) => _id === customization._id)
      if (text) {
        if (index > -1) {
          this.customizations[index].option = { text }
        } else {
          this.customizations.push({
            _id: customization._id,
            label: customization.label,
            add_to_price: customization.add_to_price,
            option: { text }
          })
        }
      } else if (index > -1) {
        this.customizations.splice(index, 1)
      }
    },

    showVariationPicture (variation) {
      if (variation.picture_id) {
        const pictureIndex = this.body.pictures.findIndex(({ _id }) => {
          return _id === variation.picture_id
        })
        this.currentGalleyImg = pictureIndex + 1
      }
    },

    handleGridOption ({ gridId, gridIndex, optionText }) {
      if (gridIndex === 0) {
        const variation = this.body.variations.find(variation => {
          return getSpecTextValue(variation, gridId) === optionText
        })
        if (variation) {
          this.showVariationPicture(variation)
        }
      }
    },

    buy () {
      this.hasClickedBuy = true
      const product = sanitizeProductBody(this.body)
      let variationId
      if (this.hasVariations) {
        if (this.selectedVariationId) {
          variationId = this.selectedVariationId
        } else {
          return
        }
      }
      const { customizations } = this
      this.$emit('buy', { product, variationId, customizations })
      if (this.canAddToCart) {
        ecomCart.addProduct({ ...product, customizations }, variationId)
      }
      this.isOnCart = true
    }
  },

  watch: {
    selectedVariationId (variationId) {
      if (variationId) {
        if (this.hasClickedBuy) {
          this.hasClickedBuy = false
        }
        this.showVariationPicture(this.selectedVariation)
      }
    },

    fixedPrice (price) {
      if (price > 0 && !this.isQuickview) {
        addIdleCallback(() => {
          modules({
            url: '/list_payments.json',
            method: 'POST',
            data: {
              amount: {
                total: price
              },
              items: [{
                ...sanitizeProductBody(this.body),
                product_id: this.body._id
              }]
            }
          })
            .then(({ data }) => {
              if (Array.isArray(this.paymentAppsSort) && this.paymentAppsSort.length) {
                sortApps(data.result, this.paymentAppsSort)
              }
              this.paymentOptions = data.result
                .reduce((paymentOptions, appResult) => {
                  if (appResult.validated) {
                    paymentOptions.push({
                      app_id: appResult.app_id,
                      ...appResult.response
                    })
                  }
                  return paymentOptions
                }, [])
                .sort((a, b) => {
                  return a.discount_option && a.discount_option.value &&
                    !(b.discount_option && b.discount_option.value)
                    ? -1
                    : 1
                })
            })
            .catch(console.error)
        })
      }
    },

    isKit: {
      handler (isKit) {
        if (isKit && !this.kitItems.length) {
          const kitComposition = this.body.kit_composition
          const ecomSearch = new EcomSearch()
          ecomSearch
            .setPageSize(kitComposition.length)
            .setProductIds(kitComposition.map(({ _id }) => _id))
            .fetch(true)
            .then(() => {
              ecomSearch.getItems().forEach(product => {
                const { quantity } = kitComposition.find(({ _id }) => _id === product._id)
                const addKitItem = variationId => {
                  const item = ecomCart.parseProduct(product, variationId, quantity)
                  if (quantity) {
                    item.min_quantity = item.max_quantity = quantity
                  } else {
                    item.quantity = 0
                  }
                  this.kitItems.push({
                    ...item,
                    _id: genRandomObjectId()
                  })
                }
                if (product.variations) {
                  product.variations.forEach(variation => {
                    variation._id = genRandomObjectId()
                    addKitItem(variation._id)
                  })
                } else {
                  addKitItem()
                }
              })
            })
            .catch(console.error)
        }
      },
      immediate: true
    }
  },

  created () {
    if (this.product) {
      this.body = this.product
      if (this.isSSR) {
        this.fetchProduct()
      }
    } else {
      this.fetchProduct()
    }
  }
}
