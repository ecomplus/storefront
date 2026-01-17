<template>
  <div v-if="visible" ref="ratingSummary" class="mrtn-rating-summary">
    <div class="mrtn-rating-summary__header">
      <div class="mrtn-average-section">
        <div class="mrtn-average-display">
          <div class="mrtn-average-badge" :style="{ backgroundColor: config.widget_review.star_color }">
            {{ average.toFixed(1) }} / 5
          </div>
        </div>
      </div>

      <span v-if="totalRecommended" class="mrtn-average-score__text">
        {{ totalRecommended }}
      </span>
    </div>

    <RatingBreakdown :config="config" :rating="rating" :total-rating="totalRating" :current-active="currentActive"
      @rating-selected="selectRating" />

    <div class="mrtn-rating-summary__footer">
      <span class="mrtn-rating-summary__powered">Powered by MARTAN.app</span>
    </div>
  </div>
</template>

<script>
import RatingBreakdown from './RatingBreakdown.vue'
import { configProp } from "../../../utils/configProps";

export default {
  name: 'RatingSummary',

  components: {
    RatingBreakdown
  },

  props: {
    ...configProp,

    visible: {
      type: Boolean,
      default: false
    },

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

    average: {
      type: Number,
      default: 0
    },

    totalRating: {
      type: Number,
      default: 0
    },

    recommended: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      currentActive: null
    }
  },

  computed: {
    totalRecommended() {
      if (this.recommended === 0) return null
      return `${Math.round(this.recommended)}% dos clientes recomendam este produto.`
    }
  },

  mounted() {
    this.addClickOutsideListener()
  },

  beforeDestroy() {
    this.removeClickOutsideListener()
  },

  watch: {
    visible(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.addClickOutsideListener()
        })
      } else {
        this.removeClickOutsideListener()
      }
    }
  },

  methods: {
    selectRating(rating) {
      if (this.currentActive === rating) {
        this.currentActive = null
        this.$emit('rating-selected', null)
      } else {
        this.currentActive = rating
        this.$emit('rating-selected', rating)
      }
    },

    addClickOutsideListener() {
      document.addEventListener('click', this.handleClickOutside)
    },

    removeClickOutsideListener() {
      document.removeEventListener('click', this.handleClickOutside)
    },

    handleClickOutside(event) {
      if (!this.visible) return
      if (
        event.target &&
        (
          event.target.nodeName === 'svg' ||
          event.target.nodeName === 'SVG' ||
          (event.target.classList && (
            event.target.classList.contains('mrtn-dropdown-toggle') ||
            event.target.classList.contains('mrtn-reviews-count')
          ))
        )
      ) {
        return
      }
      if (this.$refs.ratingSummary && !this.$refs.ratingSummary.contains(event.target)) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mrtn-rating-summary {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 8px;
  padding: 24px 18px;
  min-width: 300px;
}

.mrtn-rating-summary__header {
  margin-bottom: 16px;
  text-align: center;
}

.mrtn-average-score {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.mrtn-average-score__number {
  font-size: 24px;
  font-weight: 700;
  color: #000000;
}

.mrtn-average-score__text {
  color: #666;
  font-size: 16px;
  font-weight: 100;
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

.mrtn-rating-summary__footer {
  text-align: center;
  margin-top: 12px;
}

.mrtn-rating-summary__powered {
  font-size: 11px;
  color: #999999;
}
</style>
