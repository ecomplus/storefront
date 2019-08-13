'use strict'

const devMode = process.env.NODE_ENV !== 'production'
const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: [
    path.resolve(__dirname, 'scss/styles.scss'),
    path.resolve(__dirname, 'src/index.js')
  ],
  output: {
    library: '__storefront_twbs',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: 'storefront-twbs.min.js'
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'test'),
    port: 3376,
    open: true
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  performance: {
    hints: devMode ? false : 'warning',
    maxEntrypointSize: 500000,
    maxAssetSize: 500000
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'storefront-twbs.min.css'
    })
  ],

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              minimize: !devMode,
              plugins: [
                require('autoprefixer')(),
                require('cssnano')({ preset: 'default' })
              ]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },

  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  externals: devMode ? {} : {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      root: 'Vue'
    }
  }
}
