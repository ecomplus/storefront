<template>
  <div class="ecom-search" :class="{ 'shadow': showSuggestions }">
    <div
      class="ecom-search__input-group"
      :class="{ 'ecom-search__input-group--focus': showSuggestions }">
      <input
        type="search"
        class="ecom-search__input form-control form-control-lg"
        v-model="inputValue"
        :placeholder="label"
        :aria-label="label"
        @change="change"
        @keyup.enter="submit"
        @focus="toggleSuggestions(true)"
        @blur="blur" />

      <div
        class="ecom-search__submit text-muted st-text-primary-light:hover"
        @click="submit">
        <slot name="submit">
          <i class="fas fa-search"></i>
        </slot>
      </div>
    </div>

    <transition name="ecom-search-fade">
      <div class="ecom-search__suggestions" v-if="showSuggestions">
        <div
          class="ecom-search__suggestions-overlay bg-dark"
          v-if="overlay"
          @click="toggleSuggestions(false)">
        </div>

        <div class="ecom-search__suggestions-box shadow rounded-bottom bg-white">
          <div class="ecom-search__suggestions-container container py-4">
            <p class="ecom-search__info lead">
              <span class="ecom-search__info-icon mr-3 st-text-secondary-lighter">
                <i class="fab fa-searchengin"></i>
              </span>
              <template v-if="searching">
                <slot name="spinner">
                  <span
                    class="position-absolute spinner-grow text-muted"
                    role="status">
                    <span class="sr-only">Loading...</span>
                  </span>
                </slot>
              </template>

              <template v-else-if="suggestedItems.length">
                <span
                  class="ecom-search__count-results text-muted d-inline-block"
                  v-if="suggestedItems.length">
                  {{ dictionary('total_results') }}:
                  <strong>{{ totalSearchResults }}</strong>
                  <a
                    href="javascript:;"
                    @click="submit"
                    class="ml-3"
                    v-if="totalSearchResults > maxItems"
                    v-text="dictionary('see_all')" />
                </span>
              </template>

              <template v-else>
                <template v-if="listTerms.length">
                  <span class="text-muted">
                    {{ dictionary(suggestedTerms.length ? 'did_you_mean' : 'popular_terms') }}
                  </span>
                  <a
                    class="ecom-search__suggested-term mx-2"
                    v-for="term in listTerms"
                    href="javascript:;"
                    @click="inputValue = term"
                    v-text="term" />
                  <span class="text-muted mr-3">?</span>
                </template>

                <small class="d-inline-block"
                  v-if="term && term === searchedTerm">
                  {{ dictionary('no_results_for') }}
                  <em class="text-secondary">{{ term }}</em>
                </small>
              </template>
            </p>

            <div v-if="listItems.length" class="ecom-search__items">
              <p class="lead text-muted" v-if="!suggestedItems.length">
                {{ dictionary('popular_products') }}
              </p>

              <div class="row mt-4">
                <template v-for="(item, i) in listItems">
                  <slot name="item" v-bind:item="item">
                    <div class="ecom-search__item" :class="itemClasses">
                      <div class="d-flex flex-column justify-content-between h-100">
                        <a
                          class="ecom-search__item-link"
                          :class="{ 'mt-4 mt-sm-0': i > 0 }"
                          :href="'/' + item.slug">
                          <img
                            v-if="item.pictures && item.pictures[0] && item.pictures[0].normal"
                            class="ecom-search__item-picture img-fluid"
                            :src="item.pictures[0].normal.url"
                            :alt="item.pictures[0].normal.alt" />
                          <span
                            class="ecom-search__item-name pl-3 pl-sm-0 pt-sm-3"
                            :title="name(item)">
                            {{ truncateString(name(item), 80) }}
                          </span>
                        </a>

                        <div class="ecom-search__item-prices">
                          <strong
                            class="ecom-search__item-price ecom-search__item-price--compare"
                            v-if="onPromotion(item)">
                            {{ item.currency_symbol }}
                            {{ formatMoney(item.base_price) }}
                          </strong>
                          <strong class="ecom-search__item-price">
                            {{ item.currency_symbol }}
                            {{ formatMoney(price(item)) }}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </slot>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script src="./EcomSearch.js"></script>
<style lang="scss" src="./EcomSearch.scss"></style>
