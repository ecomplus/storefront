<template>
  <div class="mt-rating__order_by">
    <svg width="24px" height="24px" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <title />
      <path d="M110.22,117.75h-80a10,10,0,0,0,0,20h80a10,10,0,0,0,0-20Z" />
      <path
        d="M177.22,125.75a9.67,9.67,0,0,0-14,0l-8,7.5V42.75a10,10,0,0,0-20,0v113.5a8.29,8.29,0,0,0,3,8,9.67,9.67,0,0,0,14,0l24.5-24.5a10.13,10.13,0,0,0,.5-14Z" />
      <path d="M110.22,37.75h-80a10,10,0,0,0,0,20h80a10,10,0,0,0,0-20Z" />
      <path d="M30.22,97.75h70a10,10,0,0,0,0-20h-70a10,10,0,0,0,0,20Z" />
    </svg>

    <select class="mt-select" @change="e => $emit('onSort', { order: e.target.value })">
      <option selected disabled>Ordenar</option>
      <option v-for="option in orderOptions" :value="option.key" :key="option.key">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script>
const orderOptions = [
  {
    key: "most_recent",
    name: "Recentes",
  },
  {
    key: "most_voted",
    name: "Mais úteis",
  },
  {
    key: "most_positive",
    name: "Positivas",
  },
  {
    key: "most_negative",
    name: "Negativas",
  },
];

export default {
  name: 'Sort',

  data() {
    return {
      orderOptions,
    };
  },
};
</script>

<style>
.mt-rating__order_by {
  display: flex;
  align-items: center;
  height: 40px;
  max-width: 130px;
  width: 100%;
  justify-content: flex-end;

  svg {
    fill: #6b6d76;
  }
}

.mt-select {
  height: 30px;
  border: none;
  background: #fff;
  line-height: 1.14;
  font-weight: 400;
  letter-spacing: normal;
  color: #6b6d76;
  font-size: 14px;
}
</style>
