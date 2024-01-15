<template>
  <span class="martan-rating">
    <svg 
      v-for="(star, index) in stars"  
      :key="index"
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler"
      :class="`${stars[index]} ? 'icon-tabler-star-filled' : icon-tabler-star`" 
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
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        :d="stars[index] ? 'M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z' : 'M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z'"
        :fill="stars[index] ? 'currentColor' : 'none'" />
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
      stars: Array(5).fill(false)
    };
  },

  mounted() {
    this.updateStars();
  },

  methods: {
    updateStars() {
      const filledStars = Math.floor(this.rating);
      this.stars = this.stars.map((star, index) => index < filledStars);
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
