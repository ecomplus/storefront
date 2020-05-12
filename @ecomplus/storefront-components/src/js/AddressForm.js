import {
  i19borough,
  i19city,
  i19complement,
  i19name,
  i19noNumber,
  i19number,
  i19provinceCode,
  i19recipient,
  i19reference,
  i19save,
  i19street,
  i19zipCode
} from '@ecomplus/i18n'

import {
  $ecomConfig,
  i18n,
  randomObjectId as getRandomObjectId
} from '@ecomplus/utils'

import axios from 'axios'
import InputZipCode from '../InputZipCode.vue'

const countryCode = $ecomConfig.get('country_code')

export default {
  name: 'AddressForm',

  components: {
    InputZipCode
  },

  props: {
    address: {
      type: Object,
      default () {
        return {}
      }
    },
    zipCode: String
  },

  data () {
    return {
      localAddress: {
        _id: getRandomObjectId(),
        zip: '',
        province_code: '',
        ...this.address
      },
      isZipReady: countryCode !== 'BR',
      isZipLoading: false,
      addressFromZip: {},
      isNoNumber: false
    }
  },

  computed: {
    i19borough: () => i18n(i19borough),
    i19city: () => i18n(i19city),
    i19complement: () => i18n(i19complement),
    i19name: () => i18n(i19name),
    i19noNumber: () => i18n(i19noNumber),
    i19number: () => i18n(i19number),
    i19provinceCode: () => i18n(i19provinceCode),
    i19recipient: () => i18n(i19recipient),
    i19reference: () => i18n(i19reference),
    i19save: () => i18n(i19save),
    i19street: () => i18n(i19street),
    i19zipCode: () => i18n(i19zipCode),

    provinceCode: {
      get () {
        return this.localAddress.province_code
      },
      set (value) {
        this.localAddress.province_code = value.toUpperCase().slice(0, 2)
      }
    }
  },

  methods: {
    updateZipState () {
      this.isZipLoading = (countryCode === 'BR' && this.localAddress.zip.length === 8)
    },

    submit (ev) {
      const $form = this.$el
      if ($form.checkValidity()) {
        this.$emit('update:address', this.localAddress)
      }
      $form.classList.add('was-validated')
    }
  },

  watch: {
    zipCode (zip) {
      this.localAddress.zip = zip
    },

    'localAddress.zip' () {
      this.updateZipState()
    },

    isZipLoading (load) {
      if (load) {
        this.isZipReady = false
        this.addressFromZip = {}
        axios.get(`https://viacep.com.br/ws/${this.localAddress.zip}/json/`)
          .then(({ data }) => {
            if (!data.erro) {
              ;[
                ['province_code', data.uf],
                ['city', data.localidade],
                ['borough', data.bairro],
                ['street', data.logradouro]
              ].forEach(([field, value]) => {
                this.$set(this.localAddress, field, value || '')
                this.$set(this.addressFromZip, field, Boolean(value))
              })
              this.$nextTick(() => {
                setTimeout(() => {
                  if (this.$refs.inputNumber) {
                    this.$refs.inputNumber.select()
                  }
                }, 300)
              })
            }
          })
          .catch(err => {
            console.error(err)
          })
          .finally(() => {
            this.isZipLoading = false
            this.isZipReady = true
          })
      }
    },

    isNoNumber (isNoNumber) {
      if (isNoNumber) {
        delete this.localAddress.number
      }
    }
  },

  mounted () {
    this.updateZipState()
    const $inputs = this.$el.querySelectorAll('input')
    for (let i = 0; i < $inputs.length; i++) {
      if (!$inputs[i].value) {
        $inputs[i].focus()
        break
      }
    }
  }
}
