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
    /* global h */
    const { vDoc } = this.state
    let newDoc = vDoc
    let html
    if (vDoc) {
      const { entry } = this.props
      const data = JSON.parse(entry.getIn(['raw']))

      for (const key in data) {
        const objCurr = entry.getIn(['data', key])
        if (typeof objCurr !== 'object') {
          newDoc = displayWidget('search', key, objCurr, vDoc)
        }
      }

      this.searchResults()
        .then(results => {
          const $spiners = vDoc.querySelectorAll('.spinner-border')
          $spiners.forEach(element => element.remove())
          const $searchEngine = vDoc.getElementById('search-engine')
          $searchEngine.innerHTML = results.innerHTML
        })
    }

    if (newDoc.childNodes && newDoc.childNodes.length) {
      html = newDoc.childNodes[1].innerHTML
    }
    return h('div', { dangerouslySetInnerHTML: { __html: html } })
  }

  searchResults () {
    return new Promise((resolve, reject) => {
      const $results = document.createElement('div')
      $results.style.opacity = 1
      $results.className = 'ec-search-engine__results'

      const $article = document.createElement('article')
      $article.className = 'ec-search-engine__retail'

      const $row = document.createElement('div')
      $row.className = 'row'

      for (let i = 0; i < 8; i++) {
        const $col = document.createElement('div')
        $col.className = 'col-6 col-md-4 col-lg-3'
        const $ecProductCard = document.createElement('div')
        $ecProductCard.className = 'ec-product-card ec-search-engine__item'
        //
        const $section = document.createElement('section')
        if (i % 2 === 0) {
          const $offer = document.createElement('span')
          $offer.className = 'ec-product-card__offer-stamp'
          $offer.innerText = '-1' + i + '%'
          $section.appendChild($offer)
        }

        const $ecProductCardLink = document.createElement('a')
        $ecProductCardLink.className = 'ec-product-card__link'
        //
        const $ecProductCardPictures = document.createElement('div')
        $ecProductCardPictures.className = 'ec-product-card__pictures'
        //
        const $ecImage = document.createElement('div')
        $ecImage.className = 'ec-image ec-product-card__picture'
        //
        const $img = document.createElement('img')
        $img.className = 'lozad fade show'
        $img.setAttribute('data-loaded', true)
        $img.src = 'https://ecom-iblwbssm.sfo2.digitaloceanspaces.com/imgs/400px/@1568320190220-glass.png'
        //
        const $h3 = document.createElement('h3')
        $h3.className = 'ec-product-card__name'
        $h3.innerText = 'Óculos'

        $ecImage.appendChild($img)
        $ecProductCardPictures.appendChild($ecImage)
        $ecProductCardLink.appendChild($ecProductCardPictures)
        $ecProductCardLink.appendChild($h3)

        //
        const $ecPrice = document.createElement('div')
        $ecPrice.className = 'ec-prices ec-product-card__prices'

        const $strong = document.createElement('strong')
        $strong.className = 'ec-prices__value'
        $strong.innerText = 'R$ 150,00'
        $ecPrice.appendChild($strong)

        const $span = document.createElement('span')
        const $ecDiscount = document.createElement('div')
        $ecDiscount.className = 'ec-price__discount'
        const $pric = document.createElement('span')
        $pric.innerText = 'R$ 123,49'
        const $small = document.createElement('small')
        $small.innerText = ' via Boleto Bancário'
        $ecDiscount.appendChild($pric)
        $ecDiscount.appendChild($small)
        $span.appendChild($ecDiscount)
        $ecPrice.appendChild($span)

        //
        const $ecProductBuy = document.createElement('div')
        $ecProductBuy.className = 'ec-product-card__buy fade'
        const $btn = document.createElement('button')
        $btn.className = 'btn btn-block btn-primary'
        $btn.innerText = 'Comprar'
        $ecProductBuy.appendChild($btn)

        $section.appendChild($ecProductCardLink)
        $section.appendChild($ecPrice)
        $section.appendChild($ecProductBuy)
        $ecProductCard.appendChild($section)
        $col.appendChild($ecProductCard)

        $row.appendChild($col)
      }

      $article.appendChild($row)
      $results.appendChild($article)
      resolve($results)
    })
  }
}
