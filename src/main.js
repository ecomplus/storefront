import Vue from 'vue'
import EcomMinicart from './EcomMinicart.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(EcomMinicart, {
    props: {
      show: true
    }
  })
}).$mount('#minicart')
