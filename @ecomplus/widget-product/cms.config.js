import { name } from './package.json'

export default () => ({
  label: 'Detalhes do produto',
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: name
    },
    {
      label: 'Ativar',
      hint: 'Hidrata (atualiza) bloco principal em todas as páginas de produtos',
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
          label: 'Rótulo do botão',
          name: 'buyText',
          required: false,
          widget: 'string',
          hint: 'Texto a ser usado no botão de compra, o padrão é a palavra "comprar"'
        },
        {
          label: 'HTML do botão',
          required: false,
          name: 'buy',
          widget: 'code',
          hint: 'Pode ser usado para substituir o botão "comprar" padrão',
          default_language: 'html',
          output_code_only: true
        }
      ]
    }
  ]
})
