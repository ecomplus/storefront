<template>
  <div class="demo">
    <div style="max-width: 290px">
      <ProductCard :product="product"/>
    </div>
  </div>
</template>

<script>
import product from '../../@ecomplus/storefront-components/__tests__/__fixtures__/product.json'
import ProductCard from '../../@ecomplus/storefront-components/src/ProductCard.vue'

export default {
  name: 'DemoProductCard',
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
