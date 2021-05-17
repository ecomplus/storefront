import {
  i19a,
  i19birthdate,
  i19cellphone,
  i19companyRegistration,
  i19contactPhone,
  i19corporateName,
  i19docNumber,
  i19emailAddress,
  i19female,
  i19fullName,
  i19Gender,
  i19inscriptionNumber,
  i19InscriptionType,
  i19iReadAndAccept,
  i19male,
  i19nickname,
  i19emailMarketingOptInMsg,
  i19personalRegistration,
  i19privacyPolicy,
  i19save,
  i19saved
} from '@ecomplus/i18n'

import {
  $ecomConfig,
  i18n,
  fullName as getFullName,
  birthDate as getBirthDate,
  phone as getPhone
} from '@ecomplus/utils'

import cloneDeep from 'lodash.clonedeep'
import checkFormValidity from './helpers/check-form-validity'
import InputDocNumber from './../InputDocNumber.vue'
import InputPhone from './../InputPhone.vue'
import InputDate from './../InputDate.vue'

const countryCode = $ecomConfig.get('country_code')

const { sessionStorage } = window
const storageKey = 'ecomCustomerAccount'

const countInvalidInputs = (attr = ':invalid') => {
  return document.querySelectorAll(`.account-form input${attr}`).length
}
const formValidateClass = 'was-validated'

export default {
  name: 'AccountForm',

  components: {
    InputDocNumber,
    InputPhone,
    InputDate
  },

  props: {
    isShort: Boolean,
    customer: {
      type: Object,
      default () {
        return {}
      }
    },
    privacyPolicyUrl: {
      type: String,
      default: typeof window === 'object' ? window.privacyPolicyUrl : null
    }
  },

  data () {
    return {
      localCustomer: cloneDeep(this.customer),
      fullName: getFullName(this.customer),
      storageInterval: null,
      btnLabel: i18n(i19save),
      isPrivacyOptIn: Boolean(this.customer._id)
    }
  },

  computed: {
    i19a: () => i18n(i19a),
    i19birthdate: () => i18n(i19birthdate),
    i19cellphone: () => i18n(i19cellphone),
    i19companyRegistration: () => i18n(i19companyRegistration),
    i19contactPhone: () => i18n(i19contactPhone),
    i19corporateName: () => i18n(i19corporateName),
    i19docNumber: () => i18n(i19docNumber),
    i19emailAddress: () => i18n(i19emailAddress),
    i19female: () => i18n(i19female),
    i19fullName: () => i18n(i19fullName),
    i19Gender: () => i18n(i19Gender),
    i19inscriptionNumber: () => i18n(i19inscriptionNumber),
    i19InscriptionType: () => i18n(i19InscriptionType),
    i19iReadAndAccept: () => i18n(i19iReadAndAccept),
    i19male: () => i18n(i19male),
    i19nickname: () => i18n(i19nickname),
    i19emailMarketingOptInMsg: () => i18n(i19emailMarketingOptInMsg),
    i19personalRegistration: () => i18n(i19personalRegistration),
    i19privacyPolicy: () => i18n(i19privacyPolicy),

    birthdate: {
      get () {
        return getBirthDate(this.localCustomer)
      },
      set (dateStr) {
        if (dateStr.length === 8) {
          const dateNumber = (start, ln) => parseInt(dateStr.substr(start, ln), 10)
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
          const currentYear = new Date().getFullYear()
          if (year < currentYear - 125) {
            year = currentYear - 125
          } else if (year > currentYear) {
            year = currentYear
          }
          this.localCustomer.birth_date = { day, month, year }
        }
      }
    },

    phoneNumber: {
      get () {
        return this.getPhoneStr(0)
      },
      set (phoneStr) {
        this.localCustomer.phones[0] = this.parsePhoneStr(phoneStr)
      }
    },

    secondPhoneNumber: {
      get () {
        return this.getPhoneStr(1)
      },
      set (phoneStr) {
        const { phones } = this.localCustomer
        phones[phones.length > 0 ? 1 : 0] = this.parsePhoneStr(phoneStr)
      }
    }
  },

  methods: {
    getPhoneStr (index = 0) {
      const { phones } = this.localCustomer
      return phones[index]
        ? getPhone(this.localCustomer.phones[index])
        : ''
    },

    parsePhoneStr (phoneStr) {
      let code, number
      if (phoneStr.charAt(0) === '+') {
        code = parseInt(phoneStr.substr(1, 2))
        number = phoneStr.substr(3)
      } else {
        number = phoneStr
      }
      const phoneObj = { number }
      if (code >= 1 && code <= 999) {
        phoneObj.country_code = code
      }
      return phoneObj
    },

    mergeLocalCustomer (newCustomer) {
      for (const field in newCustomer) {
        if (newCustomer[field]) {
          const localValue = this.localCustomer[field]
          if (!localValue || (typeof localValue === 'object' && !Object.keys(localValue).length)) {
            if (field === 'name') {
              this.fullName = getFullName({
                name: newCustomer[field]
              })
            } else {
              this.localCustomer[field] = newCustomer[field]
            }
          }
        }
      }
    },

    saveToStorage () {
      sessionStorage.setItem(storageKey, JSON.stringify(this.localCustomer))
    },

    submit () {
      this.$nextTick(() => {
        const $form = this.$el
        if (!countInvalidInputs('.is-invalid')) {
          if (!this.localCustomer.display_name) {
            this.localCustomer.display_name = this.localCustomer.name.given_name
          }
          if (checkFormValidity($form)) {
            this.saveToStorage()
            this.save()
          } else if ($form.classList.contains(formValidateClass) && !countInvalidInputs()) {
            this.save()
          }
          $form.classList.add(formValidateClass)
        } else {
          $form.classList.remove(formValidateClass)
        }
      })
    },

    save () {
      this.$emit('update:customer', this.localCustomer)
      this.$emit('submit', this.localCustomer)
      this.btnLabel = i18n(i19saved) + '...'
      setTimeout(() => {
        this.btnLabel = i18n(i19save)
      }, 3000)
    }
  },

  watch: {
    fullName (nameStr) {
      const fixedFullName = nameStr.replace(/\s{2,}/g, ' ')
      if (fixedFullName !== this.fullName) {
        this.fullName = fixedFullName
      } else {
        const names = fixedFullName.trim().split(' ')
        this.localCustomer.name = {
          given_name: names.shift()
        }
        const { name } = this.localCustomer
        if (names.length) {
          name.family_name = names.pop()
          if (names.length) {
            name[name.family_name ? 'middle_name' : 'family_name'] = names.join(' ')
          }
        }
      }
    },

    customer: {
      handler () {
        this.mergeLocalCustomer(this.customer)
      },
      deep: true
    }
  },

  created () {
    const sessionCustomer = JSON.parse(sessionStorage.getItem(storageKey))
    if (sessionCustomer) {
      this.mergeLocalCustomer(sessionCustomer)
    }
    this.storageInterval = setInterval(() => {
      if (Object.keys(this.localCustomer).length) {
        this.saveToStorage()
      }
    }, 7000)
    if (!this.localCustomer._id) {
      this.localCustomer.accepts_marketing = true
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

  destroyed () {
    clearInterval(this.storageInterval)
  }
}
