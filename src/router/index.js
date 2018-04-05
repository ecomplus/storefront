import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// frontend frameworks
import 'jquery'
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

Vue.use(Router)
Vue.use(Vuex)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
