<template>
  <div class="_checkout">
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'CheckoutApp',

  data () {
    return {
      loaded: false
    }
  },

  computed: mapGetters([
    'cart',
    'checkout',
    'formatMoney'
  ]),

  methods: {
    ...mapActions([
      'loadCart'
    ]),
    ...mapMutations([
      'setCartItemQnt',
      'removeCartItem'
    ])
  },

  created () {
  }
}
</script>

<style lang="scss">
// Element UI theme variables
@import '../../../node_modules/element-theme-chalk/src/common/var.scss';
</style>
