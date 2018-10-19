<template>
  <div id="app" v-loading="loading">
    <div class="_header">
      <top-bar/>
    </div>
    <div class="_main">
      <transition name="fade">
        <router-view/>
      </transition>
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
// CSS fixer
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
  max-width: 100%;
  padding: 0;
  margin: 0;
}
body > div,
#app > div {
  padding: $--main-padding;
  max-width: 1250px;
  margin: 0 auto;
}
#app > ._main {
  padding-top: $--main-padding * 1.5;
  padding-bottom: $--main-padding * 3;
}
#app {
  width: 100%;
  max-width: none;
  padding: 0;
  font-size: $--font-size-base;
  background: $--fill-base;
}
h1, h2, h3, h4 {
  font-weight: 600;
}
h2 {
  font-size: 1.7em;
  margin: 0.64em 0;
}
h3 {
  font-size: 1.5em;
  margin: 0.61em 0;
}
h4 {
  font-size: $--font-size-large;
  margin: 12px 0;
}
h5, h6, p {
  font-weight: 400;
  display: block;
  margin: 0 0 10px 0;
}
a {
  text-decoration: none;
  color: $--link-color;
}
#credits a {
  color: $--color-text-primary;
}
#credits a:hover {
  color: #37003c;
}
a:hover {
  color: $--link-hover-color;
}
small {
  font-weight: 400;
}
h1 > small {
  display: block;
  margin-left: 1px;
  font-size: 58%;
  opacity: .7;
}
* {
  box-sizing: border-box;
}
a, button, div, span, img {
  -webkit-transition: $--color-transition-base;
  transition: $--color-transition-base;
}

// theming
._header {
  box-shadow: $--box-shadow-base;
  position: relative;
  z-index: 9;
  height: 113px;
}
._main {
  border-bottom: 5px $--border-style-base $--border-color-base;
  min-height: calc(100vh - 113px);
}
._header > * {
  height: 100%;
}

// classes from Element UI
.el-loading-mask {
  z-index: 3000;
}
@media (max-height: 450px), (max-width: 991px) {
  .el-date-picker {
    display: none;
  }
}
@media (max-width: 575px) {
  .el-radio-group > .el-radio {
    display: block;
    width: 100%;
  }
  .el-radio-group > .el-radio + .el-radio.is-bordered {
    margin-left: 0;
    margin-top: 10px;
  }
  .el-form-item > label {
    display: block;
    width: 100%;
    margin-bottom: 10px;
  }
  .el-form-item > .el-form-item__label {
    line-height: 1;
    text-align: left;
  }
  .el-form-item > div {
    margin-left: 0;
    display: block;
  }
}
@media (min-width: 576px) {
  .el-form-item > label {
    width: 210px;
  }
  .el-form-item > div {
    margin-left: 210px;
  }
}

// fade transition effects
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}
.fade-enter-active {
  transition-delay: .25s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
