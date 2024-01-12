<template>
  <div 
    :data-header="headerLayout"
    :data-layout="reviewsLayout"
  >
    <div id="reviews" class="mt-reviews container" :class="'mt-theme--' + headerLayout">
      <p class="lead">
        <a href="#reviews" :name="title || 'reviews'">#</a>
        {{ title }}
      </p>

      <total v-if="headerLayout !== 'header-expanded' && headerLayout !== 'header-minimal'" 
        @onSort="onSort" :reviews="{ list, orderRating, total }"  />

      <component @updateOrderByAverage="updateOrderBy" @onSort="onSort" :is="headerLayout"
        :reviews="{ averageTotal, average, total, orderRating }" :starColor="starColor"></component>

      <total v-if="headerLayout === 'header-expanded'"
        @onSort="onSort" :reviews="{ list, orderRating, total }" />

      <component :reviews="{ list, orderRating, total }" :starColor="starColor" @openQuickview="openQuickview"
        :is="reviewsLayout"></component>

      <div class="mt-questions__actions" v-if="showLoadMore()">
        <div class="mt-questions__pagination" id="mt-more-questions">
          <button class="btn btn-primary" @click="loadMore" :disabled="loading">
            {{ loading ? "Carregando.." : "Carregar mais" }}
          </button>
        </div>
      </div>
    </div>

    <quickview @onClose="onCloseQuickview" :isOpen="isOpenQuickView" 
      :review="selectedReview" :starColor="starColor" />
  </div>
</template>

<script>

import ListView from "./ListView.vue";
import GridView from "./GridView.vue";
import Total from "./Total.vue";
import Quickview from "./Quickview.vue";
import { MARTAN_API } from '../..';

export default {
  name: "Reviews",

  props: {
    storeId: {
      type: Number,
      required: true
    },
    webId: {
      type: String,
      required: true
    },
    product: {
      type: String,
      required: true
    },
    backgroundColor: {
      type: String,
      default: "#fff",
    },
    starColor: {
      type: String,
      default: "#212529",
    },
    primaryColor: {
      type: String,
      default: "#212529",
    },
    headerLayout: {
      type: String,
      default: "header-minimal",
    },
    reviewsLayout: {
      type: String,
      default: "list-grid",
    },
    title: {
      type: String,
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      list: [],
      total: 0,
      limit: 5,
      offset: 0,
      loading: false,
      orderRating: null,
      orderReviews: null,
      averageTotal: 0,

      $isSorting: false,
      $count: null,

      average: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      isOpenQuickView: false,
      selectedReview: null,
    };
  },

  watch: {
    orderRating: function (oldOrder, newOrder) {
      if (oldOrder !== newOrder) {
        this.list = [];
        this.fetchReviews();
      }
    },

    orderReviews: function (oldOrder, newOrder) {
      if (oldOrder !== newOrder) {
        this.list = [];
        this.fetchReviews();
      }
    },

    limit: function () {
      this.fetchReviews();
    },

    offset: function () {
      this.fetchReviews();
    },
  },

  methods: {
    fetchReviews() {
      const params = {
        limit: this.limit,
        offset: this.offset,
        sku: this.product,
      };

      if (this.orderReviews) {
        params.orderBy = this.orderReviews;
        params.limit = this.limit;
        params.offset = 0;
      }

      if (this.orderRating) {
        params.rating = this.orderRating;
      }

      this.$count = null;
      this.loading = true;

      axios({
        url: MARTAN_API + '/reviews.json',
        headers: {
          "X-Store-Id": this.storeId,
          "X-Web-Id": this.webId,
        },
        params,
      })
        .then(({ data }) => {
          const { result, count } = data;
          let list = [];
          if (
            (Array.isArray(this.list) && !this.orderReviews) ||
            (this.orderReviews && this.$isSorting)
          ) {
            for (const element of result) {
              const isIn = this.list.some((review) => review.id === element.id);

              if (!isIn) {
                this.list.push(element);
              }
            }

            list = [...this.list, ...list];
          } else if (
            (Array.isArray(this.list) && this.orderReviews) ||
            this.orderRating
          ) {
            list = result;
            this.$isSorting = false;
          }

          return { count, list };
        })

        .then(({ count, list }) => {
          if (this.orderRating) {
            this.$count = count;
          } else {
            this.total = count;
          }

          this.list = list;

          return list;
        })

        .catch((err) => {
          console.error("Failed to load resource from Martan", err);
        })

        .finally(() => {
          this.loading = false;
        });
    },

    fetchAverage() {
      axios({
        url: MARTAN_API + '/average.json',
        headers: {
          "X-Store-Id": this.storeId,
          "X-Web-Id": this.webId,
        },
        params: {
          sku: this.product,
        },
      })
        .then(({ data }) => {
          if (data.length) {
            const { average, rating } = data[0];
            Object.assign(this.average, rating);
            this.averageTotal = average;
          }
        })

        .finally(() => {
          this.loading = false;
        });
    },

    loadMore() {
      if (this.orderReviews) {
        this.limit = this.limit + this.limit;
      } else {
        this.offset++;
      }
    },

    showLoadMore() {
      if (
        !this.orderRating &&
        this.total > 0 &&
        this.list.length < this.total
      ) {
        return true;
      }

      if (
        this.orderRating &&
        this.$count > 0 &&
        this.list.length < this.$count
      ) {
        return true;
      }
    },

    updateOrderBy({ rating }) {
      if (rating === this.orderRating) {
        this.orderRating = null;
      } else {
        this.offset = 0;
        this.orderRating = rating;
      }
    },

    onSort({ order }) {
      this.orderReviews = order;
    },

    openQuickview: function ({ review }) {
      this.selectedReview = review;
      this.isOpenQuickView = true;
    },

    onCloseQuickview: function () {
      this.isOpenQuickView = false;
      this.selectedReview = null;
    },
  },

  mounted() {
    Promise.all([this.fetchAverage(), this.fetchReviews()]);
  },

  components: {
    "list-grid": () => import("./GridView.vue"),
    "list-expanded": () => import("./ListView.vue"),
    "header-expanded": () => import("./HeaderExpanded.vue"),
    "header-minimal": () => import("./HeaderMinimal.vue"),
    Total,
    ListView,
    GridView,
    Quickview
  },
};
</script>

