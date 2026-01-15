x<template>
  <div class="review-card" v-if="review">
    <div class="review-card__header">
      <div class="review-card__author">
        <span class="review-card__name">{{ review.display_name }}</span>
        <span class="review-card__date" :title="timeAgo(review.created_at)">{{
          formatDate(review.created_at)
          }}</span>

        <VerifiedPurchase v-if="review.verified_purchase" />
      </div>
      <div class="review-card__rating">
        <div v-for="star in 5" :key="star" class="review-card__star">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
            :stroke="star <= review.rating ? starColor : '#E6E3E3'" :fill="star <= review.rating ? starColor : 'none'"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" />
          </svg>
        </div>
      </div>
    </div>

    <div class="review-card__content">
      <p class="review-card__title" v-if="review.title">
        {{ review.title }}
      </p>

      <p class="review-card__text" v-if="review.body">
        {{ showFullText ? review.body : truncatedText }}
        <span v-if="review.body.length > 200" class="review-card__text-toggle" @click="showFullText = !showFullText">
          {{ showFullText ? "Ver menos" : "Ver mais" }}
        </span>
      </p>
      <p class="review-card__text-empty" v-else>(Avaliação sem comentário)</p>

      <div v-if="review.pictures && review.pictures.length" class="review-card__images">
        <img v-for="(image, index) in review.pictures" :key="index" data-loaded="false" :data-src="image.thumb"
          :alt="`Review image ${index + 1}`" @click="$emit('openQuickview', { review, imageIndex: index })"
          v-show="image.thumb" class="mt-lazy-image" />
      </div>

      <div class="review-card__recommendation">
        <i class="i-happy-line"></i>
        <span class="text-sm">Eu comprei e recomendo esse produto</span>
      </div>
    </div>

    <div class="review-card-reply" v-if="review.reply">
      <ReviewReply :reply="review.reply" />
    </div>
  </div>
</template>

<script>
import { timeAgo } from "../../../utils/time-ago";
import ReviewReply from "./ReviewReply.vue";
import VerifiedPurchase from "./VerifiedPurchase.vue";

export default {
  name: "ReviewCard",

  components: {
    ReviewReply,
    VerifiedPurchase,
  },

  data() {
    return {
      showFullText: false,
    };
  },

  props: {
    review: {
      type: Object,
      required: true,
    },
    starColor: {
      type: String,
      default: "#212529",
    },
    truncateBody: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    timeAgo,
    formatDate(date) {
      return new Date(date).toLocaleDateString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      });
    },
  },

  computed: {
    truncatedText() {
      return this.review.body.substring(0, 200) + "...";
    },
  },

  mounted() {
    const images = Array.from(document.querySelectorAll(".mt-lazy-image"));
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.dataset.loaded === "false") {
          const image = entry.target;
          image.dataset.loaded = true;
          image.src = image.dataset.src;
          imageObserver.unobserve(image);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
    this.showFullText = !this.truncateBody;
  },
};
</script>

<style lang="scss" scoped>
.review-card {
  background-color: #F3F3F3;
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  height: max-content;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  &__author {
    display: flex;
    flex-direction: column;
  }

  &__name {
    font-weight: bold;
    margin-bottom: 0.25rem;
  }

  &__date {
    font-size: 70%;
    color: rgb(113 113 122 / 1);
  }

  &__rating {
    display: flex;
    gap: 0.25rem;
  }

  &__content {
    font-size: 0.9375rem;
  }

  &__text {
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  &__text-toggle {
    cursor: pointer;
    color: #047857;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  &__images {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;

    img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 0.25rem;
      cursor: pointer;
    }
  }

  &__text-empty {
    font-size: 70%;
    color: rgb(113 113 122 / 1);
  }

  &__title {
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  &__recommendation {
    margin-top: 1rem;
    color: #047857;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
}

.i-happy-line {
  --un-icon: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 24 24' display='inline-block' vertical-align='middle' margin-bottom='0.22rem' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z'/%3E%3Cpath fill='currentColor' d='M12 4a8 8 0 1 0 0 16a8 8 0 0 0 0-16M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m6.5-2c-.195 0-.444.124-.606.448a1 1 0 0 1-1.788-.896C6.542 8.68 7.413 8 8.5 8s1.957.68 2.394 1.552a1 1 0 0 1-1.788.896C8.944 10.124 8.696 10 8.5 10m7 0c-.195 0-.444.124-.606.448a1 1 0 1 1-1.788-.896C13.543 8.68 14.413 8 15.5 8s1.957.68 2.394 1.552a1 1 0 0 1-1.788.896c-.162-.324-.41-.448-.606-.448m-6.896 4.338a1 1 0 0 1 1.412-.088c.53.468 1.223.75 1.984.75s1.455-.282 1.984-.75a1 1 0 1 1 1.324 1.5A4.98 4.98 0 0 1 12 17a4.98 4.98 0 0 1-3.308-1.25a1 1 0 0 1-.088-1.412'/%3E%3C/g%3E%3C/svg%3E");
  -webkit-mask: var(--un-icon) no-repeat;
  mask: var(--un-icon) no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  background-color: #047857;
  color: inherit;
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 0.22rem;
  width: 1em;
  height: 1em;
}
</style>
