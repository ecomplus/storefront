<template>
  <div class="demo">
    <div style="max-width: 290px">
      <ProductCard :product="product"/>
    </div>
  </div>
</template>

<script>
import product from '../../@ecomplus/storefront-components/__tests__/data/product'

export default {
  name: 'DemoProductCard',

  data () {
    return {
      product
    }
  }
}
</script>
