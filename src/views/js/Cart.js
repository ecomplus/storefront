import { mapGetters, mapMutations, mapActions } from 'vuex'
import ecomCart from '@ecomplus/shopping-cart'
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
      'updateAmount',
      'setDiscountCoupon',
      'setDiscountRule',
      'selectShippingService'
    ]),

    ...mapActions([
      'fetchCartItems'
    ])
  },

  created () {
    this.updateAmount()
    this.fetchCartItems({})
    ecomCart.on('change', ({ data }) => {
      this.updateAmount(data.subtotal)
    })
  }
}
