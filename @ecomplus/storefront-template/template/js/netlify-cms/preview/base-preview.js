import ecomUtils from '@ecomplus/utils'
import ecomClient from '@ecomplus/client'
import EcomSearch from '@ecomplus/search-engine'

import BannerSliderEJS from '../../../pages/@/sections/banner-slider.ejs'
import InforBarEJS from '../../../pages/@/sections/info-bar.ejs'
import IncBannerEJS from '../../../pages/@/sections/inc/banner.ejs'
import ProductItemEJS from '../../../pages/@/sections/inc/product-item.ejs'
import RetailGridEJS from '../../../pages/@/sections/inc/retail-grid.ejs'
import MDContentEJS from '../../../pages/@/sections/inc/md-content.ejs'
import TimerEJS from '../../../pages/@/sections/inc/timer.ejs'
import IncProductsCarouselEJS from '../../../pages/@/sections/inc/products-carousel.ejs'
import ResponsiveBannerEJS from '../../../pages/@/sections/responsive-banner.ejs'
import BannerGridEJS from '../../../pages/@/sections/banners-grid.ejs'
import CustomContentEJS from '../../../pages/@/sections/custom-content.ejs'
import CustomHtmlEjs from '../../../pages/@/sections/custom-html.ejs'
import OffersTimerEJS from '../../../pages/@/sections/offers-timer.ejs'
import BreadcrumbsEJS from '../../../pages/@/sections/breadcrumbs.ejs'
import PageTitleEJS from '../../../pages/@/sections/page-title.ejs'
import BlogEJS from '../../../pages/@/sections/blog.ejs'
import ProductBlockEJS from '../../../pages/@/sections/product-block.ejs'
import RelatedProductsEJS from '../../../pages/@/sections/related-products.ejs'
import RecommendedProducts from '../../../pages/@/sections/recommended-products.ejs'
import RecommendationsShelfEJS from '../../../pages/@/sections/inc/recommendations-shelf.ejs'
import ProductDescriptionEJS from '../../../pages/@/sections/product-description.ejs'
import ProductSpecificationsEJS from '../../../pages/@/sections/product-specifications.ejs'
import SearchEngineEJS from '../../../pages/@/sections/search-engine.ejs'
import LoadingEJS from '../../../pages/@/sections/inc/loading.ejs'
import DocumentBannerEJS from '../../../pages/@/sections/document-banner.ejs'
import DocumentDescriptionEJS from '../../../pages/@/sections/document-description.ejs'
import BrandRetailEJS from '../../../pages/@/sections/brand-retail.ejs'
import CategoryRetailEJS from '../../../pages/@/sections/category-retail.ejs'
import CollectionRetailEJS from '../../../pages/@/sections/collection-retail.ejs'
import CollectionShelfEJS from '../../../pages/@/sections/collection-shelf.ejs'

const {
  _data,
  _info,
  _settings,
  lodash,
  ejs,
  React,
  h,
  MarkdownIt,
  i18n
} = window

const isArrayEqual = (x, y) => lodash.isEmpty(lodash.xorWith(x, y, lodash.isEqual))
const lang = 'pt_br'

