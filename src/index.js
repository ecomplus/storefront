import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import MyComponent from './components/EcProductCard.vue'

export default options => {
  const elId = 'some-el-id'
  new Vue({
    components: {
      MyComponent
    },
    template: `
    <my-component id="${elId}"/>`
  }).$mount(`#${elId}`)
}
