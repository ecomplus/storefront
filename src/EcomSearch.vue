<template>
  <div class="ecom-search" :class="{ 'shadow': showSuggestions }">
    <div
      class="ecom-search__input-group"
      :class="{ 'ecom-search__input-group--focus': showSuggestions }">
      <input
        type="search"
        class="ecom-search__input form-control form-control-lg"
        v-model="inputValue"
        :name="name"
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
        <div class="ecom-search__suggestions-box shadow rounded-bottom bg-white p-4">
          <p v-if="suggestedTerms.length" class="lead">
            <span class="text-muted">
              {{ dictionary('did_you_mean') }}
            </span>
            <a
              class="ecom-search__suggestions-term ml-2"
              v-for="term in suggestedTerms"
              href="javascript:;"
              @click="inputValue = term">
              {{ term }}
            </a>
          </p>

          <div v-for="item in suggestedItems">
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script src="./EcomSearch.js"></script>
<style lang="scss" src="./EcomSearch.scss"></style>
