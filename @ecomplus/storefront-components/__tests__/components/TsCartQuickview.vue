<template>
  <article class="p-5">
    <button
      class="btn btn-primary"
      type="button"
      @click="isVisible = true"
    >
      Shopping Cart
    </button>
    <CartQuickview
      :is-visible.sync="isVisible"
      :ecom-cart="ecomCart"
    />
  </article>
</template>

<script>
  import ecomCart from '@ecomplus/shopping-cart'
  import cart from '__/__fixtures__/cart.json'
  import CartQuickview from '@ecomplus/storefront-components/src/CartQuickview.vue'

  if (!ecomCart.data.items.length) {
    cart.items.forEach(item => ecomCart.addItem(item))
  }

  export default {
    name: 'TsCartQuickview',

    components: {
      CartQuickview
    },

    data () {
      return {
        isVisible: false,
        ecomCart
      }
    },

    created () {
      setTimeout(() => {
        ecomCart.addItem(cart.items[0])
      }, 3000)
    }
  }
</script>
