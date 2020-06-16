import { name } from './package.json'

export default () => ({
  label: 'Notificações de Ofertas',
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: name
    },
    {
      label: 'Ativar',
      hint: 'Habilitar Notificações de Ofertas',
      name: 'active',
      widget: 'boolean'
    },
    {
      label: 'Opções',
      name: 'options',
      widget: 'object',
      hint: 'Personalizações do widget',
      fields: [
        {
          label: 'Acompanhar Preço',
          hint: 'Habilitar opção `Acompanhar Preço` na página de produtos',
          name: 'enabledPriceChange',
          widget: 'boolean'
        },
        {
          label: 'Me Avise',
          hint: 'Habilitar opção `Me Avise` na página de produtos com estoque zerado',
          name: 'enabledOutOfStock',
          widget: 'boolean'
        }
      ]
    },
    {
      label: 'Apenas em desktops',
      name: 'desktopOnly',
      hint: 'Desativa o widget em dispositivos móveis',
      widget: 'boolean'
    },
    {
      name: 'productSlots',
      widget: 'hidden',
      default: 'src/append/product-slots'
    }
  ]
})
