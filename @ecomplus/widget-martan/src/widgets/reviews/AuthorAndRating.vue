<template>
  <div style="display: flex;align-items: baseline; justify-content: space-between">
    <div style="display: flex; height: 20px; align-items: center; gap: 5px">
      <div class="mt-review__author" style="padding-right: 2px">
        <span>{{ isAnonymous ? "Anônimo" : author }}</span>
      </div>

      <rating :rating="rating" :color="starColor" />
    </div>
  </div>
</template>

<script>
import Rating from "../snippets/Rating.vue";

export default {
  name: "AuthorAndRating",

  props: {
    isAnonymous: Boolean,
    author: String,
    rating: Number,
    starColor: String,
  },

  components: {
    Rating,
  },
};
</script>
