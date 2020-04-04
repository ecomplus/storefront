<template>
  <div class="demo">
    <button
      class="btn btn-primary my-4"
      type="button"
      @click="isVisible = true"
    >
      Click here to search products
    </button>
    <InstantSearch
      :is-visible.sync="isVisible"
    />
  </div>
</template>

<script>
  import InstantSearch from '../../@ecomplus/storefront-components/src/InstantSearch.vue'

  export default {
    name: 'DemoInstantSearch',
    components: {
      InstantSearch
    },
    data() {
      return {
        isVisible: false
      }
    },
  }
</script>
