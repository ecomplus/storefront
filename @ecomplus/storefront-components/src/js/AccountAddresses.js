import {
  i19edit,
  i19newAddress,
  i19noNumber,
  i19remove
} from '@ecomplus/i18n'

import {
  i18n,
  fullName as getFullName
} from '@ecomplus/utils'

import AddressForm from './../AddressForm.vue'

const { sessionStorage } = window
const storageKey = 'ecomCustomerAddress'

export default {
  name: 'AccountAddresses',

  components: {
    AddressForm
  },

  props: {
    customer: {
      type: Object,
      default () {
        return {}
      }
    },
    zipCode: String
  },

  data () {
    return {
      canShowForm: false,
      isNewAddress: false,
      editAddressIndex: -1
    }
  },

  computed: {
    i19edit: () => i18n(i19edit),
    i19newAddress: () => i18n(i19newAddress),
    i19remove: () => i18n(i19remove),
    i19noNumber: () => i18n(i19noNumber),

    addresses () {
      return this.customer.addresses || []
    },

    localAddress: {
      get () {
        let address = this.addresses[this.editAddressIndex]
        if (!address) {
          address = {}
          if (this.zipCode) {
            address.zip = this.zipCode
          }
          if (this.customer.name) {
            address.name = getFullName(this.customer).substr(0, 70)
          }
        }
        return address
      },
      set (address) {
        const addresses = [].concat(this.addresses)
        addresses[this.editAddressIndex] = address
        this.$emit('update:customer', {
          ...this.customer,
          addresses
        })
        if (address.zip) {
          this.isNewAddress = false
          this.selectAddress(address)
        }
        this.canShowForm = false
      }
    }
  },

  methods: {
    getLineAddress (address) {
      if (address.line_address) {
        return address.line_address
      } else {
        let lineAddress = `${address.street} ${(address.number || this.i19noNumber)}`
        if (address.complement) {
          lineAddress += ` - ${address.complement}`
        }
        if (address.borough) {
          lineAddress += `, ${address.borough}`
        }
        return lineAddress
      }
    },

    selectAddress (address) {
      this.$emit('select-address', address._id)
      sessionStorage.setItem(storageKey, JSON.stringify(address))
    },

    removeAddress (index) {
      const addresses = [].concat(this.addresses)
      addresses.splice(index, 1)
      this.$emit('update:customer', {
        ...this.customer,
        addresses
      })
    }
  },

  watch: {
    addresses (newList, oldList) {
      if (!oldList.length) {
        if (this.isNewAddress) {
          this.canShowForm = this.isNewAddress = false
        }
      } else if (!newList.length) {
        this.canShowForm = this.isNewAddress = true
      }
    },

    isNewAddress (isAddAddress) {
      if (isAddAddress) {
        this.editAddressIndex = this.addresses.length
        this.canShowForm = true
      }
    },

    editAddressIndex (index) {
      if (index > -1) {
        const address = this.addresses[index]
        if (address) {
          this.selectAddress(address)
        }
        this.canShowForm = true
      }
    },

    canShowForm (isVisible) {
      if (!isVisible) {
        this.editAddressIndex = -1
      }
    }
  },

  created () {
    if (!this.addresses.length) {
      this.isNewAddress = true
      const sessionAddress = JSON.parse(sessionStorage.getItem(storageKey))
      if (sessionAddress) {
        const address = {}
        for (const field in sessionAddress) {
          if (sessionAddress[field]) {
            address[field] = sessionAddress[field]
          }
        }
        if (address._id && address.zip && address.street) {
          this.editAddressIndex = 0
          this.$nextTick(() => {
            this.localAddress = address
          })
        }
      }
    } else {
      let addressIndex
      if (this.zipCode) {
        addressIndex = this.addresses.findIndex(addr => addr.zip === this.zipCode)
      }
      if (!(addressIndex >= 0)) {
        addressIndex = this.addresses.findIndex(addr => addr.default)
        if (addressIndex === -1) {
          addressIndex = 0
        }
      }
      const address = this.addresses[addressIndex]
      if (address.name && address.street && address.city) {
        this.selectAddress(address)
      } else {
        this.editAddressIndex = addressIndex
      }
    }
  }
}
