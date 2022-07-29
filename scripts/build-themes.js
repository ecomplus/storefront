#!/usr/bin/env node

const sass = require('sass')
const path = require('path')
const fs = require('fs')
const ROOT_DIR = path.resolve(__dirname, '..')

const ouputCssPath = path.resolve(ROOT_DIR, 'dist/themes')
if (!fs.existsSync(ouputCssPath)) {
  fs.mkdirSync(ouputCssPath, { recursive: true })
}

const bootswatchThemes = [
  '',
  'cerulean',
  'cosmo',
  'cyborg',
  'darkly',
  'flatly',
  'journal',
  'litera',
  'lumen',
  'lux',
  'materia',
  'minty',
  'pulse',
  'sandstone',
  'simplex',
  'sketchy',
  'slate',
  'solar',
  'spacelab',
  'united',
  'yeti'
]
const storeThemes = [
  '',
  'ecom-beauty',
  'clean-white',
  'clean-gray',
  'clean-dark',
  'niche-baby',
  'niche-flowers',
  'niche-game'
]

const rendererScssPresets = `
  $primary: #222222;
  $secondary: #777777;
`
const readScssFile = filepath => fs.readFileSync(filepath).toString('utf8')
const templateScssVars = readScssFile(path.resolve(ROOT_DIR, '@ecomplus/storefront-template/template/scss/_variables.scss'))
const templateScssMain = readScssFile(path.resolve(ROOT_DIR, '@ecomplus/storefront-template/template/scss/_main.scss'))
let uiScssVars = ''
;[
  '@ecomplus/storefront-twbs/scss/presets/_defaults.scss',
  '@ecomplus/storefront-twbs/scss/presets/_colors.scss',
  '@ecomplus/storefront-twbs/scss/_functions.scss',
  '@ecomplus/storefront-twbs/scss/_variables.scss',
  '@ecomplus/storefront-twbs/scss/_mixins.scss'
].forEach(filepath => {
  uiScssVars += readScssFile(path.resolve(ROOT_DIR, filepath))
})
const uiScssStyles = readScssFile(path.resolve(ROOT_DIR, '@ecomplus/storefront-twbs/scss/styles.scss'))

const themesPath = path.resolve(ROOT_DIR, '@ecomplus/storefront-template/template/scss/themes/')
const importThemeFiles = (themes, isVariables) => {
  let scss = ''
  themes.forEach(theme => {
    if (theme && theme.length > 1) {
      const scssFilename = isVariables ? '_variables.scss' : '_custom.scss'
      scss += fs.readFileSync(path.resolve(themesPath, theme, scssFilename)).toString('utf8')
    }
  })
  return scss
}

const compileScss = (themes, isBundle) => {
  let themesLabel = themes.join('_').replace(/^_|_$/g, '')
  if (themesLabel.length < 2) {
    return
  }

  let outputStyle
  let scss = rendererScssPresets +
    templateScssVars +
    importThemeFiles(themes, true)
  if (isBundle) {
    themesLabel += '.bundle.min'
    outputStyle = 'compressed'
    scss += uiScssStyles +
      importThemeFiles(themes) +
      templateScssMain
  } else {
    outputStyle = 'expanded'
    scss += uiScssVars +
      importThemeFiles(themes)
  }

  const outputCss = sass.compileString(scss, {
    loadPaths: [
      ROOT_DIR,
      '@ecomplus/storefront-twbs/scss/',
      '@ecomplus/storefront-twbs/scss/bootstrap/scss/',
      '@ecomplus/storefront-template/template/scss/',
      ...themes.map(theme => path.resolve(themesPath, theme)),
      path.resolve(ROOT_DIR, 'node_modules')
    ],
    style: outputStyle
  }).css.toString()

  if (outputCss) {
    fs.writeFile(`${ouputCssPath}/${themesLabel}.css`, outputCss, { flag: 'w' }, (err) => {
      if (err) {
        err.themes = themes
        console.error(err)
      } else {
        console.log(`Theme '${themesLabel}' compiled!`)
      }
    })
  }
}

bootswatchThemes.forEach(bootswatchTheme => {
  storeThemes.forEach(storeTheme => {
    console.log({ bootswatchTheme, storeTheme })
    const themes = [bootswatchTheme, storeTheme]
    compileScss(themes)
    compileScss(themes, true)
  })
})
