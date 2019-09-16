const dictionary = {
  brands: {
    en_us: 'Brands',
    pt_br: 'Marcas'
  },
  categories: {
    en_us: 'Categories',
    pt_br: 'Categorias'
  }
}

export default function (word, lang) {
  if (!lang) {
    lang = (this && this.lang) || 'en_us'
  }
  return (dictionary[word] && dictionary[word][lang]) || ''
}
