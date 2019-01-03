import Vue from 'vue'
import Router from 'vue-router'
import ShoppingCart from '@/components/routes/ShoppingCart'
import CheckoutApp from '@/components/routes/CheckoutApp'
import MyAccount from '@/components/routes/MyAccount'
import RegistrationForm from '@/components/routes/account/RegistrationForm'
import AddressList from '@/components/routes/account/AddressList'
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
      name: 'checkout',
      component: CheckoutApp
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
          path: 'addresses',
          name: 'addresses',
          component: AddressList
        },
        {
          path: 'orders/:number?',
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
