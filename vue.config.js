const config = {
  lintOnSave: false
}

if (process.argv.indexOf('build') > -1) {
  config.css = {
    extract: false
  }
  config.chainWebpack = config => {
    config.externals(require('@ecomplus/storefront-template/webpack.externals'))
  }
}

module.exports = config
