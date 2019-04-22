<template>
  <div class="ecom-search__input-group">
    <input
      type="search"
      class="ecom-search__input form-control form-control-lg"
      :placeholder="label"
      :aria-label="label">
    <div
      class="ecom-search__submit text-muted st-text-primary-light:hover"
      @click="submit">
      <slot name="submit">
        <i class="fas fa-search"></i>
      </slot>
    </div>
  </div>
</template>

<script src="./EcomSearch.js"></script>
<style lang="scss" src="./EcomSearch.scss"></style>
