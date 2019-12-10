'use strict'

const devMode = process.env.NODE_ENV !== 'production'
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const templatePath = path.join(process.cwd(), 'node_modules/@ecomplus/storefront-template/dist')
const { dependencies } = require('./package.json')
const externals = require('@ecomplus/storefront-template/webpack.externals')

// preset default output object
const output = {
  library: 'widgetTagManager',
  libraryTarget: 'umd',
  libraryExport: 'default',
  path: path.resolve(__dirname, 'dist'),
  filename: 'widget-tag-manager.min.js',
  publicPath: devMode ? '/' : '/assets/vendor/'
}
output.chunkFilename = output.filename.replace('.min.js', '.[name].min.js')

// base Webpack config
const config = {
  mode: devMode ? 'development' : 'production',
  entry: path.resolve(__dirname, devMode ? 'docs/demo.js' : 'src/index.js'),
  output,
  devServer: {
    contentBase: templatePath,
    stats: 'minimal',
    port: 9141,
    open: true
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',

  plugins: [],
  module: {
    rules: [{
      test: /^(.(?!\.min.js$))+\.m?js$/,
      loader: 'babel-loader'
    }]
  },

  externals: devMode
    // external ecomUtils on dev server to get config correctly
    ? {
      '@ecomplus/utils': {
        commonjs: '@ecomplus/utils',
        commonjs2: '@ecomplus/utils',
        root: 'ecomUtils'
      }
    }
    // exclude all imported libs on production by default
    : [
      externals,
      new RegExp('^(' +
        Object.entries(dependencies)
          .map(([pkg]) => pkg).filter(pkg => !externals[pkg]).join('|') +
        ')(/|$)', 'i')
    ]
}

if (devMode) {
  // inject widget script with HTML plugin
  config.plugins.push(new HtmlWebpackPlugin({
    template: path.resolve(templatePath, 'index.html')
  }))
}

module.exports = devMode
  // single config object for dev server
  ? config
  // production outputs with and without polyfill
  : [
    config,
    {
      ...config,
      output: {
        ...output,
        path: path.join(output.path, 'root')
      },
      externals
    }
  ]
