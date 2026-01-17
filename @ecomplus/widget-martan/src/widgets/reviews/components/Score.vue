<template>
  <ul class="mt-average__options" ref="options">
    <li class="mt-rating__list" v-for="index in maxReviews" :key="index"
      @click="(reviews.total === 0 ? null : setRating($event, index))">
      <div class="mt-rating-star">
        <span>{{ index }}</span>

        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" stroke-width="2"
          stroke="#E6E3E3" style="color:#E6E3E3;" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"
            stroke-width="0" fill="currentColor" />
        </svg>
      </div>


      <div class="mt-rating-meter">
        <div class="mt-rating-bar" v-bind:style="{
          width: getWidth(reviews, index),
          'background-color': starColor || 'red',
        }" />
      </div>

      <div class="mt-rating-total">
        <span>{{ reviews.average[numberToText(index)] }}</span>
        <span>({{ getWidth(reviews, index) }})</span>

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
import { getWidth } from './../../../utils/get-width'
import { numberToText } from './../../../utils/textToNumber'

export default {
  name: 'Score',

  props: {
    reviews: {
      type: Object,
      default: {
        list: [],
        orderRating: null,
        total: 0,
        average: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0
        },
        averageTotal: 0,
        offset: 0,
      }
    },

    starColor: {
      type: String,
      default: '#212529'
    },
  },

  data () {
    return {
      maxReviews: 5,
    };
  },

  methods: {
    getWidth,
    numberToText,
    setRating: async function (e, rating) {
      const removeClass = () =>
        new Promise((resolve) => {
          const res = Array.from(this.$refs.options.children).map((option) => {
            option.style.removeProperty("opacity");
            option.children[0].childNodes[2].style.stroke = "rgb(227, 230, 230)";
            option.children[0].childNodes[2].style.color = 'rgb(227, 230, 230)';

            return option.classList.remove("is-active");
          });
          resolve(res);
        });

      await removeClass().catch(e => console.error(e))

      if (rating !== this.reviews.orderRating) {
        const el = Array.from(this.$refs.options.children)[rating - 1];
        el.classList.add("is-active");
        el.style.opacity = 1;
        el.children[0].childNodes[2].style.stroke = this.starColor;
        el.children[0].childNodes[2].style.color = this.starColor;
        Array.from(this.$refs.options.children).forEach((option, index) => {
          if (index !== rating - 1) {
            option.style.opacity = ".5";
          }
        });
      }
      this.$emit('updateOrderByAverage', { rating })
      this.$parent.$emit('updateOrderByAverage', { rating })
    },
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

.mt-average__options li:hover {
  cursor: pointer;
}

.mt-rating__list {
  display: flex;
  align-items: center;
  height: 23px;
  transition: opacity .25s ease-in-out;
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

.mt-average__options {
  margin: 0;
  list-style: none;
  padding: 0;
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
