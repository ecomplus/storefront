import virtualDoc from './virtual-doc'
import displayWidget from './display-widget'
import fetchPage from './fetch-page'

export default class SearchPreview extends window.React.Component {
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
    const html = await fetchPage('/search?term=')
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
      console.log(data)
      for (const key in data) {
        const objCurr = entry.getIn(['data', key])
        if (typeof objCurr !== 'object') {
          newDoc = displayWidget('search', key, objCurr, vDoc)
        }
      }

      const $spiners = vDoc.querySelectorAll('.spinner-border')
      $spiners.forEach(element => element.remove())
    }

    if (newDoc.childNodes && newDoc.childNodes.length) {
      html = newDoc.childNodes[1].innerHTML
    }
    return h('div', { dangerouslySetInnerHTML: { __html: html } })
  }
}
