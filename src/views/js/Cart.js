import { mapGetters, mapMutations, mapActions } from 'vuex'
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
    this.fetchCartItems({})
  }
}
