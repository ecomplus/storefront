import { name } from './package.json'

export default () => ({
  label: 'GMC avaliações do consumidor',
  fields: [
    {
      name: 'pkg',
      widget: 'hidden',
      default: name
    },
    {
      label: 'Ativar',
      hint: 'Instalar GMC avaliações',
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
      name: 'enableCheckout',
      widget: 'hidden',
      default: true
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
          label: 'Google Merchant ID',
          name: 'gmcMerchantId',
          widget: 'number',
          hint: 'Seu Merchant ID disponível no Google Merchant Center'
        },
        {
          label: 'Posição do selo',
          name: 'badgePosition',
          widget: 'select',
          options: [
            {
              label: 'Flutuante à esquerda',
              value: 'BOTTOM_LEFT'
            },
            {
              label: 'Flutuante à direita',
              value: 'BOTTOM_RIGHT'
            },
            {
              label: 'Fixo no rodapé',
              value: 'INLINE'
            }
          ]
        },

        {
          label: 'Posição do modal de solicitação',
          name: 'dialogPosition',
          widget: 'select',
          options: [
            {
              label: 'No centro da página',
              value: 'CENTER_DIALOG'
            },
            {
              label: 'Canto inferior esquerdo',
              value: 'BOTTOM_LEFT_DIALOG'
            },
            {
              label: 'Canto inferior direito',
              value: 'BOTTOM_RIGHT_DIALOG'
            },
            {
              label: 'Canto superior esquerdo',
              value: 'TOP_LEFT_DIALOG'
            },
            {
              label: 'Canto superior direito',
              value: 'TOP_RIGHT_DIALOG'
            },
            {
              label: 'Parte inferior',
              value: 'BOTTOM_TRAY'
            }
          ]
        }
      ]
    },
    {
      name: 'stampsAppend',
      widget: 'hidden',
      default: 'src/append/stamps'
    }
  ]
})
