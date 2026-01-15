<template>
  <span class="martan-rating">
    <svg
      v-for="(star, index) in stars"
      :key="index"
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler"
      :class="getStarClass(star)"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      :style="{ color }"
    >
      <defs v-if="star === 0.5">
        <linearGradient :id="`gradient-${index}`" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" :style="`stop-color:${color};stop-opacity:1`" />
          <stop offset="50%" :style="`stop-color:${color};stop-opacity:0`" />
        </linearGradient>
      </defs>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"
        :fill="getStarFill(star, index)" />
    </svg>
  </span>
</template>

<script>
export default {
  name: 'Rating',

  props: {
    rating: {
      type: Number,
      default: 5
    },

    color: {
      type: String,
      default: "#000000"
    },
  },

  data() {
    return {
      stars: Array(5).fill(0)
    };
  },

  mounted() {
    this.updateStars();
  },

  methods: {
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
        return 'currentColor';
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
}
</style>
