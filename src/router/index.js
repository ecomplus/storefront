import Vue from 'vue'
import Router from 'vue-router'
import ShoppingCart from '@/components/routes/ShoppingCart'
import MyAccount from '@/components/routes/MyAccount'
import MyOrders from '@/components/routes/MyOrders'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShoppingCart',
      component: ShoppingCart
    },
    {
      path: '/account',
      name: 'MyAccount',
      component: MyAccount
    },
    {
      path: '/orders',
      name: 'MyOrders',
      component: MyOrders
    }
  ]
})
