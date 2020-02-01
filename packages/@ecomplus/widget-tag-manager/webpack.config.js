'use strict'

const devMode = process.env.NODE_ENV !== 'production'
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const templatePath = path.join(process.cwd(), '../../node_modules/@ecomplus/storefront-template/dist')
const { dependencies, peerDependencies } = require('./package.json')
const externals = require('@ecomplus/storefront-template/webpack.externals')

const output = {
  library: 'widgetTagManager',
  libraryTarget: 'umd',
  libraryExport: 'default',
  path: path.resolve(__dirname, 'dist'),
  filename: 'widget-tag-manager.min.js',
  publicPath: devMode ? '/' : '/assets/vendor/'
}
output.chunkFilename = output.filename.replace('.min.js', '.[name].min.js')

const generalConfig = {
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
    ? {
      '@ecomplus/utils': {
        commonjs: '@ecomplus/utils',
        commonjs2: '@ecomplus/utils',
        root: 'ecomUtils'
      }
    }
    : [
      externals,
      new RegExp('^(' +
        Object.entries({ ...dependencies, ...peerDependencies })
          .map(([pkg]) => pkg).filter(pkg => !externals[pkg]).join('|') +
        ')(/|$)', 'i')
    ]
}

if (devMode) {
  generalConfig.plugins.push(new HtmlWebpackPlugin({
    template: path.resolve(templatePath, 'monitor-gamer-asus-rog-swift-led-24-widescreen-fhd-pg248q.html')
  }))
}

module.exports = devMode ? generalConfig : [
  generalConfig,

  {
    ...generalConfig,
    output: {
      ...output,
      libraryTarget: 'var',
      filename: output.filename.replace('.min.js', '.var.min.js'),
      path: path.join(output.path, 'public')
    },
    externals
  }
]
