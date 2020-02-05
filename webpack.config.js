'use strict'

const { INIT_CWD, NODE_ENV } = process.env

const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

const devMode = NODE_ENV !== 'production'

const { webpackOutput } = require(path.join(INIT_CWD, './package.json'))
const externals = require('./packages/@ecomplus/storefront-template/webpack.externals')
const templatePath = path.join(__dirname, './node_modules/@ecomplus/storefront-snapshot')

const output = {
  library: 'widget',
  libraryTarget: 'umd',
  libraryExport: 'default',
  path: path.resolve(INIT_CWD, 'dist'),
  filename: 'widget.min.js',
  publicPath: devMode ? '/' : '/assets/vendor/',
  ...webpackOutput
}
output.chunkFilename = output.filename.replace('.min.js', '.[name].min.js')

const baseModuleRules = [
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
      compilerOptions: {
        whitespace: devMode ? 'preserve' : 'condense'
      }
    }
  },
  {
    test: /\.(png|jpe?g|gif|svg)$/i,
    use: 'file-loader'
  },
  {
    test: /\.s?css$/,
    use: [
      'vue-style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          minimize: !devMode,
          plugins: [
            autoprefixer(),
            cssnano({ preset: 'default' })
          ]
        }
      },
      'sass-loader'
    ]
  }
]

const moduleRulesWithPolyfill = baseModuleRules.concat([{
  test: /^(.(?!\.min.js$))+\.m?js$/,
  loader: 'babel-loader'
}])

const generalConfig = {
  mode: devMode ? 'development' : 'production',
  entry: path.resolve(INIT_CWD, devMode ? '__tests__/index.js' : 'src/index.js'),
  output,
  devServer: {
    contentBase: templatePath,
    stats: 'minimal',
    port: 9128,
    open: true
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  plugins: [
    new VueLoaderPlugin()
  ],
  module: {
    rules: moduleRulesWithPolyfill
  },
  externals
}

if (devMode) {
  generalConfig.plugins.push(new HtmlWebpackPlugin({
    template: path.resolve(templatePath, 'index.html')
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
