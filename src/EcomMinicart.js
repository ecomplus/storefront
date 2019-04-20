'use strict'

import dictionary from './lib/dictionary'

// handle cart object
// https://developers.e-com.plus/shopping-cart/EcomCart.html
/* global EcomCart */
const { cart, removeItem } = EcomCart

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
    lang: {
      type: String,
      default: 'en_us'
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
    }
  },

  mounted () {
    if (this.show) {
      this.toggle()
    }
  }
}
