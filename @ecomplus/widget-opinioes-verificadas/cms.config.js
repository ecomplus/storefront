import { name } from './package.json'

export default () => ({
  label: 'Opiniões Verificadas',
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: name
    },
    {
      label: 'Ativar',
      hint: 'Instalar selo e avaliações via Opiniões Verificadas',
      name: 'active',
      widget: 'boolean'
    },
    {
      name: 'desktopOnly',
      widget: 'hidden',
      default: false
    },
    {
      name: 'enableCheckout',
      widget: 'hidden',
      default: false
    },
    {
      name: 'disablePages',
      widget: 'hidden',
      default: true
    },
    {
      label: 'Opções',
      name: 'options',
      widget: 'object',
      hint: 'Personalizações do widget',
      fields: [
        {
          label: 'HTML do selo',
          required: false,
          name: 'stamp',
          widget: 'code',
          hint: 'Código copiado de "Integração > Selos e Carrosel" no painel do Opiniões Verificadas',
          default_language: 'html',
          output_code_only: true
        },
        {
          label: 'Tag script para avaliações de produtos',
          required: false,
          name: 'tagJs',
          widget: 'code',
          hint: 'Código copiado do passo 1 do aplicativo TagJS em "Integração > Aplicativos"',
          default_language: 'html',
          output_code_only: true
        }
      ]
    },
    {
      name: 'headAppend',
      widget: 'hidden',
      default: 'src/append/head'
    },
    {
      name: 'bodyAppend',
      widget: 'hidden',
      default: 'src/append/body'
    },
    {
      name: 'productDescriptionAppend',
      widget: 'hidden',
      default: 'src/append/product-block'
    },
    {
      name: 'productCardSlots',
      widget: 'hidden',
      default: 'src/append/product-card-slots'
    },
    {
      name: 'productSlots',
      widget: 'hidden',
      default: 'src/append/product-slots'
    },
    {
      name: 'stampsAppend',
      widget: 'hidden',
      default: 'src/append/stamps'
    },
    {
      name: 'useJquery',
      widget: 'hidden',
      default: true
    }
  ]
})
