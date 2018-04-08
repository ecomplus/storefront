<template>
  <el-container id="app" class="_ecom-store" data-store="1004">
    <el-header class="cart-header">
      <header-bar/>
    </el-header>
    <el-main class="cart-main">
      <router-view/>
    </el-main>
    <el-footer class="cart-footer">
      Footer
    </el-footer>
  </el-container>
</template>

<script>
// layout components
import HeaderBar from '@/components/layout/HeaderBar'
// E-Com Plus JS SDK
import EcomIo from 'ecomplus-sdk'

export default {
  name: 'App',
  components: {
    HeaderBar
  }
}
</script>

<style lang="scss">
@import '../node_modules/normalize.css/normalize.css';
// Element UI theme variables
@import '../node_modules/element-theme-chalk/src/common/var.scss';

body {
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 16px;
  line-height: 1.3;
  font-weight: 400;
  padding: 0;
  margin: 0;
  background: $--color-white;
}
.cart-header {
  background: $--border-color-lighter;
}
.cart-footer {
  background: $--border-color-extra-light;
}
</style>
