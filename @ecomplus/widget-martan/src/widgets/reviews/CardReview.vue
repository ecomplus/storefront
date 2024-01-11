<template>
  <div class="mt-review">
    <div class="mt-rating__group">
      <author-and-rating
        v-if="review"
        :author="review.author"
        :isAnonymous="review.is_anonymous"
        :rating="review.rating"
        :starColor="starColor"
      />

      <is-recommended  v-if="review" :recommended="review.is_recommended" />

      <verified-purchase v-if="isVerified" />
    </div>

    <thumbs-pictures
      :review="review"
      @onClick="(e) => $emit('openQuickview', e)"
    />

    <review-body
      v-if="review"
      :body="review.body"
      :createdAt="review.created_at"
    />

    <review-reply :reply="review.reply" />
  </div>
</template>

<script>
import Rating from "../snippets/Rating.vue";
import ThumbsPictures from "./ThumbsPictures.vue";
import VerifiedPurchase from "./VerifiedPurchase.vue";
import AuthorAndRating from "./AuthorAndRating.vue";
import IsRecommended from "./isRecommended.vue";
import ReviewBody from "./ReviewBody.vue";
import ReviewReply from "./ReviewReply.vue";

export default {
  name: "CardReview",

  props: {
    review: {
      type: Object,
      default () {
        return {}
      }
    },

    starColor: {
      type: String,
      default: "#212529",
    },
  },

  components: {
    ThumbsPictures,
    Rating,
    VerifiedPurchase,
    AuthorAndRating,
    IsRecommended,
    ReviewBody,
    ReviewReply,
  },

  computed: {
    isVerified: function () {
      return this.review && this.review.verified_purchase;
    },
  },
};
</script>

<style>
.mt-reply__wrapper {
  display: flex;
  align-items: center;
}

@media (max-width: 580px) {
  .body-wrapper {
    padding: 0px;
  }
}
</style>