export default class BasePreview extends React.Component {
  constructor () {
    super()

    this._ = {
      ..._data,
      ..._settings,
      settings: _settings,
      devMode: true,
      cms: function (content) {
        const contents = {
          info: _info,
          posts: [
            'post-example',
            'post-example',
            'post-example',
            'post-example',
            'post-example',
            'post-example'
          ],
          'posts/post-example': {
            title: 'Esta loja é um Progressive Web App',
            date: '2019-05-16T16:01:40.618Z',
            thumbnail: '/img/uploads/pwa-reliable.png',
            description: 'PWA é uma evolução híbrida entre um aplicativo e uma página web, que torna a experiência de uso de uma página web pelo celular semelhante a de um aplicativo mobile.\n\n',
            body: '![PWA](/img/uploads/pwa-reliable.png)\n\nProgressive Web App (PWA) é uma criação da da Google que permite a criação de aplicações que são um meio termo entre uma página web e um aplicativo nativo. Nosso Storefront padrão é um PWA!\n\nCom o grande aumento de tráfego mobile no e-commerce um PWA commerce traz enormes vantagens. Veja abaixo as principais vantagens e com alguns exemplos de sucesso com estudos de caso feitos pelo Google\n\n**Digno de estar na tela inicial**\n\nQuando os critérios do Progressive Web App são atendidos, o Chrome solicita que os usuários adicionem o PWA à tela inicial. Com isso a loja se transforma em uma aplicação nativa sem a necessidade de download através de uma app store. Isso pode não funcionar perfeitamente em IOS que tem 13,57% do market share mobile brasileiro, sendo quase todo o resto dominado pelo Android.\n\n**Maior engajamento**\n\nO PWA da [eXtra Electronics](https://developers.google.com/web/showcase/2016/extra) aumentou o re-engajamento em 4X, esses usuários gastam o dobro do tempo no site.\n Com a [OLX ](https://developers.google.com/web/showcase/2017/olx) o aumento do o re-engajamento foi de 250%.\n\n**Aumento na taxa de conversão**\n\nA capacidade de fornecer de um PWA melhorar a experiência ao usuário, ajudou o [AliExpress](https://developers.google.com/web/showcase/2016/aliexpress) a aumentar a taxa de conversão de novos usuários em 104%.',
            meta_title: 'PWA - My Shop',
            meta_description: 'Esta loja é um JAMstack PWA'
          }
        }

        if (contents[content]) {
          return contents[content]
        } else {
          return {}
        }
      },

      dictionary: function (term) {
        if (term) {
          if (i18n[term]) {
            return ecomUtils.i18n(i18n[term], lang)
          } else if (i18n[`i19${term}`]) {
            return ecomUtils.i18n(i18n[`i19${term}`], lang)
          }
          return this._.cms(`dictionary/${lang}`)[term] || ''
        }
        return this._.cms(`dictionary/${lang}`)
      },

      md: new MarkdownIt({ html: true }),
      route: null,
      resolveRoute: null,
      lodash,
      ecomUtils,
      ecomClient,
      EcomSearch,
      state: {}
    }

    this.state = {
      vDoc: '',
      html: '',
      parseHtml: '',
      cmsEntrys: []
    }
    this.ejs = ejs
    this.loading = true
  }

  componentDidMount () {
    this.fetchPage()
  }

