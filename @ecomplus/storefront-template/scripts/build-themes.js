const sass = require('node-sass')
const path = require('path')
const fs = require('fs')
const themesPath = path.resolve(__dirname, '../template/scss/themes/')
const ROOT_DIR = path.resolve(__dirname, '../../../')

let boostrapDefaults = fs.readFileSync(path.resolve(__dirname, '../../storefront-twbs/scss/_variables.scss')).toString('utf8')
const themesCssDir = `${ROOT_DIR}/.deploy/themes`

if (!fs.existsSync(themesCssDir)) {
  fs.mkdirSync(themesCssDir, { recursive: true })
}

fs.readdir(themesPath, (err, dirs) => {
  dirs.forEach(dir => {
    let styleSheet = ''
    fs.readdir(`${themesPath}/${dir}`, (err, files) => {
      ;['_variables.scss', '_custom.scss'].forEach((name) => {
        try {
          if (files.includes(name)) {
            const filePath = path.resolve(`${themesPath}/${dir}/${name}`)
            styleSheet += fs.readFileSync(filePath).toString('utf8')
          }
        } catch (error) {
          console.error('Theme not found: ' + name, error.toString())
        }
      })

      const styleAll = sass.renderSync({
        data: boostrapDefaults + ' ' + styleSheet,
      }).css.toString()
      
      if (styleAll) {
        if (!fs.existsSync(`${themesCssDir}/${dir}`)) {
          fs.mkdirSync(`${themesCssDir}/${dir}`, { recursive: true })
        }

        fs.writeFile(`${themesCssDir}/${dir}/style.css`, styleAll, { flag: 'w' }, (err) => {
          if (err) {
            console.error('Error with theme: ' , dir, err)
          } else {
            console.log('Style parsed!', dir)
          }
        })
      }
    })
  })
})
