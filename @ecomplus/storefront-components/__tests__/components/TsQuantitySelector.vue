<template>
  <div class="row">
    <QuantitySelector :items="product.variations" max="40"/>
  </div>
</template>

<script>
  import product from '__/__fixtures__/product.json'
  import QuantitySelector from '@ecomplus/storefront-components/src/QuantitySelector.vue'

  export default {
    name: 'TsQuantitySelector',

    components: {
      QuantitySelector
    },

    data () {
      return {
        product
      }
    }
  }
</script>
