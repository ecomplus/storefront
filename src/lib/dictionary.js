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
  visitor: {
    en_us: 'visitor',
    pt_br: 'visitante'
  },
  sign_in_with: {
    en_us: 'Sign in with',
    pt_br: 'Entrar com'
  },
  email: {
    en_us: 'email',
    pt_br: 'e-mail'
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
