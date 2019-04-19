'use strict'

const dictionary = {
  my_cart: {
    en_us: 'My cart',
    pt_br: 'Meu carrinho'
  },
  close: {
    en_us: 'Close',
    pt_br: 'Fechar'
  }
}

export default function (word) {
  return (dictionary[word] && dictionary[word][this.lang]) || ''
}
