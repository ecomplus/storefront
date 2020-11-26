import BasePreview from '../base-preview'
import virtualDoc from '../virtual-doc'
import fetchPage from '../fetch-page'

const fetchCssTheme = ({ custom, bootswatch }) => {
  return window.fetch(`${window.PARSE_SASS_FUNCTION_URI}?custom=${custom}&bootswatch=${bootswatch}`)
}

export default class CodePreview extends BasePreview {
  constructor() {
    super()
    this._ = {
      ...this._,
      state: {
        title: 'Geral',
      },
      route: {
        path: '/'
      }
    }

    this.customEntrys = [
      {
        'type': 'banner-slider',
        'autoplay': 9000,
        'slides': [
          {
            'img': 'https://storefront-template.netlify.app/img/uploads/banner2.webp',
            'link': '/headset',
            'alt': 'Headset banner',
            'mobile_img': 'https://storefront-template.netlify.app/img/uploads/banner2.webp'
          }
        ]
      },
      { 'type': 'info-bar', 'enabled': true },
      {
        'type': 'collection-shelf',
        'shuffle': false,
        'collection_id': null,
        'sort': 'offers',
        'headless': false
      }
    ]

    this.bg_color = ''
    this.primary_color = ''
    this.secondary_color = ''
    this.logo = ''
    this.bootswatch = ''
    this.custom = ''
  }

  fetchPage() {
    return fetchPage('/index.html').then(html => {
      const vDoc = virtualDoc(html)
      this.setState({ html, vDoc })
      return this.parseEjs(this.customEntrys)
    }).catch(err => {
      console.log('Failed to fetch page home', err)
    })
  }

  componentDidUpdate(_, prevState) {
    setTimeout(async () => {
      const { vDoc } = this.state
      const { entry } = this.props
      const entries = entry.getIn(['data']).toJSON()

      const propsArray = [
        'name',
        'bg_color',
        'primary_color',
        'secondary_color'
      ]

      let change = propsArray.some(prop => (entries[prop] && entries[prop] !== this[prop]))

      if (this.logo !== entries.logo) {
        this.logo = entries.logo
        let $logo = vDoc.getElementById('logo')
        $logo.src = this.logo
        $logo.alt = entries.name
        change = true
      }

      let $styleTag = vDoc.getElementById('override_vars')
      if (!$styleTag) {
        $styleTag = document.createElement('div')
        $styleTag.id = 'override_vars'
        vDoc.body.appendChild($styleTag)
      }

      $styleTag.innerHTML = `<style>
        :root {
          --body-bg: ${entries.bg_color};
          --primary: ${entries.primary_color};
          --secondary: ${entries.secondary_color};
        }
      </style>`

      const { theme } = entries
      if ((this.bootswatch !== theme.bootswatch) || (this.custom !== theme.custom)) {
        if (window.PARSE_SASS_FUNCTION_URI) {
          await fetchCssTheme(theme).then(async response => {
            const css = await response.text()
            let $themesTag = vDoc.getElementById('storefront-themes')
            if (!$themesTag) {
              $themesTag = document.createElement('div')
              $themesTag.id = 'storefront-themes'
              vDoc.body.appendChild($themesTag)
            }
  
            $themesTag.innerHTML = `<style>${css}</style>`
            this.bootswatch = theme.bootswatch
            this.custom = theme.custom
            change = true
            return css
            }).catch(e => console.error('Erro with request style', e))
        }
      }
  
      if (change) {
        propsArray.forEach(prop => (this[prop] = entries[prop]))
        this.setState({ vDoc })
        setTimeout(() => {
          this.parseEjs(this.customEntrys)
        }, 100)
      }
    }, 500)
  }
}
