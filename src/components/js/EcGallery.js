import Glide from '@glidejs/glide'
import EcImage from './../EcImage.vue'

export default {
  name: 'EcGallery',

  components: {
    EcImage
  },

  props: {
    images: {
      type: Array,
      default: () => []
    },
    current: {
      type: Number,
      default: 1
    },
    sliderOptions: {
      type: Object,
      default: () => ({
        type: 'slider',
        autoplay: false,
        rewind: false
      })
    }
  },

  data () {
    return {
      glide: null,
      activeIndex: null
    }
  },

  computed: {
    mapPictures () {
      return this.images.map(({ normal, big }) => {
        return {
          small: normal,
          normal: big
        }
      })
    }
  },

  methods: {
    go (index) {
      this.activeIndex = index
      this.$emit('update:current', index + 1)
      if (this.glide) {
        this.glide.go('=' + index)
      }
    }
  },

  mounted () {
    const glide = new Glide(this.$refs.glide, this.sliderOptions)
    glide.on('run', () => {
      this.go(glide.index)
    })
    glide.mount()
    this.glide = glide
  },

  beforeDestroy () {
    if (this.glide) {
      this.glide.destroy()
    }
  },

  watch: {
    current: {
      handler (current) {
        this.activeIndex = current - 1
      },
      immediate: true
    },

    activeIndex (index) {
      this.go(index)
    }
  }
}
