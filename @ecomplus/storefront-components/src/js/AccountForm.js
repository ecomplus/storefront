import {
  i19birthdate,
  i19cellphone,
  i19corporateName,
  i19contactPhone,
  i19docNumber,
  i19emailAddress,
  i19female,
  i19fullName,
  i19Gender,
  i19male,
  i19nickname,
  i19personalRegistration,
  i19companyRegistration,
  i19save
} from '@ecomplus/i18n'

import {
  $ecomConfig,
  i18n,
  fullName as getFullName,
  birthDate as getBirthDate,
  phone as getPhone
} from '@ecomplus/utils'

import InputDocNumber from './../InputDocNumber.vue'
import InputPhone from './../InputPhone.vue'
import InputDate from './../InputDate.vue'
import cloneDeep from 'lodash.clonedeep'

const countryCode = $ecomConfig.get('country_code')

const { sessionStorage } = window
const storageKey = 'ecomCustomerAccount'

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
    }
  },

  data () {
    return {
      localCustomer: cloneDeep(this.customer),
      fullName: getFullName(this.customer),
      storageInterval: null
    }
  },

  computed: {
    i19birthdate: () => i18n(i19birthdate),
    i19cellphone: () => i18n(i19cellphone),
    i19corporateName: () => i18n(i19corporateName),
    i19contactPhone: () => i18n(i19contactPhone),
    i19docNumber: () => i18n(i19docNumber),
    i19emailAddress: () => i18n(i19emailAddress),
    i19female: () => i18n(i19female),
    i19fullName: () => i18n(i19fullName),
    i19Gender: () => i18n(i19Gender),
    i19male: () => i18n(i19male),
    i19nickname: () => i18n(i19nickname),
    i19companyRegistration: () => i18n(i19companyRegistration),
    i19personalRegistration: () => i18n(i19personalRegistration),
    i19save: () => i18n(i19save),

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
        code = phoneStr.substr(1, 2)
        number = phoneStr.substr(3)
      } else {
        number = phoneStr
      }
      const phoneObj = { number }
      if (code) {
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

    submit (ev) {
      const $form = this.$el
      if (!document.querySelectorAll('.account-form input.is-invalid').length) {
        if ($form.checkValidity()) {
          if (!this.localCustomer.display_name) {
            this.localCustomer.display_name = this.localCustomer.name.given_name
          }
          this.saveToStorage()
          this.$emit('update:customer', this.localCustomer)
        }
        $form.classList.add('was-validated')
      } else {
        $form.classList.remove('was-validated')
      }
    }
  },

  watch: {
    fullName (nameStr) {
      const names = nameStr.split(' ')
      this.localCustomer.name = {
        given_name: names.shift()
      }
      const { name } = this.localCustomer
      if (names.length) {
        name.family_name = names.pop()
        if (names.length) {
          name.middle_name = names.join(' ')
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
