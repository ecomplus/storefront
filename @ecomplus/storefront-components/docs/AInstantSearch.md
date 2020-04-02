# InstantSearch

InstantSearch is a component providing  helpers to help you build the best search. It is built  to provide you a high-level solution to quickly build search interfaces.

<DemoInstantSearch/>

## Features

- Personalized and collaborative filtering;
- Allows users to find the right products in seconds. It is highly configurable to allow store owners to personalize search results for a more enjoyable shopping experience;
- Number of Products of search;
- Automatic search while typing the product;

## Examples

#### Basic (minor required) example

```vue
<InstantSearch
  :term.sync="term"
  :is-visible.sync="isVisible"
/>
```

#### All props

```vue
<InstantSearch
  :term.sync="term"
  :isVisible.sync="isVisible"
  :pageSize="4"
  :autoFixScore="0.8"
  :searchEngineProp ?????
  :productCardProps ?????
/>
```

## Props

### term
Standard text that will start the search
For example: If you leave it set, `:term.sync= "chair";` the search will open with the search for this product. It is the 'keyword' of the search.

 ```js
term: {
  type: String,
  default: ''
    }
```

### isVisible

Defines whether the search window will be opened or not when entering the page.

```js
isVisible: {
  type: Boolean,
  default: true
    }
```

### pageSize

The number of products returned from the search. This is a way to limit the search result and show only some of the products. Note that if the number of products is more that the products that can fit in the autocomplete results window then a scroll bar will appear.

```js
pageSize: {
  type: Number,
  default: 8}
```

### autoFixScore

```js
autoFixScore: {
  type: Number,
  default: 0.83
},
```

### searchEngineProps

```js
searchEngineProps: Object,
```

### productCardProps

Reduces the vertical size in a way that renders the component using less space. Ideal for use on a pop-up screen, for example.

```js
productCardProps: {
  type: Object,
  default () {
  return {
    isSmall: true
     }
```
