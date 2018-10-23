<template>
  <div class="_addresses">
    <transition name="fade">
      <el-form
        key="address-form"
        v-if="showForm"
        ref="form"
        :model="form"
        :rules="rules"
        class="_address-form __form-sm">
        <el-form-item :label="$t('address.recipient')" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('address.zip')" prop="zip">
          <el-input
            v-if="$country === 'br'"
            v-model="form.zip"
            v-mask="'99999-999'"
            v-on-keyup="handleZip"
            class="__input-sm"></el-input>
          <el-input v-else v-model="form.zip" class="__input-sm"></el-input>
        </el-form-item>

        <transition name="fade">
          <span key="zip-ready" v-if="zipReady">
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
          </span>

          <div key="zip-loading" v-else v-loading="zipLoading" class="__py"></div>
        </transition>
      </el-form>

      <div key="address-list" v-else class="_address-list">
        <el-card
          v-for="address in customer.addresses"
          :key="address._id + address.default.toString()"
          shadow="never"
          class="_address">
          <el-row>
            <el-col :sm="10" :xs="24" class="_address-options">
              <p class="_address-select">
                <el-checkbox :checked="address.default" @change="chooseCustomerAddress(address)">
                  {{ $t('address.selectAddress') }}
                </el-checkbox>
              </p>
              <el-button type="info" size="mini" class="_address-edit" @click="editAddress(address)">
                <a-icon icon="edit" class="__icon-mr"></a-icon>
                {{ $t('general.edit') }}
              </el-button>
              <el-button
                type="danger"
                size="mini"
                class="_address-remove"
                @click="removeCustomerAddress(address)">
                <a-icon icon="trash"></a-icon>
              </el-button>
            </el-col>

            <el-col :sm="14" :xs="24" class="_address-info">
              <div class="_address-recipient">
                {{ address.name }}
              </div>
              <span v-if="address.line_address" class="_address-line">
                {{ address.line_address }}
              </span>
              <span v-else-if="address.street" class="_address-line">
                {{ address.street + ', ' +
                  (address.number || $t('address.noNumber')) +
                  (address.complement ? ' - ' + address.complement : '') +
                  (address.borough ? ', ' + address.borough : '') }}
              </span>
              <span v-if="address.city" class="_address-city">
                {{ address.city + ' / ' + (address.province_code || address.province) }}
              </span>
              <el-tag class="_address-zip" type="info">
                {{ address.zip }}
              </el-tag>
            </el-col>
          </el-row>
        </el-card>

        <el-button type="primary" @click="addAddress">
          <a-icon icon="plus" class="__icon-mr"></a-icon>
          {{ $t('address.addAddress') }}
        </el-button>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { addRule, checkMask } from '@/lib/utils'

export default {
  name: 'AddressList',

  props: [ 'buttonText' ],

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
      showForm: false,
      zipReady: false,
      zipLoading: false,
      noNumber: false,
      addressFromZip: false,
      boroughFromZip: false,
      form: {
        // declare form empty for further reset
      },
      rules
    }
  },

  computed: mapGetters([
    'customer',
    'customerHasAddress',
    'customerName'
  ]),

  methods: {
    ...mapActions([
      'setCustomerAddress',
      'removeCustomerAddress',
      'chooseCustomerAddress'
    ]),

    addAddress () {
      // reset form object
      this.form = {
        id: null,
        zip: '',
        province: '',
        city: '',
        borough: '',
        street: '',
        number: '',
        complement: '',
        reference: '',
        country: '',
        name: this.customerName
      }
      this.setupForm()
    },

    setupForm () {
      // show address form
      this.showForm = true
      this.addressFromZip = false
      // handle ZIP code only for BR CEP
      this.zipReady = !(this.$country === 'br' && this.form.street === '')
    },

    editAddress (address) {
      // update form data with current addres object
      this.form = {
        id: address._id,
        zip: address.zip,
        province: address.province_code || address.province || '',
        city: address.city || '',
        borough: address.borough || '',
        street: address.street || '',
        number: address.number || '',
        complement: address.complement || '',
        reference: address.reference || '',
        country: address.country || '',
        name: address.name
      }
      if (!address.number) {
        // address without street number
        this.noNumber = true
      }
      this.setupForm()
    },

    handleZip () {
      let vm = this
      let zip = vm.form.zip
      if (this.$country === 'br') {
        if (/\d{5}-?\d{3}/.test(zip)) {
          // valid BR CEP
          // show loading spinner
          vm.zipLoading = true
          // get address info by ZIP code from ViaCEP webservice
          fetch('https://viacep.com.br/ws/' + zip + '/json/').then(response => {
            return response.json()
          }).catch(e => {
            // enable inputs manual edition
            vm.addressFromZip = vm.boroughFromZip = false
          }).finally(() => {
            // hide loading spinner
            vm.zipLoading = false
          })

          // on success fill form and disable fields manual edition
          .then(data => {
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
            // show fields
            vm.zipReady = true
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
          let data = this.form
          // update customer with new address
          let address = {
            // random Object ID if undefined or null
            _id: data.id || ('5' + Date.now()).padEnd(24, '0'),
            zip: data.zip,
            name: data.name.trim(),
            street: data.street.trim(),
            number: parseInt(data.number, 10),
            complement: data.complement.trim(),
            near_to: data.reference.trim(),
            borough: data.borough.trim(),
            city: data.city.trim(),
            country_code: data.country.trim()
          }

          // optional properties
          if (data.province !== '') {
            if (/^[A-Z]{2}$/.test(data.province)) {
              address.province_code = data.province
            } else {
              // full province name
              address.province = data.province
            }
          }
          if (address.number <= 0 || isNaN(address.number)) {
            // invalid number
            delete address.number
          }
          // remove empty properties
          for (let prop in address) {
            if (address[prop] === '') {
              delete address[prop]
            }
          }

          // save new address on customer addresses list
          this.setCustomerAddress(address).then(() => {
            // show addresses list
            this.showForm = false
          })
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

  mounted () {
    if (!this.customerHasAddress) {
      // start creating the first address
      this.addAddress()
    }
  },

  watch: {
    customerHasAddress (hasAddress) {
      if (!hasAddress) {
        // all addresses delete
        // should create new one
        this.addAddress()
      }
    }
  }
}
</script>

<style lang="scss">
// Element UI theme variables
@import '../../../../node_modules/element-theme-chalk/src/common/var.scss';

._address {
  margin-bottom: $--card-padding;
}
._address-info {
  text-align: right;
}
._address-recipient {
  color: $--color-text-secondary;
  margin-bottom: .25rem;
}
._address-city,
._address-zip {
  display: inline-block;
  margin-left: .5rem;
}
._address-city,
._address-zip,
._address-line {
  margin-top: .27rem;
}
._address-city {
  color: $--color-text-regular;
}
@media (max-width: 767px) {
  ._address-options {
    margin-bottom: $--card-padding * .5;
  }
}
@media (max-width: 575px) {
  ._address-line,
  ._address-city {
    display: block;
  }
}
</style>
