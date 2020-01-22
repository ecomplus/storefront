import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import MyComponent from './components/MyComponent.vue'

export default (options = {}, elId = 'some-el-id') => {
  const $el = document.getElementById(elId)

  if ($el) {
    new Vue({
      render: h => h(MyComponent, {
        attrs: {
          id: elId
        },
        props: {
          ...options.props
        }
      })
    }).$mount($el)
  }
}
