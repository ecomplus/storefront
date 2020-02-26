<template>
  <div>
    <TsBootstrap/>
    <TsAPrices/>
    <TsAPicture/>
  </div>
</template>

<script>
  import '@ecomplus/storefront-twbs'
  import TsBootstrap from '__/components/TsBootstrap.vue'
  import TsAPicture from '__/components/TsAPicture.vue'
  import TsAPrices from '__/components/TsAPrices.vue'

  export default {
    name: 'Playground',
    components: {
      TsBootstrap,
      TsAPicture,
      TsAPrices
    }
  }
</script>

<style lang="scss">
  @import '@ecomplus/storefront-twbs/scss/styles';
</style>
