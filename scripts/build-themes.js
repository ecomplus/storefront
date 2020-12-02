const sass = require('node-sass')
const path = require('path')
const fs = require('fs')
const ROOT_DIR = path.resolve(__dirname, '..')

let scssVars = ''
;[
  '@ecomplus/storefront-template/template/scss/_variables.scss',
  '@ecomplus/storefront-twbs/scss/_variables.scss'
].forEach(filepath => {
  scssVars += fs.readFileSync(path.resolve(ROOT_DIR, filepath)).toString('utf8')
})

const ouputCssPath = path.resolve(ROOT_DIR, 'dist/themes')
if (!fs.existsSync(ouputCssPath)) {
  fs.mkdirSync(ouputCssPath, { recursive: true })
}

const themesPath = path.resolve(ROOT_DIR, '@ecomplus/storefront-template/template/scss/themes/')
const themes = fs.readdirSync(themesPath)
themes.forEach(theme => {
  let styleSheet = ''
  const themePath = path.resolve(themesPath, theme)
  const scssFiles = fs.readdirSync(themePath)
  ;['_variables.scss', '_custom.scss'].forEach(scssFile => {
    if (scssFiles.includes(scssFile)) {
      styleSheet += fs.readFileSync(path.resolve(themePath, scssFile)).toString('utf8')
    }
  })

  const outputCss = sass.renderSync({
    data: `${scssVars} ${styleSheet}`
  }).css.toString()

  if (outputCss) {
    fs.writeFile(`${ouputCssPath}/${theme}.css`, outputCss, { flag: 'w' }, (err) => {
      if (err) {
        err.theme = theme
        console.error(err)
      } else {
        console.log(`Theme ${theme} compiled!`)
      }
    })
  }
})
