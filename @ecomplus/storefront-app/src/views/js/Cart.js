import {
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'

import ecomCart from '@ecomplus/shopping-cart'
import baseModulesRequestData from './../../lib/base-modules-request-data'
import { upsertCart } from './../../lib/sync-cart-to-api'
import TheCart from '#components/TheCart.vue'

export default {
  name: 'cart',

  components: {
    TheCart
  },

  computed: {
    ...mapGetters(['amount']),

    discountCoupon: {
      get () {
        return this.$store.getters.discountCoupon
      },
      set (couponCode) {
        this.setDiscountCoupon(couponCode)
      }
    },

    baseModulesRequestData () {
      return baseModulesRequestData
    }
  },

  methods: {
    ...mapMutations([
      'setDiscountCoupon',
      'setDiscountRule',
      'selectShippingService'
    ]),

    ...mapActions(['fetchCartItems'])
  },

  created () {
    const fetchAddedItem = ({ item }) => {
      this.fetchCartItems({ items: [item] })
    }
    ecomCart.on('addItem', fetchAddedItem)
    const urlParams = new URLSearchParams(window.location.search)
    const urlItems = urlParams.get('cart_items')
    if (urlItems) {
      try {
        const items = JSON.parse(urlItems)
        if (Array.isArray(items)) {
          items.forEach(item => {
            if (item) {
              ecomCart.addItem({
                quantity: 1,
                price: 1,
                ...item
              })
            }
          })
        }
      } catch (err) {
        console.error(err)
      }
      if (window.history) {
        urlParams.delete('cart_items')
        const query = urlParams.toString()
        const { pathname } = window.location
        window.history.pushState({
          pathname,
          query
        }, document.title, pathname + (query ? `?${query}` : ''))
      }
    }
    this.fetchCartItems({}).then(() => {
      upsertCart().then(() => {
        ecomCart.on('change', upsertCart)
      })
    })
    this.$once('hook:beforeDestroy', () => {
      ecomCart.off('change', upsertCart)
      ecomCart.off('addItem', fetchAddedItem)
    })
  }
}
