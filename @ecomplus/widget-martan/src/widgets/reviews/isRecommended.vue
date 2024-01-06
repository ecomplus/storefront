<template>
  <div
    class="mt-is__recomended"
    :title="
      recommended
        ? 'Cliente recomendaria o produto'
        : 'Cliente não recomendaria o produto'
    "
  >
    <span>Recomendaria o produto? </span>
    <span>{{ recommended ? "Sim" : "Não" }}</span>
  </div>
</template>

<script>
export default {
  name: "isRecommended",
  props: {
    recommended: Boolean,
  },
};
</script>
