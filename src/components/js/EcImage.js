import lozad from 'lozad'

export default {
  name: 'EcImage',

  props: {
    src: {
      type: [String, Object]
    },
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
      imgClasses: `img-fluid lozad ${(this.fade ? 'fade' : 'show')}`
    }
  },

  mounted () {
    const $img = this.$refs.lazyImg
    if ($img) {
      const observer = lozad($img, {
        loaded ($el) {
          $el.classList.remove('lozad')
          setTimeout(() => $el.classList.add('show'), 100)
        }
      })
      observer.observe()
    }
  }
}
