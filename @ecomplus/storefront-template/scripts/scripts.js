
'use strict'

const { INIT_CWD } = process.env
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const { theme } = require(path.resolve(INIT_CWD, 'content/settings.json'))
const themesPath = INIT_CWD === path.resolve(__dirname, '..')
  ? 'themes' : '@ecomplus/storefront-template/template/js/themes'

const scriptFile = path.resolve(__dirname, '../template/js/scripts.js.ejs')
ejs.renderFile(scriptFile, { themesPath, theme }, {}, (err, js) => {
  if (err) {
    console.error(err)
  } else {
    const filename = path.resolve(INIT_CWD, 'template/js/scripts.js')
    fs.writeFileSync(filename, js, 'utf8')
    console.log(`[JS] ${filename}`)
    console.log()
  }
})
