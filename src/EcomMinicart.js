'use strict'

import dictionary from './lib/dictionary'

// handle cart object
// https://developers.e-com.plus/shopping-cart/EcomCart.html
/* global EcomCart */
const { cart, removeItem, handleItem } = EcomCart

// get format money function
/* global Ecom */
let formatMoney
if (Ecom) {
  formatMoney = Ecom.methods.formatMoney
}

export default {
  name: 'EcomMinicart',

  props: {
    show: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: true
    },
    buttonSubtotal: {
      type: Boolean,
      default: false
    },
    lang: {
      type: String,
      default: 'pt_br'
    },
    // options for money formatting
    currency: {
      type: String,
      default: 'R$'
    },
    decimalDelimiter: {
      type: String,
      default: ','
    },
    thousandsDelimiter: {
      type: String,
      default: '.'
    },
    currencyNumFixed: {
      type: Number,
      default: 2
    }
  },

  data () {
    return {
      visible: false,
      fade: false,
      cart
    }
  },

  methods: {
    dictionary,
    removeItem,
    handleItem,

    toggle () {
      let vm = this
      vm.visible = !vm.visible
      if (vm.visible) {
        // delay to add 'show' CSS class
        setTimeout(() => {
          vm.fade = vm.visible
        }, 50)
      } else {
        vm.fade = false
      }
      // handle v-bind:show.sync="show"
      this.$emit('update:show', vm.visible)
    },

    formatMoney (price, currencySymbol) {
      if (formatMoney) {
        // format price string
        price = formatMoney(
          price,
          this.decimalDelimiter,
          this.thousandsDelimiter,
          this.currencyNumFixed
        )
      }
      return (currencySymbol || this.currency) + ' ' + price
    }
  },

  mounted () {
    if (this.show) {
      this.toggle()
    }
  },

  watch: {
    show (val) {
      if (val !== this.visible) {
        // state changed externally
        this.toggle()
      }
    }
  }
}
