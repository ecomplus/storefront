'use strict'

const dictionary = {
  my_account: {
    en_us: 'My account',
    pt_br: 'Minha conta'
  },
  my_orders: {
    en_us: 'My orders',
    pt_br: 'Meus pedidos'
  },
  hello: {
    en_us: 'Hello',
    pt_br: 'Olá'
  },
  logout: {
    en_us: 'Logout',
    pt_br: 'Sair'
  }
}

export default function (word, lang) {
  if (!lang) {
    // use english if lang undefined
    lang = (this && this.lang) || 'en_us'
  }
  return (dictionary[word] && dictionary[word][lang]) || ''
}
