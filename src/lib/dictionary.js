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
  no_results_for: {
    en_us: 'No products found for',
    pt_br: 'Nenhum produto encontrado para'
  },
  total_results_for: {
    en_us: 'products found for',
    pt_br: 'produtos encontrados para'
  },
  see_all: {
    en_us: 'See all',
    pt_br: 'Ver todos'
  }
}

export default function (word, lang) {
  if (!lang) {
    // use english if lang undefined
    lang = (this && this.lang) || 'en_us'
  }
  return (dictionary[word] && dictionary[word][lang]) || ''
}
