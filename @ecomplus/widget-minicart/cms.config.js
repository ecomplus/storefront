import { name } from './package.json'

export default () => ({
  label: 'Minicart',
  thumbnail: 'https://ecom.nyc3.cdn.digitaloceanspaces.com/storefront/widgets/minicart.png',
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: name
    },
    {
      label: 'Ativar',
      hint: 'Prévia do carrinho de compras em sidebar na lateral direita do site',
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
          label: 'Cálculo de frete',
          name: 'strHasShippingCalculator',
          widget: 'select',
          options: [
            {
              label: 'Padrão do tema',
              value: '_'
            },
            {
              label: 'Sem cálculo de frete no minicart',
              value: ' '
            },
            {
              label: 'Cálculo de frete no minicart',
              value: 'true'
            }
          ]
        }
      ]
    }
  ]
})
