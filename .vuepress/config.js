const path = require('path')
const fs = require('fs')

const pkgsPath = path.join(__dirname, '../@ecomplus')

const widgetPkgs = []
for (const pkg of fs.readdirSync(pkgsPath)) {
  if (pkg.startsWith('widget')) {
    widgetPkgs.push([`/@ecomplus/${pkg}/`, pkg.replace('widget-', '')])
  }
}

const getSidebarItems = pkg => {
  const link = `/@ecomplus/${pkg}/`
  const children = [
    [link, 'Introduction']
  ]
  const componentsPath = path.join(pkgsPath, pkg, 'docs')
  try {
    const files = fs.readdirSync(componentsPath)
    for (const file of files) {
      children.push(`/@ecomplus/${pkg}/docs/${file}`)
    }
  } catch (e) {
  }
  return children.length > 1
    ? { children }
    : { path: link }
}

const alias = {
  './scss/ProductCard.scss': path.resolve(__dirname, 'styles/components/DemoProductCard.scss'),
  './scss/InstantSearch.scss': path.resolve(__dirname, 'styles/components/DemoInstantSearch.scss')
}
;['eot', 'woff2', 'woff', 'svg', 'ttf'].forEach(fontExt => {
  const filepath = `assets/icons/font/storefront-fa.${fontExt}`
  alias[`../${filepath}`] = path.resolve(__dirname, `../@ecomplus/storefront-twbs/${filepath}`)
})

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
        ...getSidebarItems('storefront-template')
      },
      {
        title: 'Base UI',
        collapsable: false,
        ...getSidebarItems('storefront-twbs')
      },
      {
        title: 'Vue components',
        ...getSidebarItems('storefront-components')
      },
      {
        title: 'Checkout SPA',
        ...getSidebarItems('storefront-app')
      },
      {
        title: 'Compiler',
        ...getSidebarItems('storefront-framework')
      },
      {
        title: 'Widgets',
        sidebarDepth: 0,
        children: widgetPkgs
      }
    ]
  },

  configureWebpack: {
    resolve: {
      alias
    }
  }
}
