'use strict'

const devMode = process.env.NODE_ENV !== 'production'
const path = require('path')

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    library: 'WidgetTagManager',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: path.resolve(__dirname, 'dist'),
    filename: 'widget-tag-manager.min.js',
    globalObject: 'this'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'test'),
    compress: true,
    port: 9141,
    open: true
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  externals: devMode ? '' : /^(@babel\/runtime|core-js|@ecomplus\/utils)/
}
