import {
  i19add$1ToEarn,
  i19loyaltyPoints
} from '@ecomplus/i18n'

import {
  i18n,
  formatMoney
} from '@ecomplus/utils'

import waitStorefrontInfo from './helpers/wait-storefront-info'

export default {
  name: 'EarnPointsProgress',

  props: {
    pointsPrograms: Object,
    cartSubtotal: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      localPointsPrograms: this.pointsPrograms,
      programName: ''
    }
  },

  computed: {
    i19add$1ToEarn: () => i18n(i19add$1ToEarn),
    i19loyaltyPoints: () => i18n(i19loyaltyPoints),

    minSubtotalToEarn () {
      let minSubtotal
      const pointsPrograms = this.localPointsPrograms
      if (pointsPrograms) {
        for (const programId in pointsPrograms) {
          const pointsProgram = pointsPrograms[programId]
          const programMinSubtotal = pointsProgram && pointsProgram.min_subtotal_to_earn
          if (
            programMinSubtotal >= 0 &&
            (minSubtotal === undefined || minSubtotal > programMinSubtotal)
          ) {
            minSubtotal = programMinSubtotal
            this.programName = pointsProgram.name
            if (!minSubtotal) {
              break
            }
          }
        }
      }
      return minSubtotal
    },

    earnFromPercentage () {
      return this.minSubtotalToEarn >= 0 && this.cartSubtotal < this.minSubtotalToEarn
        ? Math.round(this.cartSubtotal * 100 / this.minSubtotalToEarn)
        : null
    }
  },

  methods: {
    formatMoney
  },

  created () {
    if (!this.pointsPrograms || !Object.keys(this.pointsPrograms).length) {
      waitStorefrontInfo('list_payments', 'loyalty_points_programs')
        .then(pointsPrograms => {
          this.localPointsPrograms = pointsPrograms
          this.$emit('update:points-programs', pointsPrograms)
        })
    }
  }
}
