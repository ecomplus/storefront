const dictionary = {
  items: {
    en_us: 'items',
    pt_br: 'itens'
  },
  filter: {
    en_us: 'filter',
    pt_br: 'filtrar'
  },
  results: {
    en_us: 'results',
    pt_br: 'resultados'
  },
  sort: {
    en_us: 'sort',
    pt_br: 'ordenar'
  },
  searching_for: {
    en_us: 'Searching for',
    pt_br: 'Buscando por'
  },
  brands: {
    en_us: 'Brands',
    pt_br: 'Marcas'
  },
  categories: {
    en_us: 'Categories',
    pt_br: 'Categorias'
  },
  refine_search: {
    en_us: 'Refine search',
    pt_br: 'Refinar busca'
  },
  close_filters: {
    en_us: 'Close filters',
    pt_br: 'Fechar filtros'
  },
  clear_filters: {
    en_us: 'Clear filters',
    pt_br: 'Limpar filtros'
  }
}

export default function (word, lang) {
  if (!lang) {
    lang = (this && this.lang) || 'en_us'
  }
  return (dictionary[word] && dictionary[word][lang]) || ''
}
