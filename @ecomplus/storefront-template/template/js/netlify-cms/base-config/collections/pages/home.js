import sections from './_sections'

export default ({ baseDir }) => ({
  name: 'home',
  label: 'Página inicial',
  file: `${baseDir}content/home.json`,
  fields: [
    {
      label: 'Meta title',
      name: 'meta_title',
      widget: 'string',
      hint: 'Título exibido na aba do navegador e nos resultados de motores de busca, relevante para SEO',
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
      label: 'Seções',
      name: 'sections',
      widget: 'list',
      types: sections
    }
  ]
})
