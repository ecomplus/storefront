'use strict'

import dictionary from './lib/dictionary'

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
      fade: false
    }
  },

  methods: {
    dictionary,

    toggle () {
      let vm = this
      vm.visible = !vm.visible
      if (vm.visible) {
        // delay to fade in
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
