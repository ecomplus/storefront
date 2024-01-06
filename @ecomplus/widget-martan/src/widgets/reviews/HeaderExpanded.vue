<template>
  <div class="mt-header--expanded">
    <AverageTotal :average="reviews.averageTotal" />
    <Score :reviews="reviews" :starColor="starColor" @updateOrderByAverage="updateOrderBy" />
  </div>
</template>

<script>
export default {
  props: {
    starColor: {
      type: String,
      default: '#212529'
    },

    reviews: {
      type: Object,
      default: {
        list: [],
        orderRating: null,
        total: 0,
        average: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        averageTotal: 0,
      }
    },
  },

  name: 'header-expanded',

  components: {
    AverageTotal: () => import("./AverageTotal.vue"),
    AverageScore: () => import("./AverageScore.vue"),
    Score: () => import("./Score.vue"),
  },

  methods: {
    updateOrderBy: ({ rating }) => this.$emit('updateOrderByAverage', { rating })
  }
};
</script>

<style lang="scss">
.mt-header--expanded {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e3e3e3;
  padding-bottom: 25px;

  .mt-rating__average {
    display: flex;
    align-items: center;
  }

  .mt-rating__average__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    padding-top: 5px;
  }

  .mt-rating__average_total {
    font-size: 48px;
    margin: 0 18px 0 0;
    padding: 0;
  }
}

@media (max-width: 580px) {
  .mt-rating__options {
    max-width: 97%;
  }
}
</style>
