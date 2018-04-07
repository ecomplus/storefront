<template>
  <el-container id="app">
    <el-header>
      <img src="./assets/logo.png">
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import Vue from 'vue'
// E-Com Plus JS SDK
import EcomIo from 'ecomplus-sdk'

// set globally
// prevent 'is not defined' error
window.Vue = Vue
window.EcomIo = EcomIo
// E-Com Plus storefront libraries
require('ecomplus-passport-client')
require('ecomplus-render')
Ecom.init()

export default {
  name: 'App'
}
</script>

<style lang="scss">
@import '../node_modules/normalize.css/normalize.css';

body {
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 16px;
  line-height: 1.3;
  font-weight: 400;
  padding: 0;
  margin: 0;
}
</style>
