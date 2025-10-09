<template>
  <div class="mrtn-rating-breakdown" :style="'--hover-color: ' + houverColor" :class="{ 'mrtn-rating-breakdown--has-active': currentActive !== null }">
    <div v-for="(count, stars) in ratingBreakdown" :key="stars" class="mrtn-rating-row"
      :class="{ 'mrtn-rating-row--active': currentActive === stars }" @click="selectRating(stars)">
      <div class="mrtn-rating-stars">
        <Rating :rating="parseInt(stars)" :color="config.widget_review.star_color" />
      </div>

      <div class="mrtn-rating-bar">
        <div class="mrtn-rating-bar__fill" :style="{
          width: getBarWidth(count) + '%',
          backgroundColor: config.widget_review.star_color
        }"></div>
      </div>

      <span class="mrtn-rating-count">({{ count }})</span>
    </div>
  </div>
</template>

<script>
import { configProp } from "../configProps";
import Rating from "./Rating.vue";
import { lightenColor } from "../../../utils/lighten-color";

export default {
  name: 'RatingBreakdown',

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

    totalRating: {
      type: Number,
      default: 0
    },


    average: {
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
    ratingBreakdown() {
      return {
        5: this.rating.five,
        4: this.rating.four,
        3: this.rating.three,
        2: this.rating.two,
        1: this.rating.one
      }
    },

    houverColor() {
      if (!this.config.widget_review.star_color) return null
      return lightenColor(this.config.widget_review.star_color, 0.9)
    }
  },

  methods: {
    lightenColor,
    getBarWidth(count) {
      if (this.totalRating === 0) return 0
      return (count / this.totalRating) * 100
    },

    selectRating(rating) {
      if (this.currentActive === rating) {
        this.currentActive = null
      } else {
        this.currentActive = rating
      }
      this.$emit('rating-selected', this.currentActive)
    }
  },

  components: {
    Rating
  }
}
</script>

<style lang="scss" scoped>
.mrtn-rating-breakdown {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.mrtn-rating-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: var(--hover-color);
  }

  &--active {
    background: var(--hover-color);
    box-shadow: 0 0 0 2px var(--hover-color);
    transform: scale(1.02);
    z-index: 10;
  }
}

.mrtn-rating-breakdown--has-active .mrtn-rating-row:not(.mrtn-rating-row--active) {
  opacity: 0.4;
  filter: grayscale(0.8);
}

.mrtn-rating-stars {
  display: flex;
  gap: 2px;
  min-width: 80px;
}

.mrtn-rating-star {
  font-size: 14px;
  color: #e5e5e5;

  &--filled {
    color: #000000;
  }
}

.mrtn-rating-bar {
  flex: 1;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  transition: all 0.2s ease;
}

.mrtn-rating-bar__fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.mrtn-rating-count {
  font-size: 12px;
  color: #666666;
  min-width: 40px;
  text-align: right;
}
</style>
