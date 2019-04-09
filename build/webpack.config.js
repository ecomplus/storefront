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
const WebpackPwaManifest = require('webpack-pwa-manifest')
const WorkboxPlugin = require('workbox-webpack-plugin')
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
    }),
    new WebpackPwaManifest({
      name: 'My Progressive Web App',
      short_name: 'MyPWA',
      description: 'My awesome Progressive Web App!',
      background_color: '#ffffff',
      // can be null, use-credentials or anonymous
      crossorigin: 'use-credentials' /*,
      icons: [{
        src: path.resolve('src/assets/icon.png'),
        // multiple sizes
        sizes: [ 96, 128, 192, 256, 384, 512 ]
      }, {
        src: path.resolve('src/assets/large-icon.png'),
        // can also use the specifications pattern
        size: '1024x1024'
      }] */
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map'
}
