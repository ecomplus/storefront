<template>
  <div
    class="mt-is__recomended"
    :title="
      recommended
        ? i19customerRecommendProduct
        : i19customerNoRecommendProduct
    "
  >
    <span> {{ i19recommendProductQn }} </span>
    <span>{{ recommended ? i19yes : i19no }}</span>
  </div>
</template>

<script>

import {
  i19yes,
  i19no
} from '@ecomplus/i18n'

import { i18n } from '@ecomplus/utils'

export default {

  name: "isRecommended",

  props: {
    recommended: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    i19customerRecommendProduct: () => 'Cliente recomendaria o produto',
    i19customerNoRecommendProduct: () => 'Cliente não recomendaria o produto',
    i19no: () => i18n(i19no),
    i19recommendProductQn: () => 'Recomendaria o produto ?',
    i19yes: () => i18n(i19yes),
  },

};
</script>
