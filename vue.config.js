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
  config.chainWebpack = config => {
    config.externals(require('@ecomplus/storefront-template/webpack.externals'))
  }
  config.css = {
    extract: false
  }
} else {
  config.chainWebpack = config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].template = path.join(templatePath, 'app/test.html')
        return args
      })
  }
  if (process.env.NODE_ENV === 'production') {
    config.outputDir = 'dist/app'
  }
}

module.exports = config
