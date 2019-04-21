'use strict'

const dictionary = {
  my_cart: {
    en_us: 'My cart',
    pt_br: 'Meu carrinho'
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
  }
}

export default function (word) {
  return (dictionary[word] && dictionary[word][this.lang]) || ''
}
