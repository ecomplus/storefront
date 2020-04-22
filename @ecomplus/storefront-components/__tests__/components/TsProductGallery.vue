<template>
  <div class="container p-4">
    <ProductGallery :product="product"/>
  </div>
</template>

<script>
  import product from '__/__fixtures__/product.json'
  import ProductGallery from '@ecomplus/storefront-components/src/ProductGallery.vue'

  export default {
    name: 'TsProductGallery',

    components: {
      ProductGallery
    },

    data () {
      return {
        product
      }
    }
  }
</script>
