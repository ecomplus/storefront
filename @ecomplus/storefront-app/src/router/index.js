import Vue from 'vue'
import VueRouter from 'vue-router'
import ecomCart from '@ecomplus/shopping-cart'
import { fetchCart, fetchingCartId, upsertCart } from './../lib/sync-cart-to-api'

Vue.use(VueRouter)

const routes = [
  {
    path: '/cart/:id?',
    name: 'cart',
    component: () => import(
      /* webpackChunkName: "app-cart" */
      './../views/Cart.vue'
    )
  },
  {
    path: '/:mode?/:product?/checkout/:id?/:step?',
    name: 'checkout',
    component: () => import(
      /* webpackChunkName: "app-checkout" */
      './../views/Checkout.vue'
    )
  },
  {
    path: '/confirmation/:id?/:number?/:json?',
    name: 'confirmation',
    component: () => import(
      /* webpackChunkName: "app-confirmation" */
      './../views/Confirmation.vue'
    )
  },
  {
    path: '/order/:number/:id?',
    name: 'order',
    component: () => import(
      /* webpackChunkName: "app-order" */
      './../views/Order.vue'
    )
  },
  {
    path: '/account/:tab?',
    name: 'account',
    component: () => import(
      /* webpackChunkName: "app-account" */
      './../views/Account.vue'
    ),
    children: [
      {
        path: 'orders/:number',
        redirect: {
          name: 'order'
        }
      }
    ]
  },
  {
    path: '/lp/:product/:id?/:step?',
    redirect: ({ params }) => ({
      name: 'checkout',
      params: {
        ...params,
        mode: 'lp'
      }
    })
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

router.afterEach(() => {
  const { name, params } = router.currentRoute
  if (name === 'cart' || name === 'checkout') {
    if (params.id && ecomCart.data._id !== params.id) {
      fetchCart(params.id)
    }
    fetchingCartId.then(id => {
      if (params.id !== id && router.currentRoute.name === name) {
        router.push({
          name,
          params: { ...params, id }
        })
        const { hostname, href } = window.location
        if (/\.[a-z]+$/.test(hostname)) {
          ecomCart.data.permalink = href
          setTimeout(upsertCart, 500)
        }
      }
    })
  }
})

export default router
