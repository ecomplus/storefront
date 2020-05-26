import virtualDoc from './virtual-doc'
import fetchPage from './fetch-page'
import BasePreview from './base-preview'
export default class SearchPreview extends BasePreview {
  constructor () {
    super()

    this._ = {
      ...this._,
      state: {
        title: 'Search'
      },
      route: {
        path: '/'
      }
    }
  }

  componentDidMount () {
    this.fetchPage()
  }

  async fetchPage () {
    const html = await fetchPage('/search?term=')
    const vDoc = virtualDoc(html)
    this.setState({ html, vDoc })
    this.parseEjs()
  }
}
