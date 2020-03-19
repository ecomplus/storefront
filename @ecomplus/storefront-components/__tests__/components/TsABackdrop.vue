<template>
  <article>
    <ABackdrop @click="handleBackdrop"/>
  </article>
</template>

<script>
  import ABackdrop from '@ecomplus/storefront-components/src/ABackdrop.vue'

  export default {
    name: 'TsABackdrop',

    components: {
      ABackdrop
    },

    methods: {
      handleBackdrop () {
        console.log('backdrop clicked')
      }
    }
  }
</script>
