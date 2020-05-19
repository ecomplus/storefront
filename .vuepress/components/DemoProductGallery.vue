<template>
  <div class="container p-4">
    <ProductGallery :product="product"/>
  </div>
</template>

<script>
  import product from '../../@ecomplus/storefront-components/__tests__/__fixtures__/product.json'
  import ProductGallery from '../../@ecomplus/storefront-components/src/ProductGallery.vue'

  export default {
    name: 'DemoProductGallery',

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
