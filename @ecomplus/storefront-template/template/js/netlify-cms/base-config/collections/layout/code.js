export default ({ baseDir }) => ({
  name: 'code',
  label: 'Inserir código',
  file: `${baseDir}content/code.json`,
  fields: [
    {
      label: 'HTML antes de </head>',
      required: false,
      name: 'html_head',
      widget: 'code',
      hint: 'Pode ser usado para linkar CSS externo ou criar meta tags',
      default_language: 'html',
      output_code_only: true
    },
    {
      label: 'HTML antes de </body>',
      required: false,
      name: 'html_body',
      widget: 'code',
      hint: 'Pode ser usado para importar JS externo ou inserir HTML depois do rodapé e créditos',
      default_language: 'html',
      output_code_only: true
    },
    {
      label: 'CSS customizado',
      required: false,
      name: 'css',
      widget: 'code',
      hint: 'Também é possível adicionar/editar SCSS no GitHub em `template/scss`',
      default_language: 'css',
      output_code_only: true
    }
  ]
})
