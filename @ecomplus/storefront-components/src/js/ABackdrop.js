export default {
  name: 'ABackdrop',

  props: {
    isClickable: {
      type: Boolean,
      default: true
    },
    canAutoHide: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      style: {
        cursor: this.isClickable ? 'pointer' : null,
        opacity: 0.5
      }
    }
  },

  methods: {
    handleClick () {
      if (this.isClickable) {
        this.$emit('click')
        if (this.canAutoHide) {
          this.style.opacity = 0
          setTimeout(() => {
            this.$destroy()
          }, 150)
        }
      }
    }
  },

  beforeDestroy () {
    this.$el.remove()
  }
}
