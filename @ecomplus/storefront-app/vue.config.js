const path = require('path')
const recursiveCopy = require('./../storefront-template/scripts/lib/recursive-copy')
const templatePath = path.join(__dirname, '../../node_modules/@ecomplus/storefront-snapshot')
const { dependencies, peerDependencies } = require('./package.json')
const externals = require('./../storefront-template/webpack.externals')
const publicPath = require('./webpack.public-path')

const devMode = process.env.NODE_ENV !== 'production'
const libMode = !devMode && process.argv.indexOf('--lib') > -1

if (!devMode && !libMode) {
  // copy template assets
  recursiveCopy(templatePath, path.join(__dirname, 'public'))
}

module.exports = {
  lintOnSave: false,
  devServer: {
    port: 9130,
    open: true,
    contentBase: templatePath
  },

  // single JS file output
  css: {
    extract: false
  },
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    output: {
      library: '__storefront_app',
      libraryTarget: 'umd'
    },
    resolve: {
      mainFields: ['module', 'browser', 'main'],
      alias: {
        '#components': '@ecomplus/storefront-components/src'
      }
    }
  },

  // default public path for storefront-template on lib mode
  publicPath: libMode ? publicPath : '/app/',
  outputDir: devMode ? 'test' : libMode ? 'dist/lib' : 'dist/app',
  filenameHashing: !libMode,

  chainWebpack: config => {
    if (libMode) {
      // exclude all imported deps on lib mode by default
      config.externals([
        externals,
        new RegExp('^(' +
          Object.entries({ ...dependencies, ...peerDependencies })
            .map(([pkg]) => pkg).filter(pkg => !externals[pkg]).join('|') +
          ')$', 'i')
      ])
    }

    // HTML file from template to load global vars and styles
    config
      .plugin('html')
      .tap(args => {
        args[0].template = path.join(templatePath, 'app/test.html')
        return args
      })
  }
}
