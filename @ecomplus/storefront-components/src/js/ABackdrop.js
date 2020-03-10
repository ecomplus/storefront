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
      zIndex: null
    }
  },

  computed: {
    style () {
      const { zIndex, transitionMs, opacity } = this
      return {
        transition: `opacity ${transitionMs}ms linear`,
        opacity,
        zIndex
      }
    }
  },

  methods: {
    hide () {
      this.$emit('update:isVisible', false)
    }
  },

  watch: {
    isVisible (isVisible) {
      this.opacity = isVisible ? null : 0
    },

    opacity (opacity) {
      if (opacity === 0) {
        setTimeout(() => {
          this.zIndex = null
        }, this.transitionMs)
      } else {
        this.zIndex = this.zIndexOnShow
      }
    }
  },

  mounted () {
    if (this.isVisible) {
      setTimeout(() => {
        this.opacity = null
      }, this.transitionMs)
    }
  }
}
