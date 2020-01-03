'use strict'

const fs = require('fs')
const path = require('path')
const paths = require('./lib/paths')
const jsonSassVars = require('json-sass-vars')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const WorkboxPlugin = require('workbox-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const {
  devMode,
  settings,
  primaryColor,
  secondaryColor
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

// entry files
const entry = {}
// default module first
entry.storefront = [path.resolve(paths.scss, 'styles.scss')]
if (!devMode && !process.env.WEBPACK_BUILD_DEV) {
  // start service worker on production only
  entry.storefront.push(path.resolve(__dirname, 'assets/starter.js'))
}
// index.js must be the last to export lib correctly if any
entry.storefront.push(path.resolve(paths.js, 'index.js'))

// additional modules
;['scss', 'js'].forEach(filetype => {
  const srcPath = paths[filetype]
  const ext = `.${filetype}`
  fs.readdirSync(srcPath).forEach(file => {
    switch (file) {
      case 'index.js':
      case 'styles.scss':
        // already included on default module
        break
      default:
        if (file.endsWith(ext) && !file.startsWith('_')) {
          const name = file.replace(ext, '')
          if (!entry[name]) {
            const filepath = path.resolve(srcPath, file)
            // ensure it's not a directory
            if (!fs.statSync(filepath).isDirectory()) {
              entry[name] = filepath
            }
          }
        }
    }
  })
})

// setup base Webpack config object
const config = {
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
    mainFields: ['module', 'browser', 'main']
  },

  entry,
  output: {
    path: paths.output,
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },

  plugins: [
    // extract CSS to file
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],

  module: {
    rules: [
      // parse SCSS and fix compiled CSS with Postcss
      {
        test: /\.s?css$/,
        use: [
          process.platform !== 'win32' ? MiniCssExtractPlugin.loader : 'style-loader',
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
              data: `$primary: ${primaryColor}; ` +
                `$secondary: ${secondaryColor}; ` +
                `$settings-theme: ${jsonSassVars.convertJs(settings.theme || {})}; `,
              // include path to import from node modules
              includePaths: [paths.modules]
            }
          }
        ]
      },

      // transpile and polyfill JS with Babel
      {
        test: /^(.(\.runtime|(?!\.min.js$)))+\.m?js$/,
        exclude: process.env.BABEL_LOADER_EXCLUDE ||
          /node_modules(\/(?![^/]+(\/[^/]+)?\/template\/js\/).+)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { useBuiltIns: 'usage', corejs: '3.6' }]
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import'
            ]
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

// optionally merge custom config object
let customConfig
try {
  customConfig = require(path.join(process.cwd(), 'storefront.webpack'))
} catch (e) {
}

// export Webpack config for storefront templates
module.exports = typeof customConfig === 'object' && customConfig
  ? require('webpack-merge')(config, customConfig)
  : config
