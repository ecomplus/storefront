<template>
  <article>
    <SearchEngine
      :term.sync="term"
      :is-visible.sync="isVisible"
    />
  </article>
</template>

<script>
  import SearchEngine from '@ecomplus/storefront-components/src/SearchEngine.vue'

  export default {
    name: 'TsSearchEngine',

    components: {
      SearchEngine
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
