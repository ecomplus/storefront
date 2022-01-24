import BasePreview from '../base-preview'
import virtualDoc from '../virtual-doc'
import fetchPage from '../fetch-page'
import { getColorYiq, getColorRgb, darkenColor, getThemeColors } from './lib/color-functions'
import setCustomFont from './lib/set-custom-font'

const themesUrl = 'https://cdn.jsdelivr.net/gh/ecomplus/storefront@themes-dist'

const fetchCssTheme = (themes) => {
  let mergedThemeLabel
  for (const themeType in themes) {
    const themeName = themes[themeType]
    if (themeName && themeName !== '_') {
      if (mergedThemeLabel) {
        mergedThemeLabel += `_${themeName}`
      } else {
        mergedThemeLabel = themeName
      }
    }
  }
  if (!mergedThemeLabel) {
    return Promise.resolve('')
  }
  return window.fetch(`${themesUrl}/${mergedThemeLabel}.bundle.min.css`)
}

const colorVariants = {
  whiter: -75,
  white: -50,
  lightest: -33,
  lighter: -21,
  light: -10,
  lighten: -7,
  darken: 8,
  dark: 10,
  darker: 13,
  darkest: 16,
  black: 50
}

const parseColorCssVars = (colorLabel, colorHex) => {
  return `--${colorLabel}: ${colorHex}; ` +
    `--${colorLabel}-yiq: ${getColorYiq(colorHex)}; ` +
    `--${colorLabel}-rgb: ${getColorRgb(colorHex)}; `
}

const genColorCssVars = (colorName, colorHex) => {
  let cssVars = parseColorCssVars(colorName, colorHex)
  for (const variant in colorVariants) {
    if (colorVariants[variant]) {
      cssVars += parseColorCssVars(`${colorName}-${variant}`, darkenColor(colorHex, colorVariants[variant]))
    }
  }
  return cssVars
}

const getVDocDiv = (vDoc, elId) => {
  let $el = vDoc.getElementById(elId)
  if (!$el) {
    $el = document.createElement('div')
    $el.id = elId
    vDoc.body.appendChild($el)
  }
  return $el
}

export default class CodePreview extends BasePreview {
  constructor () {
    super()
    this._ = {
      ...this._,
      state: {
        title: 'Geral'
      },
      route: {
        path: '/'
      }
    }

    this.bg_color = ''
    this.primary_color = ''
    this.secondary_color = ''
    this.logo = ''
    this.bootswatch = '_'
    this.custom = '_'
    this.icons_font = '_'
    this.font_family = '_'
  }

  fetchPage () {
    return fetchPage('/index.html').then(html => {
      const vDoc = virtualDoc(html)
      this.setState({ html, vDoc })
    }).catch(err => {
      console.log('Failed to fetch page home', err)
    })
  }

  componentDidUpdate (_, prevState) {
    setTimeout(async () => {
      const { vDoc } = this.state
      const { entry } = this.props
      const entries = entry.getIn(['data']).toJSON()
      const propsList = [
        'name',
        'bg_color',
        'primary_color',
        'secondary_color',
        'icons_font',
        'font_family'
      ]
      let isChanged = propsList.some(prop => (entries[prop] !== this[prop]))

      if (this.logo !== entries.logo) {
        this.logo = entries.logo
        const $logo = vDoc.getElementById('logo')
        $logo.src = this.logo
        $logo.alt = entries.name
        isChanged = true
      }

      const { theme } = entries
      const themeColors = getThemeColors(theme.bootswatch, theme.custom, {
        primary: entries.primary_color || '#20c997',
        secondary: entries.secondary_color || '#343a40'
      })

      getVDocDiv(vDoc, 'override_vars').innerHTML = `<style>
        body {
          ${genColorCssVars('primary', themeColors.primary)}
          ${genColorCssVars('secondary', themeColors.secondary)}
        }
        .lozad-delay.fade {
          opacity: 1 !important;
        }
      </style>`

      if (this.font_family !== entries.font_family) {
        getVDocDiv(vDoc, 'override_font').innerHTML = setCustomFont(entries.font_family)
      }

      if (
        this.bootswatch !== theme.bootswatch ||
        this.custom !== theme.custom ||
        this.icons_font !== entries.icons_font
      ) {
        const $loading = document.createElement('div')
        $loading.className = 'loading'
        document.body.appendChild($loading)
        let styles = ''
        await fetchCssTheme(theme).then(async response => {
          if (response.text) {
            styles += await response.text()
            styles += ' '
          }
        })
          .then(() => {
            const iconsFont = entries.icons_font
            if (iconsFont && iconsFont.length > 2) {
              styles = styles.replace(/\/icons\/[^/]+\/font/, `/icons/${iconsFont}/font`)
            }
            getVDocDiv(vDoc, 'storefront_themes').innerHTML = `<style>${styles}</style>`
            this.bootswatch = theme.bootswatch
            this.custom = theme.custom
            isChanged = true
          })
          .catch(console.error)
          .finally(() => $loading.remove())
      }

      if (isChanged) {
        propsList.forEach(prop => (this[prop] = entries[prop]))
        let parseHtml
        if (vDoc.childNodes && vDoc.childNodes.length) {
          parseHtml = vDoc.childNodes[1].innerHTML.replace(/data-src=/ig, 'src=')
        }
        this.setState({ parseHtml, vDoc })
      }
    }, 500)
  }
}
