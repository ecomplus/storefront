const path = require('path')
const fs = require('fs')
const componentsPath = path.join(__dirname, '../@ecomplus/storefront-components/docs')
const files = fs.readdirSync(componentsPath)
const components = []

for (const file of files) {
  components.push(`../@ecomplus/storefront-components/docs/${file}`)
}

module.exports = {
  base: '/storefront/',
  patterns: [
    '*.md',
    '@ecomplus/*.md',
    '@ecomplus/*/docs/**.md',
    '@ecomplus/*/docs/**.vue'
  ],
  themeConfig: {
    repo: 'ecomplus/storefront',
    logo: '/assets/img/logo.png',
    nav: [
      {
        text: 'Home',
        link: '/'
      }
    ],
    sidebar: [
      {
        title: 'Getting Started',
        collapsable: false,
        children: ['']
      },
      {
        title: 'Components',
        collapsable: false,
        children: components
      }
    ]
  }
}
