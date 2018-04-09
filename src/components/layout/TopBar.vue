<template>
  <div id="_top-bar">
    <img v-if="shop.logo.url" :src="shop.logo.url" :alt="shop.name" class="_logo" />
    <h1 v-else class="_title">
      {{ shop.name }}
    </h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TopBar',
  computed: mapGetters([
    'shop'
  ])
}
</script>
