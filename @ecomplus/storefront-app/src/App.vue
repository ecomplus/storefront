<template>
  <div id="storefront-app">
    <transition
      enter-active-class="animated fadeIn slower"
      leave-active-class="animated fadeOut position-absolute"
    >
      <div id="loading" v-show="$store.state.loading">
        <div class="spinner-grow text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </transition>

    <div :class="$store.state.fluidPage ? 'container-fluid' : 'container'">
      <h1 v-show="!$store.state.fluidPage && $store.state.title">
        {{ $store.state.title }}
      </h1>
      <transition
        enter-active-class="animated fadeIn slow"
        leave-active-class="d-none"
      >
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'StorefrontApp',

  computed: {
    ...mapGetters([
      'amount',
      'customer'
    ])
  },

  methods: {
    updateGlobal () {
      const { amount, customer } = this
      Object.assign(window.storefrontApp, { amount, customer })
    }
  },

  created () {
    this.$router.beforeEach((_, __, next) => {
      this.updateGlobal()
      next()
    })
    this.updateGlobal()
  }
}
</script>

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
