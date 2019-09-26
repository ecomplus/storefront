import CleaveInput from 'vue-cleave-component'

export default {
  name: 'InputDocNumber',

  components: {
    CleaveInput
  },

  props: {
    value: {
      type: [String, Number],
      required: true
    },
    countryCode: {
      type: String
    },
    isCompany: {
      type: Boolean
    }
  },

  computed: {
    localValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },

    cleaveOptions () {
      return this.countryCode === 'BR'
        ? this.isCompany
          ? { blocks: [2, 3, 3, 4, 2], delimiters: ['.', '.', '/', '-'] }
          : { blocks: [3, 3, 3, 2], delimiters: ['.', '.', '-'] }
        : { blocks: [30] }
    }
  }
}
