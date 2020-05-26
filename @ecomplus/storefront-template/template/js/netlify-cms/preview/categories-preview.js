/* eslint-disable no-useless-constructor */
import BasePreview from './base-preview'
import virtualDoc from './virtual-doc'
import fetchPage from './fetch-page'

export default class CategoriesPreview extends BasePreview {
  constructor () {
    super()
  }

  async fetchPage () {
    const category = this._.categories[Math.floor(Math.random() * this._.categories.length)]
    this._ = {
      ...this._,
      state: {
        title: category.name,
        ...category
      },
      route: {
        path: `/${category.slug}`
      }
    }
    fetchPage(`/${category.slug}`)
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
