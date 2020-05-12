import { i18n } from '@ecomplus/utils'
import AddressForm from '#components/AddressForm.vue'

import {
  Edit,
  NewAddress,
  NoNumber,
  Remove
} from './../../lib/i18n'

const { sessionStorage } = window
const storageKey = 'ecomCustomerAddress'

export default {
  name: 'EcAddresses',

  components: {
    AddressForm
  },

  props: {
    mergeDictionary: {
      type: Object,
      default: () => {}
    },
    customer: {
      type: Object
    },
    zipCode: {
      type: String
    }
  },

  data () {
    return {
      showForm: false,
      newAddress: false,
      editedAddressIndex: -1
    }
  },

  computed: {
    addresses () {
      return this.customer.addresses || []
    },

    dictionary () {
      return {
        Edit,
        NewAddress,
        NoNumber,
        Remove,
        ...this.mergeDictionary
      }
    },

    localAddress: {
      get () {
        let address = this.addresses[this.editedAddressIndex]
        if (!address) {
          address = {}
          if (this.zipCode) {
            address.zip = this.zipCode
          }
          if (this.customer.name) {
            address.name = this.customer.name.given_name
          }
        }
        return address
      },
      set (address) {
        const addresses = [].concat(this.addresses)
        addresses[this.editedAddressIndex] = address
        this.$emit('update:customer', {
          ...this.customer,
          addresses
        })
        if (address.zip) {
          this.newAddress = false
          this.selectAddress(address)
        }
        this.showForm = false
      }
    }
  },

  methods: {
    i18n (label) {
      return i18n(this.dictionary[label])
    },

    getLineAddress (address) {
      if (address.line_address) {
        return address.line_address
      } else {
        let lineAddress = `${address.street} ${(address.number || this.i18n('NoNumber'))}`
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
      this.$emit('addressSelected', address._id)
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
        if (this.newAddress) {
          this.showForm = this.newAddress = false
        }
      } else if (!newList.length) {
        this.showForm = this.newAddress = true
      }
    },

    newAddress (addAddress) {
      if (addAddress) {
        this.editedAddressIndex = this.addresses.length
        this.showForm = true
      }
    },

    editedAddressIndex (i) {
      if (i > -1) {
        const address = this.addresses[i]
        if (address) {
          this.selectAddress(address)
        }
        this.showForm = true
      }
    },

    showForm (isVisible) {
      if (!isVisible) {
        this.editedAddressIndex = -1
      }
    }
  },

  created () {
    if (!this.addresses.length) {
      this.newAddress = true
      const sessionAddress = JSON.parse(sessionStorage.getItem(storageKey))
      if (sessionAddress) {
        const address = {}
        for (const field in sessionAddress) {
          if (sessionAddress[field]) {
            address[field] = sessionAddress[field]
          }
        }
        if (address._id && address.zip && address.street) {
          this.editedAddressIndex = 0
          this.$nextTick(() => {
            this.localAddress = address
          })
        }
      }
    } else {
      let address
      if (this.zipCode) {
        address = this.addresses.find(addr => addr.zip === this.zipCode)
      }
      if (!address) {
        address = this.addresses.find(addr => addr.default) || this.addresses[0]
      }
      this.selectAddress(address)
    }
  }
}
