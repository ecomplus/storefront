<template>
  <article
    class="p-4"
    style="width: 350px"
  >
    <CartItem :item="item"/>
  </article>
</template>

<script>
  import cart from '__/__fixtures__/cart.json'
  import CartItem from '@ecomplus/storefront-components/src/CartItem.vue'

  export default {
    name: 'TsCartItem',

    components: {
      CartItem
    },

    data () {
      return {
        item: cart.items[0]
      }
    }
  }
</script>
