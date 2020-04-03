<template>
  <article>
    <div class="p-4">
      <APrices :product="product"/>
    </div>
    <div class="p-4">
      <APrices :product="product" :big="true"/>
    </div>
  </article>
</template>

<script>
  import product from '__/__fixtures__/product.json'
  import APrices from '@ecomplus/storefront-components/src/APrices.vue'

  export default {
    name: 'TsAPrices',

    components: {
      APrices
    },

    data () {
      return {
        product
      }
    }
  }
</script>
