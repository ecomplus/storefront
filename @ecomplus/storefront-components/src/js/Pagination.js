
export default {
  name: 'Pagination',

  props: {
    items: Array,
    numberPage: {
      type: Number,
      default: 0
    },
    itemsPerPage: {
      type: Number,
      default: 10
    }
  },

  data () {
    return {
      pagination: [],
      time: null
    }
  },

  computed: {
    lastPage () { return this.pagination.length - 1 }
  },

  methods: {
    clickPage (index) {
      this.$nextTick(() => {
        this.$emit('update:number-page', index)
      })
    },

    next () {
      const page = this.numberPage += this.pagination.length - 1
      this.$nextTick(() => {
        this.$emit('update:number-page', page)
      })
    },

    previous () {
      const page = this.numberPage -= this.pagination.length - 1
      this.$nextTick(() => {
        this.$emit('update:number-page', page)
      })
    }
  },

  created () {
    const list = () => Array.from({
      length: Math.ceil(this.items.length / this.itemsPerPage)
    }, (v, i) => {
      return this.items.slice(i * this.itemsPerPage, i * this.itemsPerPage + this.itemsPerPage)
    })

    setTimeout(() => {
      this.pagination = list()
    }, 5000)
  }
}
