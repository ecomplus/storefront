<template>
  <div class="demo">
      <div class="row">
        <div class="col-md-6">
          <select class="form-control"  v-model="selectedOption" @change="toggleAnimation()">
            <option
              v-for="option of options"
              :value="option">
              {{option}}
            </option>
          </select>
        </div>
        <div class="col-md-6">
          <button class="btn btn-primary" @click="toggleAnimation()">Animate it</button>
        </div>
      </div>
      <br/>
      <div class="row">
        <div class="col col-md-12">
          <div class="demo-transition">
            <transition
            :enter-active-class="`animated ${selectedOption}`"
            leave-active-class="`animated fadeOutUp slow"
            >
              <img v-if="showElement" src="/assets/img/banner.png">
            </transition>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'DemoAnimateCss',
    data: () => {
      return {
        showElement: true,
        selectedOption: 'slideInLeft',
        options: [
          'slideInLeft',
          'fadeOutUp',
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
    methods: {
      toggleAnimation() {
        setTimeout(()=> { this.showElement= false }, 500)
        setTimeout(()=> { this.showElement= true }, 1000)
      }
    }
  }
</script>
<style>
  .demo-transition{
    height: 380px;
  }
</style>