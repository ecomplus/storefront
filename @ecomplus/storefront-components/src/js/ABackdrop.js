export default {
  name: 'ABackdrop',

  props: {
    isClickable: {
      type: Boolean,
      default: true
    },
    canAutoClose: {
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
      this.$emit('click')
      if (this.canAutoClose) {
        this.style.opacity = 0
        setTimeout(() => {
          this.$destroy()
        }, 150)
      }
    }
  },

  beforeDestroy () {
    this.$el.remove()
  }
}
