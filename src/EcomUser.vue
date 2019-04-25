<template>
  <div class="ecom-user">
    <slot name="button">
      <button
        type="button"
        class="ecom-user__button btn btn-lg btn-light"
        @click="toggle"
        :title="dictionary('open_cart')">
        <span class="ecom-user__button-icon">
          <i class="fas fa-user"></i>
        </span>
      </button>
    </slot>
  </div>
</template>

<script src="./EcomUser.js"></script>
<style lang="scss" src="./EcomUser.scss"></style>
