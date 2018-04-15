<template>
  <div class="_cart">
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
