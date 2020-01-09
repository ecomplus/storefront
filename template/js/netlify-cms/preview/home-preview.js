import virtualDoc from './virtual-doc'
import displayWidget from './display-widget'

export default class HomePreview extends window.React.Component {
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
    fetch('/index.html').then(response => {
      return response.text()
    })
      .then(html => {
        const vDoc = virtualDoc(html)
        this.setState({ html, vDoc })
      })
      .catch(err => {
        console.log('Failed to fetch page:', err)
      })
  }

  render () {
    const { vDoc } = this.state
    let newDoc = vDoc
    let html
    if (vDoc) {
      const { entry } = this.props
      const data = JSON.parse(entry.getIn(['raw']))

      for (const key in data) {
        const objCurr = entry.getIn(['data', key])
        newDoc = displayWidget('home', key, objCurr, vDoc)
      }

      // const $carousels = vDoc.querySelectorAll('.products-carousel')
      // // remove all carousels that do not have [data-cms-default=true]
      // if ($carousels.length) {
      //   $carousels.forEach(el => {
      //     if (!el.dataset.cmsDefault) {
      //       el.remove()
      //     }
      //   })
      // }

      // showcase
      if (!data.showcase || !data.showcase.length) {
        const $showcase = vDoc.querySelectorAll('[data-cms-if="home.showcase"]')
        $showcase[0].style.display = 'none'
      }

      // fix slider imagens
      this.props.widgetsFor('slider')
        .getIn(['data', 'slides'])
        .map(function (slider, index) {
          // set last img has preview for slider
          const img = slider.getIn(['img'])
          const $slider = vDoc.querySelectorAll('.glide')
          if (img) {
            $slider[0].classList.add(...['glide--ltr', 'glide--slider', 'glide--swipeable'])
            const $imgs = vDoc.querySelectorAll('.banner-slider img')
            for (let i = 0; i < $imgs.length; i++) {
              const $img = $imgs[i]
              $img.classList.remove()
              $img.classList.add(...['lozad', 'fade', 'img-fluid', 'show'])
              $img.setAttribute('src', img)
              $img.setAttribute('data-loaded', true)
            }
            $slider[0].style.display = 'block'
          } else {
            $slider[0].style.display = 'none'
          }
        })
    }

    if (newDoc.childNodes && newDoc.childNodes.length) {
      html = newDoc.childNodes[1].innerHTML
    }
    return h('div', { dangerouslySetInnerHTML: { __html: html } })
  }
}
