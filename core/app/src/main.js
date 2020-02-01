import { name, version } from './../package.json'
import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import { i18n } from '@ecomplus/utils'
import App from './App.vue'
import router from './router/'
import store from './store/'
import './lib/clipboard'
import './lib/credit-card'

const { title } = document
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#storefront-app')

console.log(`// Starting ${name}@${version} SPA`)
