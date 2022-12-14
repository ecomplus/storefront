export default ({ baseDir, sections }) => ({
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
            },
            {
              label: 'Tabela de medidas',
              widget: 'object',
              name: 'size_guide',
              fields: [
                {
                  label: 'Imagem da tabela de medidas',
                  name: 'image',
                  widget: 'image',
                  media_library: {
                    config: {
                      max_file_size: 1000000
                    }
                  },
                  required: false
                },
                {
                  label: 'Título da tabela',
                  name: 'title',
                  widget: 'string',
                  required: false
                }
              ]
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
              name: 'title',
              hint: 'Quem comprou este produto, também comprou:',
              widget: 'string'
            }
          ]
        },
        {
          label: 'Compre junto',
          name: 'buy-together',
          widget: 'object',
          fields: [
            {
              label: 'Exibir spinner de carregamento',
              name: 'enabled',
              widget: 'boolean',
              default: false
            }
          ]
        }
      ].concat(sections)
    }
  ]
})
