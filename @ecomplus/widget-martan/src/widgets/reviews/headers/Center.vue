<template>
  <div class="mrtn-header--center">
    <div class="mrtn-header__main">
      <div class="mrtn-average-section">
        <div class="mrtn-average-icon" :style="{ backgroundColor: lightenColor(config.widget_review.star_color, 0.8) }">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" :stroke="config.widget_review.star_color"
            :fill="average > 0 ? config.widget_review.star_color : 'none'" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <defs>
              <linearGradient :id="'starGradient' + average">
                <stop offset="0%" :stop-color="config.widget_review.star_color" />
                <stop :offset="((average < 5 ? average - 1 : average) / 5) *
                  100 +
                  '%'
                  " :stop-color="config.widget_review.star_color" />
                <stop :offset="((average < 5 ? average - 1 : average) / 5) *
                  100 +
                  '%'
                  " stop-color="transparent" />
                <stop offset="100%" stop-color="transparent" />
              </linearGradient>
            </defs>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"
              :fill="`url(#starGradient${average})`" />
          </svg>
        </div>
        <div class="mrtn-average-info">
          <span class="mrtn-average-score">{{ average.toFixed(1) }}</span>
          <span class="mrtn-total-reviews">{{ formatReviewsCount }} Avaliações</span>
        </div>
      </div>
    </div>

    <RatingBreakdown :config="config" :rating="rating" :total-rating="totalRating" :current-active="currentActive"
      @rating-selected="onRatingSelected" />

    <div class="mrtn-filter-container">
      <button class="mrtn-filter-btn" @click="toggleFilter">
        Ordenar por
      </button>

      <SortDropdown :visible="showFilter" :current-sort="currentSort" @sort-selected="onSortSelected" @close="showFilter = false" />
    </div>
  </div>
</template>

<script>
import RatingBreakdown from '../components/RatingBreakdown.vue'
import SortDropdown from '../components/SortDropdown.vue'
import { configProp } from "../../../utils/configProps";
import { lightenColor } from "../../../utils/lighten-color";

export default {
  name: 'Center',

  components: {
    RatingBreakdown,
    SortDropdown
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
      showDropdown: true,
      showFilter: false,
      currentSort: 'most_recent',
      currentActive: null
    }
  },

  computed: {
    formatReviewsCount() {
      if (this.totalRating >= 1000) {
        return (this.totalRating / 1000).toFixed(1).replace('.0', '') + 'k'
      }
      return this.totalRating.toLocaleString()
    }
  },

  methods: {
    lightenColor,
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },

    onRatingSelected(rating) {
      if (this.currentActive === rating) {
        this.currentActive = null
        this.$emit('rating-selected', null)
      } else {
        this.currentActive = rating
        this.$emit('rating-selected', rating)
      }
    },

    onSortSelected(sortValue) {
      this.currentSort = sortValue
      this.showFilter = false
      this.$emit('sort-selected', sortValue)
    },

    toggleFilter() {
      this.showFilter = !this.showFilter
      this.$emit('filter-toggle', this.showFilter)
    },
  }
}
</script>

<style lang="scss">
.mrtn-header--center .mrtn-rating-breakdown {
  max-width: 520px;
  width: 100%;
}
</style>

<style lang="scss" scoped>
.mrtn-filter-container {
  position: relative;

  .mrtn-filter-btn {
    border: none;
    background: transparent;
    cursor: pointer;
    color: #000000;
    transition: all 0.2s ease;

    &:hover {
      color: #666666;
    }

    &:active {
      transform: scale(0.95);
    }
  }
}

.mrtn-header--center {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  position: relative;
  gap: 12px;
}

.mrtn-header__main {
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 320px;
  width: 100%;
  justify-content: center;
}

.mrtn-average-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mrtn-average-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
}

.mrtn-average-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.mrtn-average-score {
  font-size: 32px;
  font-weight: 700;
  color: #000000;
  line-height: 1;
}

.mrtn-total-reviews {
  font-size: 14px;
  color: #666666;
  margin-top: 4px;
}

.mrtn-dropdown-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  color: #000000;
  transition: all 0.2s ease;

  &:hover {
    border-color: #cccccc;
    background: #f8f8f8;
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 12px;
    height: 12px;
  }
}
</style>
