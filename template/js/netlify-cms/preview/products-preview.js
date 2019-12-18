import React from 'react'
import virtualDoc from './virtual-doc'
import displayWidget from './display-widget'
import fetchPage from './fetch-page'
import previewCarousel from './preview-carousel'

export default class ProductsPreview extends React.Component {
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
    const html = await fetchPage('/macbook-apple-pro-15.4-intel-core-i7-2.6ghz-ram-16gb-ssd-512gb-mr972ll/a-prata')
    const vDoc = virtualDoc(html)
    this.setState({ html, vDoc })
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
      this.props.widgetsFor('related')
        .getIn(['data'])
        .map(function (value, key) {
          switch (key) {
            case 'related_on':
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

      // recommended
      const $recommended = vDoc.querySelectorAll('[data-cms-if="products.recommended"]')
      this.props.widgetsFor('recommended')
        .getIn(['data'])
        .map(function (value, key) {
          switch (key) {
            case 'recommended_on':
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
