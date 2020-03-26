export default ({ baseDir }) => ({
  name: 'dictionary',
  label: 'Dicionário',
  delete: false,
  file: `${baseDir}content/dictionary/pt_br.json`,
  fields: [
    {
      label: 'Buscar produtos',
      name: 'search_products',
      widget: 'string'
    },
    {
      label: 'Abrir carrinho',
      name: 'open_cart',
      widget: 'string'
    },
    {
      label: 'Minha conta',
      name: 'my_account',
      widget: 'string'
    },
    {
      label: 'Produtos populares',
      name: 'popular_products',
      widget: 'string'
    },
    {
      label: 'Ver todas categorias',
      name: 'see_all_category',
      widget: 'string'
    }
  ]
})
