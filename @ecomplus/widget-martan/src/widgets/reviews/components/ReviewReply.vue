<template>
  <div
    v-if="reply"
    class="mt-reply__wrapper"
  >
    <div style="margin-right: 10px">
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        style="transform: rotate(180deg)"
      >
        <path
          d="M10.53 5.03a.75.75 0 10-1.06-1.06l-6.25 6.25a.75.75 0 000 1.06l6.25 6.25a.75.75 0 101.06-1.06L5.56 11.5H17a3.248 3.248 0 013.25 3.248v4.502a.75.75 0 001.5 0v-4.502A4.748 4.748 0 0017 10H5.56l4.97-4.97z"
        />
      </svg>
    </div>

    <div class="mt-reply">
      <span class="mt-reply__body"
        >{{ i19storeResponse }} ·
        <span
          class="mt-reply__date"
          :title="'Respondido em ' + formatDate(reply.created_at)"
          >{{ timeAgo(reply.created_at) }}</span
        ></span
      >
      <span>{{ reply.body }}</span>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@ecomplus/utils";
import { timeAgo } from "../../../utils/time-ago";

export default {

  name: "ReviewReply",

  props: {
    reply: {
      type: Object,
    }
  },

  computed: {
    i19storeResponse: () => 'Resposta da loja'
  },

  methods: {
    formatDate,
    timeAgo
  }
};
</script>
<style lang="css" scoped>
.mt-reply {
  margin: 10px 0 0;
  display: flex;
  flex-direction: column;
  background: var(--white);
  padding: 20px;
  border-radius: 12px;
  font-size: 15px;
  line-height: 1.6;
  gap: 10px;
  border-right: 1px solid #1717171a;
  border-left: 3px solid rgb(230, 230, 230);
  width: 100%;
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

.mt-reply__wrapper {
  display: flex;
  align-items: center;
}
</style>
