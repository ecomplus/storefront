<template>
  <div>
    <TsBootstrap/>
    <TsAPicture/>
  </div>
</template>

<script>
  import '@ecomplus/storefront-twbs/src/'
  import TsBootstrap from '__/components/TsBootstrap.vue'
  import TsAPicture from '__/components/TsAPicture.vue'

  export default {
    name: 'Playground',
    components: {
      TsAPicture,
      TsBootstrap
    }
  }
</script>

<style lang="scss">
  @import '@ecomplus/storefront-twbs/scss/styles';
</style>
