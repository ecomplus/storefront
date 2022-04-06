import {
  i19previous,
  i19next
} from '@ecomplus/i18n'

import { i18n } from '@ecomplus/utils'

export default {
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    pageLimit: {
      type: Number,
      default: 5
    },
    itemsLength: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      page: 1
    }
  },

  computed: {
    i19next: () => i18n(i19next),
    i19previous: () => i18n(i19previous),

    pageQuantity () {
      return Math.ceil(this.itemsLength / this.pageSize) || 0
    },

    currentPage: {
      get: function () {
        return this.page
      },
      set: function (page) {
        const from = (page - 1) * this.pageSize
        this.page = page

        this.$emit('update-orders', from)
      }
    },

    pages () {
      const pages = []

      for (let i = 1; i <= this.pageQuantity; i++) {
        pages.push(i)
      }

      return pages
    },

    pageLinks () {
      const first = [1, '...']
      const last = ['...', this.pageQuantity]
      let range = []

      if (this.currentPage <= this.pageLimit) {
        range = this.range(1, this.pageLimit + 1)
        return (this.currentPage + range.length) <= this.pageQuantity ? range.concat(last) : range
      } else if (this.currentPage > (this.pageQuantity - this.pageLimit)) {
        range = this.range(this.pageQuantity - (this.pageLimit), this.pageQuantity)
        return (this.currentPage - range.length) >= 1 ? first.concat(range) : range
      } else {
        range = this.range(this.currentPage - Math.floor(this.pageLimit / 2), this.currentPage + Math.floor(this.pageLimit / 2))
        return first.concat(range).concat(last)
      }
    }
  },

  methods: {
    range (start, end) {
      const pages = []

      for (let i = start - 1; i < end; i++) {
        if (this.pages[i]) {
          pages.push(i + 1)
        }
      }

      return pages
    }
  }
}
