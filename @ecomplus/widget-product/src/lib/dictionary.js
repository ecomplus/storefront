const dictionary = {
  from: {
    en_us: 'from',
    pt_br: 'de'
  },
  to: {
    en_us: 'to',
    pt_br: 'por'
  },
  unavailable: {
    en_us: 'Unavailable',
    pt_br: 'Indisponível'
  },
  out_of_stock: {
    en_us: 'Out of stock',
    pt_br: 'Sem estoque'
  },
  in_stock: {
    en_us: 'units in stock',
    pt_br: 'unidades em estoque'
  },
  just: {
    en_us: 'Just',
    pt_br: 'Apenas'
  },
  buy: {
    en_us: 'Buy',
    pt_br: 'Comprar'
  },
  up_to: {
    en_us: 'up to',
    pt_br: 'até'
  },
  zip: {
    en_us: 'Zip code',
    pt_br: 'CEP'
  },
  calculate_shipping: {
    en_us: 'Calculate shipping',
    pt_br: 'Calcular frete e prazo'
  },
  days: {
    en_us: 'days',
    pt_br: 'dias'
  },
  working_days: {
    en_us: 'working days',
    pt_br: 'dias úteis'
  },
  free_shipping: {
    en_us: 'free shipping',
    pt_br: 'frete grátis'
  },
  interest_free: {
    en_us: 'interest free',
    pt_br: 'sem juros'
  },
  discount_of: {
    en_us: 'discount of',
    pt_br: 'desconto de'
  },
  select_variation: {
    en_us: 'Please select an option in each field above',
    pt_br: 'Por favor selecione uma opção em cada campo acima'
  }
}

export default function (word, lang) {
  if (!lang) {
    lang = (this && this.lang) || 'en_us'
  }
  return (dictionary[word] && dictionary[word][lang]) || ''
}

export { dictionary }
