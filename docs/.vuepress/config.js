const path = require('path')
const fs = require('fs')
const directoryPath = path.join(__dirname, '../components')
const files = fs.readdirSync(directoryPath)
const componentDocs = []
for (let file of files) {
  componentDocs.push(`/components/${file}`)
}


module.exports = {
  title: "Storefront",
  themeConfig: {
    repo: 'ecomplus/storefront',
    sidebar: [
      {
        title: 'Components',
        collapsable: true,
        children: [...componentDocs, ]
      },
    ]
  }
}

