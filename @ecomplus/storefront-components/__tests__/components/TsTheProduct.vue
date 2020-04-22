<template>
  <div class="container p-4">
    <the-product :product="product"/>
  </div>
</template>

<script>
  import product from '__/__fixtures__/product.json'
  import TheProduct from '@ecomplus/storefront-components/src/TheProduct.vue'

  export default {
    name: 'TsTheProduct',

    components: {
      TheProduct
    },

    data () {
      return {
        product
      }
    }
  }
</script>
