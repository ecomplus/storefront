<template>
  <span class="martan-rating" :class="{ 'martan-rating--compact': isCompact }">
    <template v-if="!isCompact">
      <svg v-for="(star, index) in stars" :key="index" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler"
        :class="getStarClass(star)" :width="fontSizeNumber" :height="fontSizeNumber" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
        :fill="getStarFill(star, index)" stroke-linecap="round" stroke-linejoin="round"
        :style="{ color: config.widget_rating.star_color }">
        <defs v-if="star === 0.5">
          <linearGradient :id="`gradient-${index}`" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" :style="`stop-color:${config.widget_rating.star_color};stop-opacity:1`" />
            <stop offset="50%" :style="`stop-color:${config.widget_rating.star_color};stop-opacity:0`" />
          </linearGradient>
        </defs>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
          d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"
          :fill="getStarFill(star, index)" />
      </svg>

      <span class="martan-rating-text" :style="{ color: 'var(--gray-dark)', fontSize: fontSize }">{{ normalizeRating }} / 5</span>

      <span class="martan-rating-text" :style="{ color: 'var(--gray)', fontSize: fontSize }">({{ totalReviews }})</span>
    </template>

    <template v-else>
      <div class="martan-rating-compact">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler martan-rating-compact__star" :width="fontSizeNumber"
          :height="fontSizeNumber" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" stroke-linecap="round"
          stroke-linejoin="round" :style="{ color: config.widget_rating.star_color }">
          <defs>
            <linearGradient :id="`compact-gradient-${_uid}`" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" :style="`stop-color:${config.widget_rating.star_color};stop-opacity:1`" />
              <stop :offset="`${compactFillPercentage}%`"
                :style="`stop-color:${config.widget_rating.star_color};stop-opacity:1`" />
              <stop :offset="`${compactFillPercentage}%`"
                :style="`stop-color:${config.widget_rating.star_color};stop-opacity:0`" />
              <stop offset="100%" :style="`stop-color:${config.widget_rating.star_color};stop-opacity:0`" />
            </linearGradient>
          </defs>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"
            :fill="`url(#compact-gradient-${_uid})`" />
        </svg>
        <span class="martan-rating-compact__text" :style="{ fontSize: fontSize }">{{ normalizeRating }} / 5</span>
      </div>
    </template>
  </span>
</template>

<script>
import { lightenColor } from '../../utils/lighten-color';
import { configProp } from '../../utils/configProps';

export default {
  name: 'Rating',

  props: {
    ...configProp,
    rating: {
      type: Number,
      default: 0
    },
    totalReviews: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      stars: Array(5).fill(0)
    };
  },

  mounted() {
    this.updateStars();
  },

  computed: {
    isCompact() {
      return this.config.widget_rating.theme === 'compact';
    },
    fontSize() {
      const fontSize = this.config.widget_rating.font_size
      if (!fontSize) {
        return this.isCompact ? '16px' : '14px'
      }
      if (typeof fontSize === 'number') {
        return `${fontSize}px`
      }
      return fontSize
    },
    fontSizeNumber() {
      const fontSize = this.config.widget_rating.font_size
      if (!fontSize) {
        return this.isCompact ? 16 : 14
      }
      if (typeof fontSize === 'number') {
        return fontSize
      }
      const match = String(fontSize).match(/^(\d+(?:\.\d+)?)/)
      return match ? parseFloat(match[1]) : (this.isCompact ? 16 : 14)
    },
    compactFillPercentage() {
      const rating = Math.max(0, Math.min(5, this.rating));

      if (rating <= 2) {
        return (rating / 2) * 25;
      } else if (rating <= 3) {
        return 25 + ((rating - 2) / 1.5) * 20;
      } else if (rating <= 4.5) {
        return 45 + ((rating - 3.5) / 1) * 25;
      } else {
        return 70 + ((rating - 4.5) / 0.5) * 30;
      }
    },
    starColor() {
      return this.config.widget_rating.star_color || '#ffc107';
    },
    ratingText() {
      return this.formatNumber(this.totalReviews);
    },
    colorClosest() {
      return lightenColor(this.config.widget_rating.star_color, 0.3);
    },
    normalizeRating() {
      if (Number.isInteger(this.rating)) {
        return this.rating;
      }
      return Number(this.rating.toFixed(1));
    }
  },

  methods: {
    lightenColor,
    formatNumber(num) {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
      } else {
        return num.toString();
      }
    },

    updateStars() {
      const rating = Math.max(0, Math.min(5, this.rating));
      this.stars = Array(5).fill(0).map((_, index) => {
        const starPosition = index + 1;
        if (rating >= starPosition) {
          return 1;
        } else if (rating > index) {
          return 0.5;
        } else {
          return 0;
        }
      });
    },

    getStarClass(star) {
      if (star === 1) {
        return 'icon-tabler-star-filled';
      } else if (star === 0.5) {
        return 'icon-tabler-star-half';
      } else {
        return 'icon-tabler-star';
      }
    },

    getStarFill(star, index) {
      if (star === 1) {
        return this.starColor;
      } else if (star === 0.5) {
        return `url(#gradient-${index})`;
      } else {
        return 'none';
      }
    }
  },

  watch: {
    rating: 'updateStars'
  }
};
</script>

<style lang="css">
.martan-rating {
  display: flex;
  gap: 4px;
  align-items: center;
}

.martan-rating-text {
  font-size: 12px;
  font-weight: 600;
  color: #6c757d;
}

.martan-rating--compact {
  display: flex;
  align-items: center;
  gap: 6px;
}

.martan-rating-compact {
  display: flex;
  align-items: center;
  gap: 4px;
}

.martan-rating-compact__star {
  flex-shrink: 0;
}

.martan-rating-compact__text {
  font-size: 12px;
  font-weight: 600;
  color: var(--gray-dark);
  white-space: nowrap;
}
</style>
