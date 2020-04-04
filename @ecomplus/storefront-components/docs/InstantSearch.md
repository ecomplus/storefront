# InstantSearch

Modal containing search input and results for instant search requests on input keyup. Usually should be opened by a button on site header to perform quick searches out of search page.

```js
import InstantSearch from '@ecomplus/storefront-components/src/InstantSearch.vue'
```

<DemoInstantSearch/>

## Features

- Automatic search on term changes (input keyup);
- Auto-fix search term handling [Elasticsearch suggestions](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters.html) by default;
- Search pagination with "load more" on scroll;
- Shows most popular items when search returns empty result;
- List with recent search history;
- Keep alive search results to prevent unnecessary requests;
- If parent element is a form, `<input name="term">` value will be set with current search term and submit will be fired on click;

## Examples

#### Basic example

```vue
<instant-search
  :term.sync="term"
  :is-visible.sync="isVisible"
/>
```

#### With form parent and toggle button

```vue
<form
  action="/search"
  method="get"
>
  <input name="term" type="hidden">
  <button
    type="button"
    @click="isVisible = true"
  >
    Search
  </button>
  <instant-search :is-visible.sync="isVisible"/>
</form>
```

#### All props/events

```vue
<instant-search
  :term.sync="term"
  :isVisible.sync="isVisible"
  :pageSize="4"
  :autoFixScore="0.8"
  :searchEngineProps="{}"
  :productCardProps="{
    isSmall: false,
    headingTag: 'h4'
  }"
/>
```

## Props

### term

Initial search term, may be changed by user on search input.

> May be used with `.sync` modifier.

```js
term: {
  type: String,
  default: ''
},
```

### is-visible

Defines whether the modal is visible or closed.

> May be used with `.sync` modifier.

```js
isVisible: {
  type: Boolean,
  default: true
},
```

### page-size

The maximum number of products returned per search request. When total results for current search term is greater than page size, more items (next page) will be loaded automatically on scroll.

```js
pageSize: {
  type: Number,
  default: 8
},
```

### auto-fix-score

[Elasticsearch suggesters](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters.html) `score` to match and auto fix search term when original term returns empty result. Bigger score means less auto corrections, set 0 or 1 to disable.

```js
autoFixScore: {
  type: Number,
  default: 0.83
},
```

### search-engine-props

[Props for `SearchEngine`](SearchEngine#props) child component.

```js
searchEngineProps: Object,
```

### product-card-props

[Prop for `ProductCard`](ProductCard#props) child components.

```js
productCardProps: {
  type: Object,
  default () {
    return {
      isSmall: true
    }
  }
},
```

## Events

### update:term

Emitted when search term is changed locally.

> Triggers `.sync` modifier for [`term`](#term).

```js
this.$emit('update:term', term)
```

### update:is-loaded

Emitted when user clicks to close the modal.

> Triggers `.sync` modifier for [`is-visible`](#is-visible).

```js
this.$emit('update:is-visible', false)
```

## Slots

### header

Place to overwrite entire instant search modal header.

```vue
<instant-search :term.sync="term">
  <template #header="{ isSearching }">
    <header class="search__custom-header">
      <input
        type="search"
        class="search__input form-control"
        v-model="term"
      >
      <div
        v-if="isSearching"
        class="search__spinner spinner-grow"
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>
    </header>
  </template>
</instant-search>
```

### count-results

Place to customize results counter on footer.

```vue
<instant-search>
  <template #count-results="{ hasSearched, totalSearchResults }">
    <transition enter-active-class="animated fadeInDown">
      <div
        v-if="hasSearched"
        class="search__count"
      >
        Found <strong>{{ totalSearchResults }}</strong> items
      </div>
    </transition>
  </template>
</instant-search>
```

### history

Place to customize search history list.

```vue
<instant-search :term.sync="term">
  <template #history="{ history }">
    | <a
      class="search__history-link"
      v-for="historyTerm in history"
      href="#"
      @click.prevent="term = historyTerm"
      v-text="historyTerm"
    ></a>
  </template>
</instant-search>
```

### search-engine

Place to overwrite default search engine component on modal body.

```vue
<instant-search>
  <template #search-engine="{ term }">
    <custom-search-engine :term="term"/>
  </template>
</instant-search>
```
