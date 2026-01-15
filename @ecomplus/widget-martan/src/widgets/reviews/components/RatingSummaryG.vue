<template>
  <div class="widget-wrapper">
    <div class="widget-header">
      <div v-if="totalRecommended" class="widget-header__score-average">
        <strong>{{ totalRecommended }}</strong>
      </div>

      <div class="widget-header__score">
        <score :reviews="{
          list,
          orderRating,
          total,
          averageTotal,
          offset,
          average,
        }" :star-color="starColor" @updateOrderByAverage="updateOrderBy" />
      </div>
    </div>
  </div>
</template>

<script>
import Score from "./Score.vue";

export default {
  name: "RatingSummaryG",

  props: {
    list: {
      type: Array,
      required: true,
    },
    orderRating: {
      type: [String, Number],
      default: null,
    },
    total: {
      type: Number,
      required: true,
    },
    averageTotal: {
      type: Number,
      required: true,
    },
    offset: {
      type: Number,
      required: true,
    },
    average: {
      type: Object,
      required: true,
    },
    totalRecommended: {
      type: String,
      default: null,
    },
    starColor: {
      type: String,
      default: "#212529",
    },
  },

  methods: {
    updateOrderBy({ rating }) {
      this.$emit('updateOrderBy', { rating });
    },
  },

  components: {
    Score,
  },
};
</script>

<style lang="scss" scoped>
.widget-wrapper {
  .widget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    @media (max-width: 580px) {
      flex-direction: column-reverse;
    }

    &__score {
      max-width: 500px;
      width: 100%;
    }

    &__score-average {
      font-size: 1.25rem;
      color: #444;
      padding: 0 2rem;

      @media (max-width: 580px) {
        font-size: 1rem;
        padding: 0;
      }
    }
  }
}
</style>
