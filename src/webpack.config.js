'use strict'

const pkg = require('./../package.json')

// use Node.js path module for compatibility
const path = require('path')
const fs = require('fs')
// load project directories
const { src, pub, output } = require('./lib/paths')
// Netlify CMS content
const cms = require('./lib/cms')
// rewrite E-Com Plus resources slugs
const slugs = require('./lib/slugs')
// read views folder recursivily
const recursive = require('recursive-readdir')
// parse EJS markup
const ejs = require('ejs')
// markdown parser
const md = require('markdown-it')()

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
          name: settings.name || 'My Shop',
          short_name: settings.short_name || 'MyShop',
          description: settings.description || 'My PWA Shop',
          background_color: settings.bg_color || '#ffffff',
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

        // copy files from public folder recursivily
        new CopyPlugin([
          { from: pub, to: output },
          // Storefront twbs theme assets
          {
            from: path.resolve(twbsDir, 'theme', 'assets'),
            to: path.resolve(output, 'assets')
          }
        ])
      ]

      // setup common options for HTML plugin
      const includes = path.resolve(src, 'views', 'includes')
      const pages = path.resolve(src, 'views', 'pages')
      const templateOptions = {
        templateParameters: { ...data, md },
        minify: !devMode,
        meta: { 'generator': pkg.name + '@' + pkg.version }
      }

      // create a Webpack plugin to handle EJS includes
      class TemplateIncludesPlugin {
        // `apply` as its prototype method which is supplied with compiler as its argument
        apply (compiler) {
          compiler.hooks.beforeCompile.tapAsync(
            'TemplateIncludesPlugin',

            (params, callback) => {
              // parse EJS partials to template params functions
              recursive(includes, (err, files) => {
                if (!err) {
                  // setup include function on template params
                  let templates = {}

                  templateOptions.templateParameters.include = (name, args = {}) => {
                    // parse EJS partial with CMS data and received args
                    let fn = templates[name]
                    if (typeof fn === 'function') {
                      return fn({ ...data, args })
                    }
                    // debug invalid include
                    let msg = `Can't include '${name}' EJS partial, ${name}.ejs does not exist!`
                    console.error(new Error(msg))
                    return ''
                  }

                  files.forEach(file => {
                    // remove the path from file string
                    let name = file.replace(includes + path.sep, '').replace('.ejs', '')
                    // fix path separator on name
                    if (path.sep !== '/') {
                      name = name.replace(new RegExp(path.sep, 'g'), '/')
                    }
                    // save EJS compiler on templates object
                    templates[name] = ejs.compile(fs.readFileSync(file, 'utf8'))
                  })
                } else {
                  console.error(err)
                }

                // continue Webpack compilation
                callback()
              })
            }
          )
        }
      }
      plugins.push(new TemplateIncludesPlugin())

      if (devMode) {
        // watch EJS partials on serve
        plugins.push(new ExtraWatchWebpackPlugin({
          dirs: [ includes ]
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
                stats: {
                  colors: true
                },
                devtool: 'source-map',
                performance: {
                  hints: devMode ? false : 'warning',
                  maxEntrypointSize: 600000,
                  maxAssetSize: 400000
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
                            data: '$primary: ' + (settings.primary_color || '#3fe3e3') + '; ' +
                              '$secondary: ' + (settings.secondary_color || '#5e1efe') + '; ',
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
