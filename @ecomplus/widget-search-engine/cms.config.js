import { name } from './package.json'

export default () => ({
  label: 'Motor de busca',
  thumbnail: 'https://ecom.nyc3.cdn.digitaloceanspaces.com/storefront/widgets/search-engine.png',
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: name
    },
    {
      label: 'Ativar',
      hint: 'Renderiza motor completo e resultados na página de busca',
      name: 'active',
      widget: 'boolean'
    },
    {
      label: 'Apenas em desktops',
      name: 'desktopOnly',
      hint: 'Desativa o widget em dispositivos móveis',
      widget: 'boolean'
    },
    {
      label: 'Opções',
      name: 'options',
      widget: 'object',
      hint: 'Personalizações do widget',
      fields: [
        {
          label: 'Paginação',
          name: 'pagination',
          required: false,
          widget: 'boolean',
          hint: 'Ativar paginação manual em vez do carregamento automático por scroll'
        }
      ]
    }
  ]
})
