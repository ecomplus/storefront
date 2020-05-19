# APicture

<DemoAPicture/>

Basic image element with super powers.

## Features

- Supports both single `src` string and E-Com Plus picture objects;
- Lazy load with fixed margin and threshold;
- Responsive image load (best fit with container width);
- Supporting `<picture>` with source by types (webp and jpeg/png);
- Additional fall-back src;
- Background placeholder with aspect ratio image height;
- Load fade transitions;

## Examples

#### Basic (minor required) example

```vue
<APicture :src="picture"/>
```

## Props

### src

Image directory / path.

```js
src: [String, Object],
```

### fallback-src

```js
fallbackSrc: String,
```

### alt

Image description.

```js
alt: String,
```

### can-calc-height

```js
canCalcHeight: {
    type: Boolean,
    default: true
},
```

### placeholder

```js
placeholder: {
    type: String,
    default: '/assets/img-placeholder.png'
},
```

### container-breakpoints

```js
containerBreakpoints: {
    type: Object,
    default () {
        return {
            zoom: null,
            big: 800,
            normal: 400
        }
    }
},
```

### lozad-options

```js
lozadOptions: {
    type: Object,
    default () {
        return {
            rootMargin: '350px 0px',
            threshold: 0
        }
    }
}
```

