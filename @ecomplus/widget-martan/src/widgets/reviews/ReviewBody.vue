<template>
  <div class="body-wrapper">
    <div class="mt-review__body">{{ body }}</div>
    <span class="mt-review__date" :title="formatDate(createdAt)">
      {{ i19published }}
      {{ timeAgo(createdAt) }}
    </span>
  </div>
</template>

<script>
import { formatDate } from "@ecomplus/utils";
import { timeAgo } from "../../utils/time-ago";

export default {

  name: "ReviewBody",

  props: {
    body: {
      type: String,
      required: true
    },
    createdAt: {
      type: String,
      required: true
    },
  },

  computed: {
    i19published: () => 'Publicado'
  },

  methods: { 
    formatDate, 
    timeAgo 
  }
};
</script>
