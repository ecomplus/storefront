<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
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

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
