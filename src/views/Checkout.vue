<template>
  <div id="checkout">
    <ec-cart
      @serviceSelected="selectShippingService"
      :totalValue="totalValue"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import EcCart from './../components/EcCart.vue'

export default {
  name: 'cart',

  components: {
    EcCart
  },

  computed: mapGetters([
    'totalValue'
  ]),

  methods: {
    ...mapMutations('checkout', [
      'updateAmount',
      'selectShippingService'
    ])
  },

  created () {
    // TODO: fetch api and update cart items prices and quantities
    this.updateAmount()
  }
}
</script>
