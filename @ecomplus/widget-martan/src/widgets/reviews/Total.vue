<template>
  <div class="mt-rating__average__sort">
    <span class="mt-rating__count" v-if="!!reviews.orderRating">{{ Array.isArray(reviews.list) ? reviews.list.length : 0
    }}
      {{
        Array.isArray(reviews.list) && reviews.list.length > 1 || reviews.list.length === 0
        ? i19reviews 
        : i19review
      }}
      <span>{{ reviews.orderRating }} {{
        Array.isArray(reviews.list) && reviews.list.length > 1 || reviews.list.length === 0
        ? i19stars
        : i19star
      }}</span>
    </span>

    <span class="mt-rating__count" v-else>
      {{ reviews.total }}
      {{
        reviews.total > 1 || reviews.total === 0 
        ? i19reviews 
        : i19review
      }}
    </span>

    <sort @onSort="onSort"/>
  </div>
</template>

<script>
import Sort from './Sort.vue';

export default {
  name: 'Total',

  props: {
    reviews: {
      type: Object,
      default: {
        list: [],
        orderRating: null,
        total: 0
      }
    }
  },

  computed: {

    i19stars: () => 'Estrelas',
    i19star: () => 'Estrela',
    i19reviews: () => 'Avaliações',
    i19review: () => 'Avaliação',
    orderRating () {
      return reviews.orderRating;
    },
  },

  components: { Sort },

  methods: {
    onSort(value) {
      this.$emit('onSort', value)
    }
  }
};
</script>

<style lang="css">
.mt-rating__average__sort {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 00;
}

.mt-rating__count {
  color: #6b6d76;
}
</style>
