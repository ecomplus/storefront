import { mapGetters, mapMutations, mapActions } from 'vuex'
import ecomCart from '@ecomplus/shopping-cart'
import { upsertCart } from './../../lib/sync-cart-to-api'
import EcCart from './../../components/EcCart.vue'

export default {
  name: 'cart',

  components: {
    EcCart
  },

  computed: {
    ...mapGetters([
      'amount'
    ]),

    discountCoupon: {
      get () {
        return this.$store.getters.discountCoupon
      },
      set (couponCode) {
        this.setDiscountCoupon(couponCode)
      }
    }
  },

  methods: {
    ...mapMutations([
      'setDiscountCoupon',
      'setDiscountRule',
      'selectShippingService'
    ]),

    ...mapActions([
      'fetchCartItems'
    ])
  },

  created () {
    this.fetchCartItems({}).then(() => {
      upsertCart()
        .then(() => {
          ecomCart.on('change', upsertCart)
          this.$once('hook:beforeDestroy', () => ecomCart.off('change', upsertCart))
        })
    })
  }
}
