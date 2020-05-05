import {
  i19aboutCvvMsg,
  i19atSight,
  i19birthdate,
  i19cardNumber,
  i19confirmPurchase,
  i19docNumber,
  i19holderName,
  i19interestFree,
  i19invalidCard,
  i19invalidCardMsg,
  i19nameOnCard,
  i19of,
  i19parcelIn,
  i19securityCode,
  i19validThru
} from '@ecomplus/i18n'

import {
  $ecomConfig,
  i18n,
  formatMoney
} from '@ecomplus/utils'

import { $ } from '@ecomplus/storefront-twbs'
import cardValidator from 'card-validator'
import loadPaymentClient from './../../lib/load-payment-client'
import InputDate from '#components/InputDate.vue'
import InputDocNumber from '#components/InputDocNumber.vue'
import CleaveInput from 'vue-cleave-component'

const countryCode = $ecomConfig.get('country_code')

export default {
  name: 'CreditCardForm',

  components: {
    InputDate,
    InputDocNumber,
    CleaveInput
  },

  props: {
    amount: {
      type: Object,
      required: true
    },
    checkHolder: String,
    canSkipHolderInfo: Boolean,
    isCompany: Boolean,
    installmentOptions: Array,
    jsClient: Object,
    jsClientLoad: Promise
  },

  data () {
    return {
      formattedCardBin: '',
      card: {
        bin: '',
        name: '',
        date: '',
        cvv: '',
        birth: '',
        doc: '',
        installment: this.installmentOptions ? 1 : 0
      },
      isLoadingInstallments: false,
      installmentList: [],
      alert: {
        bin: false,
        date: false,
        cvv: false
      },
      isNumberValidated: false,
      isNumberPotentiallyValid: false,
      activeBrand: '',
      brands: [
        'visa',
        'mastercard',
        'american-express',
        'elo',
        'diners-club',
        'hiper',
        'hipercard'
      ],
      canHideHolderFields: this.canSkipHolderInfo || Boolean(this.checkHolder),
      loadPromise: this.jsClientLoad || Promise.resolve()
    }
  },

  computed: {
    i19aboutCvvMsg: () => i18n(i19aboutCvvMsg),
    i19atSight: () => i18n(i19atSight).toLowerCase(),
    i19birthdate: () => i18n(i19birthdate),
    i19cardNumber: () => i18n(i19cardNumber),
    i19confirmPurchase: () => i18n(i19confirmPurchase),
    i19docNumber: () => i18n(i19docNumber),
    i19holderName: () => i18n(i19holderName),
    i19interestFree: () => i18n(i19interestFree).toLowerCase(),
    i19nameOnCard: () => i18n(i19nameOnCard),
    i19of: () => i18n(i19of).toLowerCase(),
    i19parcelIn: () => i18n(i19parcelIn),
    i19securityCode: () => i18n(i19securityCode),
    i19validThru: () => i18n(i19validThru),
    lang: () => $ecomConfig.get('lang'),

    holderName: {
      get () {
        return this.card.name
      },
      set (value) {
        this.card.name = value.toUpperCase()
      }
    },

    compareName () {
      return this.checkHolder.replace(/(\s.*)/, '')
    }
  },

  methods: {
    formatMoney,

    checkName () {
      if (!this.canSkipHolderInfo && this.checkHolder) {
        const name = this.card.name.replace(/(\s.*)/, '')
        if (name === '') {
          this.canHideHolderFields = true
        } else if (name.localeCompare(this.compareName, 'en', { sensitivity: 'base' }) === 0) {
          this.canHideHolderFields = true
          this.card.doc = this.card.birth = ''
        } else {
          this.canHideHolderFields = false
        }
      }
    },

    validateDate () {
      const month = this.card.date.substr(0, 2)
      const year = this.card.date.substr(2, 2)
      if (year.length === 2) {
        return cardValidator.expirationMonth(month).isValid &&
          cardValidator.expirationYear(year).isValid
      }
      return false
    },

    validateCvv () {
      return cardValidator
        .cvv(this.card.cvv, this.activeBrand !== 'american-express' ? 3 : 4).isValid
    },

    updateInstallmentList () {
      const cardInstallments = this.jsClient.cc_installments
      if (cardInstallments && cardInstallments.function) {
        const installmentList = window[cardInstallments.function]({
          number: this.card.bin,
          amount: this.amount.total
        })
        if (cardInstallments.is_promise) {
          this.isLoadingInstallments = true
          installmentList
            .then(installmentList => {
              this.installmentList = installmentList
              if (installmentList.length) {
                this.card.installment = 1
              }
            }).finally(() => {
              this.isLoadingInstallments = false
            })
        } else {
          this.installmentList = installmentList
        }
      }
    },

    generateCardHash () {
      return this.loadPromise.then(() => {
        const cardHash = this.jsClient.cc_hash
        if (cardHash && cardHash.function) {
          const { name, doc, bin, cvv, date } = this.card
          return window[cardHash.function]({
            name,
            doc,
            number: bin,
            cvc: cvv,
            month: date.substr(0, 2),
            year: date.substr(2, 2),
            brand: this.activeBrand
          })
        }
        return ''
      })
    },

    emitCardData (hash) {
      const { bin, name, cvv, doc, birth, installment, address } = this.card
      const transaction = {
        credit_card: {
          holder_name: name,
          last_digits: bin.slice(-4),
          save: true,
          cvv: parseInt(cvv, 10),
          hash
        }
      }
      if (installment) {
        transaction.installments_number = installment
      }
      if (address && address.zip) {
        transaction.billing_address = address
      }
      if (name && doc) {
        transaction.payer = {
          fullname: name,
          doc_number: doc.replace(/\D/g, '')
        }
        if (birth) {
          const dateNumber = (start, ln) => parseInt(birth.substr(start, ln), 10)
          let day, month, year
          if (countryCode === 'BR') {
            day = dateNumber(0, 2)
            month = dateNumber(2, 2)
            year = dateNumber(4, 4)
          } else {
            day = dateNumber(6, 2)
            month = dateNumber(4, 2)
            year = dateNumber(0, 4)
          }
          transaction.payer.birth_date = { day, month, year }
        }
      }
      this.$emit('checkout', transaction)
    },

    notifyInvalidCard () {
      this.$toast({
        title: i18n(i19invalidCard),
        body: i18n(i19invalidCardMsg)
      })
    },

    submit () {
      const { alert } = this
      alert.bin = !this.isNumberPotentiallyValid
      alert.date = !this.validateDate()
      alert.cvv = !this.validateCvv()
      if (!alert.bin && !alert.date && !alert.cvv) {
        const $form = this.$el
        if ($form.checkValidity() && this.validateDate() && this.validateCvv()) {
          if (this.jsClient) {
            this.generateCardHash()
              .then(this.emitCardData)
              .catch(err => {
                console.error(err)
                this.notifyInvalidCard()
              })
          } else {
            this.emitCardData()
          }
        }
        $form.classList.add('was-validated')
      } else {
        this.notifyInvalidCard()
      }
    }
  },

  watch: {
    installmentOptions: {
      handler (installmentOptions) {
        if (installmentOptions) {
          this.installmentList = installmentOptions.concat().sort((a, b) => {
            return a.number - b.number
          })
        }
      },
      immediate: true
    },

    formattedCardBin (bin) {
      this.card.bin = bin.replace(/\D/g, '')
    },

    'card.bin' (bin) {
      this.isNumberValidated = this.isNumberPotentiallyValid = false
      const numberCheck = cardValidator.number(bin)
      if (numberCheck.isPotentiallyValid && numberCheck.card) {
        if (this.activeBrand !== numberCheck.card.type) {
          this.activeBrand = numberCheck.card.type
          if (this.activeBrand) {
            this.updateInstallmentList()
          }
        } else if (!this.installmentList.length && this.card.bin.length >= 6) {
          this.updateInstallmentList()
        }
        if (numberCheck.isValid) {
          this.isNumberValidated = this.isNumberPotentiallyValid = true
        } else {
          this.isNumberPotentiallyValid = numberCheck.isPotentiallyValid
        }
      } else {
        this.activeBrand = ''
      }
    },

    alert: {
      handler () {
        this.$el.classList.remove('was-validated')
      },
      deep: true
    }
  },

  created () {
    if (this.jsClient && !this.jsClientLoad) {
      this.loadPromise = loadPaymentClient(this.jsClient)
    }
  },

  mounted () {
    const $inputs = this.$el.querySelectorAll('input')
    for (let i = 0; i < $inputs.length; i++) {
      if (!$inputs[i].value) {
        $inputs[i].focus()
        break
      }
    }
    $(function () {
      $('[data-toggle="popover"]').popover()
    })
  }
}
