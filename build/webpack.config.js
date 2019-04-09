'use strict'

// use Node.js path module for compatibility
const path = require('path')
// load project directories
const { src, output } = require('./paths')

// load Webpack and plugins
// const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: [
    path.resolve(src, 'js', 'index.js'),
    path.resolve(src, 'scss', 'styles.scss')
  ],
  output: {
    path: output,
    filename: 'storefront.[chunkhash].js'
  },
  devServer: {
    compress: true,
    port: 9123
  },
  module: {
    rules: [{
      test: /\.s?css$/,
      use: [
        // fallback to style-loader in development
        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
              require('autoprefixer')()
            ]
          }
        },
        'sass-loader'
      ]
    }, {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            [ '@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 } ]
          ]
        }
      }
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(src, 'views', 'index.ejs')
    })
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map'
}
