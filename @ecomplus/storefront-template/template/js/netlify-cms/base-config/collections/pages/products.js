import sections from './_sections'

export default ({ baseDir }) => ({
  name: 'products',
  label: 'Produtos',
  hint: 'Configuração geral das páginas de produtos',
  file: `${baseDir}content/products.json`,
  fields: [
    {
      label: 'Seções',
      name: 'sections',
      widget: 'list',
      types: [
        {
          label: 'Detalhes produto',
          name: 'product-block',
          widget: 'object',
          fields: [
            {
              label: 'Exibir informações do produto',
              name: 'enabled',
              widget: 'boolean',
              default: true
            }
          ]
        },
        {
          label: 'Descrição do produto',
          name: 'product-description',
          widget: 'object',
          fields: [
            {
              label: 'Exibir descrição HTML do produto',
              name: 'enabled',
              widget: 'boolean',
              default: true
            }
          ]
        },
        {
          label: 'Especificações do produto',
          name: 'product-specifications',
          widget: 'object',
          fields: [
            {
              label: 'Exibir especificações do produto',
              name: 'enabled',
              widget: 'boolean',
              default: true
            }
          ]
        },
        {
          label: 'Produtos relacionados',
          name: 'related-products',
          widget: 'object',
          fields: [
            {
              label: 'Título da estante de produtos',
              required: false,
              name: 'title',
              hint: 'Produtos relacionatos',
              widget: 'string'
            }
          ]
        },
        {
          label: 'Produtos recomendados',
          name: 'recommended-products',
          widget: 'object',
          fields: [
            {
              label: 'Título da estante de produtos',
              required: false,
              name: 'title',
              hint: 'Quem comprou este produto, também comprou:',
              widget: 'string'
            }
          ]
        }
      ].concat(sections)
    }
  ]
})
