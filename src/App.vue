<template>
  <div id="app">
    <div class="_header">
      <top-bar/>
    </div>
    <div class="_main">
      <router-view/>
    </div>
    <div class="_footer">
      Footer
    </div>
  </div>
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
  font-weight: 400;
  padding: 0;
  background: $--border-color-extra-light;
}
div, img {
  max-height: 100%;
  padding: 0;
  margin: 0;
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
* {
  box-sizing: border-box;
}

// theming
._header,
._main,
._footer {
  padding: $--main-padding;
}
._main,
._header {
  background: $--fill-base;
}
._header {
  box-shadow: $--box-shadow-base;
  position: relative;
  z-index: 9;
}
._footer, {
  border-top: 5px $--border-style-base $--border-color-base;
}
._header > *,
._footer > * {
  height: 100%;
}
</style>
