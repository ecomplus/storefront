import ecomClient from '@ecomplus/client'
import virtualDoc from './virtual-doc'
import displayWidget from './display-widget'
import fetchPage from './fetch-page'
import previewCarousel from './preview-carousel'

export default class ProductsPreview extends window.React.Component {
  constructor () {
    super()
    this.state = {
      vDoc: '',
      html: ''
    }
  }

  componentDidMount () {
    this.fetchPage()
  }

  async fetchPage () {
    ecomClient.store({ url: '/products.json' })
      .then(async response => {
        const { result } = response.data
        if (result.length) {
          const productSlug = result[Math.floor(Math.random() * result.length)].slug
          const html = await fetchPage(`/${productSlug}`)
          const vDoc = virtualDoc(html)
          this.setState({ html, vDoc })
        }
      })
      .catch(error => {
        console.error(error)
        if (error.response) {
          console.log(error.response)
        }
      })
  }

  render () {
    const { vDoc } = this.state
    let newDoc = vDoc
    let html
    if (vDoc) {
      const { entry } = this.props
      const data = JSON.parse(entry.getIn(['raw']))

      // related
      const $related = vDoc.querySelectorAll('[data-cms-if="products.related"]')
      if ($related.length) {
        this.props.widgetsFor('related')
          .getIn(['data'])
          .map(function (value, key) {
            switch (key) {
              case 'showcase':
                if (value) {
                  $related[0].style.display = 'block'
                } else {
                  $related[0].style.display = 'none'
                }
                break
              case 'title':
                $related[0].children.forEach(child => {
                  if (child.className === 'products-carousel__title') {
                    child.children[0].innerText = value
                  }
                })
                break
              default:
                break
            }
          })
      }
      // recommended
      const $recommended = vDoc.querySelectorAll('[data-cms-if="products.recommended"]')
      if ($recommended.length) {
        this.props.widgetsFor('recommended')
          .getIn(['data'])
          .map(function (value, key) {
            switch (key) {
              case 'showcase':
                if (value) {
                  $recommended[0].style.display = 'block'
                } else {
                  $recommended[0].style.display = 'none'
                }
                break
              case 'title':
                $recommended[0].children.forEach(child => {
                  if (child.className === 'products-carousel__title') {
                    child.children[0].innerText = value
                  }
                })
                break
              default:
                break
            }
          })
      }

      // fix image widget
      const $productPicture = vDoc.querySelectorAll('.product__picture')[0]
      if ($productPicture && $productPicture.children) {
        const children = $productPicture.children[0]
        if (children.dataset.iesrc) {
          children.setAttribute('data-loaded', true)
          const $img = document.createElement('img')
          $img.setAttribute('src', children.dataset.iesrc)
          children.replaceWith($img)
        }
      }

      const $spiners = vDoc.querySelectorAll('.spinner-border')
      $spiners.forEach(element => element.remove())
      //
      previewCarousel(vDoc)

      for (const key in data) {
        const objCurr = entry.getIn(['data', key])
        if (typeof objCurr !== 'object') {
          newDoc = displayWidget('products', key, objCurr, vDoc)
        }
      }
    }

    if (newDoc.childNodes && newDoc.childNodes.length) {
      html = newDoc.childNodes[1].innerHTML
    }
    return h('div', { dangerouslySetInnerHTML: { __html: html } })
  }
}
