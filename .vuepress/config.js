const path = require('path')
const fs = require('fs')

const pkgsPath = path.join(__dirname, '../@ecomplus')
const sidebarPkgs = []
for (const pkg of fs.readdirSync(pkgsPath)) {
  sidebarPkgs.push([`/@ecomplus/${pkg}/`, pkg])
}

const getSidebarItems = pkg => {
  const children = [
    [`/@ecomplus/${pkg}/`, 'Introduction']
  ]
  const componentsPath = path.join(pkgsPath, pkg, 'docs')
  for (const file of fs.readdirSync(componentsPath)) {
    children.push(`/@ecomplus/${pkg}/docs/${file}`)
  }
  return children
}

module.exports = {
  base: '/storefront/',
  port: 9110,

  patterns: [
    '*.md',
    'docs/**.md',
    '@ecomplus/*/*.md',
    '@ecomplus/*/docs/**.md'
  ],

  head: [
    ['script', {
      src: 'https://cdn.jsdelivr.net/npm/@ecomplus/storefront-twbs@5/dist/storefront-twbs.bundle.min.js'
    }]
  ],

  themeConfig: {
    repo: 'ecomplus/storefront',
    logo: '/assets/img/logo.png',
    nav: [
      {
        text: 'Introduction',
        link: '/'
      },
      {
        text: 'Customization',
        link: '/docs/customization'
      }
    ],

    sidebar: [
      {
        title: 'Getting started',
        collapsable: false,
        sidebarDepth: 2,
        children: [
          ['/', 'Introduction'],
          '/docs/customization',
          '/CONTRIBUTING'
        ]
      },
      {
        title: 'Template',
        collapsable: false,
        children: getSidebarItems('storefront-template')
      },
      {
        title: 'Base UI',
        collapsable: false,
        children: getSidebarItems('storefront-twbs')
      },
      {
        title: 'Vue components',
        children: getSidebarItems('storefront-components')
      },
      {
        title: 'Compiler',
        children: getSidebarItems('storefront-framework')
      },
      {
        title: 'All packages',
        sidebarDepth: 0,
        children: sidebarPkgs
      }
    ]
  },

  configureWebpack: {
    resolve: {
      alias: {
        './scss/ProductCard.scss': path.resolve(__dirname, 'styles/components/DemoProductCard.scss')
      }
    }
  }
}
