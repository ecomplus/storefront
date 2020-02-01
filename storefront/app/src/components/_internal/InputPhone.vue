<template>
  <cleave-input
    type="tel"
    class="form-control"
    pattern="(\+[\d]{2})?([\d]{2,})?([\s-]?[\d]{4,}){2,}"
    :options="cleaveOptions"
    v-model="localValue"
    :placeholder="placeholder"
  />
</template>

<script src="./js/InputPhone.js"></script>
