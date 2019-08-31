#!/usr/bin/env node

'use strict'

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const settings = require('./../content/settings.json')

const templateFile = path.resolve(__dirname, 'styles.scss.ejs')
ejs.renderFile(templateFile, settings, {}, (err, scss) => {
  if (err) {
    console.error(err)
  } else {
    const filename = path.resolve(__dirname, '../template/scss/styles.scss')
    fs.writeFileSync(filename, scss, 'utf8')
    console.log(`[SCSS] ${filename}`)
  }
})
