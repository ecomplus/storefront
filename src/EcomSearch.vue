<template>
  <div class="ecom-search" :class="{ 'shadow': showSuggestions }">
    <button
      v-if="!showInput && !showSuggestions"
      type="button"
      class="ecom-search__button btn btn-lg btn-light"
      @click="toggleInput"
      :title="dictionary('search_products')">
      <i class="fas fa-search"></i>
    </button>

    <div
      v-else
      :class="{ 'ecom-search__floating p-3 p-lg-4': buttonOnly }">
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
          @blur="blur"
          ref="input" />

        <div
          class="ecom-search__submit text-muted st-text-primary-light:hover"
          @click="submit">
          <slot name="submit">
            <span v-if="!showSuggestions || (term && term !== '')" key="submit">
              <i class="fas fa-search"></i>
            </span>
            <span v-else key="close">
              <i class="fas fa-times"></i>
            </span>
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
            <div class="ecom-search__suggestions-container container pb-2 pb-sm-3">
              <div
                key="history"
                class="ecom-search__history lead mt-2 mt-sm-3"
                v-if="history.length &&
                  !searching &&
                  !suggestedItems.length &&
                  (!term || term !== searchedTerm)">
                <span class="mr-3 st-text-secondary-lighter">
                  <i class="fas fa-history"></i>
                </span>
                <a
                  class="ecom-search__term-link mr-3"
                  v-for="term in history.slice(0, 5)"
                  href="javascript:;"
                  @click="inputValue = term"
                  v-text="term" />
              </div>

              <div
                key="info"
                class="ecom-search__info lead mt-2 mt-sm-3"
                v-else>
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
                    key="results"
                    class="ecom-search__count-results text-muted"
                    v-if="suggestedItems.length">
                    <strong>{{ totalSearchResults }}</strong>
                    {{ dictionary('total_results_for') }}
                    <em class="text-secondary mr-3" v-text="searchedTerm" />
                    <a
                      href="javascript:;"
                      @click="submit"
                      class="d-inline-block"
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
                      class="ecom-search__term-link mx-2"
                      v-for="term in listTerms"
                      href="javascript:;"
                      @click="inputValue = term"
                      v-text="term" />
                    <span class="text-muted mr-3">?</span>
                  </template>

                  <span
                    key="empty"
                    class="d-inline-block"
                    v-if="term && term === searchedTerm">
                    {{ dictionary('no_results_for') }}
                    <em class="text-secondary" v-text="term"/>
                  </span>
                </template>
              </div>

              <div
                v-if="listItems.length"
                class="ecom-search__items mt-2 mt-sm-3">
                <div class="row">
                  <template v-for="(item, i) in listItems">
                    <slot name="item" :item="item">
                      <div
                        class="ecom-search__item pt-1 pb-2"
                        :class="itemClasses"
                        :key="item._id">
                        <div class="ecom-search__item-content">
                          <a :href="'/' + item.slug">
                            <img
                              v-if="item.pictures && item.pictures[0] && item.pictures[0].normal"
                              class="ecom-search__item-picture img-fluid"
                              :src="item.pictures[0].normal.url"
                              :alt="item.pictures[0].normal.alt" />
                          </a>

                          <div class="ecom-search__item-info pl-3 pl-sm-0 pt-sm-2 pt-md-3">
                            <a class="ecom-search__item-link" :href="'/' + item.slug">
                              <span
                                class="ecom-search__item-name"
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
  </div>
</template>

<script src="./EcomSearch.js"></script>
<style lang="scss" src="./EcomSearch.scss"></style>
