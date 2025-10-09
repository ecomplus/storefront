<template>
  <div v-show="total > 0" class="martan-reviews container">
    <p class="lead" v-if="title">
      <a href="#reviews" :name="title || 'reviews'">#</a>
      {{ title }}
    </p>

    <component :is="config.widget_review.header_layout" :config="config" :rating="average"
      :recommended="totalRecommended" :average="averageTotal" :total-rating="total" @rating-selected="updateOrderBy"
      :list="list" :order-rating="orderRating" :offset="offset" />

    <div class="list-grid">
      <review-card
        v-for="review in list"
        :key="review.id"
        :review="review"
        :star-color="starColor"
        class="masonry-item"
        @openQuickview="openQuickview"
      />
    </div>

    <div class="actions" v-if="showLoadMore()">
      <div class="pagination">
        <button class="btn btn-primary" @click="loadMore" :disabled="loading">
          {{ loading ? "Carregando.." : "Mostrar mais comentários" }}
        </button>
      </div>
    </div>

    <Quickview @onClose="onCloseQuickview" :isOpen="isOpenQuickView" :review="selectedReview" :starColor="starColor" />

    <div class="credit">
      Avaliações reais, auditadas por
      <a :href="getUrl" target="_blank" rel="noopener">MARTAN.app</a>
    </div>
  </div>
</template>

<script>
import { MARTAN_API } from "../..";
import { configProp } from "./configProps";

