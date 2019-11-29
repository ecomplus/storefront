import { mapGetters, mapMutations, mapActions } from 'vuex'
import ecomCart from '@ecomplus/shopping-cart'
import EcCart from './../../components/EcCart.vue'

export default {
  name: 'cart',

  components: {
    EcCart
  },

  computed: mapGetters([
    'totalValue'
  ]),

  methods: {
    ...mapMutations([
      'updateAmount',
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
