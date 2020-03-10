<template>
  <div>
    <!-- <TsBootstrap/> -->
    <!-- <TsAPrices/> -->
    <!-- <TsAPicture/> -->
    <!-- <TsABackdrop/> -->
    <TsSearchEngine/>
    <!-- <TsProductCard/> -->
  </div>
</template>

<script>
  import '@ecomplus/storefront-twbs'
  import TsBootstrap from '__/components/TsBootstrap.vue'
  import TsABackdrop from '__/components/TsABackdrop.vue'
  import TsAPicture from '__/components/TsAPicture.vue'
  import TsAPrices from '__/components/TsAPrices.vue'
  import TsProductCard from '__/components/TsProductCard.vue'
  import TsSearchEngine from '__/components/TsSearchEngine.vue'
  import TsInstantSearch from '__/components/TsInstantSearch.vue'

  export default {
    name: 'Playground',
    components: {
      TsBootstrap,
      TsABackdrop,
      TsAPicture,
      TsAPrices,
      TsProductCard,
      TsSearchEngine,
      TsInstantSearch
    }
  }
</script>
