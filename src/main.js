import Vue from 'vue'
import '@ecomplus/storefront-twbs'
import { _config, i18n } from '@ecomplus/utils'
import App from './App.vue'
import router from './router/'
import store from './store/'
import { FadeTransition, SlideXLeftTransition } from 'vue2-transitions'
import './lib/clipboard'
import './lib/credit-card'
import 'cleave.js/dist/addons/cleave-phone.br'

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

new Vue({
  router,
  store,
  render: h => h(App),
  components: {
    FadeTransition,
    SlideXLeftTransition
  }
}).$mount('#storefront-app')

console.log(`* Starting Storefront App with Store ID #${_config.get('store_id')}`)
