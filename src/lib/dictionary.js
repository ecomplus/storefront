const dictionary = {
  from: {
    en_us: 'from',
    pt_br: 'de'
  },
  to: {
    en_us: 'to',
    pt_br: 'por'
  },
  or: {
    en_us: 'or',
    pt_br: 'ou'
  },
  unavailable: {
    en_us: 'Unavailable',
    pt_br: 'Indisponível'
  },
  out_of_stock: {
    en_us: 'Out of stock',
    pt_br: 'Sem estoque'
  },
  buy: {
    en_us: 'Buy',
    pt_br: 'Comprar'
  },
  zip: {
    en_us: 'Zip code',
    pt_br: 'CEP'
  },
  calculate_shipping: {
    en_us: 'Calculate shipping',
    pt_br: 'Calcular frete e prazo'
  }
}

export default function (word, lang) {
  if (!lang) {
    lang = (this && this.lang) || 'en_us'
  }
  return (dictionary[word] && dictionary[word][lang]) || ''
}

export { dictionary }
