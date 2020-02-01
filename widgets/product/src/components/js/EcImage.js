import { img } from '@ecomplus/utils'
import lozad from 'lozad'

export default {
  name: 'EcImage',

  props: {
    src: [String, Object],
    fallbackSrc: String,
    alt: {
      type: String,
      default: ''
    },
    fade: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '/assets/img-placeholder.png'
    },
    pictureBreakpoint: {
      type: Number,
      default: 576
    }
  },

  data () {
    return {
      imgClasses: `lozad ${(this.fade ? 'fade' : 'show')}`
    }
  },

  computed: {
    imgObj () {
      return img(this.src)
    }
  },

  mounted () {
    const $img = this.$refs.lazyImg
    if ($img) {
      const observer = lozad($img, {
        loaded: $el => {
          $el.classList.add('show')
          const fallbackSrc = this.fallbackSrc || (this.src.zoom && this.src.zoom.url)
          if (fallbackSrc) {
            const $img = $el.tagName === 'IMG' ? $el : $el.lastChild
            $img.onerror = function () {
              console.error(this)
              $el.style.display = 'none'
              const $newImg = document.createElement('IMG')
              $newImg.src = fallbackSrc
              $el.parentNode.insertBefore($newImg, $el.nextSibling)
            }
          }
        }
      })
      observer.observe()
    }
  }
}
