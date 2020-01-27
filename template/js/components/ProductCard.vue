<template>
  <!--
    Edit here and enable alias on `/storefront.webpack.js`
    to overwrite the default product card component for etire storefront.
    Reference: https://github.com/ecomclub/widget-product-card
  -->

  <div
    class="ec-product-card"
    :class="body._id && !isActive ? 'ec-product-card--inactive' : null"
  >
    <transition enter-active-class="animated fadeIn">
      <section v-if="!isLoading">
        <slot name="discount-tag">
          <span v-if="isActive && discount > 0" class="ec-product-card__offer-stamp">
            -<b>{{ discount }}</b>%
          </span>
        </slot>

        <slot name="body">
          <a
            class="ec-product-card__link"
            :href="`/${body.slug}`"
            :title="name(body)"
          >
            <div class="ec-product-card__pictures">
              <template v-if="body.pictures && body.pictures.length">
                <ec-image
                  class="ec-product-card__picture"
                  v-for="(picture, index) in body.pictures.slice(0, 2)"
                  :key="index"
                  :src="picture"
                  :pictureBreakpoint="300"
                />
              </template>
              <ec-image v-else class="ec-product-card__picture"/>
            </div>

            <h3 class="ec-product-card__name">
              {{ name(body) }}
            </h3>
          </a>
        </slot>

        <slot name="unavailable" v-if="!body.available || !body.visible">
          <p class="badge badge-warning">
            {{ dictionary('unavailable') }}
          </p>
        </slot>

        <slot name="out-of-stock" v-else-if="!inStock(body)">
          <p class="badge badge-dark">
            {{ dictionary('out_of_stock') }}
          </p>
        </slot>

        <template v-else>
          <slot name="prices">
            <ec-prices
              class="ec-product-card__prices"
              :lang="lang"
              :product="body"
            />
          </slot>

          <div @click="buy" class="ec-product-card__buy fade">
            <slot name="buy">
              <button type="button" class="btn btn-block btn-primary">
                <i class="fas fa-shopping-bag mr-1"></i>
                {{ strBuy }}
              </button>
            </slot>
          </div>
        </template>

        <slot name="footer"/>
      </section>
    </transition>

    <template v-if="isLoading">
      <slot />
      <div class="alert alert-warning small" role="alert" v-if="error">
        {{ error }}
      </div>
    </template>
  </div>
</template>

<script src="@ecomplus/widget-product-card/src/components/js/EcProductCard.js"></script>
<style lang="scss" src="@ecomplus/widget-product-card/src/components/scss/EcProductCard.scss"></style>
