'use strict'

const devMode = process.env.NODE_ENV !== 'production'
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const templatePath = path.join(process.cwd(), 'node_modules/@ecomplus/storefront-snapshot')
const { dependencies, peerDependencies } = require('./package.json')
const externals = require('@ecomplus/storefront-snapshot/webpack.externals')

const output = {
  library: 'widgetExampleName',
  libraryTarget: 'umd',
  libraryExport: 'default',
  path: path.resolve(__dirname, 'dist'),
  filename: 'widget-example-name.min.js',
  publicPath: devMode ? '/' : '/assets/vendor/'
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
            require('autoprefixer')(),
            require('cssnano')({ preset: 'default' })
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
  entry: path.resolve(__dirname, devMode ? 'docs/demo.js' : 'src/index.js'),
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
    template: path.resolve(templatePath, 'index.html')
  }))
}

module.exports = devMode ? generalConfig : [
  generalConfig,

  {
    ...generalConfig,
    module: {
      rules: baseModuleRules
    },
    optimization: {
      minimize: false
    },
    output: {
      ...output,
      filename: output.filename.replace('.min.js', '.es.js')
    }
  },

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
