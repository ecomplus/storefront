<template>
  <div class="container p-4">
    <div class="row">
      <div class="col col-lg-3">
        <article>
          <ProductCard :product="product" :is-loaded="true"/>
        </article>
      </div>
      <div class="col col-lg-3">
        <article>
          <ProductCard :product="product" :is-loaded="true"/>
        </article>
      </div>
    </div>
    <div class="row">
      <div class="col col-lg-3">
        <article>
          <ProductCard :product="product" :is-small="true" :is-loaded="true"/>
        </article>
      </div>
      <div class="col col-lg-3">
        <article>
          <ProductCard :product="product" :is-small="true"/>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
  import product from '__/__fixtures__/product.json'
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
