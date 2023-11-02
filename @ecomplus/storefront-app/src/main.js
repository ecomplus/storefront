import { name, version } from './../package.json'
import ecomUtils from '@ecomplus/utils'
import ecomPassport from '@ecomplus/passport-client'
import ecomCart from '@ecomplus/shopping-cart'
import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import store from './store/'
import './plugins/clipboard'
import './plugins/toast'
import './lib/credit-card'

const { title } = document
const { i18n } = ecomUtils
router.afterEach(to => {
  let subtitle
  switch (to.name) {
    case 'cart':
      subtitle = i18n({
        en_us: 'My cart',
        pt_br: 'Meu carrinho'
      })
      break
    case 'checkout':
      subtitle = i18n({
        en_us: 'Checkout',
        pt_br: 'Finalizar compra'
      })
      break
    case 'confirmation':
      subtitle = i18n({
        en_us: '✓ We received your order',
        pt_br: '✓ Recebemos seu pedido'
      })
      break
    case 'account':
      subtitle = i18n({
        en_us: 'My account',
        pt_br: 'Minha conta'
      })
  }

  if (subtitle) {
    document.title = `${subtitle} · ${title}`
    store.commit('setTitle', subtitle)
  } else {
    document.title = title
    store.commit('setTitle', '')
  }
})

window.storefrontApp = {
  router: {
    afterEach: cb => router.afterEach(cb),
    get currentRoute () {
      return router.currentRoute
    }
  }
}

if (!window.ecomUtils) window.ecomUtils = ecomUtils
if (!window.$ecomConfig) window.$ecomConfig = ecomUtils.$ecomConfig
if (!window.ecomPassport) window.ecomPassport = ecomPassport
if (!window.ecomCart) window.ecomCart = ecomCart

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#storefront-app')

console.log(`// Starting ${name}@${version} SPA`)
