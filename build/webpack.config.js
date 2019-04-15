'use strict'

// use Node.js path module for compatibility
const path = require('path')
// load project directories
const { src, pub, output } = require('./lib/paths')
// Netlify CMS content
const content = require('./lib/cms')
// read views folder recursivily
const recursive = require('recursive-readdir')

// load Webpack and plugins
// const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const WorkboxPlugin = require('workbox-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const StorefrontTwbsPlugin = require('@ecomplus/storefront-twbs/src/webpack-plugin')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = () => {
  return new Promise((resolve, reject) => {
    content.catch(reject).then(cms => {
      // site settings
      const { settings } = cms
      const primaryColor = settings.primary_color || '#3fe3e3'
      const secondaryColor = settings.secondary_color || '#5e1efe'

      // setup Webpack plugins
      const plugins = [
        // clear dist folder
        new CleanWebpackPlugin(),

        // build {output}/storefront-twbs.min.css
        new StorefrontTwbsPlugin({
          baseDir: path.resolve(src, 'scss', 'storefront-twbs'),
          outputDir: output,
          primaryColor,
          secondaryColor
        }),

        // extract CSS to file
        new MiniCssExtractPlugin({
          filename: 'styles.[chunkhash].css'
        }),

        // create manifest.json file
        new WebpackPwaManifest({
          name: settings.name || 'My Shop',
          short_name: settings.short_name || 'MyShop',
          description: settings.description || 'My PWA Shop',
          background_color: settings.bg_color || '#ffffff',
          // can be null, use-credentials or anonymous
          crossorigin: 'use-credentials',
          icons: [{
            src: settings.icon
              ? path.resolve(pub, 'img', 'uploads', settings.icon)
              : path.resolve(pub, 'img', 'icon.png'),
            // multiple sizes
            sizes: [ 96, 128, 192, 256, 384, 512 ]
          }, {
            src: settings.large_icon
              ? path.resolve(pub, 'img', 'uploads', settings.large_icon)
              : path.resolve(pub, 'img', 'large-icon.png'),
            // can also use the specifications pattern
            size: '1024x1024'
          }]
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

      // setup common options for HTML plugin
      const views = path.resolve(src, 'views')
      const templateOptions = {
        templateParameters: cms,
        minify: !devMode
      }

      // parse EJS views to HTML files
      recursive(views, (err, files) => {
        if (err) {
          reject(err)
        } else {
          files.forEach(template => {
            let addView = filename => {
              // add a view to compile
              plugins.push(new HtmlWebpackPlugin({
                filename,
                template,
                ...templateOptions
              }))
            }

            // remove the path from template filename string
            let filename = template.slice(views.length + 1).replace('.ejs', '')
            if (filename.startsWith('_cms')) {
              // compile multiple files
              // for blog posts and extra pages
              // remove '_cms/' to get 'blog-posts' string
              let folder = filename.slice(5)
              if (cms.hasOwnProperty(folder)) {
                // render each slug
                for (let slug in cms[folder]) {
                  if (cms[folder].hasOwnProperty(slug)) {
                    addView(slug)
                  }
                }
              }
            } else {
              // preseted view
              addView(filename + '.html')
            }
          })

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
                    {
                      loader: 'sass-loader',
                      options: {
                        // inject brand colors
                        data: '$primary: ' + primaryColor + '; $secondary: ' + secondaryColor + '; '
                      }
                    }
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

            plugins
          })
        }
      })
    })
  })
}
