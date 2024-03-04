<template>
  <div class="mt-gridview">
    <div class="mt-gridview__card" v-for="review in reviews.list" :key="review.id" @click="(e) => openQuickview(review)">
      <div class="mt-gridview__thumb" v-if="getPictureURL(review)">
        <img :src="getPictureURL(review)" :alt="review.title" @click="() => openQuickview(review)" />
      </div>

      <div class="mt-gridview__detail">
        <span class="mt-gridview__author">{{ review.display_name.substr(0, 16) }}</span>
        <rating :rating="review.rating" :color="starColor" />
        <verified-purchase v-if="review.verified_purchase" />
        <span class="mt-gridview__body">{{ review.body.substr(0, 250) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Rating from '../snippets/Rating.vue';
import CardReview from "./CardReview.vue";
import VerifiedPurchase from './VerifiedPurchase.vue';

export default {
  name: "GridView",

  components: {
    CardReview,
    Rating,
    VerifiedPurchase,
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
    openQuickview: function (review) {
      this.$emit('openQuickview', { review })
    },

    getPictureURL(review) {
      if (review && review.pictures && review.pictures.length && review.pictures[0].normal) {
        return review.pictures[0].normal
      }

      return false
    },
  },
};
</script>

<style lang="scss">
.mt-gridview {
  transition: all 0.7s ease;
  column-count: 2;
  column-gap: 10px;
  margin-right: auto;
  margin-left: auto;

  @media only screen and (min-width: 600px) {
    column-count: 3;
  }

  @media only screen and (min-width: 768px) {
    column-count: 4;
  }

  @media only screen and (min-width: 992px) {
    column-count: 5;
  }

  &__card {
    width: 100%;
    border: 1px #d5d9d9 solid;
    border-radius: 6px;
    cursor: pointer;
    margin: 0;
    display: grid;
    grid-template-rows: 1fr auto;
    margin-bottom: 10px;
    break-inside: avoid;
  }

  &__detail {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__thumb {
    img {
      max-width: 250px;
      width: 100%;
      object-fit: contain;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
    }
  }
}
</style>
