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
            <transition-group
              name="ecom-minicart-list"
              tag="ul"
              class="ecom-minicart__list list-unstyled">
              <li
                class="ecom-minicart__item pb-3"
                v-for="item in cart.items"
                :key="item._id">

                <div class="ecom-minicart__item-name mb-3">
                  <a v-if="item.slug" :href="'/' + item.slug">
                    {{ item.name }}
                  </a>
                  <template v-else>
                    {{ item.name }}
                  </template>
                </div>

                <div class="d-flex align-items-center justify-content-between">
                  <a
                    v-if="item.picture && Object.keys(item.picture).length"
                    :href="item.slug ? '/' + item.slug : 'javascript:;'">
                    <img
                      :src="(item.picture.small || item.picture.normal ||
                        item.picture[Object.keys(item.picture)[0]]).url"
                      :alt="item.name"
                      class="ecom-minicart__item-picture" />
                  </a>

                  <input
                    type="number"
                    class="ml-2 ecom-minicart__item-quantity form-control"
                    placeholder="Qnt."
                    v-model.number="item.quantity" />
                  <div class="ecom-minicart__item-price flex-grow-1 text-center">
                    <strong>R$ {{ item.price * item.quantity }}</strong>
                  </div>
                  <div
                    class="ecom-minicart__item-remove text-right text-danger"
                    @click="removeItem(item._id)">
                    <i class="fas fa-trash-alt"></i>
                  </div>
                </div>
              </li>
            </transition-group>
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
<style src="./EcomMinicart.css"></style>
