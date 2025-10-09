<template>
  <div class="mrtn-rating-histogram" :style="'--hover-color: ' + hoverColor">
    <div class="mrtn-histogram-container">
      <div class="mrtn-histogram-bars" :class="{ 'mrtn-histogram-bars--has-active': currentActive !== null }">
        <div v-for="(count, stars) in ratingBreakdown" :key="stars" class="mrtn-histogram-bar"
          :class="{ 'mrtn-histogram-bar--active': currentActive === stars }"
          :style="{ height: getBarHeight(count) + '%', backgroundColor: count > 0 ? config.widget_review.star_color : '#f0f0f0' }"
          @click="selectRating(stars)" @mouseenter="showTooltip(stars, count, $event)" @mouseleave="hideTooltip">
          <div class="mrtn-histogram-bar__fill"></div>
        </div>
      </div>

      <div class="mrtn-histogram-labels">
        <div v-for="stars in [1, 2, 3, 4, 5]" :key="stars" class="mrtn-histogram-label">
          {{ stars }}
        </div>
      </div>
    </div>

    <div v-if="tooltip.visible" class="mrtn-histogram-tooltip" :style="tooltipStyle">
      <div class="mrtn-tooltip-content">
        <div class="mrtn-tooltip-stars">
          <Rating :rating="tooltip.stars" :color="config.widget_review.star_color" />
        </div>
        <div class="mrtn-tooltip-text">
          {{ tooltip.count }} avaliações ({{ tooltip.percentage }}%)
        </div>
      </div>
      <div class="mrtn-tooltip-arrow"></div>
    </div>
  </div>
</template>

<script>
import { configProp } from "../configProps";
import Rating from "./Rating.vue";
import { lightenColor } from "../../../utils/lighten-color";

export default {
  name: 'RatingHistogram',

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
      currentActive: null,
      tooltip: {
        visible: false,
        stars: 0,
        count: 0,
        percentage: 0,
        x: 0,
        y: 0
      }
    }
  },

  computed: {
    ratingBreakdown() {
      return {
        1: this.rating.one,
        2: this.rating.two,
        3: this.rating.three,
        4: this.rating.four,
        5: this.rating.five
      }
    },

    hoverColor() {
      if (!this.config.widget_review.star_color) return '#4CAF50'
      return lightenColor(this.config.widget_review.star_color, 0.9)
    },

    tooltipStyle() {
      return {
        left: this.tooltip.x + 'px',
        top: this.tooltip.y + 'px'
      }
    }
  },

  methods: {
    lightenColor,

    getBarHeight(count) {
      if (this.totalRating === 0) return 0
      const maxCount = Math.max(...Object.values(this.ratingBreakdown))
      if (maxCount === 0) return 0
      return (count / maxCount) * 100
    },

    selectRating(rating) {

      if (this.currentActive === rating) {
        this.currentActive = null
      } else {
        this.currentActive = rating
      }
      this.$emit('rating-selected', rating)
    },

    showTooltip(stars, count, event) {
      const percentage = this.totalRating > 0 ? Math.round((count / this.totalRating) * 100) : 0

      const rect = event.target.getBoundingClientRect()
      const containerRect = this.$el.getBoundingClientRect()

      const tooltipHeight = 5
      const offset = 5

      this.tooltip = {
        visible: true,
        stars: parseInt(stars),
        count,
        percentage,
        x: rect.left - containerRect.left + (rect.width / 2),
        y: rect.top - containerRect.top - tooltipHeight - offset
      }
    },

    hideTooltip() {
      this.tooltip.visible = false
    }
  },

  components: {
    Rating
  }
}
</script>

<style lang="scss" scoped>
.mrtn-rating-histogram {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  color: #333;
}

.mrtn-histogram-title {
  font-size: 14px;
  font-weight: 600;
  color: #666;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.mrtn-histogram-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.mrtn-histogram-bars {
  display: flex;
  align-items: end;
  justify-content: space-between;
  height: 120px;
  gap: 8px;
  position: relative;
}

.mrtn-histogram-bar {
  flex: 1;
  display: flex;
  align-items: end;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  min-height: 8px;
  border-radius: 4px 4px 0 0;
  background: #f0f0f0;
  height: 100%;

  &:hover {
    transform: scaleY(1.05);
  }

  &--active {
    box-shadow: 0 0 0 3px var(--hover-color);
    transform: scaleY(1.1);
    z-index: 10;
  }
}


.mrtn-histogram-bars--has-active .mrtn-histogram-bar:not(.mrtn-histogram-bar--active) {
  opacity: 0.4;
  filter: grayscale(0.8);
}

.mrtn-histogram-bar__fill {
  width: 100%;
  border-radius: 4px 4px 0 0;
  transition: all 0.3s ease;
  min-height: 8px;
}

.mrtn-histogram-labels {
  display: flex;
  justify-content: space-between;
  padding: 0 4px;
}

.mrtn-histogram-label {
  font-size: 12px;
  color: #666;
  font-weight: 500;
  text-align: center;
  flex: 1;
}

.mrtn-histogram-tooltip {
  position: absolute;
  background: #333;
  color: #fff;
  border-radius: 6px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  pointer-events: none;
  transform: translateX(-50%) translateY(-100%);
  white-space: nowrap;
  min-width: 120px;
}

.mrtn-tooltip-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.mrtn-tooltip-stars {
  display: flex;
  gap: 2px;
}

.mrtn-tooltip-text {
  font-size: 11px;
  color: #fff;
  text-align: center;
  white-space: nowrap;
}

.mrtn-tooltip-arrow {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #333;
}

.mrtn-histogram-average {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.mrtn-average-number {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  line-height: 1;
}


@media (max-width: 768px) {
  .mrtn-histogram-bars {
    height: 100px;
  }

  .mrtn-average-number {
    font-size: 20px;
  }
}
</style>
