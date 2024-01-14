<template>
  <div class="mt-header--minimal">
    <div class="rating">
      <div style="display: flex; align-items: center; gap: 10px">
        <rating :color="starColor" :rating="reviews.averageTotal" />

        <span class="average" v-if="reviews.averageTotal > 0">
          {{ reviews.averageTotal }}
          <span class="baseado" style="font-size: 10px; opacity: 0.8"
            >({{
              reviews.total > 1
                ? i19basedOn$1Reviews.replace("$1", reviews.total)
                : i19basedOn$1Review.replace("$1", reviews.total)
            }})</span
          ></span
        >
        <span class="average" v-else>
          {{ reviews.averageTotal }}
          <span class="baseado" style="font-size: 10px; opacity: 0.8"
            >({{ i19noReview }})</span
          ></span
        >
      </div>

      <Sort @onSort="onSort" />
    </div>
  </div>
</template>

<script>
import Rating from "../snippets/Rating.vue";
import Sort from "./Sort.vue";

export default {
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
        average: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        averageTotal: 0,
      },
    },
  },

  name: "header-minimal",

  components: {
    Rating,
    Sort,
  },

  computed: {
    i19basedOn$1Reviews: () => "Baseado em $1 avaliações",
    i19basedOn$1Review: () => "Baseado em $1 avaliação",
    i19noReview: () => "Nenhuma avaliação",
  },

  methods: {
    updateOrderBy: ({ rating }) =>
      this.$emit("updateOrderByAverage", { rating }),

    onSort(value) {
      this.$emit("onSort", value);
    },
  },
};
</script>

<style lang="scss">
.mt-header--minimal {
  .rating {
    display: flex;
    align-items: center;
    gap: 15px;
    border-bottom: 1px solid #eee;
    justify-content: space-between;
    margin-bottom: 10px;
    padding-bottom: 10px;
  }

  .average {
    font-size: 26px;
    color: #6c757d;
  }

  .mt-rating__average__sort {
    width: 100%;
  }

  .baseado {
    @media (max-width: 580px) {
      display: none;
    }
  }
}
</style>
