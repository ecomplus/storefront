'use strict'

// use Node.js path module for compatibility
const path = require('path')
// load project directories
const { src, pub, output } = require('./paths')
// Netlify CMS content
const content = require('./cms')

// load Webpack and plugins
// const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const WorkboxPlugin = require('workbox-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = () => {
  return new Promise((resolve, reject) => {
    content.catch(reject).then(cms => {
      // resolve promise with webpack config object
      resolve({
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
        stats: {
          colors: true
        },
        devtool: 'source-map',

        module: {
          rules: [
            // parse SCSS and fix compiled CSS with Postcss
            {
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
            },

            // transpile and polyfill JS with Babel
            {
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
            }
          ]
        },

        plugins: [
          // clear dist folder
          new CleanWebpackPlugin(),

          // extract CSS to file
          new MiniCssExtractPlugin({
            filename: '[name].[chunkhash].css'
          }),

          // parse EJS views to HTML files
          new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(src, 'views', 'index.ejs')
          }),

          // create manifest.json file
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

          // create service-worker.js file
          new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true
          }),

          // just copy files from public folder recursivily
          new CopyPlugin([
            { from: pub, to: output }
          ])
        ]
      })
    })
  })
}