export default {
  name: "Reviews",

  props: {
    ...configProp,
    product: {
      type: String,
      required: true,
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
    }
  },

  data() {
    return {
      list: [],
      total: 0,
      limit: 4,
      offset: 0,

      loading: false,

      orderRating: null,
      orderReviews: null,

      $isSorting: false,
      $count: null,

      averageTotal: 0,
      totalRecommended: null,
      average: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      },

      isOpenQuickView: false,
      selectedReview: null,
      isScrollable: false,

      $listEl: null,
    };
  },

  watch: {
    onlyWithPictures: function (newVal) {
      if (!this.$listEl && newVal.length > 0) {
        this.$listEl = document.querySelector(".reviews-with-pictures");
      }
    },
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

  computed: {
    i19basedOn$1Reviews: () => "Baseado em $1 avaliações",
    i19basedOn$1Review: () => "Baseado em $1 avaliação",
    i19noReview: () => "Nenhuma avaliação",
    onlyWithPictures() {
      return this.list.filter(
        (review) => review.pictures && review.pictures.length > 0
      );
    },
    getUrl() {
      const url = new URL(window.location.href);
      const ref = url.origin;
      return `https://www.martan.app/?ref=${ref}`;
    },
    title() {
      if (this.config.widget_review.title) {
        return this.config.widget_review.title;
      }
      return null;
    }
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
        url: MARTAN_API + "/reviews.json",
        headers: {
          "X-Store-Id": this.config.store_id,
          "X-Web-Id": this.config.web_id,
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
          console.log(this.total)
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
        url: MARTAN_API + "/average.json",
        headers: {
          "X-Store-Id": this.config.store_id,
          "X-Web-Id": this.config.web_id,
        },
        params: {
          sku: this.product,
        },
      })
        .then(({ data }) => {
          if (data.length) {
            const { average, rating, recommended } = data[0];
            Object.assign(this.average, rating);
            this.averageTotal = average;
            this.totalRecommended = recommended;
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

      if (this.offset < this.total) {
        return true;
      }

      return false;
    },

    updateOrderBy(rating) {
      console.log('updateOrderBy', rating)
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

    checkScrollability() {
      const list = this.$listEl;
      if (!list) return;

      this.isScrollable = list.scrollWidth > list.clientWidth;
    },
    scrollLeft() {
      const list = this.$listEl;
      if (!list) return;

      list.scrollBy({ left: -1500, behavior: "smooth" });
    },
    scrollRight() {
      const list = this.$listEl;
      if (!list) return;

      list.scrollBy({ left: 1500, behavior: "smooth" });
    },

    initMasonry() {
      // Verifica se o navegador suporta masonry nativo
      const supportsMasonry = CSS.supports('grid-template-rows', 'masonry');

      if (!supportsMasonry) {
        // Aplica fallback masonry usando CSS columns
        const gridContainer = this.$el.querySelector('.list-grid');
        if (gridContainer) {
          gridContainer.classList.add('list-grid--masonry-fallback');

          // Adiciona classe masonry-item aos cards
          const cards = gridContainer.querySelectorAll('review-card');
          cards.forEach(card => {
            card.classList.add('masonry-item');
          });
        }
      } else {
        // Remove fallback se masonry nativo estiver disponível
        const gridContainer = this.$el.querySelector('.list-grid');
        if (gridContainer) {
          gridContainer.classList.remove('list-grid--masonry-fallback');
        }
      }
    },
  },

  mounted() {
    console.log('config', this.config)
    Promise.all([this.fetchAverage(), this.fetchReviews()]).then(() => {
      this.checkScrollability();
      this.initMasonry();
      window.addEventListener("resize", () => {
        this.checkScrollability();
        this.initMasonry();
      });
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.checkScrollability);
  },

  components: {
    ReviewCard: () => import("./components/ReviewCard.vue"),
    Quickview: () => import("./components/Quickview.vue"),
    Compact: () => import("./headers/Compact.vue"),
    Center: () => import("./headers/Center.vue"),
    Summary: () => import("./headers/Summary.vue"),
    Padrao: () => import("./headers/Padrao.vue"),
    Histogram: () => import("./headers/Histogram.vue"),
  },
};
</script>

<style lang="scss" scoped>
.martan-reviews {
  color: #444;

  /* Cor neutra, boa para temas claros e escuros */
  .widget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    &__score {
      max-width: 500px;
      width: 100%;
    }

    &__score-average {
      font-size: 1.25rem;
      // font-weight: 600;
      color: #444;
      /* Cor neutra, boa para temas claros e escuros */
    }
  }

  .list-expanded {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .list-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: masonry; // Efeito masonry nativo (quando suportado)
    gap: 1rem;
    max-width: 1200px; // 2 cards de 580px + gap
    margin: 0 auto;
    align-items: start; // Alinha cards ao topo

    // Mobile: full width, 1 coluna
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      grid-template-rows: masonry;
      max-width: 100%;
      gap: 0.75rem;
    }

    // Tablet: 2 colunas com largura máxima
    @media (min-width: 769px) and (max-width: 1200px) {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: masonry;
      max-width: 100%;
    }

    // Desktop: 2 colunas com largura máxima de 580px cada
    @media (min-width: 1201px) {
      grid-template-columns: repeat(2, minmax(0, 580px));
      grid-template-rows: masonry;
      justify-content: center;
    }

    // Fallback para navegadores que não suportam masonry
    @supports not (grid-template-rows: masonry) {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      max-height: none;
      align-content: flex-start;

      @media (min-width: 769px) {
        flex-direction: row;
        align-content: flex-start;
      }
    }
  }

  // Fallback masonry com JavaScript para navegadores sem suporte
  .list-grid--masonry-fallback {
    display: block;
    column-count: 1;
    column-gap: 1rem;

    @media (min-width: 769px) {
      column-count: 2;
    }

    @media (min-width: 1201px) {
      column-count: 2;
      max-width: 1200px;
      margin: 0 auto;
    }

    .masonry-item {
      break-inside: avoid;
      margin-bottom: 1rem;
      display: inline-block;
      width: 100%;
    }
  }

  .reviews-with-pictures {
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
    background-color: rgba(255, 236, 219, 0.102);
    border: 1px solid rgba(255, 236, 219, 0.102);
    border-radius: 0.25rem;
    display: flex;
    font-size: 80%;
    margin-top: 1rem;
    padding: 2rem;
    width: 100%;

    .list {
      display: flex;
      gap: 1rem;
      flex-direction: row;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      /* Oculta a barra de rolagem */
      scrollbar-width: none;

      /* Firefox */
      &::-webkit-scrollbar {
        display: none;
        /* Chrome, Safari e Edge */
      }

      img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 0.25rem;
        cursor: pointer;
      }
    }
  }

  .credit {
    margin-top: 1rem;
    font-size: 0.75rem;
    line-height: 1rem;
    text-align: right;
    color: rgb(161 161 170 / 1);

    a {
      color: rgb(15 23 42 / 1) !important;
    }
  }

  .actions {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}
</style>
