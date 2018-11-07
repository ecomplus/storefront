<template>
  <el-form
    key="address-form"
    ref="form"
    :model="form"
    :rules="rules"
    class="_address-form __form-sm">
    <el-form-item :label="$t('address.recipient')" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item v-if="$country === 'br'" prop="zip">
      <template slot="label">
        {{ $t('address.zip') }}
      </template>
      <el-input
        v-model="form.zip"
        v-mask="'99999-999'"
        v-on-keyup="handleZip"
        class="__input-sm">
        <template slot="append">
          <a v-if="!zipLoading"
            href="http://www.buscacep.correios.com.br/sistemas/buscacep/default.cfm"
            target="_blank">
            <a-icon icon="question-circle"></a-icon>
          </a>
          <a-icon v-else icon="circle-notch" spin></a-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item v-else :label="$t('address.zip')" prop="zip">
      <el-input v-model="form.zip" class="__input-sm"></el-input>
    </el-form-item>

    <el-collapse-transition>
      <div key="zip-ready" v-if="zipReady">
        <el-form-item :label="$t('address.number')" prop="number">
          <el-col :span="8">
            <el-input
              v-model="form.number" v-mask="[ '9{1,7}', '-' ]"
              :disabled="noNumber"></el-input>
          </el-col>
          <el-col :offset="1" :span="15">
            <el-checkbox v-model="noNumber" @change="() => { form.number = noNumber ? '-' : '' }">
              {{ $t('address.noNumber') }}
            </el-checkbox>
          </el-col>
        </el-form-item>
        <el-form-item :label="$t('address.complement')" prop="complement">
          <el-input v-model="form.complement" class="__input-sm"></el-input>
        </el-form-item>
        <el-form-item :label="$t('address.reference')" prop="reference">
          <el-input v-model="form.reference"></el-input>
        </el-form-item>

        <el-form-item :label="$t('address.street')" prop="street">
          <el-input v-model="form.street" :disabled="addressFromZip"></el-input>
        </el-form-item>
        <el-form-item :label="$t('address.borough')" prop="borough">
          <el-input v-model="form.borough" :disabled="boroughFromZip"></el-input>
        </el-form-item>
        <el-form-item :label="$t('address.city')" prop="city">
          <el-input v-model="form.city" :disabled="addressFromZip"></el-input>
        </el-form-item>
        <el-form-item :label="$t('address.province')" prop="province">
          <el-input v-model="form.province" :disabled="addressFromZip" class="__input-sm"></el-input>
        </el-form-item>

        <el-form-item v-if="$country !== 'br'" :label="$t('address.country')" prop="country">
          <el-input
            v-model="form.country"
            v-mask="'AA'"
            class="__input-sm"
            placeholder="US"></el-input>
        </el-form-item>

        <el-form-item size="large">
          <el-button type="primary" @click="submitForm">
            <a-icon icon="check" class="__icon-mr"></a-icon>
            {{ buttonText || $t('general.save') }}
          </el-button>
        </el-form-item>
      </div>
    </el-collapse-transition>
  </el-form>
</template>

<script>
import { addRule, checkMask } from '@/lib/utils'

export default {
  name: 'AddressForm',

  props: [
    'buttonText',
    'zip',
    'recipient'
  ],

  data () {
    // setup form validation rules
    let rules = {}
    // handle required form fields
    ;[ 'name', 'zip', 'province', 'city', 'street', 'number' ].forEach(label => {
      addRule(label, { required: true, message: this.$t('validate.required') }, rules)
    })
    // handle marked inputs validation
    ;[ 'zip', 'country', 'number' ].forEach(label => {
      addRule(label, { validator: checkMask(this.$t('validate.mask')), trigger: 'blur' }, rules)
    })

    return {
      zipReady: false,
      zipLoading: false,
      noNumber: false,
      addressFromZip: false,
      boroughFromZip: false,
      form: {
        // form initially empty
        id: null,
        zip: this.zip ? this.zip : '',
        province: '',
        city: '',
        borough: '',
        street: '',
        number: '',
        complement: '',
        reference: '',
        country: '',
        name: this.recipient ? this.recipient : ''
      },
      rules
    }
  },

  methods: {
    editAddress (address) {
      // update form data with current addres object
      this.form = {
        id: address._id,
        zip: address.zip,
        province: address.province_code || address.province || '',
        city: address.city || '',
        borough: address.borough || '',
        street: address.street || '',
        complement: address.complement || '',
        reference: address.reference || '',
        country: address.country || '',
        name: address.name
      }
      if (!address.number) {
        // address without street number
        this.noNumber = true
        this.form.number = ''
      } else {
        // parse number to string
        this.form.number = address.number.toString()
      }
      this.handleZip()
    },

    handleZip () {
      let vm = this
      let zip = vm.form.zip
      if (this.$country === 'br') {
        if (/\d{5}-?\d{3}/.test(zip)) {
          // valid BR CEP
          // show loading spinner
          vm.zipLoading = true
          let zipNotFound = () => {
            // enable inputs manual edition
            vm.addressFromZip = vm.boroughFromZip = false
          }

          // get address info by ZIP code from ViaCEP webservice
          fetch('https://viacep.com.br/ws/' + zip + '/json/').then(response => {
            return response.json()
          }).catch(zipNotFound).finally(() => {
            // hide loading spinner
            vm.zipLoading = false
            // show fields
            vm.zipReady = true
          })

          // on success fill form and disable fields manual edition
          .then(data => {
            if (data.uf) {
              // update form fields
              let form = vm.form
              form.province = data.uf
              form.city = data.localidade
              form.street = data.logradouro
              // disable fields edition
              vm.addressFromZip = true
              if (data.bairro && data.bairro !== '') {
                form.borough = data.bairro
                vm.boroughFromZip = true
              } else {
                vm.boroughFromZip = false
              }
            } else {
              zipNotFound()
            }
          })
        } else {
          // incomplete CEP
          vm.zipReady = false
        }
      }
    },

    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // valid form data
          // handle submit
          this.$emit('submit-form', this.form)
        } else {
          // show notification
          this.$message({
            showClose: true,
            message: this.$t('validate.invalidForm'),
            type: 'warning'
          })
          return false
        }
      })
    }
  },

  created () {
    // handle ZIP code only for BR CEP
    this.zipReady = !(this.$country === 'br' && this.form.street === '')
  },

  mounted () {
    // check preseted ZIP
    if (this.form.zip !== '') {
      this.handleZip()
    }
  }
}
</script>
