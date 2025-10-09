<template>
  <div class="widget-sort" v-if="totalRating > 0">
    <span class="average_geral">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" :stroke="config.widget_review.star_color"
        :fill="average > 0 ? config.widget_review.star_color : 'none'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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

      <strong>{{ average }}</strong> / 5

      <span class="baseado" style="font-size: 10px; opacity: 0.8">
        ({{
          totalRating > 1
            ? i19basedOn$1Reviews.replace("$1", totalRating)
            : i19basedOn$1Review.replace("$1", totalRating)
        }})
      </span>
    </span>

    <sort @onSort="onSort" />
  </div>
</template>

<script>
import { configProp } from "../configProps";
import Sort from "../components/Sort.vue";

export default {
  name: "Padrao",

  props: {
    ...configProp,
    config: {
      type: Object,
      required: true,
    },
    totalRating: {
      type: Number,
      required: true,
    },
    average: {
      type: Number,
      required: true,
    },
  },

  computed: {
    i19basedOn$1Reviews: () => "Baseado em $1 avaliações",
    i19basedOn$1Review: () => "Baseado em $1 avaliação",
  },

  methods: {
    onSort({ order }) {
      this.$emit('onSort', { order });
    },
  },

  components: {
    Sort,
  },
};
</script>

<style lang="scss" scoped>
.widget-sort {
  background-color: #ffecdb1a;
  border: 1px solid #ffecdb1a;
  border-radius: 0.25rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  // padding: 1rem 2rem;
  max-height: 30px;
  width: 100%;
  font-size: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .average_geral {
    svg {
      vertical-align: baseline;
    }

    .baseado {
      @media (max-width: 580px) {
        display: none;
      }
    }
  }

  @media (max-width: 580px) {
    padding: 0;
  }

}
</style>
