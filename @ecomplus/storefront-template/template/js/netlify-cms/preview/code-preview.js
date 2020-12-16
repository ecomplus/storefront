import BasePreview from './base-preview'
import virtualDoc from './virtual-doc'
import fetchPage from './fetch-page'

export default class CodePreview extends BasePreview {
  constructor () {
    super()
    this._ = {
      ...this._,
      state: {
        title: 'Code',
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

    this.css = ''
    this.head = ''
    this.body = ''
  }

  async fetchPage () {
    return fetchPage('/index.html')
      .then(html => {
        const vDoc = virtualDoc(html)
        this.setState({ html, vDoc })
        this.parseEjs(this.customEntrys)
      })
      .catch(err => {
        console.log('Failed to fetch page home', err)
      })
  }

  componentDidUpdate (_, prevState) {
    setTimeout(() => {
      let change = false
      const { vDoc } = this.state
      const { entry } = this.props
      const entries = entry.getIn(['data']).toJSON()

      if (entries.css &&
        entries.css !== '' &&
        this.css !== entries.css
      ) {
        let $styleTag = vDoc.getElementById('custom_style_css')
        if (!$styleTag) {
          $styleTag = document.createElement('div')
          $styleTag.id = 'custom_style_css'
          vDoc.body.appendChild($styleTag)
        }
        $styleTag.innerHTML = `<style>${entries.css}</style>`
        this.css = entries.css
        change = true
      }

      if (entries.html_body &&
        entries.html_body !== '' &&
        this.body !== entries.html_body
      ) {
        let $htmlBody = vDoc.getElementById('custom_html_body')
        if (!$htmlBody) {
          $htmlBody = document.createElement('div')
          $htmlBody.id = 'custom_html_body'
          vDoc.body.appendChild($htmlBody)
        }
        $htmlBody.innerHTML = entries.html_body
        this.body = entries.html_body
        change = true
      }

      if (entries.html_head &&
        entries.html_head !== '' &&
        this.head !== entries.head
      ) {
        vDoc.head.insertAdjacentHTML('afterend', entries.html_head)
        this.head = entries.head
        change = true
      }

      if (change) {
        this.setState({ vDoc })
        setTimeout(() => {
          this.parseEjs(this.customEntrys)
        }, 100)
      }
    }, 500)
  }
}
