<template>
  <el-container id="app">
    <el-header class="_header">
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
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 16px;
  line-height: 1.3;
  font-weight: 400;
  padding: 0;
  margin: 0;
  background: $--color-white;
}
div,
img {
  max-height: 100%;
  padding: 0;
  margin: 0;
}

// theming
._header {
  background: $--border-color-extra-light;
}
._header > * {
  height: 100%;
}
._footer {
  background: $--border-color-lighter;
}
</style>
