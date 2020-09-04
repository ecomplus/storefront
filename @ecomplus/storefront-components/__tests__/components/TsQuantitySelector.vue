<template>
  <div class="row">
    <QuantitySelector :items="product.variations" max="40" min="10" @buyKit="buy" @addToKit="kit"/>
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
    },

    methods: {
      buy (i) {
        console.log(i)
      },
      kit (i) {
        console.log(i)
      }
    }
  }
</script>
