import Vue from 'vue'
import Router from 'vue-router'
import ShoppingCart from '@/components/routes/ShoppingCart'
import MyAccount from '@/components/routes/MyAccount'
import RegistrationForm from '@/components/routes/account/RegistrationForm'
import OrdersList from '@/components/routes/account/OrdersList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/cart/:id?',
      name: 'cart',
      component: ShoppingCart
    },
    {
      path: '/checkout/:id?',
      name: 'checkout'
    },
    {
      path: '/account',
      component: MyAccount,
      children: [
        {
          path: '',
          name: 'account',
          component: RegistrationForm
        },
        {
          path: 'orders',
          name: 'orders',
          component: OrdersList
        }
      ]
    },
    {
      path: '/:id?',
      redirect: { name: 'cart' }
    }
  ]
})
