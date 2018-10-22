<template>
  <div class="_addresses">
    <transition name="fade">
      <el-form v-if="newAddress" ref="form" :model="form" :rules="rules" class="_address-form __form-sm">
        <el-form-item :label="$t('address.recipient')" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('address.zip')" prop="zip">
          <el-input
            v-if="$lang === 'pt_br'"
            v-model="form.zip"
            v-mask="'99999-999'"
            @change="handleZip"
            class="__input-sm"></el-input>
          <el-input v-else v-model="form.zip" class="__input-sm"></el-input>
        </el-form-item>

        <transition name="fade">
          <div v-if="zipReady">
          </div>
        </transition>
      </el-form>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { addRule, checkMask } from '@/lib/utils'

export default {
  name: 'AddressList',

  data () {
    // setup form validation rules
    let rules = {}
    // handle required form fields
    ;[ 'name', 'zip', 'province_code', 'city', 'borough', 'street', 'number' ].forEach(label => {
      addRule(label, { required: true, message: this.$t('validate.required') }, rules)
    })
    // handle marked inputs validation
    addRule('zip', { validator: checkMask(this.$t('validate.mask')), trigger: 'blur' }, rules)
    // handle type number validation
    addRule('number', { type: 'number', message: this.$t('validate.number'), trigger: 'blur' }, rules)

    return {
      newAddress: false,
      zipReady: false,
      form: {
        // declare form empty for further reset
      },
      rules
    }
  },

  computed: mapGetters([
    'customer',
    'customerName'
  ]),

  methods: {
    ...mapActions([
      'editCustomer'
    ]),

    addAddress () {
      // reset form object
      this.form = {
        zip: '',
        province_code: '',
        city: '',
        borough: '',
        street: '',
        number: null,
        name: this.customerName
      }
      // show new address form
      this.newAddress = true
      // BR zip code is handled asynchronously
      this.zipReady = (this.$lang !== 'pt_br')
    },

    handleZip () {
      let zip = this.form.zip
      if (this.$lang === 'pt_br' && /\d{5}-?\d{3}/.test(zip)) {
        // valid BR CEP
        // get address info by ZIP code from ViaCEP webservice
        fetch('https://viacep.com.br/ws/' + zip + '/json/').then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log('There has been a problem with your fetch operation: ' + error.message)
        })
      }
    }
  },

  created () {
    if (!this.customer.addresses.length) {
      // start creating the first address
      this.addAddress()
    }
  }
}
</script>

<style lang="scss">
// Element UI theme variables
@import '../../../../node_modules/element-theme-chalk/src/common/var.scss';
</style>
