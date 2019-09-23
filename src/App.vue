<template>
  <div id="storefront-app">
    <fade-transition :duration="700">
      <div id="loading" v-if="$store.state.loading">
        <div class="spinner-grow text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </fade-transition>

    <router-view/>
  </div>
</template>

<style lang="scss">
  #loading {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2000;
    background: rgba(255, 255, 255, .6);
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .spinner-grow {
      width: 150px;
      height: 150px;
    }
  }
</style>
