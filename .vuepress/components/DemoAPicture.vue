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
      <APicture src="https://ecom-jvxboxzk.sfo2.digitaloceanspaces.com/imgs/normal/@v2-1581704558843-display_hero_hw__d73ne9vbdmgm_large.jpg.webp"/>
    </div>
  </article>
</template>

<script>
  
  import APicture from '../../@ecomplus/storefront-components/src/APicture.vue'

  export default {
    name: 'DemoAPicture',

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
