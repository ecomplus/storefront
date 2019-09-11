const dictionary = {
  shopping_cart: {
    en_us: 'Shopping cart',
    pt_br: 'Carrinho de compras'
  }
}

export default function (word, lang) {
  if (!lang) {
    lang = (this && this.lang) || 'en_us'
  }
  return (dictionary[word] && dictionary[word][lang]) || ''
}
