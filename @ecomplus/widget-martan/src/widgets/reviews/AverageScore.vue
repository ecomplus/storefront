<template>
  <ul class="mt-rating__options" ref="options">
    <li class="mt-rating__list" v-for="index in maxReviews" :key="index"
      v-on:click="(e) => (reviews.total === 0 ? null : setRating(e, index))">
      <div class="mt-rating-star">
        <span>{{ index }}</span>

        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star" width="14" height="14"
          viewBox="0 0 24 24" stroke-width="2" stroke="#e3e6e6" fill="none" stroke-linecap="round"
          stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
        </svg>
      </div>

      <div class="mt-rating-meter">
        <div class="mt-rating-bar" v-bind:style="{
          width: reviews.getWidth(index),
          'background-color': config.star_color || 'red',
        }" />
      </div>

      <div class="mt-rating-total">
        <span>{{ reviews.average[numberToText(index)] }}</span>
        <span>({{ reviews.getWidth(index) }})</span>

        <span class="mt-rating-remove"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x"
            width="15" height="15" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
            stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M18 6l-12 12"></path>
            <path d="M6 6l12 12"></path>
          </svg></span>
      </div>
    </li>
  </ul>
</template>


<script>
export default {
  name: 'AverageScore',

  props: {
  },

  data() {
    return {
      maxReviews: 5
    };
  },

  methods: {
    async setRating(e, rating) {
      const removeClass = () =>
        new Promise((resolve) => {
          const res = Array.from(options.value.children).map((option) => {
            option.style.removeProperty("opacity")
            option.children[0].childNodes[1].style.stroke = "rgb(227, 230, 230)"
            return option.classList.remove("is-active")
          })

          resolve(res)
        })

      await removeClass().then(() => {
        if (rating !== reviews.orderRating) {
          const el = Array.from(options.value.children)[rating - 1]
          el.classList.add("is-active")
          el.style.opacity = 1
          el.children[0].childNodes[1].style.stroke = config.star_color
          Array.from(options.value.children).forEach((option, index) => {
            if (index !== rating - 1) {
              option.style.opacity = ".5"
            }
          })
        }
      })

      if (rating === reviews.orderRating) {
        reviews.orderRating = null
      } else {
        reviews.offset = 0
        reviews.orderRating = rating
      }
    }
  },
};
</script>

<style>
.mt-rating-remove {
  visibility: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.mt-rating__list.is-active .mt-rating-remove {
  visibility: visible;
}

.mt-rating__options li:hover {
  cursor: pointer;
}

.mt-rating__list {
  display: flex;
  align-items: center;
  height: 23px;
}

.mt-rating__list.is-active .mt-rating-total,
.mt-rating__list:hover .mt-rating-total {
  visibility: visible;
}

.mt-rating__list:hover {
  opacity: 0.9;
}

.mt-rating-meter {
  overflow: hidden;
  box-shadow: inset 0 0 0 1px #e3e6e6;
  background-color: #e3e6e6;
  height: 10px;
  width: 100%;
  border-radius: 50px;
  display: flex;
}

.mt-rating__options {
  margin: 0;
  list-style: none;
  padding: 0;
  max-width: 800px;
  width: 100%;
}

.mt-rating-star {
  display: flex;
  width: 30px;
  justify-content: space-around;
  font-size: 12px;
  color: #757373;
  align-items: center;
  margin-left: 5px;
}

.mt-rating-total {
  visibility: hidden;
  width: 50px;
  font-size: 12px;
  color: #757373;
  margin-left: 2px;
  display: flex;
  gap: 3px;
}
</style>
