<template>
  <cleave-input
    type="tel"
    class="form-control"
    pattern="[\d/-]{10}"
    :options="cleaveOptions"
    v-model="localValue"
    :placeholder="placeholder"
  />
</template>

<script src="./js/InputDate.js"></script>
