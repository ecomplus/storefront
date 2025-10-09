<template>
  <div
    class="modal fade"
    id="martan-quickview"
    tabindex="-1"
    role="dialog"
    aria-labelledby="quickviewModal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header" v-show="false">
          <h5 class="modal-title" id="quickviewModal">{{ i19quickview }}</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body mt-quickview">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>

          <div class="mt-quickview__content">
            <!-- Image Gallery Column -->
            <div class="mt-quickview__gallery-column">
              <!-- Main Image Display -->
              <div class="mt-quickview__main-image">
                <img
                  :src="currentImage"
                  :alt="'Review image'"
                  v-if="currentImage"
                />
                <VideoPlayer v-else-if="video" :videoUrl="video" />
              </div>

              <!-- Thumbnails -->
              <div
                class="mt-quickview__thumbnails"
                v-if="pictures.length || video"
              >
                <div
                  v-for="(pic, index) in pictures"
                  :key="`thumb-${index}`"
                  class="mt-quickview__thumb"
                  :class="{ active: currentImageIndex === index }"
                  @click="setCurrentImage(index)"
                >
                  <img :src="pic.thumb" :alt="'Thumbnail ' + (index + 1)" />
                </div>
                <div
                  v-if="video"
                  class="mt-quickview__thumb"
                  :class="{ active: currentImageIndex === pictures.length }"
                  @click="setCurrentImage(pictures.length)"
                >
                  <i class="fas fa-play-circle"></i>
                </div>
              </div>
            </div>

            <!-- Review Info Column -->
            <div class="mt-quickview__info-column" v-if="review">
              <div class="mt-review">
                <div class="mt-rating__group">
                  <ReviewCard
                    :truncate-body="false"
                    :review="review"
                    :star-color="starColor"
                    :full="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { i19next, i19previous } from "@ecomplus/i18n";
import { i18n, formatDate } from "@ecomplus/utils";

import { timeAgo } from "../../../utils/time-ago";
import VideoPlayer from "./VideoPlayer.vue";
import ReviewCard from "./ReviewCard.vue";

export default {
  name: "Quickview",

  components: {
    VideoPlayer,
    ReviewCard,
  },

  props: {
    review: Object,
    isOpen: {
      type: Boolean,
      default: false,
    },
    starColor: String,
  },

  data() {
    return {
      currentImageIndex: 0,
      currentImage: null,
    };
  },

  computed: {
    i19quickview: () => "Quickview",
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
      if (this.review && this.review.display_name) {
        return this.review.display_name;
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
    },
  },

  watch: {
    isOpen: function (isOpened) {
      if (isOpened) {
        $("#martan-quickview").modal("show");
      }
    },
    pictures: {
      immediate: true,
      handler(newPics) {
        if (newPics && newPics.length) {
          this.currentImage = newPics[0].big || newPics[0].normal;
        }
      },
    },
  },

  mounted() {
    $("#martan-quickview").on("hidden.bs.modal", this.close);
    $("#martan-quickview").on("shown.bs.modal", this.mount);
  },

  methods: {
    formatDate,
    timeAgo,
    close: function () {
      this.$emit("onClose", true);
    },
    setCurrentImage(index) {
      this.currentImageIndex = index;
      if (index < this.pictures.length) {
        this.currentImage = this.pictures[index].big;
      } else {
        this.currentImage = null; // Will show video player
      }
    },
  },
};
</script>

<style lang="scss">
#martan-quickview {
  padding: 0 !important;
  .modal-dialog {
    margin: 0 auto;
  }
}

.mt-quickview {
  .review-card {
    width: 100% !important;
    margin-top: 0 !important;
  }
  .review-card__images {
    display: none;
  }
}
</style>

<style lang="scss" scoped>
.mt-quickview {
  padding: 0;

  &__content {
    display: flex;
    flex-direction: column;

    @media (min-width: 992px) {
      flex-direction: row;
    }
  }

  &__gallery-column {
    flex: 1;
    max-width: 500px;
    width: 100%;
  }

  &__main-image {
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      border-top-left-radius: 3px;
      @media (max-width: 992px) {
        border-top-right-radius: 3px;
      }
    }
  }

  &__thumbnails {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding: 0.5rem;

    @media (min-width: 992px) {
      flex-wrap: wrap;
      max-height: 100px;
    }
  }

  &__thumb {
    width: 60px;
    height: 60px;
    border: 2px solid transparent;
    cursor: pointer;
    flex-shrink: 0;

    &.active {
      border-color: var(--primary);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    i {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8f9fa;
      font-size: 1.5rem;
    }
  }

  &__info-column {
    flex: 1;
    @media (min-width: 992px) {
      max-height: 500px;
      overflow-y: auto;
    }
  }

  .close {
    position: absolute;
    z-index: 1;
    padding: 8px 1rem;
  }

  &__galery {
    max-width: 500px;
    min-height: 500px;
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

    .glide__slides {
      align-items: center;
    }
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

  .video-wrapper {
    display: flex;
    align-items: center;
  }
}
</style>
