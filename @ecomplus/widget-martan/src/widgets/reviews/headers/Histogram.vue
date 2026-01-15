<template>
  <div class="mrtn-header--histogram">

    <div class="mrtn-summary-container">
      <div class="mrtn-summary-title">
        <div class="mrtn-total-responses">{{ formatReviewsCount }} Avaliações</div>
        <div v-if="recommended > 0" class="mrtn-recommendation">
          {{ Math.round(recommended) }}% dos clientes recomendam esse produto
        </div>
      </div>

      <div class="mrtn-average-section">
        <div class="mrtn-average-display">
          <div class="mrtn-stars-container">
            <Rating :rating="average" :color="config.widget_review.star_color" />
          </div>
          <div class="mrtn-average-badge" :style="{ backgroundColor: config.widget_review.star_color }">
            {{ average.toFixed(1) }} / 5
          </div>
        </div>
      </div>
    </div>

    <RatingHistogram :config="config" :rating="rating" :total-rating="totalRating" :average="average" @rating-selected="onRatingSelected" />
  </div>
</template>

<script>
import Rating from '../components/Rating.vue'
import RatingHistogram from '../components/RatingHistogram.vue'
import { configProp } from "../../../utils/configProps";

export default {
  name: 'Histogram',

  components: {
    Rating,
    RatingHistogram
  },

  props: {
    ...configProp,

    rating: {
      type: Object,
      default: () => ({
        five: 0,
        four: 0,
        three: 0,
        two: 0,
        one: 0
      })
    },

    recommended: {
      type: Number,
      default: 0
    },

    average: {
      type: Number,
      default: 0
    },

    totalRating: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
    }
  },

  computed: {
    ratingBreakdown() {
      return {
        5: this.rating.five,
        4: this.rating.four,
        3: this.rating.three,
        2: this.rating.two,
        1: this.rating.one
      }
    },

    formatReviewsCount() {
      if (this.totalRating >= 1000) {
        return (this.totalRating / 1000).toFixed(1).replace('.0', '') + 'k'
      }
      return this.totalRating.toLocaleString()
    }
  },

  methods: {
    getBarWidth(count) {
      if (this.totalRating === 0) return 0
      return (count / this.totalRating) * 100
    },

    onRatingSelected(rating) {
      this.currentActive = rating
      this.$emit('rating-selected', rating)
    }
  }
}
</script>

<style lang="scss" scoped>
.mrtn-header--histogram {
  background-color: #f3f3f3;
  border-radius: 8px;
  padding: 8px 16px;
  width: 100%;
  margin-bottom: 1rem;
}

.mrtn-summary-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
}

.mrtn-summary-title {
  margin-bottom: 20px;

  .mrtn-title {
    font-size: 24px;
    font-weight: 700;
    color: #000000;
    margin: 0 0 8px 0;
  }

  .mrtn-total-responses {
    font-size: 20px;
    color: #333333;
    font-weight: 300;
  }
}

.mrtn-recommendation {
  font-size: 16px;
  color: #666666;
  font-weight: 100;

  @media (max-width: 580px) {
    font-size: 12px;
  }
}

.mrtn-average-section {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.mrtn-average-display {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mrtn-stars-container {
  display: flex;
  align-items: center;

  @media (max-width: 580px) {
    display: none;
  }
}

.mrtn-average-badge {
  background: #ff6b35;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
}

.mrtn-rating-breakdown {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mrtn-rating-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 0;
}

.mrtn-rating-label {
  font-size: 12px;
  color: #666666;
  min-width: 70px;
  text-align: left;
}

.mrtn-rating-bar {
  flex: 1;
  height: 12px;
  background: #f0f0f0;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.mrtn-rating-bar__fill {
  height: 100%;
  border-radius: 6px;
  transition: width 0.3s ease;
}

.mrtn-rating-count {
  font-size: 12px;
  color: #666666;
  min-width: 40px;
  text-align: right;
  font-weight: 500;
}
</style>
