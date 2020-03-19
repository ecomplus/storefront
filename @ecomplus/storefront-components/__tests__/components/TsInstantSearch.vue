<template>
  <article class="p-5">
    <button
      class="btn btn-primary"
      type="button"
      @click="isVisible = true"
    >
      Search
    </button>
    <InstantSearch
      :term.sync="term"
      :is-visible.sync="isVisible"
    />
  </article>
</template>

<script>
  import InstantSearch from '@ecomplus/storefront-components/src/InstantSearch.vue'

  export default {
    name: 'TsInstantSearch',

    components: {
      InstantSearch
    },

    data () {
      return {
        term: '',
        isVisible: false
      }
    },

    created () {
      setTimeout(() => {
        this.isVisible = true
      }, 2000)
    }
  }
</script>
