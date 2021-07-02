import {
  i19next,
  i19previous
} from '@ecomplus/i18n'

import { i18n } from '@ecomplus/utils'

export default {
  name: 'APagination',

  props: {
    totalItems: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 24
    }
  },

  computed: {
    i19next: () => i18n(i19next),
    i19previous: () => i18n(i19previous),

    totalPages () {
      return Math.ceil(this.totalItems / this.pageSize)
    },

    pageNums () {
      const pages = []
      if (this.totalPages > 0) {
        let lastPage
        for (let i = -2; i <= 2; i++) {
          lastPage = this.page + i
          if (lastPage >= 1) {
            if (lastPage <= this.totalPages) {
              pages.push(lastPage)
            } else {
              break
            }
          }
        }
        if (pages[0] === 3) {
          pages.unshift(1, 2)
        } else if (pages[0] === 2) {
          pages.unshift(1)
        }
        if (lastPage === this.totalPages - 2) {
          pages.push(lastPage + 1, lastPage + 2)
        } else if (lastPage === this.totalPages - 1) {
          pages.push(lastPage + 1)
        }
      }
      return pages
    },

    lastPageNum () {
      return this.pageNums[this.pageNums.length - 1]
    }
  },

  methods: {
    go (page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('update:page', page)
      }
    }
  }
}
