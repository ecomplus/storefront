// import { i19use$1LoyaltyPoints } from '@ecomplus/i18n'
import { formatMoney } from '@ecomplus/utils'
import ecomPassport from '@ecomplus/passport-client'

export default {
  name: 'PointsApplier',

  props: {
    pointsPrograms: Object,
    pointsApplied: {
      type: Object,
      required: true
    },
    pointsAmount: Number,
    ecomPassport: {
      type: Object,
      default () {
        return ecomPassport
      }
    }
  },

  data () {
    return {
      localPointsPrograms: this.pointsPrograms,
      availablePoints: {}
    }
  },

  computed: {
    i19use$1LoyaltyPoints: () => 'Usar $1 pontos de fidelidade'
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
              if (availablePoints[programId]) {
                availablePoints[programId] += points
              } else {
                availablePoints[programId] = points
              }
              if (availablePoints[programId] > pointsEntry.max_points) {
                availablePoints[programId] = pointsEntry.max_points
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
      const storefront = typeof window === 'object' && window.storefront
      if (storefront) {
        const getPointsPrograms = () => {
          const paymentInfo = storefront.info && storefront.info.list_payments
          if (paymentInfo) {
            this.updatePrograms(paymentInfo.loyalty_points_programs)
            return Object.keys(paymentInfo).length > 0
          }
          return false
        }
        if (!getPointsPrograms()) {
          storefront.on('info:list_payments', getPointsPrograms)
        }
      }
    } else {
      this.fixAvailablePoints()
    }
    this.ecomPassport.on('login', this.fixAvailablePoints)
    this.$once('hook:beforeDestroy', () => {
      this.ecomPassport.off('login', this.fixAvailablePoints)
    })
  }
}