<style lang="scss">
.mt-review {
  padding: 25px 0 22px;

  &:first-child {
    padding-top: 0;
  }
}

.mt-review__title {
  color: #6b6d76;
  font-size: 16px;
}

.mt-review__date {
  font-size: 10px;
  color: #475569;
  color: #777;
}

.mt-review__body {
  opacity: 0.9;
  margin-top: 10px;
  font-size: 16px;
  line-height: 1.6;
  text-align: justify;
}

.mt-rating__group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.mt-review__author {
  font-size: 14px;
  color: #333;
  font-weight: bolder;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.mt-review__reactions svg {
  width: 18px;
  cursor: pointer;
}

.mt-review__reactions {
  display: flex;
  align-items: center;
  font-size: 11px;
  margin-top: 0.75rem;
  color: #777;
  border: 1px solid #777;
  border-radius: 50px;
  max-width: 100px;
  justify-content: space-evenly;
  height: 30px;
}

.mt-reviews__list {
  padding: 5px 0;
}

.mt-reviews__votesdown,
.mt-reviews__votesup {
  display: flex;
  align-items: center;
}

.mt-reviews__votesup {
  margin-right: 10px;
}

.mt-reply {
  margin: 10px 0 0;
  display: flex;
  flex-direction: column;
  background: rgb(241, 241, 241);
  padding: 20px;
  border-radius: 12px;
  font-size: 15px;
  line-height: 1.6;
  gap: 10px;
  border-right: 1px solid #1717171a;
  border-left: 3px solid rgb(230, 230, 230);
}

@media (max-width: 580px) {
  .mt-reply {
    margin: 10px 0;
  }
}

.mt-reply__date {
  font-weight: normal;
  font-size: 14px;
  text-decoration: none;
  color: #475569;
  color: #777;
}

.mt-reply__body {
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
}

.mt-is__recomended {
  font-size: 12px;
  font-weight: 600;
  color: #6b6d76;
}

.mt-questions__actions {
  padding: 20px;
  display: flex;
  justify-content: center;
}

.mt-rating__option {
  background-color: #fff;
  height: 35px;
  width: 140px;
  border-radius: 20px;
  color: #777;
  border: 1px solid #777;
  cursor: pointer;
  transition: all 0.5s ease;
}

.mt-rating__option:hover {
  background-color: #777;
  color: #fff;
}

.mt-reviews.mt-theme--vertical .mt-header--vertical {
  width: 30%;
}

.mt-reviews.mt-theme--vertical .mt-reviews__list {
  width: 70%;
}

@media (max-width: 580px) {
  .mt-reviews.mt-theme--vertical .mt-reviews__list {
    width: 100%;
  }

  .mt-reviews.mt-theme--vertical .mt-header--vertical {
    width: 100%;
    border-right: none;
  }

  .mt-reviews.mt-theme--vertical .mt-reviews__rating {
    flex-direction: column;
  }

  .mt-reviews.mt-theme--vertical .mt-header--vertical .mt-rating__options {
    max-width: inherit;
  }
}

.mt-rating__user {
  position: relative;
  max-width: 40px;
  height: fit-content;
  width: 100%;
  margin-right: 8px;
  border-radius: 50%;
  background: #858585;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 25px;
  font-weight: 500;
}

.mt-reviews.mt-theme--vertical .mt-rating__average__sort {
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}
</style>
