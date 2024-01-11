<template>
  <div
    id="mt-snippet"
    ref="wrapper"
    class="glide martan-snippets d-none"
    style="margin-bottom: 1rem; height: 85px"
  >
    <div class="glide__track" data-glide-el="track">
      <ul class="glide__slides">
        <li class="glide__slide" v-for="review in list" :key="review.id">
          <div
            class="martan-snippets__galery"
            v-if="getImageUrl(review)"
          >
            <img
              :alt="`Foto da avaliação do produto feita por ${review.author}`"
              :src="getImageUrl(review)"
            />
          </div>

          <div class="martan-snippets__reviews snippet-review">
            <div class="martan-snippets__reviews-info snippet-review__info">
              <span>{{ review.author }}</span>
              <rating :rating="review.rating" :color="starColor" />
            </div>

            <div
              class="martan-snippets__reviews-body snippet-review__body"
              v-if="review.body"
            >
              <span>{{ review.body.substring(0, 115) }}...</span>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="martan-snippets__controls" data-glide-el="controls">
      <button
        v-if="glide && glide.index > 0"
        :title="i19previous"
        :aria-label="i19previous"
        class="left"
        data-glide-dir="<"
        v-on:click="glide.go('<')"
      >
        <i class="i-chevron-left"></i>
      </button>

      <button
        v-if="glide && glide.index !== list.length - 1"
        :title="i19next"
        :aria-label="i19next"
        class="right"
        data-glide-dir=">"
        v-on:click="glide.go('>')"
        :data-glide="glide.index"
      >
        <i class="i-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import Glide from "@glidejs/glide";
import { i19next, i19previous } from "@ecomplus/i18n";
import { i18n } from "@ecomplus/utils";

import Rating from "./Rating.vue";
import Quickview from "../reviews/Quickview.vue";
import { MARTAN_API } from '../..';

export default {
  name: "SnippetWidget",

  components: { 
    Rating, 
    Quickview 
  },

  data: function () {
    return {
      list: [],
      glide: null,
      isVisible: false,
      isOpenQuickView: false,
      selectedReview: null,
    };
  },

  computed: {
    i19next: () => i18n(i19next),
    i19previous: () => i18n(i19previous),
  },

  props: {
    storeId: {
      type: Number,
      required: true
    },
    webId: {
      type: String,
      required: true
    },
    product: {
      type: String,
      required: true
    },
    starColor: {
      type: String,
      required: true
    },
    backgroundColor: {
      type: String,
      default: "#f8f9fa",
    },
    textColor: {
      type: String,
      default: "#212529",
    },
    border: {
      type: Boolean,
      default: false,
    },
    borderColor: {
      type: String,
      default: "#212529",
    },
  },

  methods: {
    openQuickview: function ({ review, slide }) {
      this.selectedReview = review;
      this.isOpenQuickView = true;
    },

    onCloseQuickview: function () {
      this.isOpenQuickView = false;
      this.selectedReview = null;
    },

    fetch() {
      axios({
        url: MARTAN_API + '/reviews.json',
        headers: {
          "X-Store-Id": this.storeId,
          "X-Web-Id": this.webId,
        },
        params:{
          sku: this.product,
          limit: 10,
          offset: 0
        }
      })
        .then(({ data }) => {
          this.list = data.result || [];
          this.glide = new Glide("#mt-snippet", {
            keyboard: false,
            rewind: false,
            type: "carousel",
            startAt: 0,
            perView: 1,
            touchAngle: 0,
          });
          return data.result;
        })
        .then((data) => {
          if (data.length) {
            this.$refs.wrapper.classList.remove('d-none')
            this.glide.mount();
            this.isVisible = true;
          }
        });
    },

    getImageUrl(review) {
      if (
        review &&
        review.pictures &&
        review.pictures.length &&
        review.pictures[0].thumb
      ) {
        return review.pictures[0].thumb;
      }
      return null;
    },

    loadWidgetOptions() {
      this.$refs.wrapper.style.color = this.textColor;
      this.$refs.wrapper.style.backgroundColor = this.backgroundColor;
      if (this.border) {
        this.$refs.wrapper.style.border = `1px solid ${this.borderColor}`;
      }
    },
  },

  mounted: function () {
    if (this.storeId && this.webId && this.product) {
      this.fetch();
      this.loadWidgetOptions();
    }
  },
};
</script>

<style scoped lang="scss">
.martan-snippets {
  max-width: 525px;
  border-radius: 8px;
  display: flex;
  overflow: hidden;
  background-color: #e3e3e3;
  box-shadow: none;

  &__galery {
    img {
      border-radius: 6px;
      aspect-ratio: 1 / 1;
      width: 60px;
      object-fit: cover;
    }
  }

  &__reviews {
    height: 60px;
    max-width: fit-content;
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
    // overflow: hidden;

    &-info {
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }

  &__controls {
    button {
      background: #fff;
      border-radius: 50%;
      border: none;
      color: var(--secondary);
      cursor: pointer;
      display: block;
      font-size: 10px;
      line-height: 1;
      opacity: 0.9;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      transition: opacity 0.2s;
      z-index: 2;
      height: 20px;
      width: 20px;
      box-shadow: 0px -2px 12px rgba(0, 0, 0, 0.08);
      transition: all ease-in-out .3s;
      &:hover {
        opacity: .7;
      }
      &.left {
        left: -5px;
      }

      &.right {
        right: -5px;
      }
    }
  }

  .glide__slide {
    margin-left: 5px;
    margin-right: 5px;
    font-size: 14px;
    line-height: 1.5;
    font-weight: normal;
    scroll-snap-align: start;
    display: flex;
    align-items: center;
    justify-content: stretch;
    padding: 12px;
    gap: 12px;
  }
}
</style>
