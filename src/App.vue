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

// frontend frameworks
import $ from 'jquery'
import 'popper.js'
import 'bootstrap'
// https://fontawesome.com/how-to-use/use-with-node-js
import FontAwesome from '@fortawesome/fontawesome'
import FaSolid from '@fortawesome/fontawesome-free-solid'
import FaRegular from '@fortawesome/fontawesome-free-regular'
import FaBrands from '@fortawesome/fontawesome-free-brands'
FontAwesome.library.add(FaSolid)
FontAwesome.library.add(FaRegular)
FontAwesome.library.add(FaBrands)

// set globally
// prevent 'is not defined' error
window.Vue = Vue
window.EcomIo = EcomIo
window.$ = $
// E-Com Plus storefront libraries
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
