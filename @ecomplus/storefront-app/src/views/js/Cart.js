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
    this.fetchCartItems({}).then(() => {
      upsertCart().then(() => {
        ecomCart.on('change', upsertCart)
        const fetchAddedItem = ({ item }) => {
          this.fetchCartItems({ items: [item] })
        }
        ecomCart.on('addItem', fetchAddedItem)
        this.$once('hook:beforeDestroy', () => {
          ecomCart.off('change', upsertCart)
          ecomCart.off('addItem', fetchAddedItem)
        })
      })
    })
  }
}
