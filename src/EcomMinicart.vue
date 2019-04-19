<template>
  <div class="ecom-minicart">
    <transition :duration="{ leave: 400 }">
      <div class="ecom-minicart__container" v-show="visible">
        <div
          class="ecom-minicart__overlay bg-dark fade"
          :class="{ 'show': fade }"
          @click="toggle">
        </div>

        <aside
          class="ecom-minicart__sidebar card shadow"
          :class="{ 'show': fade }">
          <slot name="header">
            <header class="card-header">
              {{ dictionary('my_cart') }}
              <button
                type="button"
                class="close"
                :aria-label="dictionary('close')"
                @click="toggle">
                <span aria-hidden="true">&times;</span>
              </button>
            </header>
          </slot>
          <main class="card-body">
          </main>
          <footer class="card-footer text-muted">
            2 days ago
          </footer>
        </aside>
      </div>
    </transition>

    <div class="ecom-minicart__button">
      <button
        type="button"
        class="close"
        :aria-label="dictionary('close')"
        @click="toggle">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script src="./EcomMinicart.js"></script>

<style>
.ecom-minicart__container {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
}
.ecom-minicart__overlay {
  width: 100%;
  height: 100%;
  opacity: .45;
  cursor: pointer;
}
.ecom-minicart__sidebar {
  position: fixed;
  width: 25%;
  height: 100%;
  top: 0;
  right: -25%;
  transition: right 0.3s ease-out;
}
.ecom-minicart__sidebar.show {
  right: 0;
}
</style>
