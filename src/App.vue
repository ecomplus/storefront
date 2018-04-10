<template>
  <el-container id="app">
    <el-header class="_header" height="100px">
      <top-bar/>
    </el-header>
    <el-main class="_main">
      <router-view/>
    </el-main>
    <el-footer class="_footer">
      Footer
    </el-footer>
  </el-container>
</template>

<script>
// layout components
import TopBar from '@/components/layout/TopBar'
// E-Com Plus JS SDK
import EcomIo from 'ecomplus-sdk'

export default {
  name: 'App',
  components: {
    TopBar
  }
}
</script>

<style lang="scss">
@import '../node_modules/normalize.css/normalize.css';
// Element UI theme variables
@import '../node_modules/element-theme-chalk/src/common/var.scss';

// general styles
body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: $--font-size-base;
  color: $--color-text-regular;
  line-height: 1.3;
  font-weight: 400;
  padding: 0;
  margin: 0;
  background: $--border-color-extra-light;
}
div,
img {
  max-height: 100%;
  padding: 0;
  margin: 0;
}
* {
  box-sizing: border-box;
}

// theming
#app > * {
  padding: $--main-padding;
}
._main,
._header {
  background: $--fill-base;
}
._header {
  box-shadow: $--box-shadow-base;
  z-index: 1;
}
._footer, {
  border-top: 5px $--border-style-base $--border-color-base;
}
._header > *,
._footer > * {
  height: 100%;
}
</style>
