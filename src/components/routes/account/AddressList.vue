<template>
  <div class="_addresses">
    <transition name="fade">
      <div key="address-form" v-if="showForm">
        <address-form
          ref="form"
          :zip="setZip"
          :recipient="customerName"
          :buttonText="buttonText"
          @submit-form="submitForm"/>
        <div v-if="customerHasAddress" class="_address-list-link">
          <a href="javascript:;" @click="showForm = false">
            <a-icon icon="angle-left" class="__icon-mr"></a-icon>
            {{ $t('address.list') }}
          </a>
        </div>
      </div>

      <div key="address-list" v-else class="_address-list __container-sm">
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
              <a href="javascript:;" class="_address-remove" @click="removeCustomerAddress(address)">
                <a-icon icon="trash"></a-icon>
              </a>
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
              <div class="_address-zip">
                {{ address.zip }}
              </div>
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
import AddressForm from '@/components/routes/account/AddressForm'

export default {
  name: 'AddressList',

  components: {
    AddressForm
  },

  props: [
    'buttonText',
    'zip'
  ],

  data () {
    return {
      showForm: false,
      setZip: ''
    }
  },

  computed: mapGetters([
    'customer',
    'customerHasAddress',
    'customerName',
    'findCustomerAddress'
  ]),

  methods: {
    ...mapActions([
      'setCustomerAddress',
      'removeCustomerAddress',
      'chooseCustomerAddress'
    ]),

    addAddress (zip) {
      // show address form
      this.showForm = true
      this.setZip = typeof zip === 'string' ? zip : ''
    },

    editAddress (address) {
      // pass address to form component
      let vm = this
      vm.showForm = true
      setTimeout(() => {
        vm.$refs.form.editAddress(address)
      }, 200)
    },

    submitForm (data) {
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
    }
  },

  mounted () {
    if (this.zip) {
      // try to find customer address
      let address = this.findCustomerAddress(this.zip)
      if (address) {
        // check if found address is not already selected as default
        if (!address.default) {
          this.setCustomerAddress(address)
        }
      } else {
        // new address with passed zip
        this.addAddress(this.zip)
      }
    } else if (!this.customerHasAddress) {
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
}
._address-city {
  display: inline-block;
  margin-left: .5rem;
}
._address-zip {
  font-weight: 600;
  display: block;
}
._address-city,
._address-zip,
._address-line {
  margin-top: .4rem;
}
._address-city {
  color: $--color-text-regular;
}
a._address-remove {
  color: $--color-danger;
  margin: 0 .7rem;
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
._address-list-link {
  margin-top: .5rem;
  text-align: center;
}
</style>
