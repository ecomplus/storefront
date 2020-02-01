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
  no_results_for: {
    en_us: 'No results for',
    pt_br: 'Nenhum resultado para'
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
  },
  relevance: {
    en_us: 'Most relevant',
    pt_br: 'Mais relevantes'
  },
  sales: {
    en_us: 'Best sellers',
    pt_br: 'Mais vendidos'
  },
  lowest_price: {
    en_us: 'Lowest price',
    pt_br: 'Menor preço'
  },
  highest_price: {
    en_us: 'Highest price',
    pt_br: 'Maior preço'
  },
  popular_products: {
    en_us: 'Popular products',
    pt_br: 'Produtos populares'
  },
  search_again: {
    en_us: 'Search again',
    pt_br: 'Buscar novamente'
  }
}

export default function (word, lang) {
  if (!lang) {
    lang = (this && this.lang) || 'en_us'
  }
  return (dictionary[word] && dictionary[word][lang]) || ''
}
