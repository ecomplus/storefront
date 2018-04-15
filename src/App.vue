<template>
  <div id="app" v-loading="loading">
    <div class="_header">
      <top-bar/>
    </div>
    <div class="_main">
      <router-view/>
    </div>
  </div>
</template>

<script>
// E-Com Plus JS SDK
import EcomIo from 'ecomplus-sdk'
// base layout components
import TopBar from '@/components/layout/TopBar'
// from Vuex store
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    TopBar
  },
  computed: mapState([
    'loading'
  ])
}
</script>

<style lang="scss">
@import '../node_modules/normalize.css/normalize.css';
// Element UI theme variables
@import '../node_modules/element-theme-chalk/src/common/var.scss';

// general styles
body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: $--font-size-small;
  color: $--color-text-regular;
  font-weight: 400;
  padding: 0;
  background: $--border-color-extra-light;
  overflow-y: scroll !important;
  overflow-x: hidden !important;
  -webkit-transition: $--fade-linear-transition;
  transition: $--fade-linear-transition;
}
div, img {
  max-height: 100%;
  padding: 0;
  margin: 0;
}
#app {
  padding: 0;
  font-size: $--font-size-base;
}
body > div,
#app > div {
  padding: $--main-padding;
}
h2 {
  font-size: 1.6em;
  margin: 0.536em 0;
}
h3 {
  font-size: 1.4em;
  margin: 0.469em 0;
}
h3, h4 {
  font-size: $--font-size-large;
  margin: 15px 0;
}
h5, h6, p {
  display: block;
  margin: 0 0 10px 0;
}
a {
  text-decoration: none;
  color: $--color-text-primary;
  -webkit-transition: $--color-transition-base;
  transition: $--color-transition-base;
}
#app a {
  color: $--link-color;
}
a:hover {
  color: $--link-hover-color !important;
}
* {
  box-sizing: border-box;
}

// theming
._main,
._header {
  background: $--fill-base;
}
._header {
  box-shadow: $--box-shadow-base;
  position: relative;
  z-index: 9;
  height: 113px;
}
._main {
  border-bottom: 5px $--border-style-base $--border-color-base;
}
._header > * {
  height: 100%;
}

// classes from Element UI
.el-loading-mask {
  z-index: 3000;
}
</style>
