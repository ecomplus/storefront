import Vue from 'vue'
import VueRouter from 'vue-router'
import Cart from './../views/Cart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'cart',
    component: Cart
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import(/* webpackChunkName: "checkout" */ './../views/Checkout.vue')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import(/* webpackChunkName: "account" */ './../views/Account.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
