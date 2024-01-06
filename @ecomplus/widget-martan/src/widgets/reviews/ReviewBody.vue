<template>
  <div class="body-wrapper">
    <div class="mt-review__body">{{ body }}</div>
    <span class="mt-review__date" :title="formatDate(createdAt)">
      Publicado
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
    body: String,
    createdAt: String,
  },
  methods: { formatDate, timeAgo },
};
</script>
