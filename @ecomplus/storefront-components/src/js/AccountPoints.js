import {
  i19available,
  i19loyaltyPoints,
  // i19pointsEarned,
  i19upTo
} from '@ecomplus/i18n'

import {
  i18n,
  formatDate
} from '@ecomplus/utils'

export default {
  name: 'AccountPoints',

  props: {
    customer: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  computed: {
    i19available: () => i18n(i19available),
    i19loyaltyPoints: () => i18n(i19loyaltyPoints),
    i19pointsEarned: () => 'Pontos ganhos',
    i19upTo: () => i18n(i19upTo),

    validPointsEntries () {
      const pointsEntries = this.customer.loyalty_points_entries
      if (pointsEntries) {
        return pointsEntries.filter(pointsEntry => {
          const validThru = pointsEntry.valid_thru
          return (!validThru || new Date(validThru).getTime() >= Date.now()) &&
            pointsEntry.active_points > 0
        })
      }
      return []
    }
  },

  methods: {
    formatDate
  }
}
