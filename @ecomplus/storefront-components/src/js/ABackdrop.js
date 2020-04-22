export default {
  name: 'ABackdrop',

  props: {
    isVisible: {
      type: Boolean,
      default: true
    },
    zIndexOnShow: {
      type: Number,
      default: 1080
    },
    transitionMs: {
      type: Number,
      default: 150
    }
  },

  data () {
    return {
      opacity: 0,
      zIndex: null,
      top: null
    }
  },

  computed: {
    style () {
      const { top, zIndex, transitionMs, opacity } = this
      return {
        top,
        transition: `opacity ${transitionMs}ms linear`,
        opacity,
        zIndex
      }
    }
  },

  methods: {
    hide () {
      this.$emit('update:is-visible', false)
      this.$emit('hide')
    },

    lockBodyScroll () {
      document.body.style.maxWidth = `${document.body.offsetWidth}px`
      document.body.style.overflow = 'hidden'
    }
  },

  watch: {
    isVisible (isVisible) {
      if (isVisible) {
        this.opacity = null
        this.lockBodyScroll()
      } else {
        this.opacity = 0
        document.body.style.overflow = document.body.style.maxWidth = null
      }
    },

    opacity (opacity) {
      if (opacity === 0) {
        setTimeout(() => {
          this.top = this.zIndex = null
        }, this.transitionMs)
      } else {
        this.zIndex = this.zIndexOnShow
        this.top = 0
      }
    }
  },

  mounted () {
    if (this.isVisible) {
      setTimeout(() => {
        this.opacity = null
      }, this.transitionMs)
      this.lockBodyScroll()
    }
  }
}
