import BasePreview from './base-preview'
import virtualDoc from './virtual-doc'
import fetchPage from './fetch-page'

export default class HomePreview extends BasePreview {
  constructor () {
    super()
    this._ = {
      ...this._,
      state: {
        title: 'Home'
      },
      route: {
        path: '/'
      }
    }
  }

  async fetchPage () {
    return fetchPage('/index.html')
      .then(html => {
        const vDoc = virtualDoc(html)
        this.setState({ html, vDoc })
        this.parseEjs()
      })
      .catch(err => {
        console.log('Failed to fetch page home', err)
      })
  }
}
