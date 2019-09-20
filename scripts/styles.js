#!/usr/bin/env node

'use strict'

const { INIT_CWD } = process.env
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const { theme } = require(path.resolve(INIT_CWD, 'content/settings.json'))

const templateFile = path.resolve(__dirname, 'styles.scss.ejs')
ejs.renderFile(templateFile, theme, {}, (err, scss) => {
  if (err) {
    console.error(err)
  } else {
    const filename = path.resolve(INIT_CWD, 'template/scss/styles.scss')
    fs.writeFileSync(filename, scss, 'utf8')
    console.log(`[SCSS] ${filename}`)
    console.log()
  }
})
