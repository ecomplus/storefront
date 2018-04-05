<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
// set globally
// prevent 'is not defined' error
window.Vue = Vue
// E-Com Plus storefront libraries
import EcomIo from 'ecomplus-sdk'
window.EcomIo = EcomIo
require('ecomplus-passport-client')
require('ecomplus-render')

export default {
  name: 'App'
}
</script>

<style>
/* Bootstrap 4 */
@import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
