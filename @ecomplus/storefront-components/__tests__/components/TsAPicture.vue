<template>
  <article>
    <div
      class="p-4"
      style="width: 700px; margin-top: 200px"
      v-for="(picture, i) in pictures"
      :key="i"
    >
      <APicture :src="picture"/>
    </div>
  </article>
</template>

<script>
  import { pictures } from '__/data/product.json'
  import APicture from '@ecomplus/storefront-components/src/APicture.vue'

  export default {
    name: 'TsAPicture',

    components: {
      APicture
    },

    data () {
      return {
        pictures
      }
    }
  }
</script>
