<template>
  <div class="mrtn-header--compact">
    <div class="mrtn-header__rating">
      <div class="mrtn-stars">
        <Rating :rating="average" :color="config.widget_review.star_color" />
      </div>

      <div class="mrtn-header__info">
        <span class="mrtn-reviews-count" @click="toggleDropdown">{{ formatReviewsCount }} Avaliações</span>
        <button class="mrtn-dropdown-toggle" @click="toggleDropdown"
          :class="{ 'mrtn-dropdown-toggle--active': showDropdown }">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>

        <RatingSummary :config="config" :visible="showDropdown" :rating="rating" :average="average"
          :total-ratings="totalRating" :recommended="recommended" @rating-selected="onRatingSelected"
          @close="showDropdown = false" />
      </div>
    </div>

    <div class="mrtn-filter-container">
      <button class="mrtn-filter-btn" @click="toggleFilter">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 4H14M4 8H12M6 12H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          <circle cx="4" cy="4" r="1.5" fill="currentColor" />
          <circle cx="12" cy="8" r="1.5" fill="currentColor" />
          <circle cx="8" cy="12" r="1.5" fill="currentColor" />
        </svg>
      </button>

      <SortDropdown :visible="showFilter" :current-sort="currentSort" @sort-selected="onSortSelected" @close="showFilter = false" />
    </div>
  </div>
</template>

<script>
import RatingSummary from '../components/RatingSummary.vue'
import SortDropdown from '../components/SortDropdown.vue'
import Rating from '../components/Rating.vue';

import { configProp } from "../configProps";

export default {
  name: 'Compact',

  components: {
    RatingSummary,
    SortDropdown,
    Rating
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
      showDropdown: false,
      showFilter: false,
      currentSort: 'most_recent'
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
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },

    toggleFilter() {
      this.showFilter = !this.showFilter
      this.$emit('filter-toggle', this.showFilter)
    },

    onRatingSelected(rating) {
      console.log('Nota selecionada:', rating)
      this.$emit('rating-selected', rating)
    },

    onSortSelected(sortValue) {
      this.currentSort = sortValue
      this.showFilter = false
      this.$emit('sort-selected', sortValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.mrtn-header--compact {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  background: white;
}

.mrtn-header__rating {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mrtn-stars {
  display: flex;
  gap: 2px;
}

.mrtn-star {
  font-size: 16px;
  color: #e5e5e5;
  transition: color 0.2s ease;

  &--filled {
    color: #000000;
  }
}

.mrtn-header__info {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
}

.mrtn-reviews-count {
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  cursor: pointer;
}

.mrtn-dropdown-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #000000;
  transition: transform 0.2s ease;

  &:hover {
    color: #666666;
  }

  &--active {
    transform: rotate(180deg);
  }

  svg {
    width: 12px;
    height: 12px;
  }
}

.mrtn-filter-container {
  position: relative;
}

.mrtn-filter-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
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
    width: 16px;
    height: 16px;
  }
}
</style>
