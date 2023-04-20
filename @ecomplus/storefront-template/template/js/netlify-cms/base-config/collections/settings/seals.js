export default ({ baseDir }) => ({
  label: 'Selos',
  file: `${baseDir}content/seals.json`,
  name: 'seals',
  hint: 'Selos nos produtos',
  widget: 'object',
  fields: [
    {
      label: 'Lista de selos do produto',
      required: false,
      name: 'seals_list',
      widget: 'list',
      fields: [
        {
          label: 'Identificador do selo',
          required: false,
          name: 'id',
          widget: 'string'
        },
        {
          label: 'Imagem do selo',
          hint: 'Respeitar tamanho máximo de 140px por 140px',
          name: 'img',
          required: false,
          widget: 'image',
          media_library: {
            config: {
              max_file_size: 1000000
            }
          }
        },
        {
          label: 'Lista de produtos',
          required: false,
          name: 'seals_list_products',
          widget: 'list',
          fields: [
            {
              label: 'Sku do produto',
              required: false,
              name: 'sku',
              widget: 'string',
              options: state.routes
                .filter(({ sku }) => typeof sku === 'string')
                .map(({ sku }) => ({
                  label: sku,
                  value: sku
                }))
            }
          ]
        }
      ]
    }
  ]
})
