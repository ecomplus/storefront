import { _config, i18n, randomObjectId } from '@ecomplus/utils'
import axios from 'axios'
import InputZipCode from './../_internal/InputZipCode.vue'
import { SlideYUpTransition } from 'vue2-transitions'

import {
  Borough,
  City,
  Complement,
  Name,
  NoNumber,
  Number,
  ProvinceCode,
  Recipient,
  Reference,
  Save,
  Street,
  ZipCode
} from './../../lib/i18n'

const countryCode = _config.get('country_code')

export default {
  name: 'EcAddressForm',

  components: {
    InputZipCode,
    SlideYUpTransition
  },

  props: {
    mergeDictionary: {
      type: Object,
      default: () => {}
    },
    address: {
      type: Object,
      default: () => {}
    },
    zipCode: {
      type: String
    }
  },

  data () {
    return {
      localAddress: {
        _id: randomObjectId(),
        zip: '',
        province_code: '',
        ...this.address
      },
      zipReady: countryCode !== 'BR',
      zipLoading: false,
      addressFromZip: false,
      noNumber: false
    }
  },

  computed: {
    dictionary () {
      return {
        Borough,
        City,
        Complement,
        Name,
        NoNumber,
        Number,
        ProvinceCode,
        Recipient,
        Reference,
        Save,
        Street,
        ZipCode,
        ...this.mergeDictionary
      }
    },

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
    i18n (label) {
      return i18n(this.dictionary[label])
    },

    updateZipState () {
      this.zipLoading = (countryCode === 'BR' && this.localAddress.zip.length === 8)
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

    zipLoading (load) {
      if (load) {
        this.zipReady = false
        axios.get(`https://viacep.com.br/ws/${this.localAddress.zip}/json/`)
          .then(({ data }) => {
            if (!data.erro) {
              const { bairro, localidade, logradouro, uf } = data
              this.localAddress.province_code = uf
              this.localAddress.city = localidade
              this.localAddress.street = logradouro
              this.localAddress.borough = bairro
              this.addressFromZip = true
              setTimeout(() => {
                this.$refs.inputNumber.select()
              }, 300)
            } else {
              this.addressFromZip = false
            }
          })
          .catch(err => {
            console.error(err)
          })
          .finally(() => {
            this.zipLoading = false
            this.zipReady = true
          })
      }
    },

    noNumber (isNoNumber) {
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
