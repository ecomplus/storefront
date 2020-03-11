<template>
  <article>
    <div class="p-4">
      <ProductCard :product="product"/>
    </div>
    <div class="p-4">
      <ProductCard :product="product" :is-small="true"/>
    </div>
  </article>
</template>

<script>
  import product from '__/data/product.json'
  import ProductCard from '@ecomplus/storefront-components/src/ProductCard.vue'

  export default {
    name: 'TsProductCard',

    components: {
      ProductCard
    },

    data () {
      return {
        product
      }
    }
  }
</script>
