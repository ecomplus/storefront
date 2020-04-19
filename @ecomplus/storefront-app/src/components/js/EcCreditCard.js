import { _config, i18n, formatMoney } from '@ecomplus/utils'
import cardValidator from 'card-validator'
import loadPaymentClient from './../../lib/load-payment-client'
import InputDate from './../_internal/InputDate.vue'
import InputDocNumber from './../_internal/InputDocNumber.vue'
import CleaveInput from 'vue-cleave-component'
import { SlideYUpTransition } from 'vue2-transitions'

import {
  AboutCvv,
  AtSight,
  Birthdate,
  CardNumber,
  ConfirmPurchase,
  DocNumber,
  HolderName,
  InterestFree,
  InvalidCard,
  InvalidCardMsg,
  NameOnCard,
  Of,
  ParcelIn,
  SecurityCode,
  ValidThru
} from './../../lib/i18n'

const countryCode = _config.get('country_code')

export default {
  name: 'EcCreditCard',

  components: {
    InputDate,
    InputDocNumber,
    CleaveInput,
    SlideYUpTransition
  },

  props: {
    mergeDictionary: {
      type: Object,
      default: () => {}
    },
    amount: {
      type: Object,
      required: true
    },
    checkHolder: {
      type: String
    },
    skipHolderInfo: {
      type: Boolean
    },
    isCompany: {
      type: Boolean
    },
    installmentOptions: {
      type: Array
    },
    jsClient: {
      type: Object
    },
    jsClientLoad: {
      type: Promise
    }
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
      numberValidated: false,
      numberPotentiallyValid: false,
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
      hideHolderFields: this.skipHolderInfo || Boolean(this.checkHolder),
      loadPromise: this.jsClientLoad || Promise.resolve()
    }
  },

  computed: {
    lang () {
      return _config.get('lang')
    },

    dictionary () {
      return {
        AboutCvv,
        AtSight,
        Birthdate,
        CardNumber,
        ConfirmPurchase,
        DocNumber,
        HolderName,
        InterestFree,
        InvalidCard,
        InvalidCardMsg,
        NameOnCard,
        Of,
        ParcelIn,
        SecurityCode,
        ValidThru,
        ...this.mergeDictionary
      }
    },

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

    i18n (label) {
      return i18n(this.dictionary[label])
    },

    checkName () {
      if (!this.skipHolderInfo && this.checkHolder) {
        const name = this.card.name.replace(/(\s.*)/, '')
        if (name === '') {
          this.hideHolderFields = true
        } else if (name.localeCompare(this.compareName, 'en', { sensitivity: 'base' }) === 0) {
          this.hideHolderFields = true
          this.card.doc = this.card.birth = ''
        } else {
          this.hideHolderFields = false
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
      this.$bvToast.toast(this.i18n('InvalidCardMsg'), {
        title: this.i18n('InvalidCard'),
        variant: 'warning',
        solid: true
      })
    },

    submit () {
      const { alert } = this
      alert.bin = !this.numberPotentiallyValid
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
      this.numberValidated = this.numberPotentiallyValid = false
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
          this.numberValidated = this.numberPotentiallyValid = true
        } else {
          this.numberPotentiallyValid = numberCheck.isPotentiallyValid
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
  }
}
