'use strict'

// use Node.js path module for compatibility
const path = require('path')
// load project directories
const { src, output } = require('./paths')

// load Webpack and plugins
// const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(src, 'js', 'index.js'),
  output: {
    path: output,
    filename: 'storefront.[chunkhash].js'
  },
  devServer: {
    compress: true,
    port: 9123
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(src, 'views', 'index.ejs')
    })
  ]
}
