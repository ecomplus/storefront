'use strict'

const { version } = require('./package.json')
const devMode = process.env.NODE_ENV !== 'production'
const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const output = {
  library: '__storefrontTwbs',
  libraryTarget: 'umd',
  path: path.resolve(__dirname, 'dist'),
  filename: 'storefront-twbs.bundle.min.js'
}
if (process.env.BUILD_OUTPUT === 'cdn') {
  output.path = path.resolve(__dirname, 'dist/cdn')
  output.publicPath = `https://cdn.jsdelivr.net/npm/@ecomplus/storefront-twbs@${version}/dist/cdn/`
}

const webpackConfig = {
  mode: devMode ? 'development' : 'production',
  entry: [
    path.resolve(__dirname, 'scss/styles.scss'),
    path.resolve(__dirname, 'src/index.js')
  ],
  output,

  devServer: {
    static: path.resolve(__dirname, '__tests__'),
    port: 3376,
    open: true
  },
  stats: {
    colors: true,
    children: false
  },
  devtool: 'source-map',
  performance: {
    hints: devMode ? false : 'warning',
    maxEntrypointSize: 500000,
    maxAssetSize: 500000
  },

  plugins: [
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
              postcssOptions: {
                postcssOptions: {
                  ident: 'postcss',
                  minimize: !devMode,
                  plugins: [
                    require('autoprefixer')(),
                    require('cssnano')({ preset: 'default' })
                  ]
                }
              }
            }
          },
          'sass-loader'
        ]
      },

      {
        test: /\.(woff|woff2|svg|eot|ttf|png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },

  resolve: {
    alias: {
      jquery$: 'jquery/dist/jquery.slim'
    }
  }
}

const externals = {
  jquery: {
    commonjs: 'jquery/dist/jquery.slim',
    commonjs2: 'jquery/dist/jquery.slim',
    root: '$'
  },
  'popper.js': {
    commonjs: 'popper.js',
    commonjs2: 'popper.js',
    root: 'Popper'
  }
}

module.exports = devMode
  ? [webpackConfig]
  : [
      {
        ...webpackConfig,
        entry: path.resolve(__dirname, 'src/index.js'),
        output: {
          ...output,
          libraryTarget: 'var',
          filename: output.filename.replace('.bundle', '.var'),
          path: path.resolve(output.path, 'public')
        },
        externals: Object.keys(externals).reduce((rootExternals, lib) => ({
          ...rootExternals,
          [lib]: externals[lib].root
        }), {})
      },

      {
        ...webpackConfig,
        entry: path.resolve(__dirname, 'src/index.js'),
        output: {
          ...output,
          filename: output.filename.replace('.bundle', '')
        },
        externals
      },

      webpackConfig
    ]
