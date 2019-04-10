'use strict'

// use Node.js path module for compatibility
const path = require('path')
// read Netlify CMS content folder recursivily
const recursive = require('recursive-readdir')

// read content JSON files
const dir = path.resolve(process.cwd(), 'content')
recursive(dir, [ 'README.md' ], (err, files) => {
  if (!err) {
    console.log(files)
  } else {
    console.error(err)
  }
})
