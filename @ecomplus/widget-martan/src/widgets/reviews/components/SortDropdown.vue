<template>
  <div v-if="visible" ref="dropdown" class="mrtn-sort-dropdown">
    <div class="mrtn-sort-dropdown__header">
      <h3 class="mrtn-sort-dropdown__title">Ordenar por</h3>
    </div>

    <div class="mrtn-sort-dropdown__options">
      <div
        v-for="option in sortOptions"
        :key="option.value"
        class="mrtn-sort-option"
        :class="{ 'mrtn-sort-option--active': currentSort === option.value }"
        @click="selectSort(option.value)"
      >
        <span class="mrtn-sort-option__text">{{ option.label }}</span>
        <svg
          v-if="currentSort === option.value"
          class="mrtn-sort-option__check"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

    <div class="mrtn-sort-dropdown__footer">
      <span class="mrtn-sort-dropdown__powered">Powered by MARTAN.app</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SortDropdown',

  props: {
    visible: {
      type: Boolean,
      default: false
    },

    currentSort: {
      type: String,
      default: 'most_recent'
    }
  },

  data() {
    return {
      sortOptions: [
        { value: 'most_recent', label: 'Recentes' },
        { value: 'most_voted', label: 'Mais úteis' },
        { value: 'most_positive', label: 'Positivas' },
        { value: 'most_negative', label: 'Negativas' }
      ]
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
    selectSort(sortValue) {
      this.$emit('sort-selected', sortValue)
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
        event.target.classList &&
        event.target.classList.contains('mrtn-filter-btn') &&
        event.target.nodeName !== 'svg' &&
        event.target.nodeName !== 'SVG'
      ) {
        return
      }
      if (this.$refs.dropdown && !this.$refs.dropdown.contains(event.target)) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mrtn-sort-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 8px;
  padding: 16px;
  min-width: 200px;
}

.mrtn-sort-dropdown__header {
  margin-bottom: 12px;
}

.mrtn-sort-dropdown__title {
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  margin: 0;
}

.mrtn-sort-dropdown__options {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mrtn-sort-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #f8f8f8;
  }

  &--active {
    background: #f0f0f0;
  }
}

.mrtn-sort-option__text {
  font-size: 14px;
  color: #000000;
  font-weight: 400;
}

.mrtn-sort-option__check {
  color: #000000;
  flex-shrink: 0;
}

.mrtn-sort-dropdown__footer {
  margin-top: 12px;
  text-align: right;
}

.mrtn-sort-dropdown__powered {
  font-size: 11px;
  color: #999999;
}
</style>
