/* eslint-disable no-useless-constructor */
import BasePreview from './base-preview'
import virtualDoc from './virtual-doc'
import fetchPage from './fetch-page'

export default class BrandsPreview extends BasePreview {
  constructor () {
    super()
  }

  async fetchPage () {
    this._ = {
      ...this._,
      state: {
        title: 'Blog'
      },
      route: {
        path: '/blog'
      }
    }
    console.log(this)
    fetchPage('/blog')
      .then(html => {
        const vDoc = virtualDoc(html)
        this.setState({ html, vDoc })
        this.parseEjs()
      })
      .catch(err => {
        console.log('Failed to fetch page:', err)
      })
  }
}
