/* eslint-disable no-useless-constructor */
import BasePreview from './base-preview'
import ecomClient from '@ecomplus/client'
import virtualDoc from './virtual-doc'
import fetchPage from './fetch-page'

export default class ProductsPreview extends BasePreview {
  constructor () {
    super()
  }

  async fetchPage () {
    ecomClient
      .store({ url: '/products.json' })

      .then(async response => {
        const { result } = response.data
        const data = result[Math.floor(Math.random() * result.length)]
        return ecomClient.store({ url: `/products/${data._id}.json` })
      })

      .then(async ({ data }) => {
        this._ = {
          ...this._,
          state: {
            title: data.slug,
            ...data
          },
          route: {
            path: `/${data.slug}`
          }
        }

        const html = await fetchPage(`/${data.slug}`)
        const vDoc = virtualDoc(html)
        this.setState({ html, vDoc })
        this.parseEjs()
      })

      .catch(error => {
        if (error.response) {
          console.log(error.response)
        }
      })
  }
}
