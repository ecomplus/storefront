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
  lang,
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

// inject brand colors
let scssInject = `$primary: ${primaryColor}; ` +
`$secondary: ${secondaryColor}; ` +
`$settings-theme: ${jsonSassVars.convertJs(settings.theme || {})}; `
if (settings.icons_font && settings.icons_font.length > 2) {
  scssInject += `$icons-font: "${settings.icons_font}"; `
}
if (settings.font_family && settings.font_family.length > 2) {
  const fontUrl = 'https://fonts.googleapis.com/css2' +
    `?family=${settings.font_family.replace(/\s+/g, '+')}` +
      ':wght@300;400;700&display=swap'
  scssInject += `$web-font-path: "${fontUrl}"; ` +
    `$font-family-sans-serif: "${settings.font_family}", ` +
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", ' +
      'Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", ' +
      '"Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; '
}

// setup base loaders for styles module
// parse SCSS and fix compiled CSS with Postcss
const getBaseScssModule = () => ([
  {
    loader: 'css-loader',
    options: {
      sourceMap: true
    }
  },
  {
    loader: 'resolve-url-loader',
    options: {
      sourceMap: devMode
    }
  },

  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        ident: 'postcss',
        minimize: !devMode,
        plugins: [
          require('autoprefixer')(),
          require('cssnano')({ preset: 'default' })
        ]
      },
      sourceMap: true
    }
  },

  {
    loader: 'sass-loader',
    options: {
      additionalData: scssInject,
      sassOptions: {
        // include path to import from node modules
        includePaths: [
          paths.modules,
          // monorepo support
          path.join(__dirname, '../../../node_modules'),
          path.join(__dirname, '../../../../node_modules')
        ],
        importer (file, prev, done) {
          if (file.startsWith('#template/')) {
            return done({
              file: path.join(paths.modules, templatePkg, file.substr(1))
            })
          }
          done({ file })
        }
      },
      sourceMap: true
    }
  }
])

// starter Webpack config object
let config = {
  mode: devMode ? 'development' : 'production',
  stats: {
    colors: true
  },
  devtool: devMode ? 'source-map' : 'cheap-source-map',
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
      '#components': `${componentsPkg}/src`,
      '@ecomplus/i18n$': `@ecomplus/i18n/src/${lang}/`,
      vue: 'vue/dist/vue.runtime.esm'
    }
  },

  entry,
  output: {
    path: paths.output,
    publicPath: '/',
    filename: devMode ? '[name].js' : `${filenameSchema}.js`,
    chunkFilename: 'chunk.[contenthash].js'
  },

  optimization: {
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    // extract CSS to file
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : `${filenameSchema}.css`,
      chunkFilename: 'chunk.[contenthash].css',
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
          use: ['vue-style-loader'].concat(getBaseScssModule())
        }, {
          use: [MiniCssExtractPlugin.loader].concat(getBaseScssModule())
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
                corejs: '3.20',
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
      },

      // inline small fonts and images
      // fallback to file loader by default
      {
        test: /\.woff2$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 16384
            }
          }
        ]
      },
      {
        test: /\.(woff|svg|eot|ttf|png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },

      {
        test: /\.(ejs|txt)$/,
        use: 'raw-loader'
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

    // copy files from public folders recursivily
    new CopyPlugin({
      patterns: [
        { from: paths.pub, to: paths.output }
      ]
    })
  )

  if (!devMode || process.argv.indexOf('--sw') > -1) {
    config.plugins.push(
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
      new WorkboxPlugin.InjectManifest({
        swSrc,
        swDest: 'sw.js',
        include: [/.*storefront\..*\.(css|js)$/]
      })
    )
  }

  if (devMode && process.argv.indexOf('--analyze') > -1) {
    // start JS bundle analyzer
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
    config.plugins.push(new BundleAnalyzerPlugin())
  }

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
    config = webpackMerge(
      config,
      typeof customConfig === 'function'
        ? customConfig({ devMode })
        : customConfig
    )
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
