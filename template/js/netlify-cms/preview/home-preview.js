import React from 'react'

export default class HomePreview extends React.Component {
  constructor () {
    super()
    this.state = {
      doc: '',
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
        // Initialize the DOM parser
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        this.setState({ html, doc })
      })
      .catch(err => {
        console.log('Failed to fetch page: ', err)
      })
  }

  render () {
    const { doc } = this.state
    let newDoc = doc
    let html
    if (doc) {
      const { entry } = this.props
      const data = JSON.parse(entry.getIn(['raw']))

      // set slider
      this.props.widgetsFor('slider').getIn(['data', 'slides']).map(function(slider, index) {
        // set last img has preview for slider
        const img = slider.getIn(['img'])
        const $slider = doc.querySelectorAll('.glide')
        if (img) {
          $slider[0].classList.add(...['glide--ltr', 'glide--slider', 'glide--swipeable'])
          const $imgs = doc.querySelectorAll('.banner-slider img')
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

      for (const key in data) {
        const objCurr = entry.getIn(['data', key])
        newDoc = this.displayWidget(key, objCurr, doc)
      }
    }

    if (newDoc.childNodes && newDoc.childNodes.length) {
      html = newDoc.childNodes[1].innerHTML
    }
    return h('div', { dangerouslySetInnerHTML: { __html: html } })
  }

  displayWidget (key, value, doc) {
    const $els = doc.querySelectorAll(`[data-cms-bind="home.${key}"],[data-cms-if="home.${key}"]`)
    for (let i = 0; i < $els.length; i++) {
      const { cmsBind, cmsIf } = $els[i].dataset
      if (cmsIf) {
        if (value) {
          $els[i].style.display = 'block'
        } else {
          $els[i].style.display = 'none'
        }
      } else if (typeof value === 'string') {
        $els[i].innerHTML = value
      }
    }
    return doc
  }
}
