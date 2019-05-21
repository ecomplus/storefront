'use strict'

const pkg = require('./../package.json')

// use Node.js path module for compatibility
const path = require('path')
const fs = require('fs')
// read views folder recursivily
const recursive = require('recursive-readdir')
// markdown parser
const md = require('markdown-it')()
// load project directories
const { src, pub, content, output, app } = require('./lib/paths')
// Netlify CMS content
const cms = require('./lib/cms')
// rewrite E-Com Plus resources slugs
const slugs = require('./lib/slugs')
// setup Webpack plugin for template includes
const templateIncludes = require('./plugins/template-includes')

// load Webpack and plugins
// const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const WorkboxPlugin = require('workbox-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = () => {
  return new Promise((resolve, reject) => {
    cms.catch(reject).then(data => {
      // site settings
      const { settings } = data
      // handle URL rewrites on development server
      const rewrites = []
      // Storefront twbs theme base dir
      const twbsDir = path.resolve(src, 'scss', 'storefront-twbs')
      const primaryColor = settings.primary_color || '#3fe3e3'
      const secondaryColor = settings.secondary_color || '#5e1efe'

      const copy = [
        { from: pub, to: output },
        // settings JSON
        {
          from: path.resolve(content, 'settings.json'),
          to: path.resolve(output, '__settings.json')
        },
        // Storefront twbs theme assets
        {
          from: path.resolve(twbsDir, 'theme', 'assets'),
          to: path.resolve(output, 'assets')
        }
      ]
      if (fs.existsSync(app)) {
        // @ecomplus/storefront-app
        copy.push({
          from: app,
          to: path.resolve(output, 'app')
        }, {
          from: path.join(app, '__static'),
          to: path.resolve(output, '__static')
        })
      }

      // setup Webpack plugins
      const plugins = [
        // clear dist folder
        new CleanWebpackPlugin(),

        // extract CSS to file
        new MiniCssExtractPlugin({
          filename: 'styles.[chunkhash].css'
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
              ? path.join(pub, settings.icon)
              : path.resolve(pub, 'img', 'icon.png'),
            // multiple sizes
            sizes: [ 96, 128, 192 ]
          }, {
            src: settings.large_icon
              ? path.join(pub, settings.large_icon)
              : path.resolve(pub, 'img', 'large-icon.png'),
            sizes: [ 384, 512 ]
          }]
        }),

        // create service worker file
        new WorkboxPlugin.InjectManifest({
          swSrc: path.resolve(__dirname, 'sw.js'),
          swDest: 'sw.js'
        }),

        // copy files from public folders recursivily
        new CopyPlugin(copy)
      ]

      // setup common options for HTML plugin
      const partials = path.resolve(src, 'views', 'partials')
      const pages = path.resolve(src, 'views', 'pages')
      const templateOptions = {
        templateParameters: { ...data, md },
        minify: !devMode,
        meta: {
          'generator': pkg.name + '@' + pkg.version,
          'theme-color': primaryColor
        }
      }

      // Webpack plugin to handle EJS includes
      const TemplateIncludesPlugin = templateIncludes(partials, templateOptions, data)
      plugins.push(new TemplateIncludesPlugin())

      if (devMode) {
        // watch EJS partials on serve
        plugins.push(new ExtraWatchWebpackPlugin({
          dirs: [ partials ]
        }))
      }

      // parse EJS views to HTML files
      recursive(pages, (err, files) => {
        if (err) {
          reject(err)
        } else {
          files.forEach(template => {
            let addView = slug => {
              // add slug to template params
              templateOptions.templateParameters.slug = slug
              // add a view to compile
              plugins.push(new HtmlWebpackPlugin({
                filename: slug + '.html',
                template,
                ...templateOptions
              }))

              if (devMode) {
                // rewrite the slug to HTML file
                rewrites.push({
                  from: new RegExp('^/' + slug + '$'),
                  to: '/' + slug + '.html'
                })
              }
            }

            // remove the path from template filename string
            let filename = template.slice(pages.length + 1).replace('.ejs', '')
            if (filename.startsWith('_cms')) {
              // compile multiple files
              // for blog posts and extra pages
              // remove '_cms/' to get 'blog-posts' string
              let folder = filename.slice(5)
              if (data.hasOwnProperty(folder)) {
                // render each slug
                for (let slug in data[folder]) {
                  if (data[folder].hasOwnProperty(slug)) {
                    addView(slug)
                  }
                }
              }
            } else {
              // preseted view
              addView(filename)
            }
          })

          // wait for slugs promise
          slugs.catch(err => console.error(err)).then(slugsByResources => {
            if (devMode) {
              // setup rewrites for resource slugs
              for (let resource in slugsByResources) {
                if (slugsByResources.hasOwnProperty(resource)) {
                  // rewrite each slug to respective resource page
                  slugsByResources[resource].forEach(slug => {
                    if (slug) {
                      rewrites.push({
                        from: new RegExp('^/' + slug + '$'),
                        to: '/_' + resource + '.html'
                      })
                    }
                  })
                }
              }
            }
          })

            .finally(() => {
              // check for verbose output option
              let stats = { colors: true }
              if (process.argv.indexOf('--verbose') === -1) {
                // default Webpack output with less logs
                stats.assets = stats.chunks = stats.modules = stats.children = false
              }

              // start compilation
              // resolve promise with webpack config object
              resolve({
                entry: [
                  path.resolve(src, 'js', 'index.js'),
                  path.resolve(src, 'scss', 'styles.scss')
                ],
                output: {
                  path: output,
                  publicPath: '/',
                  filename: 'storefront.[chunkhash].js'
                },
                resolve: {
                  alias: {
                    vue: 'vue/dist/vue.js',
                    '@ecomplus/storefront-renderer': '@ecomplus/storefront-renderer/dist/storefront.min.js'
                  }
                },
                stats,
                devtool: 'source-map',
                performance: {
                  hints: devMode ? false : 'warning',
                  maxEntrypointSize: 600000,
                  maxAssetSize: 800000
                },

                // setup development server
                devServer: {
                  compress: true,
                  port: 9123,
                  contentBase: output,
                  // history API with rewrites for resources slugs
                  historyApiFallback: { rewrites }
                },

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
                            data: '$primary: ' + primaryColor + '; ' +
                              '$secondary: ' + secondaryColor + '; ',
                            // include paths to handle storefront-twbs (and not only)
                            includePaths: [
                              path.resolve(process.cwd(), 'node_modules'),
                              twbsDir
                            ]
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
                          ],
                          plugins: [
                            '@babel/plugin-syntax-dynamic-import'
                          ]
                        }
                      }
                    }
                  ]
                },

                plugins
              })
            })
        }
      })
    })
  })
}
