import { i19use$1LoyaltyPoints } from '@ecomplus/i18n'

import {
  i18n,
  formatMoney
} from '@ecomplus/utils'

import ecomPassport from '@ecomplus/passport-client'
import waitStorefrontInfo from './helpers/wait-storefront-info'

export default {
  name: 'PointsApplier',

  props: {
    pointsPrograms: Object,
    pointsApplied: {
      type: Object,
      required: true
    },
    pointsAmount: Number,
    maxPointsAmount: Number,
    ecomPassport: {
      type: Object,
      default () {
        return ecomPassport
      }
    }
  },

  data () {
    return {
      localPointsPrograms: this.pointsPrograms || {},
      availablePoints: {}
    }
  },

  computed: {
    i19use$1LoyaltyPoints: () => i18n(i19use$1LoyaltyPoints)
  },

  methods: {
    formatMoney,

    updatePrograms (pointsPrograms) {
      if (pointsPrograms && Object.keys(pointsPrograms).length) {
        this.localPointsPrograms = pointsPrograms
        this.$emit('update:points-programs', pointsPrograms)
        this.$nextTick(this.fixAvailablePoints)
      }
    },

    fixAvailablePoints () {
      const pointsEntries = this.ecomPassport.getCustomer().loyalty_points_entries
      this.availablePoints = pointsEntries
        ? pointsEntries.reduce((availablePoints, pointsEntry) => {
            const validThru = pointsEntry.valid_thru
            if (!validThru || new Date(validThru).getTime() >= Date.now()) {
              const programId = pointsEntry.program_id
              const points = pointsEntry.active_points
              if (this.localPointsPrograms[programId]) {
                if (availablePoints[programId]) {
                  availablePoints[programId] += points
                } else {
                  availablePoints[programId] = points
                }
                if (availablePoints[programId] > pointsEntry.max_points) {
                  availablePoints[programId] = pointsEntry.max_points
                }
                const { ratio } = this.localPointsPrograms[programId]
                if (availablePoints[programId] * ratio > this.maxPointsAmount) {
                  availablePoints[programId] = this.maxPointsAmount / ratio
                }
              }
            }
            return availablePoints
          }, {})
        : {}
    },

    getPointsAmount (programId) {
      return this.availablePoints[programId] * this.localPointsPrograms[programId].ratio
    },

    togglePoints (programId, isChecked) {
      const pointsApplied = {}
      if (isChecked) {
        pointsApplied[programId] = this.availablePoints[programId]
      }
      this.$emit('update:points-applied', pointsApplied)
      let pointsAmount = 0
      for (programId in pointsApplied) {
        pointsAmount += this.getPointsAmount(programId)
      }
      this.$emit('update:points-amount', pointsAmount)
    }
  },

  created () {
    if (!this.pointsPrograms || !Object.keys(this.pointsPrograms).length) {
      waitStorefrontInfo('list_payments', 'loyalty_points_programs')
        .then(this.updatePrograms)
    } else {
      this.fixAvailablePoints()
    }
    this.ecomPassport.on('login', this.fixAvailablePoints)
    this.$once('hook:beforeDestroy', () => {
      this.ecomPassport.off('login', this.fixAvailablePoints)
    })
  }
}
