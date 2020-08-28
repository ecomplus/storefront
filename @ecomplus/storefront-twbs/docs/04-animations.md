# CSS animations

Some animations from [Animate.css 3](https://daneden.github.io/animate.css/) are included to to the bundle, you can use it adding respective CSS classes, eg.:

```html
<p class="animated fadeIn">
  Animated!
</p>
<p class="animated slow fadeInDown">
  Slowly animated!
</p>
```

Base class name is `.animated`, you can also use modifiers `.faster`, `.fast`, `.slow` and `.slower`, and finally the respective animation class name.

Check provided [`animateCss` util](./06-javascript.md#animate-css-util) to programatically use animations with JS.

## Animations demo

Check default available animations classes and demo below:

<DemoAnimateCss/>

## Vue transition example

```vue
<transition
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOut fast"
>
  <p v-if="isVisible">
    Animate.css works like a charm with Vue.js
  </p>
</transition>
```

## Edit duration

You can change base duration for all animations by setting `$animate-duration` SCSS variable:

```scss
$animate-duration: .5s;
```
