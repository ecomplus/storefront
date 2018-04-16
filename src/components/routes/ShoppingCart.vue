<template>
  <div class="_cart">
    <h1>
      Carrinho
      <small>2 itens</small>
    </h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ShoppingCart',
  computed: mapGetters([
    'cart'
  ])
}
</script>
