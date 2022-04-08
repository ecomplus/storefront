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
    itemCount: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    }

  },

  computed: {
    i19next: () => i18n(i19next),
    i19previous: () => i18n(i19previous),

    pageCount () {
      return Math.ceil(this.itemCount / this.pageSize) || 0
    },

    localCurrentPage: {
      get: function () {
        return this.currentPage
      },
      set: function (page) {
        this.$emit('update:current-page', page)
      }
    },

    pageLinks () {
      const first = [1, '...']
      const last = ['...', this.pageCount]
      let range = []

      if (this.currentPage < this.pageLimit) {
        range = this.range(1, this.pageLimit)
        return (this.currentPage + range.length) <= this.pageCount ? range.concat(last) : range
      } else if (this.currentPage > (this.pageCount - this.pageLimit)) {
        range = this.range(this.pageCount - (this.pageLimit), this.pageCount)
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

      for (let i = start; i <= end; i++) {
        if (this.pageCount >= i && i > 0) {
          pages.push(i)
        }
      }

      return pages
    }
  }
}
