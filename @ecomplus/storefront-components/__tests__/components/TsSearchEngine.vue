<template>
  <article>
    <SearchEngine
      :term.sync="term"
      :auto-fix-score="autoFixScore"
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
        autoFixScore: 0.8
      }
    }
  }
</script>
