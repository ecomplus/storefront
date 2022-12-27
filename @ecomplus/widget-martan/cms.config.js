import { name } from './package.json'

export default () => ({
  label: 'Martan',
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: name,
      required: true
    },
    {
      label: 'Ativar',
      hint: 'Habilitar Martan',
      name: 'active',
      widget: 'boolean',
      required: true
    },
    {
      name: 'desktopOnly',
      widget: 'hidden',
      default: false,
      required: true
    },
    {
      name: 'enableCheckout',
      widget: 'hidden',
      default: false,
      required: true
    },
    {
      name: 'disablePages',
      widget: 'hidden',
      default: true,
      required: true
    },
    {
      name: 'headAppend',
      widget: 'hidden',
      default: 'src/append/head',
      required: true
    },
    {
      name: 'bodyAppend',
      widget: 'hidden',
      default: 'src/append/body',
      required: true
    },
    {
      name: 'productDescriptionAppend',
      widget: 'hidden',
      default: 'src/append/product-block',
      required: true
    },
    {
      name: 'productCardSlots',
      widget: 'hidden',
      default: 'src/append/product-card-slots',
      required: true
    },
    {
      name: 'productSlots',
      widget: 'hidden',
      default: 'src/append/product-slots',
      required: true
    },
    {
      label: 'Configurações',
      name: 'options',
      widget: 'object',
      hint: 'Configurações do Widget',
      fields: [
        {
          label: 'ID da loja',
          name: 'martanStoreId',
          widget: 'number',
          required: true
        },
        {
          label: 'Widget Key',
          name: 'martanWidgetKey',
          widget: 'string',
          required: true
        },
        {
          label: 'Exibir reviews na página de produtos',
          hint: 'Instalar avaliações de produtos',
          name: 'showWidgetReviews',
          widget: 'boolean',
          default: true
        },
        {
          label: 'Exibir média de reviews no card de produtos',
          hint: 'Exibir estrela com classificação média das notas nos produtos.',
          name: 'showAverageScore',
          widget: 'boolean',
          default: true
        },
        {
          label: 'Customização e Aparência',
          name: 'settings',
          widget: 'object',
          hint: 'Customize a aparência do seu widget para se integrar melhor ao tema do seu storefront',
          fields: [
            {
              label: 'Tamanho da font (px) da estrela',
              name: 'font_size',
              hint: 'Tamanho do icone da estrela nos cards de produtos',
              widget: 'number',
              default: 12,
              required: false
            },
            {
              label: 'Cor do icone de estrela',
              hint: 'Cor do incone de estrela que será exibido no widget de reviews',
              name: 'star_color',
              widget: 'color',
              required: false
            }
          ]
        }
      ]
    }
  ]
})
