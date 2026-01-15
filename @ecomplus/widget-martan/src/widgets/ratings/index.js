import axios from 'axios'
import Vue from 'vue'

import RatingsComponent from './Rating.vue'

import { MARTAN_API } from '../..'

class Ratings {
  constructor (options) {
    this.list = []
    this.offset = 0
    this.loading = false
    this.options = options
  }

  async init () {
    try {
      await this.fetchRatings()
      await this.mounted()
      this.listenerForSearchPage()
    } catch (error) {
      console.error('@Martan/Ratings init error', error)
    }
  }

  async fetchRatings () {
    if (this.loading) {
      return Promise.resolve()
    }
    this.loading = true
    if (this.loadFromLocalStorage()) {
      this.loading = false
      return Promise.resolve()
    }
    const url = `${MARTAN_API}/api/v1/ratings.json?expand=metrics`
    return axios({
      url,
      headers: {
        'X-Store-Id': this.options.store_id,
        'X-Api-Key': this.options.web_id
      }
    })
      .then(({ data }) => {
        this.list = data.result || []
        return this.saveToLocalStorage({
          result: data.result,
          timestamp: Date.now()
        })
      })
      .catch((err) => {
        console.error('Ratings fetchRatings error', err)
      })
  }

  loadFromLocalStorage () {
    try {
      const fromLocalStorage = window.localStorage.getItem('martan_ratings')
      if (fromLocalStorage) {
        const data = JSON.parse(fromLocalStorage)
        if (
          data &&
          data.result &&
          data.timestamp &&
          Date.now() - data.timestamp < 1000 * 60 * 60 * 24
        ) {
          this.list = data.result
          return true
        } else {
          return false
        }
      }
    } catch (error) {
      console.error('Ratings loadFromLocalStorage error', error)
      return false
    }
  }

  saveToLocalStorage (data) {
    window.localStorage.setItem('martan_ratings', JSON.stringify(data))
  }

  getProductRatingFromList (sku) {
    if (!sku || !this.list || this.list.length === 0) {
      return null
    }

    return this.list.find((rating) => rating.sku === sku)
  }

  getClasses () {
    const classes = ['.product-card__rating', '.mt-review-average']
    if (this.options.widget_rating.custom_class) {
      classes.push(this.options.widget_rating.custom_class)
    }
    return classes
  }

  async mounted () {
    const classes = this.getClasses()
    const elements = document.querySelectorAll(classes.join(','))
    const promises = []
    Array.from(elements).forEach((element) => {
      promises.push(this.renderRating(element))
    })
    await Promise.all(promises).then(() => {
      this.listenerForNewRatings()
    })
  }

  async renderRating (element) {
    return new Promise((resolve) => {
      if (!element.dataset) return resolve()
      const product = this.getProductFromElement(element)
      if (!product) return resolve()

      const rating = this.getProductRatingFromList(product)
      if (
        (rating &&
        rating.total === 0 &&
        this.options.widget_rating.display === 'gt1') ||
        (!rating && this.options.widget_rating.display === 'gt1')
      ) {
        return resolve()
      }
      const $ratingEl = document.createElement('div')
      const options = this.options
      new Vue({
        render (h) {
          return h(RatingsComponent, {
            props: {
              rating: rating && rating.average ? rating.average : 0,
              totalReviews: rating && rating.total ? rating.total : 0,
              config: options
            }
          })
        }
      }).$mount(element)
      element.setAttribute('data-martan-rating-id', this.generateId())
      element.appendChild($ratingEl)
      return resolve()
    })
  }

  generateId (prefix) {
    return Math.random()
      .toString(36)
      .replace('0.', prefix || '')
  }

  listenerForNewRatings () {
    const options = {
      childList: true,
      attributes: false,
      subtree: false
    }

    const observer = new window.MutationObserver(
      this.callbackForNewRatings.bind(this)
    )
    observer.observe(document.body, options)
  }

  callbackForNewRatings (mutations, observer) {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (this.isMartanElement(node) && this.getProductFromElement(node)) {
            this.renderRating(node)
          }
        })
      }
    })
  }

  isMartanElement (element) {
    let isIn = false
    const classes = this.getClasses()
    if (element.classList.length) {
      element.classList.forEach((value) => {
        if (classes.includes(value)) {
          isIn = true
        }
      })
    }

    return isIn
  }

  getProductFromElement (element) {
    if (!element.dataset) return null
    return (
      element.dataset.martanProductId ||
      element.dataset.product ||
      element.dataset.sku ||
      element.dataset.martanProductSku ||
      null
    )
  }

  listenerForSearchPage () {
    const $searchEngine = document.getElementById('search-engine')
    if (!$searchEngine || !this.options.widget_rating.search_page) {
      return false
    }

    const callback = () => {
      searchEngineObserver.disconnect()
      const $retailRow = $searchEngine.querySelectorAll(
        '.search-engine__retail > .row'
      )[0]

      const rowObserver = new window.MutationObserver(() => {
        setTimeout(() => {
          this.mounted()
        }, 100)
        rowObserver.disconnect()
      })
      rowObserver.observe($retailRow, {
        childList: true,
        subtree: true
      })
    }

    const searchEngineObserver = new window.MutationObserver(callback)
    searchEngineObserver.observe($searchEngine, {
      attributes: true,
      childList: true
    })
  }
}

export default Ratings
