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
    <div class="p-4">
      <APicture src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Big_Bear_Valley%2C_California.jpg/1200px-Big_Bear_Valley%2C_California.jpg"/>
    </div>
  </article>
</template>

<script>
  import { pictures } from '__/__fixtures__/product.json'
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
