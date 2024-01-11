<template>
  <div class="modal fade" id="martan-quickview" tabindex="-1" role="dialog" aria-labelledby="quickviewModal"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header" v-show="false">
          <h5 class="modal-title" id="quickviewModal"> {{ i19quickview }} </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body mt-quickview">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>

          <div class="glide mt-quickview__galery" v-if="pictures.length">
            <div class="mt-quickview__controls" data-glide-el="controls"
              :style="`--button--hover-color:${starColor || '#eeeeee'}`">
              <button :title="i19previous" :aria-label="i19previous" class="left" data-glide-dir="<" v-on:click="back"
                v-if="glide && glide.index > 0">
                <i class="i-chevron-left"></i>
              </button>
            </div>

            <div class="glide__track" data-glide-el="track">
              <ul class="glide__slides">
                <li 
                  v-for="picture in pictures"
                  :key="picture.id"
                  class="glide__slide" 
                >
                  <img 
                    :alt="`Foto da avaliação do produto feita por ${author}`" 
                    :src="picture.big"
                  />

                </li>

                <li 
                  v-if="video"
                  :key="video"
                  class="lazy-image" 
                >
                  <video-player :video="video" />
                </li>
              </ul>
            </div>

            <div class="mt-quickview__controls" data-glide-el="controls"
              :style="`--button--hover-color:${starColor || '#eeeeee'}`">

              <button 
                :title="i19next" 
                :aria-label="i19next" 
                data-glide-dir=">" 
                v-on:click="next"
              >
                <i class="i-chevron-right"></i>
              </button>
            </div>
          </div>

          <div class="mt-review">
            <div class="mt-rating__group">
              <AuthorAndRating :author="author" :isAnonymous="review.is_anonymous" :rating="rating" :starColor="starColor"
                v-if="review" />

              <isRecommended :recommended="recommended" v-if="review" />

              <VerifiedPurchase :showVerified="true" v-if="isVerified" />
            </div>

            <ThumbsPictures v-if="review" :review="review" @onClick="({ slide }) => glide.go(`=${slide}`).update()" />

            <ReviewBody :body="body" :createdAt="review.created_at" v-if="review" />

            <ReviewReply :reply="reply" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Glide from "@glidejs/glide";
import { i19next, i19previous } from "@ecomplus/i18n";
import { i18n } from "@ecomplus/utils";
import $ from "../../../../storefront-twbs/src";
import { formatDate } from "@ecomplus/utils";
import { timeAgo } from "./../../utils/time-ago";

import ThumbsPictures from "./ThumbsPictures.vue";
import VerifiedPurchase from "./VerifiedPurchase.vue";
import AuthorAndRating from "./AuthorAndRating.vue";
import IsRecommended from "./isRecommended.vue";
import ReviewBody from "./ReviewBody.vue";
import ReviewReply from "./ReviewReply.vue";
import VideoPlayer from "./VideoPlayer.vue";
import Rating from "../snippets/Rating.vue";

export default {
  name: "Quickview",

  components: {
    ThumbsPictures,
    Rating,
    VerifiedPurchase,
    AuthorAndRating,
    IsRecommended,
    ReviewBody,
    ReviewReply,
    VideoPlayer,
  },

  props: {
    review: Object,
    isOpen: {
      type: Boolean,
      default: false,
    },
    starColor: String,
  },

  data () {
    return {
      glide: null,
    };
  },

  computed: {
    i19quickview: () => 'Quickview',
    i19next: () => i18n(i19next),
    i19previous: () => i18n(i19previous),

    reviewId: function () {
      if (this.review && this.review.id) {
        return this.review.id;
      }

      return null;
    },

    pictures: function () {
      if (this.review && this.review.pictures) {
        return this.review.pictures;
      }
      return [];
    },

    video: function () {
      if (this.review && this.review.video_url) {
        return this.review.video_url;
      }
      return null;
    },

    title: function () {
      if (this.review && this.review.title) {
        return this.review.title;
      }
      return null;
    },

    author: function () {
      if (this.review && this.review.author) {
        return this.review.author;
      }
      return null;
    },

    rating: function () {
      if (this.review && this.review.rating) {
        return this.review.rating;
      }
      return null;
    },

    recommended: function () {
      if (this.review && this.review.is_recommended) {
        return this.review.is_recommended;
      }
      return null;
    },

    isVerified: function () {
      if (this.review && this.review.verified_purchase) {
        return this.review.verified_purchase;
      }
      return null;
    },

    reply: function () {
      if (this.review && this.review.reply) {
        return this.review.reply;
      }
      return null;
    },

    created: function () {
      if (this.review && this.review.created_at) {
        return this.review.created_at;
      }
      return null;
    },

    body: function () {
      if (this.review && this.review.body) {
        return this.review.body;
      }
      return null;
    }
  },

  watch: {
    isOpen: function (isOpened) {
      if (isOpened) {
        $("#martan-quickview").modal("show");
      }
    },
  },

  mounted() {
    $("#martan-quickview").on("hidden.bs.modal", this.close);
    $("#martan-quickview").on("shown.bs.modal", this.mount);

    this.glide = new Glide(".mt-quickview__galery", {
      keyboard: false,
      rewind: true,
      type: "carousel",
      dragThreshold: false,
      startAt: 0,
      perView: 1,
      perViewLg: 1,
      perViewSm: 1,
    });
  },

  beforeDestroy() {
    if (this.glide) {
      this.glide.destroy();
    }
  },

  methods: {
    mount: function () {
      this.glide.mount();
      this.glide.update();
    },

    close: function () {
      this.$emit("onClose", true);
      this.glide.destroy();
    },

    next: function () {
      this.glide.go(">");
      this.glide.update();
    },

    back: function () {
      this.glide.go("<");
      this.glide.update();
    },

    formatDate,
    timeAgo,
  }
};
</script>

<style lang="scss">
.mt-quickview {
  padding: 0;

  @media (min-width: 992px) {
    display: flex;
  }

  @media (min-width: 1200px) {
    display: flex;
  }

  .close {
    position: absolute;
    z-index: 1;
    padding: 8px 1rem;
  }

  &__galery {
    max-width: 500px;
    width: 100%;
    display: flex;
    align-items: center;

    img {
      max-width: 500px;
      max-height: 500px;
      height: 100%;
      object-fit: contain;
      width: 100%;
    }
  }

  &__info {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 10px;
  }

  &__review {
    padding: 1rem;

    @media (min-width: 992px) {
      max-height: 500px;
      overflow: auto;
    }

    @media (min-width: 1200px) {
      max-height: 500px;
      overflow: auto;
    }
  }

  &__controls {
    padding: 5px;

    button {
      width: 30px;
      height: 30px;
      border: none;
      border-radius: 50%;
      transition: all ease-in-out 0.5s;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: var(--button--hover-color);
      }
    }
  }

  .mt-review {
    padding: 10px 20px;
  }
}
</style>
