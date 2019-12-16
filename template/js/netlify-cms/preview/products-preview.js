import React from 'react'
import virtualDoc from './virtual-doc'
import displayWidget from './display-widget'
import fetchPage from './fetch-page'

export default class ProductsPreview extends React.Component {
  constructor() {
    super()
    this.state = {
      vDoc: '',
      html: ''
    }
  }

  componentDidMount() {
    this.fetchPage()
  }

  async fetchPage() {
    const html = await fetchPage('/macbook-apple-pro-15.4-intel-core-i7-2.6ghz-ram-16gb-ssd-512gb-mr972ll/a-prata')
    const vDoc = virtualDoc(html)
    this.setState({ html, vDoc })
  }

  render() {
    const { vDoc } = this.state
    let newDoc = vDoc
    let html
    if (vDoc) {
      const { entry } = this.props
      const data = JSON.parse(entry.getIn(['raw']))

      // fix image widget
      const $productPicture = vDoc.querySelectorAll('.product__picture')[0]
      if ($productPicture.children) {
        const children = $productPicture.children[0]
        if (children.dataset.iesrc) {
          children.setAttribute('data-loaded', true)
          const $img = document.createElement('img')
          $img.setAttribute('src', children.dataset.iesrc)
          children.replaceWith($img)
        }
      }

      // fix product related
      const $caroulse = vDoc.querySelectorAll('.products-carousel ul')
      if ($caroulse.length) {
        for (let k = 0; k < $caroulse.length; k++) {
          const $ul = $caroulse[k]
          console.log($ul)
          $ul.classList.add(...['glide__slides', 'products-carousel__list'])
          const $glide = vDoc.querySelectorAll('.products-carousel .glide')
          console.log($glide)
          if ($glide.length) {
            $glide[k].classList.add(...['glide--ltr', 'glide--slider', 'glide--swipeable'])
          }
          const childrens = $ul.children
          for (let i = 0; i < childrens.length; i++) {
            const child = childrens[i]
            child.style.width = '270px'
            child.style.marginRight = '5px'
            const $elImg = child.querySelectorAll('img')
            if ($elImg.length) {
              $elImg[0].classList.add('show')
              $elImg[0].setAttribute('src', $elImg[0].dataset.src)
              $elImg[0].setAttribute('data-loaded', true)
            }

            const $cardInfo = child.querySelectorAll('.product-card__info')[0]
            if ($cardInfo) {
              $cardInfo.parentNode.removeChild($cardInfo)
            }
          }
        }
      }

      for (const key in data) {
        const objCurr = entry.getIn(['data', key])
        newDoc = displayWidget(key, objCurr, vDoc)
      }
    }

    if (newDoc.childNodes && newDoc.childNodes.length) {
      html = newDoc.childNodes[1].innerHTML
    }
    return h('div', { dangerouslySetInnerHTML: { __html: html } })
  }
}
