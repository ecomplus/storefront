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
  sign_up_with: {
    en_us: 'Sign up with',
    pt_br: 'Cadastrar via'
  },
  another: {
    en_us: 'another',
    pt_br: 'outro'
  },
  email: {
    en_us: 'email',
    pt_br: 'e-mail'
  },
  logout: {
    en_us: 'Logout',
    pt_br: 'Sair'
  },
  login: {
    en_us: 'Login',
    pt_br: 'Entrar'
  },
  continue_on_popup: {
    en_us: 'Continue login on popup',
    pt_br: 'Continue o login no pop-up'
  },
  login_error: {
    en_us: 'There was an error trying to login, please try again or select another option',
    pt_br: 'Houve um erro ao tentar o login, por favor tente novamente ou selecione outra opção'
  },
  profile_not_found: {
    en_us: 'No profile found with email address',
    pt_br: 'Nenhum perfil encontrado com o endereço de e-mail'
  },
  visitor_checkout: {
    en_us: 'You can also buy as a visitor if you prefer',
    pt_br: 'Você também pode comprar como visitante se preferir'
  }
}

export default function (word, lang) {
  if (!lang) {
    // use english if lang undefined
    lang = (this && this.lang) || 'en_us'
  }
  return (dictionary[word] && dictionary[word][lang]) || ''
}
