const dictionary = {
  did_you_mean: {
    en_us: 'Did you mean',
    pt_br: 'Você quis dizer'
  },
  no_results_for: {
    en_us: 'No results for',
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
    lang = (this && this.lang) || 'en_us'
  }
  return (dictionary[word] && dictionary[word][lang]) || ''
}
