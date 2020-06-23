import { name } from './package.json'

export default () => ({
  label: 'Notificação de ofertas e estoque',
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: name
    },
    {
      label: 'Ativar',
      hint: 'Habilitar notificações de ofertas',
      name: 'active',
      widget: 'boolean'
    },
    {
      name: 'desktopOnly',
      widget: 'hidden',
      default: false
    },
    {
      label: 'Opções',
      name: 'options',
      widget: 'object',
      hint: 'Personalizações do widget',
      fields: [
        {
          label: 'Habilitar "avise-me quando chegar"',
          hint: 'Notifica clientes cadastrados quando produtos sem estoque ficam disponíveis novamente',
          name: 'enableOutOfStock',
          widget: 'boolean',
          default: true
        },
        {
          label: 'Habilitar alerta de preço',
          hint: 'Notificações de redução de preço',
          name: 'enablePriceChange',
          widget: 'boolean',
          default: true
        },
        {
          name: 'popupOptions',
          widget: 'hidden',
          default: 'location=yes,height=400,width=320,status=yes'
        }
      ]
    },
    {
      name: 'productSlots',
      widget: 'hidden',
      default: 'src/append/product-slots'
    }
  ]
})
