<template>
  <div class="mt-reviews__list">
    <CardReview v-for="review in reviews.list" :key="review.id" :review="review" :starColor="starColor"
      @openQuickview="openQuickview" />
  </div>
</template>

<script>
import CardReview from "./CardReview.vue";
import Quickview from "./Quickview.vue";

export default {
  name: 'ListView',

  components: {
    CardReview,
    Quickview,
  },

  props: {
    starColor: {
      type: String,
      default: "#212529",
    },

    reviews: {
      type: Object,
      default: {
        list: [],
        orderRating: null,
        total: 0,
      },
    },
  },

  methods: {
    openQuickview: function ({ review, slide }) {
      this.$emit('openQuickview', { review, slide })
    },
  },
};
</script>
