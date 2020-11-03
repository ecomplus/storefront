export default (docName, docTitle) => ({
  label: `Produtos da ${docTitle}`,
  name: `${docName}-retail`,
  widget: 'object',
  fields: [
    {
      label: `Listar produtos da ${docTitle}`,
      name: 'enabled',
      widget: 'boolean',
      default: true
    },
    {
      label: 'Ordenação padrão',
      required: false,
      name: 'sort',
      widget: 'select',
      options: [
        {
          label: 'Mais vendidos',
          value: 'sales'
        },
        {
          label: 'Lançamento',
          value: 'news'
        },
        {
          label: 'Menor preço',
          value: 'lowest_price'
        },
        {
          label: 'Maior preço',
          value: 'highest_price'
        }
      ],
      default: 'sales'
    }
  ]
})
