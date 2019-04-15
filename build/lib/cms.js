'use strict'

// Node.js modules
const path = require('path')
const fs = require('fs')
// read Netlify CMS content folder recursivily
const recursive = require('recursive-readdir')

// read content JSON files
const dir = require('./paths').content
const dirLength = dir.length
const data = {}

// returns a promise for the async process
module.exports = new Promise((resolve, reject) => {
  // start recursive dir read
  recursive(dir, [ 'README.md' ], (err, files) => {
    if (!err) {
      files.forEach(file => {
        // moving inside data dir by reference
        let obj = data

        file.slice(dirLength).split(path.sep).forEach(path => {
          if (path !== '') {
            if (!obj.hasOwnProperty(path)) {
              let filename = path.replace('.json', '')
              if (filename === path) {
                // folder
                obj[path] = {}
                obj = obj[path]
              } else {
                // the JSON file itself
                try {
                  obj[filename] = JSON.parse(fs.readFileSync(file, 'utf8'))
                } catch (e) {
                  // ignore invalid JSON string
                  obj[filename] = {}
                }
              }
            }
          }
        })
      })

      // all done
      resolve(data)
    } else {
      reject(err)
    }
  })
})
