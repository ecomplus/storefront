'use strict'

// read partials folder recursivily
const recursive = require('recursive-readdir')
// parse EJS markup
const ejs = require('ejs')
// Node.js file modules
const path = require('path')
const fs = require('fs')

module.exports = (dir, templateParameters) => {
  // create a Webpack plugin to handle EJS includes
  // setup include function on template params
  const templates = {}

  const partial = (name, args = {}) => {
    // parse EJS partial with CMS data and received args
    let fn = templates[name]
    if (typeof fn === 'function') {
      return fn({
        ...templateParameters,
        args,
        partial
      })
    }
    // debug invalid include
    let msg = `Can't include '${name}' EJS partial` +
      `\n'template/views/partials/${name}.ejs' does not exist!`
    throw new Error(msg)
  }

  class TemplateIncludesPlugin {
    // `apply` as its prototype method which is supplied with compiler as its argument
    apply (compiler) {
      compiler.hooks.beforeCompile.tapAsync(
        'TemplateIncludesPlugin',

        (params, callback) => {
          // parse EJS partials to template params functions
          recursive(dir, (err, files) => {
            if (!err) {
              files.forEach(file => {
                // remove the path from file string
                let name = file.replace(dir + path.sep, '').replace('.ejs', '')
                // fix path separator on name
                if (path.sep !== '/') {
                  name = name.replace(new RegExp('\\' + path.sep, 'g'), '/')
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

  // returns Webpack plugin class and partial function
  return { TemplateIncludesPlugin, partial }
}
