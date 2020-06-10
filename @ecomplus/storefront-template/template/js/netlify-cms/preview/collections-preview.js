/* eslint-disable no-useless-constructor */
import ecomClient from '@ecomplus/client'
import BasePreview from './base-preview'
import virtualDoc from './virtual-doc'
import fetchPage from './fetch-page'

export default class CollectionsPreview extends BasePreview {
  constructor () {
    super()
  }

  async fetchPage () {
    ecomClient
      .store({
        url: '/collections.json'
      })
      .then(({ data }) => {
        const collection = data.result[Math.floor(Math.random() * data.result.length)]
        this._ = {
          ...this._,
          state: {
            title: collection.name,
            ...collection
          },
          route: {
            path: `/${collection.slug}`
          }
        }
        return fetchPage(`/${collection.slug}`)
      })

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
