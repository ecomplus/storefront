'use strict'

const dictionary = {
  search_products: {
    en_us: 'Search products',
    pt_br: 'Buscar produtos'
  },
  did_you_mean: {
    en_us: 'Did you mean',
    pt_br: 'Você quis dizer'
  }
}

export default function (word, lang) {
  if (!lang) {
    // use english if lang undefined
    lang = (this && this.lang) || 'en_us'
  }
  return (dictionary[word] && dictionary[word][lang]) || ''
}
