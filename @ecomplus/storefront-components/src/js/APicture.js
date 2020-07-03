import {
  $ecomConfig,
  img as getImg
} from '@ecomplus/utils'

import lozad from 'lozad'

const getBestFitThumb = (picture, containerWidth, containerHeight, containerBreakpoints) => {
  let bestFitThumb, bestFitBreakpoint
  for (const thumb in containerBreakpoints) {
    const thumbBreakpoint = containerBreakpoints[thumb]
    if (thumbBreakpoint !== undefined && picture[thumb]) {
      if (bestFitBreakpoint !== undefined) {
        if (thumbBreakpoint === null) {
          if (bestFitBreakpoint >= containerWidth) {
            continue
          }
        } else if (
          thumbBreakpoint < containerWidth ||
          thumbBreakpoint - 50 <= containerHeight ||
          (bestFitBreakpoint !== null && thumbBreakpoint > bestFitBreakpoint)
        ) {
          continue
        }
      }
      bestFitThumb = thumb
      bestFitBreakpoint = thumbBreakpoint
    }
  }
  return bestFitThumb
}

export default {
  name: 'APicture',

  props: {
    src: [String, Object],
    fallbackSrc: String,
    alt: String,
    canCalcHeight: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '/assets/img-placeholder.png'
    },
    containerBreakpoints: {
      type: Object,
      default () {
        return {
          zoom: null,
          big: 800,
          [$ecomConfig.get('default_img_size') || 'normal']: 400
        }
      }
    },
    lozadOptions: {
      type: Object,
      default () {
        return {
          rootMargin: '350px 0px',
          threshold: 0
        }
      }
    }
  },

  data () {
    return {
      sources: [],
      height: null,
      opacity: null
    }
  },

  computed: {
    defaultImgObj () {
      if (typeof this.src === 'object' && this.src) {
        return getImg(this.src) || this.src
      }
      return {}
    },

    localFallbackSrc () {
      const { src, defaultImgObj, fallbackSrc } = this
      if (fallbackSrc) {
        return fallbackSrc
      }
      const fixedSrc = typeof src === 'object'
        ? src.zoom
          ? src.zoom.url : defaultImgObj.url
        : src
      return fixedSrc ? fixedSrc.replace(/\.webp$/, '') : this.placeholder
    },

    localAlt () {
      const { alt, src, defaultImgObj } = this
      if (alt) {
        return alt
      } else if (!src) {
        return 'No image'
      }
      return defaultImgObj.alt || 'Product'
    }
  },

  methods: {
    updateSources () {
      const sources = []
      let srcset
      if (typeof this.src === 'object') {
        const { clientWidth, clientHeight } = this.$el
        const thumb = getBestFitThumb(this.src, clientWidth, clientHeight, this.containerBreakpoints)
        const imgObj = this.src[thumb]
        const { url, size } = (imgObj || this.defaultImgObj)
        srcset = url
        if (clientWidth && size && this.canCalcHeight) {
          const [width, height] = size.split('x').map(px => parseInt(px, 10))
          if (height) {
            this.height = `${(clientWidth >= width ? height : clientWidth * height / width)}px`
          }
        }
      } else {
        srcset = this.src
      }
      if (srcset) {
        if (srcset.endsWith('.webp')) {
          sources.push({
            srcset,
            type: 'image/webp'
          }, {
            srcset: /\/imgs\/[0-9]{3}px/.test(srcset)
              ? srcset.replace(/\/imgs\/[0-9]{3}px/, '')
              : srcset.replace(/\.webp$/, ''),
            type: `image/${(srcset.substr(-9, 4) === '.png' ? 'png' : 'jpeg')}`
          })
        } else {
          sources.push({ srcset })
        }
      }
      this.sources = sources
    }
  },

  mounted () {
    this.updateSources()
    this.$nextTick(() => {
      const $picture = this.$el
      const observer = lozad($picture, {
        ...this.lozadOptions,
        loaded: $el => {
          const { localFallbackSrc } = this
          const $img = $el.tagName === 'IMG' ? $el : $el.lastChild
          $img.style.opacity = 0
          $img.onerror = function () {
            console.error(new Error('Image load error'), this)
            $el.style.display = 'none'
            const $newImg = document.createElement('IMG')
            $newImg.src = localFallbackSrc
            $el.parentNode.insertBefore($newImg, $el.nextSibling)
          }
          $img.onload = () => {
            this.opacity = 0
            $el.classList.add('loaded')
            this.$nextTick(() => {
              this.opacity = $img.style.opacity = null
              this.$emit('load')
            })
          }
        }
      })
      observer.observe()
    })
  }
}
