export default {
  name: 'products',
  label: 'Produtos',
  hint: 'Configuração geral das páginas de produto',
  file: 'content/products.json',
  fields: [
    {
      label: 'Exibir barra de informações',
      name: 'pitbar',
      widget: 'boolean',
      default: false,
      required: false
    },
    {
      label: 'Quem comrpou x também comprou',
      name: 'recommended',
      widget: 'object',
      hint: 'Slider de produtos que foram comprados por outros usuários que também adquiriam o produto visualizado',
      fields: [
        {
          label: 'Mostrar produtos recomendados',
          name: 'recommended_on',
          widget: 'boolean'
        },
        {
          label: 'Título',
          required: false,
          name: 'title',
          widget: 'string'
        }
      ]
    },
    {
      label: 'Produtos relacionados',
      name: 'related',
      widget: 'object',
      hint: 'Ativa slider de produtos com relacionados ao produto visualisado por categoria e/ou marca.',
      fields: [
        {
          label: 'Mostrar produtos relacionados',
          name: 'related_on',
          widget: 'boolean'
        },
        {
          label: 'Título',
          required: false,
          name: 'title',
          widget: 'string'
        }
      ]
    },
    {
      label: 'Adicionar coleção',
      name: 'add_collection',
      widget: 'object',
      hint: 'Ativa no final da página slider de produtos de uma coleção fixa',
      fields: [
        {
          label: 'Mostrar coleção',
          name: 'collection_on',
          widget: 'boolean'
        },
        {
          label: 'Título',
          required: false,
          name: 'title',
          widget: 'string'
        },
        {
          label: 'ID da coleção',
          required: false,
          name: 'collection',
          widget: 'string',
          hint: 'Entrar com o ID da coleção',
          que: 'pode ser visto nesta página: https://app.e-com.plus/#/resources/collections\''
        }
      ]
    },
    {
      label: 'Conteúdo adicional',
      name: 'additional_content',
      widget: 'markdown',
      hint: 'Markdown exibido no fim do container das páginas de produto',
      required: false
    }
  ]
}
