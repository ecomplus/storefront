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
    console.log(doc)
    if (doc) {
      const { entry } = this.props
      const data = JSON.parse(entry.getIn(['raw']))
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const value = data[key]
          const selector = `[data-cms-widgetfor="${key}"]`
          const $el = doc.querySelectorAll(selector)[0]
          if ($el) {
            switch (typeof value) {
              case 'boolean':
                
                break
              case 'string':
                break
              case 'object':
                break
              case 'array':
  
                break
              default: break
            }
            console.log(selector)
            console.log($el)
          }
        }
      }
    }
    return h('div', { dangerouslySetInnerHTML: { __html: this.state.html } })
  }
}
