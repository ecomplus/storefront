import { _config, i18n } from '@ecomplus/utils'
import cardValidator from 'card-validator'
import CleaveInput from 'vue-cleave-component'

import {
  AboutCvv,
  CardNumber,
  ConfirmPurchase,
  HolderName,
  NameOnCard,
  ParcelIn,
  SecurityCode,
  ValidThru
} from './../../lib/i18n'

export default {
  name: 'EcCreditCard',

  components: {
    CleaveInput
  },

  props: {
    mergeDictionary: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      card: {
        bin: '',
        name: '',
        validate: '',
        cvv: '',
        birth: '',
        doc: '',
        installment: ''
      },
      alert: {
        bin: false
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
      ]
    }
  },

  computed: {
    lang () {
      return _config.get('lang')
    },

    dictionary () {
      return {
        AboutCvv,
        CardNumber,
        ConfirmPurchase,
        HolderName,
        NameOnCard,
        ParcelIn,
        SecurityCode,
        ValidThru,
        ...this.mergeDictionary
      }
    }
  },

  methods: {
    i18n (label) {
      return i18n(this.dictionary[label])
    },

    submit () {
      const $form = this.$el
      if ($form.checkValidity()) {
        this.$emit('update:customer', {})
      }
      $form.classList.add('was-validated')
    },

    validateNumber (bin) {
      return cardValidator.number(bin).isPotentiallyValid
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
  },

  watch: {
    'card.bin' (bin) {
      this.numberValidated = this.numberPotentiallyValid = false
      const numberCheck = cardValidator.number(bin.replace(/\D/g, ''))
      if (numberCheck.isPotentiallyValid && numberCheck.card) {
        this.activeBrand = numberCheck.card.type
        if (numberCheck.isValid) {
          this.numberValidated = this.numberPotentiallyValid = true
        } else {
          this.numberPotentiallyValid = numberCheck.isPotentiallyValid
        }
      } else {
        this.activeBrand = ''
      }
    }
  }
}
