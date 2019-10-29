import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/cart/:id?',
    name: 'cart',
    component: () => import(
      /* webpackChunkName: "cart" */
      './../views/Cart.vue'
    )
  },
  {
    path: '/checkout/:id?',
    name: 'checkout',
    component: () => import(
      /* webpackChunkName: "checkout" */
      './../views/Checkout.vue'
    )
  },
  {
    path: '/confirmation/:id?',
    name: 'confirmation',
    component: () => import(
      /* webpackChunkName: "confirmation" */
      './../views/Confirmation.vue'
    )
  },
  {
    path: '/account',
    name: 'account',
    component: () => import(
      /* webpackChunkName: "account" */
      './../views/Account.vue'
    ),
    children: [
      {
        path: 'orders/:number?',
        name: 'orders',
        component: () => import(
          /* webpackChunkName: "account" */
          './../views/Account.vue'
        )
      }
    ]
  },
  {
    path: '/:id?',
    redirect: {
      name: 'cart'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
