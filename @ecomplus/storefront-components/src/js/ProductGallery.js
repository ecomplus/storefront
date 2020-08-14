import {
  i19addToCart,
  i19close,
  i19fullscreen,
  i19openGallery,
  i19next,
  i19previous,
  i19share,
  i19shareOnFacebook,
  i19video
} from '@ecomplus/i18n'

import {
  i18n,
  name as getName,
  img as getImg
} from '@ecomplus/utils'

import ecomCart from '@ecomplus/shopping-cart'
import Glide from '@glidejs/glide'
import * as PhotoSwipe from 'photoswipe'
import * as psUi from 'photoswipe/dist/photoswipe-ui-default'
import APicture from '../APicture.vue'

export default {
  name: 'ProductGallery',

  components: {
    APicture
  },

  props: {
    product: {
      type: Object,
      default () {
        return {
          pictures: [],
          videos: []
        }
      }
    },
    pictures: Array,
    video: Object,
    videoAspectRatio: {
      type: String,
      default: '4by3'
    },
    canAddToCart: {
      type: Boolean,
      default: true
    },
    currentSlide: {
      type: Number,
      default: 1
    },
    glideOptions: {
      type: Object,
      default () {
        return {
          type: 'slider',
          autoplay: false,
          rewind: false
        }
      }
    },
    isSSR: Boolean
  },

  data () {
    return {
      glide: null,
      pswp: null,
      activeIndex: null,
      isSliderMoved: false,
      elFirstPicture: null
    }
  },

  computed: {
    i19addToCart: () => i18n(i19addToCart),
    i19close: () => i18n(i19close),
    i19fullscreen: () => i18n(i19fullscreen),
    i19next: () => i18n(i19next),
    i19previous: () => i18n(i19previous),
    i19openGallery: () => i18n(i19openGallery),
    i19share: () => i18n(i19share),
    i19video: () => i18n(i19video),

    localPictures () {
      return this.pictures && this.pictures.length
        ? this.pictures : (this.product.pictures || [])
    },

    videoSrc () {
      const video = this.video || (this.product.videos && this.product.videos[0])
      if (video && video.url) {
        return video.url.replace(/watch\?v=(V7XQvAde51w)/i, 'embed/$1?rel=0')
      }
      return null
    },

    pswpItems () {
      const pswpItems = []
      this.localPictures.forEach(({ zoom }) => {
        if (zoom) {
          let w, h
          if (zoom.size) {
            const sizes = zoom.size.split('x')
            if (sizes.length === 2) {
              w = parseInt(sizes[0], 10)
              h = parseInt(sizes[1], 10)
            }
          }
          if (!w || !h) {
            w = h = 1000
          }
          pswpItems.push({
            src: zoom.url,
            title: getName(this.product) || zoom.alt,
            w,
            h
          })
        }
      })
      return pswpItems
    },

    pswpOptions () {
      return {
        shareButtons: [
          {
            id: 'facebook',
            label: i18n(i19shareOnFacebook),
            url: 'https://www.facebook.com/sharer/sharer.php?u={{url}}'
          },
          {
            id: 'twitter',
            label: 'Tweet',
            url: 'https://twitter.com/intent/tweet?text={{text}}&url={{url}}'
          },
          {
            id: 'pinterest',
            label: 'Pin it',
            url: 'http://www.pinterest.com/pin/create/button/' +
              '?url={{url}}&media={{image_url}}&description={{text}}'
          }
        ]
      }
    }
  },

  methods: {
    getImg,

    moveSlider (index) {
      this.activeIndex = index
      this.$emit('update:current-slide', index + 1)
      if (this.glide) {
        this.glide.go('=' + index)
      }
      if (!this.isSliderMoved) {
        this.isSliderMoved = true
      }
    },

    openZoom (index) {
      if (!this.pswd) {
        this.pswp = new PhotoSwipe(this.$refs.pswp, psUi, this.pswpItems, {
          ...this.pswpOptions,
          index
        })
      }
      this.pswp.init()
    },

    buy () {
      const { product } = this
      this.$emit('buy', { product })
      if (product.variations && product.variations.length) {
        if (window.location.pathname !== `/${product.slug}`) {
          window.location = `/${product.slug}`
        } else {
          window.location = '#variations'
        }
      } else {
        ecomCart.addProduct(product)
      }
      if (this.pswp) {
        this.pswp.close()
      }
    }
  },

  watch: {
    currentSlide: {
      handler (currentSlide) {
        this.activeIndex = currentSlide - 1
      },
      immediate: true
    },

    activeIndex (index) {
      this.moveSlider(index)
    }
  },

  mounted () {
    if (this.isSSR) {
      this.elFirstPicture = document.querySelector('#product-gallery .product__picture')
      if (this.elFirstPicture) {
        this.$nextTick(() => {
          this.$refs.firstPicture[0].appendChild(this.elFirstPicture)
        })
      }
    }
    const glide = new Glide(this.$refs.glide, this.glideOptions)
    glide.on('run', () => {
      this.moveSlider(glide.index)
    })
    glide.mount()
    this.glide = glide
  },

  beforeDestroy () {
    if (this.glide) {
      this.glide.destroy()
    }
    if (this.pswp) {
      this.pswp.destroy()
    }
  }
}
