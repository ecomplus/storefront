<template>
  <div>
    <!-- <TsBootstrap/> -->
    <!-- <TsAPrices/> -->
    <!-- <TsAPicture/> -->
    <!-- <TsABackdrop/> -->
    <!-- <TsSearchEngine/> -->
    <!-- <TsInstantSearch/> -->
    <!-- <TsCartItem/> -->
    <!-- <TsProductCard/> -->
    <!-- <TsCartQuickview/> -->
    <!-- <TsProductGallery/> -->
    <!-- <TsTheProduct/> -->
    <!-- <TsLoginModal/> -->
    <TsQuantitySelector />
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
  import TsCartItem from '__/components/TsCartItem.vue'
  import TsCartQuickview from '__/components/TsCartQuickview.vue'
  import TsProductGallery from '__/components/TsProductGallery.vue'
  import TsTheProduct from '__/components/TsTheProduct.vue'
  import TsLoginModal from '__/components/TsLoginModal.vue'
  import TsQuantitySelector from '__/components/TsQuantitySelector.vue'

  export default {
    name: 'Playground',
    components: {
      TsBootstrap,
      TsABackdrop,
      TsAPicture,
      TsAPrices,
      TsProductCard,
      TsSearchEngine,
      TsInstantSearch,
      TsCartItem,
      TsCartQuickview,
      TsProductGallery,
      TsTheProduct,
      TsLoginModal,
      TsQuantitySelector
    }
  }
</script>
