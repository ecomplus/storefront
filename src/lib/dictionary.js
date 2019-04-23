'use strict'

const dictionary = {
  my_cart: {
    en_us: 'My cart',
    pt_br: 'Meu carrinho'
  },
  open_cart: {
    en_us: 'Open cart',
    pt_br: 'Abrir carrinho'
  },
  close: {
    en_us: 'Close',
    pt_br: 'Fechar'
  },
  remove: {
    en_us: 'Remove',
    pt_br: 'Remover'
  },
  checkout: {
    en_us: 'Checkout',
    pt_br: 'Finalizar compra'
  },
  see_cart: {
    en_us: 'See shopping cart',
    pt_br: 'Ver carrinho'
  },
  empty_cart: {
    en_us: 'Your shopping cart is empty',
    pt_br: 'Seu carrinho de compras está vazio'
  },
  continue_shopping: {
    en_us: 'Continue shopping',
    pt_br: 'Continuar comprando'
  }
}

export default function (word) {
  return (dictionary[word] && dictionary[word][this.lang]) || ''
}
