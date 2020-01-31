export default {
  name: 'home',
  label: 'Página inicial',
  file: 'content/home.json',
  fields: [
    {
      label: 'Meta title',
      name: 'meta_title',
      widget: 'string',
      hint: 'Título exibido na aba do navegador e nas respostas em motores de busca, relevante para SEO',
      required: false
    },
    {
      label: 'Meta description',
      name: 'meta_description',
      widget: 'string',
      hint: 'Descrição exibida nos resultados de motores de busca, relevante para SEO',
      required: false
    },
    {
      label: 'Slider',
      name: 'slider',
      widget: 'object',
      hint: 'Slider de imagens exibido na página inicial',
      fields: [
        {
          label: 'Autoplay',
          name: 'autoplay',
          hint: 'Tempo de exibição de cada slide em milisegundos, defina 0 para o slide não mudar automaticamente',
          required: false,
          widget: 'number'
        },
        {
          label: 'Slides',
          name: 'slides',
          widget: 'list',
          fields: [
            {
              label: 'Imagem',
              name: 'img',
              widget: 'image'
            },
            {
              label: 'Link',
              required: false,
              name: 'link',
              widget: 'string'
            },
            {
              label: 'Alt',
              required: false,
              name: 'alt',
              widget: 'string'
            }
          ]
        }
      ]
    },
    {
      label: 'Exibir barra de informações',
      name: 'pitbar',
      widget: 'boolean',
      default: true,
      required: false
    },
    {
      name: 'showcase',
      label: 'Vitrine',
      widget: 'list',
      fields: [
        {
          label: 'Coleção',
          required: false,
          name: 'collection',
          widget: 'collections'
        }
      ]
    },
    {
      label: 'Conteúdo adicional',
      name: 'additional_content',
      widget: 'markdown',
      hint: 'Markdown exibido no fim do container da página inicial',
      required: false
    }
  ]
}
