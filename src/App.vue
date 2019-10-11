<template>
  <div id="storefront-app">
    <fade-transition :duration="700">
      <div id="loading" v-show="$store.state.loading">
        <div class="spinner-grow text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </fade-transition>

    <div :class="$store.state.fluidPage ? 'container-fluid' : 'container'">
      <h1 v-show="!$store.state.fluidPage && $store.state.title">
        {{ $store.state.title }}
      </h1>
      <slide-x-left-transition :duration="{ enter: 400, leave: 0 }">
        <router-view/>
      </slide-x-left-transition>
    </div>
  </div>
</template>

<style lang="scss">
  #storefront-app {
    padding: 2rem 0 3rem;

    h1 {
      text-align: center;
      margin-bottom: 1.5rem;
      color: var(--secondary);
      font-size: 2rem;

      &::before {
        content: '# ';
        color: var(--secondary-lightest);
        font-weight: 400;
        margin-right: .2rem;
      }
    }

    #loading {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2000;
      background: rgba(255, 255, 255, .85);
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
  }
</style>
