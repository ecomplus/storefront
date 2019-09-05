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
      activeIndex: this.current - 1
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
      this.$emit('click', index + 1)
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
  }
}
