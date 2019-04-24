'use strict'

const dictionary = {
  search_products: {
    en_us: 'Search products',
    pt_br: 'Buscar produtos'
  },
  did_you_mean: {
    en_us: 'Did you mean',
    pt_br: 'Você quis dizer'
  },
  popular_terms: {
    en_us: 'Popular terms',
    pt_br: 'Buscas populares'
  },
  suggested_products: {
    en_us: 'Suggested products',
    pt_br: 'Produtos sugeridos'
  },
  popular_products: {
    en_us: 'Popular products',
    pt_br: 'Produtos populares'
  }
}

export default function (word, lang) {
  if (!lang) {
    // use english if lang undefined
    lang = (this && this.lang) || 'en_us'
  }
  return (dictionary[word] && dictionary[word][lang]) || ''
}
