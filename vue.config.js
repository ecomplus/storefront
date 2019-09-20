const path = require('path')
const templatePath = path.join(process.cwd(), 'node_modules/@ecomplus/storefront-template/dist')

const config = {
  lintOnSave: false,
  devServer: {
    port: 9130,
    contentBase: templatePath
  }
}

if (process.argv.indexOf('--target') === process.argv.indexOf('lib') - 1) {
  // production Vue CLI lib output
  config.chainWebpack = config => {
    // exclude all libs imported by storefront-template
    config.externals(require('@ecomplus/storefront-template/webpack.externals'))
  }

  config.css = {
    extract: false
  }
} else {
  // build/serve SPA
  if (process.env.NODE_ENV === 'production') {
    config.outputDir = 'dist/app'
  }

  config.chainWebpack = config => {
    config
      // HTML file from template to load global vars and styles
      .plugin('html')
      .tap(args => {
        args[0].template = path.join(templatePath, 'app/test.html')
        return args
      })
  }
}

module.exports = config
