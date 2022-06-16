
'use strict'

const { INIT_CWD } = process.env
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const { theme } = require(path.resolve(INIT_CWD, 'content/settings.json'))
let themeConfig
if (theme.custom && theme.custom !== '_') {
  themeConfig = require(path.join(__dirname, `../themes/${theme.custom}/config`))
}

const scriptFile = path.resolve(__dirname, '../template/js/lib/theme.js.ejs')
ejs.renderFile(scriptFile, { themeConfig, theme }, {}, (err, js) => {
  if (err) {
    console.error(err)
  } else {
    const filename = path.resolve(INIT_CWD, 'template/js/lib/theme.js')
    fs.writeFileSync(filename, js, 'utf8')
    console.log(`[JS] ${filename}`)
    console.log()
  }
})

const themesPath = INIT_CWD === path.resolve(__dirname, '..')
  ? 'themes' : '@ecomplus/storefront-template/template/scss/themes'
const templateFile = path.resolve(__dirname, '../template/scss/styles.scss.ejs')
ejs.renderFile(templateFile, { themesPath, theme }, {}, (err, scss) => {
  if (err) {
    console.error(err)
  } else {
    const filename = path.resolve(INIT_CWD, 'template/scss/styles.scss')
    fs.writeFileSync(filename, scss, 'utf8')
    console.log(`[SCSS] ${filename}`)
    console.log()
  }
})
