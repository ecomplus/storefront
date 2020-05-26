/* eslint-disable no-useless-constructor */
import ecomClient from '@ecomplus/client'
import BasePreview from './base-preview'
import virtualDoc from './virtual-doc'
import fetchPage from './fetch-page'

export default class BrandsPreview extends BasePreview {
  constructor () {
    super()
  }

  async fetchPage () {
    ecomClient
      .store({
        url: '/brands.json'
      })
      .then(({ data }) => {
        const brands = data.result.filter(brands => brands.logo)
        const brand = brands[Math.floor(Math.random() * brands.length)]
        this._ = {
          ...this._,
          state: {
            title: brand.name,
            ...brand
          },
          route: {
            path: `/${brand.slug}`
          }
        }
        return fetchPage(`/${brand.slug}`)
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
