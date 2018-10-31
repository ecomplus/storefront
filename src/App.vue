<template>
  <div id="app" v-loading="loading">
    <div class="_header">
      <div class="_navbar">
        <top-bar/>
      </div>
    </div>
    <div class="_main">
      <transition name="fade">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
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
  line-height: 1.25;
}
div, img {
  max-height: 100%;
  max-width: 100%;
  padding: 0;
  margin: 0;
}
body > div,
._navbar,
._main {
  padding: $--main-padding;
  max-width: 1250px;
  margin: 0 auto;
}
#app > ._main {
  padding-bottom: $--main-padding * 3;
}
#app {
  width: 100%;
  max-width: none;
  padding: 0;
  font-size: $--font-size-base;
  background: $--fill-base;
}
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  display: block;
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
h5 {
  font-size: $--font-size-base;
  margin: 10px 0;
}
h6 {
  font-size: $--font-size-small;
  margin: 8px 0;
}
p {
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
h2 > small,
h3 > small {
  margin-left: 3px;
  font-size: 68%;
  opacity: .8;
  display: inline-block;
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
._navbar,
._navbar > div {
  height: 100%;
}

// utility classes
.__py {
  padding-bottom: $--card-padding;
  padding-top: $--card-padding;
}
.__icon-mr {
  margin-right: $--card-padding * .22;
}
.__input-sm {
  width: 100%;
  max-width: 220px;
}
.__form-sm,
.__container-sm {
  max-width: 710px;
  margin: 0 auto;
}
.__btn-block {
  padding-top: $--card-padding;
  padding-bottom: $--card-padding;
  width: 100%;
  font-size: $--font-size-large;
}
.__box {
  background: darken($--fill-base, 2.5%);
  border-top: 2px $--border-style-base $--border-color-lighter;
  padding: $--card-padding;
  text-align: right;
  font-size: $--font-size-large;
}
.__box small {
  display: block;
  color: $--color-text-secondary;
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
  .el-step__title {
    font-size: 65%;
  }
  .el-radio-group > .el-radio {
    display: block;
    width: 100%;
  }
  .el-radio-group > .el-radio + .el-radio.is-bordered {
    margin-left: 0;
    margin-top: 10px;
  }
  .__form-sm .el-form-item > label {
    display: block;
    width: 100%;
    margin-bottom: 10px;
  }
  .__form-sm .el-form-item > .el-form-item__label {
    line-height: 1;
    text-align: left;
  }
  .__form-sm .el-form-item > div {
    margin-left: 0;
    display: block;
  }
}
@media (min-width: 576px) {
  .__form-sm .el-form-item > label {
    width: 210px;
  }
  .__form-sm .el-form-item > div {
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
  opacity: 0;
}
.fade-leave-to {
  display: none;
}
</style>
