'use strict'

const fs = require('fs')
const path = require('path')
const paths = require('./lib/paths')
const entry = require('./lib/entry')
const jsonSassVars = require('json-sass-vars')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const WorkboxPlugin = require('workbox-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const {
  devMode,
  settings,
  primaryColor,
  secondaryColor,
  templatePkg,
  componentsPkg
} = require('./lib/config')

// check for custom service worker file
let swSrc
try {
  swSrc = path.resolve(paths.pub, 'sw.js')
  if (!fs.existsSync(swSrc)) {
    // use default sw.js
    swSrc = path.resolve(__dirname, 'assets/sw.js')
  }
} catch (err) {
  console.error(err)
}

// base output name for entry files on production
const filenameSchema = process.env.WEBPACK_OUTPUT_FILENAME || '[name].[contenthash]'

// setup base loaders for styles module
// parse SCSS and fix compiled CSS with Postcss
const baseScssModule = [
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

  {
    loader: 'sass-loader',
    options: {
      // inject brand colors
      prependData: `$primary: ${primaryColor}; ` +
        `$secondary: ${secondaryColor}; ` +
        `$settings-theme: ${jsonSassVars.convertJs(settings.theme || {})}; `,
      sassOptions: {
        // include path to import from node modules
        includePaths: [
          paths.modules,
          // monorepo support
          path.join(__dirname, '../../../node_modules')
        ],
        importer (file, prev, done) {
          if (file.startsWith('#template/')) {
            return done({
              file: path.join(paths.modules, templatePkg, file.substr(1))
            })
          }
          done({ file })
        }
      }
    }
  }
]

// starter Webpack config object
let config = {
  mode: devMode ? 'development' : 'production',
  stats: {
    colors: true
  },
  devtool: 'source-map',
  performance: {
    hints: devMode ? false : 'warning',
    maxEntrypointSize: 1000000,
    maxAssetSize: 1000000
  },

  resolve: {
    mainFields: ['module', 'browser', 'main'],
    extensions: ['.wasm', '.mjs', '.js', '.json', '.vue'],
    alias: {
      '#template': `${templatePkg}/template`,
      '#components': `${componentsPkg}/src`
    }
  },

  entry,
  output: {
    path: paths.output,
    publicPath: '/',
    filename: devMode ? '[name].js' : `${filenameSchema}.js`,
    chunkFilename: '[contenthash].js'
  },

  optimization: {
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    // extract CSS to file
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : `${filenameSchema}.css`,
      chunkFilename: '[contenthash].css',
      ignoreOrder: true
    }),
    // handle Vue SFC
    new VueLoaderPlugin()
  ],

  module: {
    rules: [
      // extract CSS only for SCSS entries
      // prevents multiple CSS files (per Vue component)
      {
        test: /\.s?css$/,
        oneOf: [{
          resourceQuery: /^\?vue/,
          use: ['vue-style-loader'].concat(baseScssModule)
        }, {
          use: [MiniCssExtractPlugin.loader].concat(baseScssModule)
        }]
      },

      // transpile and polyfill JS with Babel
      {
        test: /^(.(?!\.min\.js$))+\.m?js$/,
        exclude: process.env.BABEL_LOADER_EXCLUDE ||
          /node_modules(?!\/@ecomplus\/[^/]+\/(?!dist))/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: '3.6',
                modules: false
              }]
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import'
            ]
          }
        }
      },

      // compile Vue component files to JS/CSS
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            whitespace: devMode ? 'preserve' : 'condense'
          }
        }
      }
    ]
  }
}

if (!process.env.WEBPACK_BUILD_LIB) {
  config.plugins.push(
    // clear dist folder
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),

    // create manifest.json file
    new WebpackPwaManifest({
      filename: 'manifest.json',
      name: settings.name || 'My Shop',
      short_name: settings.short_name || 'MyShop',
      description: settings.description || 'My PWA Shop',
      background_color: settings.bg_color || '#ffffff',
      theme_color: primaryColor,
      crossorigin: 'use-credentials',
      icons: [{
        src: settings.icon
          ? path.join(paths.pub, settings.icon)
          : path.resolve(paths.img, 'icon.png'),
        // multiple icon sizes
        sizes: [96, 128, 192]
      }, {
        src: settings.large_icon
          ? path.join(paths.pub, settings.large_icon)
          : path.resolve(paths.img, 'large-icon.png'),
        sizes: [384, 512]
      }]
    }),

    // create service worker file
    new WorkboxPlugin.InjectManifest({ swSrc, swDest: 'sw.js' }),

    // copy files from public folders recursivily
    new CopyPlugin([{ from: paths.pub, to: paths.output }])
  )

  // handle configurable options by CLI args
  if (process.argv.indexOf('--verbose') === -1) {
    // default Webpack output with less logs
    const { stats } = config
    stats.assets = stats.chunks = stats.modules = stats.children = false
  }
}

// optionally merge custom config objects
const webpackMerge = require('webpack-merge')
const tryConfigMerge = moduleName => {
  let customConfig
  try {
    customConfig = require(moduleName)
    config = webpackMerge(config, customConfig)
  } catch (e) {
    // ignore error
    return false
  }
  return true
}

// merge configs from template package and current storefront deploy
const configFilename = 'storefront.webpack'
const templateConfigFilepath = `${templatePkg}/${configFilename}`
if (!tryConfigMerge(templateConfigFilepath)) {
  // monorepo support
  tryConfigMerge(path.join(__dirname, `../../../${templateConfigFilepath}`))
}
tryConfigMerge(path.join(process.cwd(), configFilename))

// export Webpack config for storefront templates
module.exports = config
