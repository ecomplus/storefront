<template>
  <div>
    <TsProductCard/>
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
  import TsProductCard from '__/components/TsProductCard.vue'

  export default {
    name: 'Playground',
    components: {
      TsBootstrap,
      TsAPicture,
      TsAPrices,
      TsProductCard
    }
  }
</script>

<style lang="scss">
  @import '@ecomplus/storefront-twbs/scss/styles';
</style>
