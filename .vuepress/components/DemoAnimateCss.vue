<template>
  <div class="demo">
    <div class="row">
      <div class="col-6">
        <select
          class="form-control"
          v-model="transition"
        >
          <option
            v-for="option of options"
            :value="option"
          >
            {{option}}
          </option>
        </select>
      </div>
      <div class="col-6">
        <button
          class="btn btn-primary"
          @click="animate"
        >
          Animate it
        </button>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col col-md-12">
        <transition
          :enter-active-class="enterClass"
          :leave-active-class="leaveClass"
        >
          <img
            v-if="isVisible"
            src="/storefront/assets/img/banner.png"
          >
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DemoAnimateCss',
    data () {
      return {
        isVisible: true,
        transition: 'fadeOut',
        options: [
          'bounce',
          'flash',
          'pulse',
          'shake',
          'wobble',
          'fadeIn',
          'fadeInDown',
          'fadeInLeft',
          'fadeInRight',
          'fadeInUp',
          'fadeOut',
          'fadeOutDown',
          'fadeOutLeft',
          'fadeOutRight',
          'fadeOutUp',
          'slideInDown',
          'slideInLeft',
          'slideInRight',
          'slideInUp',
          'slideOutDown',
          'slideOutLeft',
          'slideOutRight',
          'slideOutUp',
          'jackInTheBox',
          'zoomIn',
          'zoomOut',
        ]
      }
    },
    computed: {
      isLeaveTransition () {
        return this.transition.indexOf('Out') > -1
      },
      leaveClass () {
        return this.isLeaveTransition
          ? `animated slow ${this.transition}`
          : null
      },
      enterClass () {
        return !this.isLeaveTransition
          ? `animated slow ${this.transition}`
          : null
      }
    },
    methods: {
      animate () {
        this.isVisible = this.isLeaveTransition
        this.$nextTick(() => {
          this.isVisible = !this.isVisible
          setTimeout(() => {
            this.isVisible = true
          }, 700)
        })
      }
    }
  }
</script>