  componentDidUpdate (prevProps, prevState) {
    setTimeout(() => {
      const entries = this.getEntrys(this.props)
      const oldEntrys = this.getEntrys(prevProps)
      let change = false
      if (!isArrayEqual(Object.keys(entries), Object.keys(oldEntrys))) {
        change = true
      }

      if (!isArrayEqual(Object.values(entries), Object.values(oldEntrys))) {
        change = true
      }

      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i]
        const oldEntry = oldEntrys[i]
        if (oldEntry && oldEntry.type === entry.type) {
          for (const key in oldEntry) {
            if (oldEntry[key]) {
              switch (typeof oldEntry[key]) {
                case 'string':
                case 'number':
                  if (oldEntry[key] !== entry[key]) {
                    change = true
                  }
                  break
                default:
                  if (Array.isArray(oldEntry[key])) {
                    if (!isArrayEqual(oldEntry[key], entry[key])) {
                      change = true
                    }
                  } else if (typeof oldEntry[key] === 'object') {
                    return
                    // todo
                  }
                  break
              }
            }
          }
        } else {
          change = true
        }
      }

      if (!change) {
        for (let i = 0; i < entries.length; i++) {
          if (oldEntrys[i].type !== entries[i].type) {
            change = true
          }
        }
      }

      if (!change && !this.loading) {
        return
      }

      this.setState({ cmsEntrys: entries })
      setTimeout(() => {
        this.parseEjs()
      }, 500)

      this.loading = false
    }, 250)
  }

  getEntrys (props) {
    let i = 0
    let entries
    const entrySections = []
    const { entry } = props
    do {
      entries = entry.getIn(['data', 'sections', i])
      if (entries) {
        const data = entries.toJSON()
        if (data.type === 'banner-slider' && data.slides) {
          const { slides } = data
          if (Array.isArray(slides) && slides.length) {
            slides.forEach(slide => {
              if (slide.end) {
                delete slide.end
              }

              if (slide.start) {
                delete slide.start
              }
            })
          }
        }

        if (data.type === 'collection-shelf' && data.shuffle) {
          delete data.shuffle
        }

        entrySections.push(data)
      }
      i++
    } while (entries !== undefined)

    return entrySections
  }

  ejsSections () {
    return {
      breadcrumbs: BreadcrumbsEJS,
      banner: IncBannerEJS,
      blog: BlogEJS,
      timer: TimerEJS,
      loading: LoadingEJS,
      'banner-slider': BannerSliderEJS,
      'info-bar': InforBarEJS,
      'collection-shelf': CollectionShelfEJS,
      'products-carousel': IncProductsCarouselEJS,
      'product-item': ProductItemEJS,
      'widgets-append': '<% %>',
      'responsive-banner': ResponsiveBannerEJS,
      'banners-grid': BannerGridEJS,
      'custom-content': CustomContentEJS,
      'offers-timer': OffersTimerEJS,
      'page-title': PageTitleEJS,
      'retail-grid': RetailGridEJS,
      'md-content': MDContentEJS,
      'custom-html': CustomHtmlEjs,
      'product-block': ProductBlockEJS,
      'related-products': RelatedProductsEJS,
      'recommended-products': RecommendedProducts,
      'recommendations-shelf': RecommendationsShelfEJS,
      'product-description': ProductDescriptionEJS,
      'product-specifications': ProductSpecificationsEJS,
      'search-engine': SearchEngineEJS,
      'document-banner': DocumentBannerEJS,
      'document-description': DocumentDescriptionEJS,
      'brand-retail': BrandRetailEJS,
      'category-retail': CategoryRetailEJS,
      'collection-retail': CollectionRetailEJS
    }
  }

  async parseEjs (customCmsEntrys = []) {
    const { state } = this
    const { vDoc } = state
    let parseHtml = ''

    if (!vDoc) {
      return null
    }

    let parse = ''
    const cmsEntrys = [...state.cmsEntrys, ...customCmsEntrys]
    if (Array.isArray(cmsEntrys) && cmsEntrys.length) {
      for (let j = 0; j < cmsEntrys.length; j++) {
        const opt = cmsEntrys[j]
        opt.items = this._.items
        parse += await ejs.render(this.ejsSections()[opt.type], {
          _: this._,
          opt
        }, {
          async: true,
          includer: originalPath => {
            for (const sectionType in this.ejsSections()) {
              if (originalPath.endsWith(`/${sectionType}`)) {
                return { template: this.ejsSections()[sectionType] }
              }
            }
          }
        }).catch(e => console.error('Parse err', e))
      }
    }

    const $sections = vDoc.getElementsByClassName('sections')[0]
    $sections.innerHTML = ''
    $sections.innerHTML += parse
    // glide slider
    const $slider = vDoc.querySelectorAll('.glide')
    if ($slider.length) {
      $slider.forEach(el => el.classList.add(...['glide--ltr', 'glide--slider', 'glide--swipeable']))
    }

    // insert tag img inside <picture/> tags
    const $pictures = vDoc.querySelectorAll('.banner picture')
    for (let i = 0; i < $pictures.length; i++) {
      const $picture = $pictures[i]
      $picture.classList.remove()
      $picture.classList.add(...['lozad', 'fade', 'img-fluid', 'show'])
      $picture.setAttribute('src', $picture.dataset.iesrc)
      $picture.setAttribute('data-loaded', true)
      const hasTagImg = Object.values($picture.children).find(children => children.tagName === 'IMG')
      if (!hasTagImg) {
        $picture.appendChild(document.createElement('img', { alt: $picture.dataset.alt, src: $picture.dataset.iesrc }))
      }
    }

    // insert tag img inside <picture/> tags
    const $pictures2 = vDoc.querySelectorAll('.product-card__picture')
    for (let i = 0; i < $pictures2.length; i++) {
      const $picture1 = $pictures2[i]
      $picture1.classList.remove()
      const $img = $picture1.children[0]
      $img.classList.remove()
      $img.classList.add(...['lozad', 'show'])
      $img.setAttribute('src', $img.dataset.src)
      $picture1.classList.add(...['lozad', 'fade', 'img-fluid', 'show'])
      $picture1.setAttribute('src', $img.dataset.src)
      $picture1.setAttribute('data-loaded', true)
    }

    // fix carousel
    const $caroulse = vDoc.querySelectorAll('.glide__slide.products-carousel__item')
    if ($caroulse.length) {
      $caroulse.forEach(element => {
        const $li = element
        $li.style.width = '270px'
        $li.style.marginRight = '5px'
        $li.classList.add(...['glide__slides', 'products-carousel__list'])

        const $glide = vDoc.querySelectorAll('.products-carousel .glide')
        if ($glide.length) {
          $glide.forEach(el => el.classList.add(...['glide--ltr', 'glide--slider', 'glide--swipeable']))
        }

        const childrens = $li.children
        for (let i = 0; i < childrens.length; i++) {
          const child = childrens[i]
          const $elImg = child.querySelectorAll('img')
          if ($elImg.length) {
            $elImg[0].classList.add('show')
            $elImg[0].setAttribute('src', $elImg[0].dataset.src)
            $elImg[0].setAttribute('data-loaded', true)
          }
        }
      })
    }

    if (vDoc.childNodes && vDoc.childNodes.length) {
      parseHtml = vDoc.childNodes[1].innerHTML
    }

    this.setState({ parseHtml, vDoc })
  }

  render () {
    const { parseHtml } = this.state
    return h('div', { dangerouslySetInnerHTML: { __html: parseHtml } })
  }
}
