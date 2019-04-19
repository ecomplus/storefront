<template>
  <div class="ecom-minicart" v-show="show">
    <div class="ecom-minicart__overlay fade bg-dark" :class="{ 'show': overlay }"></div>
    <aside class="ecom-minicart__sidebar bg-white shadow">
    </aside>
  </div>
</template>

<script src="./EcomMinicart.js"></script>

<style>
  .ecom-minicart__overlay {
    position: absolute;
    z-index: 9998;
    opacity: .45;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
  .ecom-minicart__sidebar {
    position: absolute;
    width: 20rem;
    height: 100vh;
    top: 0;
    right: 0;
    z-index: 9999;
  }
</style>
