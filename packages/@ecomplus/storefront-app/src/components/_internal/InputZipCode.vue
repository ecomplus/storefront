<template>
  <cleave-input
    type="tel"
    class="form-control"
    :pattern="pattern"
    :options="cleaveOptions"
    v-model="localValue"
    :placeholder="placeholder"
  />
</template>

<script src="./js/InputZipCode.js"></script>
