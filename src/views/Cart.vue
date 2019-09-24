<template>
  <ec-cart/>
</template>

<script>
import EcCart from './../components/EcCart.vue'

export default {
  name: 'cart',

  components: {
    EcCart
  },

  created () {
    // TODO: fetch api and update cart items prices and quantities
  }
}
</script>
